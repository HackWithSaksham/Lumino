import React, { useState, useEffect, useContext,useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { AppContent } from "../context/AppContext";
import { FaSmile, FaImage, FaVideo, FaMicrophone } from "react-icons/fa";
import { RiFileGifFill } from "react-icons/ri";
import { ChevronDown } from "lucide-react";

export default function Idea() {
  const [privacy, setPrivacy] = useState("Private");
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [notes, setNotes] = useState([""]);
  const originalNoteRef = useRef("");
  const [activeSection, setActiveSection] = useState(0);
  const [listening, setListening] = useState(false);

  const [title, settitle] = useState("");
  const [category, setcategory] = useState("Select Category");
  const [status, setstatus] = useState("Saved");
  const [text, settext] = useState("");
  const { backendUrl, ideaid, setideaid } = useContext(AppContent);

  const privacyOptions = ["Private", "Public"];
  const categories = ["Fantasy", "Comedy", "Science Fiction", "Essay", "Mystery","Romance", "Biography", "Thriller", "Travel", "Miscellaneous"];

  useEffect(() => {
    const initialidea = async () => {
      if (ideaid == "") {
        const { data } = await axios.post(
          `${backendUrl}/api/user/addidea`,
          { title, category, description: text },
          { withCredentials: true }
        );
        setideaid(data.ideaid);
        console.log(data.ideaid);
      }
      const { data } = await axios.post(
        `${backendUrl}/api/user/getidea`,
        { id: ideaid },
        {
          withCredentials: true,
        }
      );
      settitle(data.idea.title);
      setcategory(data.idea.category);
      settext(data.idea.description);
    };

    initialidea();
  }, [ideaid]);

  useEffect(() => {
    if (!ideaid) return;
    const updatingidea = async () => {
      setstatus("Saving");
      try {
        const { data } = await axios.post(
          `${backendUrl}/api/user/updateidea`,
          { title, category, description: text, id: ideaid },
          { withCredentials: true }
        );
        if (data.success) {
          setstatus("Saved");
        } else {
          setstatus(data.message);
        }
      } catch (error) {
        setstatus(error.message);
      }
    };
    const timeout = setTimeout(updatingidea, 800);
    return () => clearTimeout(timeout);
  }, [text, category, title]);

  useEffect(() => {
    let recognition;
    if (listening) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onresult = (event) => {
          let final_transcript = "";
          let interim_transcript = "";
          for (let i = 0; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              final_transcript += event.results[i][0].transcript;
            } else {
              interim_transcript += event.results[i][0].transcript;
            }
          }
          const newText = originalNoteRef.current + final_transcript + interim_transcript;
          setNotes((prev) =>
            prev.map((note, idx) => (idx === activeSection ? newText : note))
          );
        };

        recognition.start();
      } else {
        alert("Speech recognition not supported in this browser.");
      }
    }
    return () => {
      if (recognition) recognition.stop();
    };
  }, [listening, activeSection]); 

  const handleAddSection = () => {
    setNotes((prev) => [...prev, ""]);
    setActiveSection(notes.length);
  };

  const handleNoteChange = (index, value) => {
    setNotes((prev) => prev.map((note, i) => (i === index ? value : note)));
  };

  return (
    <div className="min-h-screen bg-[#070C2B] text-white flex flex-col">
      <div className="flex justify-between items-center px-8 py-6">
        <div className="flex items-center gap-2">
          <img src="/images/logo.png" className="w-10 h-10" />
          <div className="text-2xl font-bold">Lumino</div>
        </div>
        <ul className="hidden md:flex gap-8 text-lg">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-400 font-semibold"
                  : "hover:text-indigo-300"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-400 font-semibold"
                  : "hover:text-indigo-300"
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/features"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-400 font-semibold"
                  : "hover:text-indigo-300"
              }
            >
              Features
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/faq"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-400 font-semibold"
                  : "hover:text-indigo-300"
              }
            >
              FAQ
            </NavLink>
          </li>
        </ul>
        <Link to="/profile">
          <img src="/images/user.png" className="w-8 h-8 rounded-full" />
        </Link>
      </div>

      <div className="flex flex-1 px-6 pb-6 pt-4 gap-6">
        <aside className="w-64 bg-[#1B1537] p-6 flex flex-col justify-between border-r border-[#2A2D5C] rounded-lg sticky top-6 h-[calc(100vh-6rem)]">
          <div>
            <h2 className="text-lg font-semibold mb-6 text-gray-200">Your Gallery</h2>
            <div className="flex flex-col gap-5 text-gray-300">
              <div className="flex items-center gap-3 hover:text-white cursor-pointer"><FaSmile /> Emojis</div>
              <div className="flex items-center gap-3 hover:text-white cursor-pointer"><RiFileGifFill /> GIFs</div>
              <div className="flex items-center gap-3 hover:text-white cursor-pointer"><FaImage /> Images</div>
              <div className="flex items-center gap-3 hover:text-white cursor-pointer"><FaVideo /> Videos</div>
            </div>
          </div>
          <div className="space-y-3 relative">
            <button className="w-full py-2 bg-[#111344] rounded-md text-sm">View Collaboration</button>
            <div
              className="bg-[#111344] rounded-md px-3 py-2 flex justify-between items-center text-sm cursor-pointer relative"
              onClick={() => setShowPrivacy(!showPrivacy)}
            >
              {privacy}
              <ChevronDown size={16} className={`${showPrivacy ? "rotate-180" : ""}`} />
              {showPrivacy && (
                <ul className="absolute bottom-11 left-0 w-full bg-[#0D0F2D] border border-[#1C1F4A] rounded-md z-10">
                  {privacyOptions.map((option, idx) => (
                    <li
                      key={idx}
                      onClick={() => { setPrivacy(option); setShowPrivacy(false); }}
                      className="px-4 py-2 hover:bg-[#1B1E4D] cursor-pointer"
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </aside>

        <main className="flex-1 bg-[#1B1537] border-l border-[#2A2D5C] rounded-lg p-8 flex flex-col gap-6">
          <div className="flex items-center gap-6">
            <input
              type="text"
              placeholder="Enter Title of Project"
              className="bg-[#0D0F2D] text-gray-200 px-4 py-2 rounded-md w-1/3"
              value={title}
              onChange={(e) => settitle(e.target.value)}
            />
            <div
              className="bg-[#0D0F2D] px-4 py-2 rounded-md flex items-center justify-between w-1/3 relative cursor-pointer"
              onClick={() => setShowCategory(!showCategory)}
            >
              <span className={category === "Select Category" ? "text-gray-400" : "text-white"}>{category}</span>
              <ChevronDown size={16} className={`${showCategory ? "rotate-180" : ""}`} />
              {showCategory && (
                <ul className="absolute top-12 left-0 w-full bg-[#0D0F2D] border border-[#1C1F4A] rounded-md z-10">
                  {categories.map((option, idx) => (
                    <li
                      key={idx}
                      onClick={() => { setcategory(option); setShowCategory(false); }}
                      className="px-4 py-2 hover:bg-[#1B1E4D] cursor-pointer"
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div
              onClick={() => {
                if (!listening) {
                  originalNoteRef.current = notes[activeSection];
                }
                setListening(!listening);
              }}
              className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                listening ? "bg-red-600" : "bg-[#0D0F2D] hover:bg-[#181B44]"
              }`}
            >
              <FaMicrophone />
            </div>
            <div className="text-sm text-gray-400 ml-auto">{status}</div>
          </div>

          <div className="flex-1 flex flex-col gap-6 overflow-y-auto">
            {notes.map((note, index) => (
              <div
                key={index}
                className={`bg-[#0D0F2D] rounded-md p-5 flex flex-col justify-between cursor-text ${
                  activeSection === index ? "border-2 border-[#3A4FFF]" : "border border-[#1C1F4A]"
                }`}
                onClick={() => setActiveSection(index)}
              >
                <textarea
                  value={note}
                  onChange={(e) => handleNoteChange(index, e.target.value)}
                  placeholder="Write here..."
                  className="w-full min-h-[120px] bg-transparent text-gray-200 resize-none focus:outline-none"
                />
                <span className="text-sm text-gray-400 self-end">
                  {listening && activeSection === index ? "🎤 Listening..." : `Section ${index + 1}`}
                </span>
              </div>
            ))}
          </div>

          <div className="relative flex justify-center items-center py-2">
            <div className="absolute top-1/2 left-0 w-full h-px bg-[#1C1F4A]"></div>
            <button
              onClick={handleAddSection}
              className="relative z-10 px-4 py-1 bg-[#1B1537] rounded-md hover:bg-[#2A2E6D] transition text-sm text-gray-300 border border-[#2A2D5C]"
            >
              + Add Section
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

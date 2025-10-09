import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { AppContent } from "../context/AppContext";
import { FaSmile, FaImage, FaVideo, FaMicrophone } from "react-icons/fa";
import { RiFileGifFill } from "react-icons/ri";
import { ChevronDown } from "lucide-react";
import Navbar from "../components/Navbar";
export default function Idea() {
  const [privacy, setPrivacy] = useState("Private");
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [listening, setListening] = useState(false);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Select Category");
  const [text, setText] = useState("");
  const [status, setStatus] = useState("Saved");

  const originalNoteRef = useRef("");
  const { backendUrl, ideaid, setideaid,getUserData } = useContext(AppContent);

  const privacyOptions = ["Private", "Public"];
  const categories = ["Fantasy", "Comedy", "Science Fiction", "Essay", "Mystery", "Romance", "Biography"];

  useEffect(() => {
    const initialidea = async () => {
      if (ideaid == "") {
        const { data } = await axios.post(
          `${backendUrl}/api/user/addidea`,
          { title, category, description: text },
          { withCredentials: true }
        );
        setideaid(data.ideaid);
      }
      const { data } = await axios.post(
        `${backendUrl}/api/user/getidea`,
        { id: ideaid },
        {
          withCredentials: true,
        }
      );
      setTitle(data.idea.title);
      setCategory(data.idea.category);
      setText(data.idea.description);
    };

    initialidea();
    getUserData();
  }, [ideaid]);
  useEffect(() => {
    if (!ideaid) return;
    const updatingidea = async () => {
      setStatus("Saving");
      try {
        const { data } = await axios.post(
          `${backendUrl}/api/user/updateidea`,
          { title, category, description: text, id: ideaid },
          { withCredentials: true }
        );
        if (data.success) {
          setStatus("Saved");
        } else {
          setStatus(data.message);
        }
      } catch (error) {
        setStatus(error.message);
      }
    };
    const timeout = setTimeout(updatingidea, 800);
    getUserData();
    return () => clearTimeout(timeout);
  }, [text, category, title]);

  useEffect(() => {
  let recognition;
  if (listening) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        let final_transcript = "";
        let interim_transcript = "";
        for (let i = 0; i < event.results.length; ++i) {
          if (event.results[i].isFinal) final_transcript += event.results[i][0].transcript;
          else interim_transcript += event.results[i][0].transcript;
        }
        setText(originalNoteRef.current + final_transcript + interim_transcript);
      };

      recognition.start();
    } else {
      alert("Speech recognition not supported in this browser.");
    }
  }
  getUserData();
  return () => recognition?.stop();
  }, [listening]);

  useEffect(() => {
    originalNoteRef.current = text;
    getUserData();
  }, [text]);

  return (
    <div className="min-h-screen bg-[#070C2B] text-white flex flex-col">
      <Navbar />

      <div className="flex flex-1 px-30 pb-6 pt-4 gap-6">
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

        <main className="flex-1 bg-[#1B1537] border-l border-[#2A2D5C] rounded-lg p-8 flex flex-col gap-6 relative">
          <div className="flex items-center gap-6">
            <input
              type="text"
              placeholder="Enter Title of Project"
              className="bg-[#0D0F2D] text-gray-200 px-4 py-2 rounded-md w-1/3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
                    <li key={idx} onClick={() => { setCategory(option); setShowCategory(false); }} className="px-4 py-2 hover:bg-[#1B1E4D] cursor-pointer">{option}</li>
                  ))}
                </ul>
              )}
            </div>
            <div
              onClick={() => setListening((prev) => !prev)}
              className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                listening ? "bg-red-600 animate-pulse" : "bg-[#0D0F2D] hover:bg-[#181B44]"
              }`}
            >
              <FaMicrophone />
            </div>
          </div>

          <div className="flex-1 flex flex-col relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write here..."
              className="w-full h-full min-h-[300px] bg-[#0D0F2D] text-gray-200 resize-none rounded-md p-5 focus:outline-none"
            />
            <span className="absolute bottom-2 right-4 text-sm text-gray-400">
              {listening ? "🎤 Listening..." : status}
            </span>
          </div>
        </main>
      </div>
    </div>
  );
}

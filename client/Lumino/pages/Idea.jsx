import React, { useContext, useEffect, useState } from "react";
import * as Icons from "lucide-react";
import { AppContent } from "../context/AppContext";
import axios from "axios";
const Idea = () => {
  const [title, settitle] = useState("");
  const [category, setcategory] = useState("");
  const [status, setstatus] = useState("Saved");
  const [text, settext] = useState("");
  const { backendUrl, ideaid, setideaid } = useContext(AppContent);

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

  return (
    <div className="bg-[#080A31]">
      <div className="flex gap-10 my-35 mx-40">
        <div className="flex flex-col w-[25%] bg-[#25183C] min-h-screen">a</div>
        <div className="flex flex-col w-[75%] bg-[#25183C] min-h-screen">
          <div className="flex flex-col p-15 w-full">
            <div className="flex justify-between w-full gap-10">
              <input
                type="text"
                value={title}
                onChange={(e) => settitle(e.target.value)}
                placeholder="Enter title of project"
                className="bg-[#080A31] text-sm px-5 py-2.5 rounded-md text-white w-[45%]"
              />
              <div className="flex items-center justify-between bg-[#080A31] text-sm px-5 py-2.5 text-white/50 w-[45%] rounded-md">
                <select
                  value={category}
                  onChange={(e) => setcategory(e.target.value)}
                  className="appearance-none"
                >
                  <option value="">Select Category</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Science Fiction">Science Fiction</option>
                  <option value="Mystery">Mystery</option>
                  <option value="Romance">Romance</option>
                  <option value="Thriller">Thriller</option>
                  <option value="Biography">Biography</option>
                  <option value="Essay">Essay</option>
                  <option value="Travel">Travel</option>
                  <option value="Miscellaneous">Miscellaneous</option>
                </select>
                <Icons.ChevronDown size={20} />
              </div>
              <div className="w-[15%]">Voice to text</div>
            </div>
            <div className="relative w-full">
              <textarea
                value={text}
                onChange={(e) => settext(e.target.value)}
                placeholder="Write here..."
                className="w-full h-64 p-4 border rounded bg-[#0a0a2a] text-white"
              />
              <span className="absolute bottom-2 right-4 text-sm text-gray-400">
                {status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Idea;

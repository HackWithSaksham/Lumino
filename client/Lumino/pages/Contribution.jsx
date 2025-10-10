import React, { useContext, useEffect, useState } from "react";
import { diffLines } from "diff";
import { AppContent } from "../context/AppContext";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

const Contribution = () => {
  const { userData, historyid } = useContext(AppContent);

  const [collab, setCollab] = useState([]);
  const [filteredCollab, setFilteredCollab] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [previouscontent, setPreviousContent] = useState("");
  const [newcontent, setNewContent] = useState("");
  const [text, setText] = useState([]);
  const [status, setStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeId, setActiveId] = useState(historyid || null);

  useEffect(() => {
    if (!userData) return;

    const contribution = userData?.contribution || [];
    const userContribs = contribution.flatMap((contrib) =>
      contrib.history.map((history) => ({
        id: history._id,
        title: contrib.ideaid.title,
        changeSummary: history.changeSummary,
        date: history.createdAt,
        requeststatus: history.requeststatus,
        category: contrib.ideaid.category,
        previousContent: history.previousContent,
        newContent: history.newContent,
      }))
    );

    setCollab(userContribs);
    setFilteredCollab(userContribs);

    const current = userContribs.find((item) => item.id === historyid);
    if (current) handleChangeData(current);
  }, [userData, historyid]);

  useEffect(() => {
    let filtered = collab.filter((c) =>
      (c.changeSummary || c.title).toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (selectedCategory !== "All") {
      filtered = filtered.filter((c) => c.category === selectedCategory);
    }
    setFilteredCollab(filtered);
  }, [searchQuery, selectedCategory, collab]);

  const handleChangeData = (contri) => {
    setActiveId(contri.id);
    setTitle(contri.title);
    setCategory(contri.category);
    setPreviousContent(contri.previousContent || "");
    setNewContent(contri.newContent || "");
    setStatus(contri.requeststatus || "");

    const diff = diffLines(contri.previousContent || "", contri.newContent || "");
    setText(diff);
  };

  const categories = ["All", ...new Set(collab.map((c) => c.category))];

  return (
    <div className="relative min-h-screen bg-[#0D0F2D] text-gray-100">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <div className="flex pt-24">
<aside className="w-[30%] bg-[#151136] pl-12 p-6 border-r border-gray-800 min-h-screen">
  <h2 className="text-lg font-semibold mb-4 text-gray-200">Your Requests</h2>

  <input
    type="text"
    placeholder="Search..."
    className="w-full mb-4 p-2 rounded-md bg-[#1F1B44] text-gray-200 placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />

  <div className="flex flex-col gap-3 text-gray-300 overflow-y-auto max-h-[calc(100vh-250px)] scrollbar-glow">
    {filteredCollab.length > 0 ? (
      filteredCollab.map((contri, idx) => (
        <motion.div
          key={idx}
          onClick={() => handleChangeData(contri)}
          className={`p-3 rounded-lg cursor-pointer transition-all border-l-4 ${
            activeId === contri.id
              ? "border-purple-400 shadow-glow bg-[#2D2566]"
              : "border-transparent hover:border-purple-500 hover:bg-[#2B2566]"
          }`}
          whileHover={{ scale: 1.02 }}
        >
          <p className="truncate text-sm">{contri.changeSummary || `Change ${idx + 1}`}</p>
          <p className="text-xs text-gray-400">{contri.requeststatus || "Pending"}</p>
          <span className="mt-1 inline-block px-2 py-0.5 text-xs rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            {contri.category}
          </span>
        </motion.div>
      ))
    ) : (
      <p className="text-gray-500">No changes found.</p>
    )}
  </div>
</aside>


        <main className="flex-1 bg-[#1B1537] p-8 flex flex-col gap-6 min-h-screen">
          <div className="flex items-center justify-between gap-6 mb-4">
            <div className="bg-[#0D0F2D] text-gray-200 px-4 py-2 rounded-md w-1/2 font-semibold shadow-md">
              {title || "Select a request"}
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden md:inline text-gray-400 font-medium">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-[#1F1B44] text-gray-200 px-3 py-1 rounded-lg shadow-inner border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
              >
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex-1 relative p-4 bg-[#0D0F2D] rounded-lg overflow-auto shadow-inner scrollbar-glow">
            {text.length > 0 ? (
              text.map((part, i) => (
                <pre
                  key={i}
                  className={`whitespace-pre-wrap px-2 py-1 rounded-md transition-all ${
                    part.added
                      ? "bg-green-900/40 text-green-200"
                      : part.removed
                      ? "bg-red-900/40 text-red-200"
                      : "text-gray-200"
                  }`}
                >
                  {part.value}
                </pre>
              ))
            ) : (
              <p className="text-gray-400">
                Select a change from the sidebar to view differences.
              </p>
            )}

            <span className="absolute bottom-2 right-4 text-sm text-gray-400 font-medium">
              Status: {status || "Pending"}
            </span>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Contribution;

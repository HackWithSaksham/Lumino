import React, { useContext, useEffect, useMemo, useState } from "react";
import { diffLines } from "diff";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  ChevronDown,
  Search,
  Loader2,
} from "lucide-react";
import Navbar from "../components/Navbar";

const Requests = () => {
  const { backendUrl, requestid, setrequestid } = useContext(AppContent);
  const [req, setReq] = useState([]);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState([]);
  const [status, setStatus] = useState("");
  const [contributionid, setContributionid] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [openSections, setOpenSections] = useState({
    Pending: true,
    Accepted: true,
    Rejected: true,
  });

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/userdata`, {
        withCredentials: true,
      });

      if (data.success) {
        const user = data.user;
        const userRequests = user.requests.flatMap((contrib) =>
          contrib.history.map((history) => ({
            id: history._id,
            contributionid: contrib._id,
            title: contrib.ideaid?.title || "Untitled Idea",
            changeSummary: history.changeSummary,
            date: history.createdAt,
            requeststatus: history.requeststatus || "Pending",
            category: contrib.ideaid?.category || "Uncategorized",
            previousContent: history.previousContent,
            newContent: history.newContent,
          }))
        );
        setReq(userRequests);
        const current = userRequests.find((item) => item.id === requestid);
        if (current) handleChangeData(current);
      }
    } catch (err) {
      console.error("Failed to fetch requests:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, [refreshKey]);

  const handleChangeData = (contri) => {
    setTitle(contri.title);
    setCategory(contri.category);
    setContributionid(contri.contributionid);
    setStatus(contri.requeststatus || "");
    const diff = diffLines(contri.previousContent || "", contri.newContent || "");
    setText(diff);
    setrequestid(contri.id);
  };

  const handleapprove = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/acceptrequest`,
        { contributionid, historyid: requestid },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success("Request accepted successfully");
        await fetchRequests();
        setRefreshKey((prev) => prev + 1);
      } else toast.error(data.message);
    } catch {
      toast.error("Error approving request");
    }
  };

  const handlereject = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/rejectrequest`,
        { contributionid, historyid: requestid },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success("Request rejected");
        await fetchRequests();
        setRefreshKey((prev) => prev + 1);
      } else toast.error(data.message);
    } catch {
      toast.error("Error rejecting request");
    }
  };

  const handlerevert = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/revertrequest`,
        { contributionid, historyid: requestid },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success("Request reverted to pending");
        await fetchRequests();
        setRefreshKey((prev) => prev + 1);
      } else toast.error(data.message);
    } catch {
      toast.error("Error reverting request");
    }
  };

  const groupedReqs = useMemo(() => {
    const filtered = req.filter(
      (r) =>
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.changeSummary?.toLowerCase().includes(search.toLowerCase())
    );
    return {
      Pending: filtered.filter((r) => r.requeststatus === "Pending"),
      Accepted: filtered.filter((r) => r.requeststatus === "Accepted"),
      Rejected: filtered.filter((r) => r.requeststatus === "Rejected"),
    };
  }, [req, search]);

  const toggleSection = (section) =>
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));

  return (
    <div className="h-screen w-full bg-gradient-to-br from-[#0B0C2A] via-[#121536] to-[#0D0F2D] text-gray-100 flex flex-col">
      <div className="sticky top-0 z-50 bg-[#151136]/80 backdrop-blur-md border-b border-[#2E2A5E]">
        <Navbar />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-1/4 bg-[#151136]/70 backdrop-blur-md border-r border-[#28255e] p-6 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4 text-[#C5C3FF]">
            Incoming Requests
          </h2>

          <div className="relative mb-5">
            <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search requests..."
              className="w-full bg-[#1F1B44]/70 text-sm rounded-lg pl-8 pr-3 py-2 outline-none border border-[#2E2A5E] focus:border-[#6D5BF5] text-gray-300 placeholder-gray-500"
            />
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20 animate-pulse text-gray-400">
              <Loader2 className="animate-spin mr-2" size={20} /> Refreshing...
            </div>
          ) : (
            <div className="flex flex-col gap-4 text-gray-300 overflow-y-auto max-h-[70vh] pr-2">
              {["Pending", "Accepted", "Rejected"].map((section) => (
                <div key={section} className="bg-[#1F1B44]/40 rounded-md">
                  <button
                    onClick={() => toggleSection(section)}
                    className="flex justify-between items-center w-full px-3 py-2 text-sm font-medium text-gray-300 hover:bg-[#2B2566]/70 rounded-md transition-all"
                  >
                    <span>
                      {section}{" "}
                      <span className="text-xs text-gray-500 ml-1">
                        ({groupedReqs[section].length})
                      </span>
                    </span>
                    <motion.div
                      animate={{ rotate: openSections[section] ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={16} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openSections[section] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col gap-2 p-2"
                      >
                        {groupedReqs[section].length > 0 ? (
                          groupedReqs[section].map((contri, idx) => (
                            <motion.div
                              key={idx}
                              layout
                              whileHover={{ scale: 1.02 }}
                              onClick={() => handleChangeData(contri)}
                              className={`p-3 rounded-lg cursor-pointer text-sm transition-all duration-200 ${
                                contri.id === requestid
                                  ? "bg-gradient-to-r from-[#4435C6] to-[#6D5BF5] shadow-md shadow-[#4f46e5]/30"
                                  : "bg-[#1F1B44]/70 hover:bg-[#2B2566]/80"
                              }`}
                            >
                              <p className="truncate">
                                {contri.changeSummary || `Change ${idx + 1}`}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {contri.title}
                              </p>
                            </motion.div>
                          ))
                        ) : (
                          <p className="text-xs text-gray-500 italic px-2">
                            No {section.toLowerCase()} requests
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          )}
        </aside>

        <main className="flex-1 p-10 flex flex-col gap-6 relative overflow-auto">
          {loading ? (
            <div className="flex-1 flex items-center justify-center text-gray-400 animate-pulse">
              <Loader2 className="animate-spin mr-2" size={22} /> Loading details...
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold text-[#D8D6FF]">{title}</h1>
                  <p className="text-sm text-gray-400 mt-1">
                    Category: {category}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    status === "Accepted"
                      ? "bg-green-500/20 text-green-400 border border-green-500/40"
                      : status === "Rejected"
                      ? "bg-red-500/20 text-red-400 border border-red-500/40"
                      : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/40"
                  }`}
                >
                  {status || "Pending"}
                </span>
              </div>

              <div className="flex-1 bg-[#0D0F2D]/60 backdrop-blur-md p-6 rounded-xl border border-[#2E2A5E] overflow-auto shadow-inner shadow-[#05061d]">
                {text.map((part, i) => (
                  <pre
                    key={i}
                    className={`whitespace-pre-wrap px-3 py-2 rounded-md text-sm leading-relaxed tracking-wide ${
                      part.added
                        ? "bg-green-700/20 border-l-4 border-green-500"
                        : part.removed
                        ? "bg-red-700/20 border-l-4 border-red-500"
                        : ""
                    }`}
                  >
                    {part.value}
                  </pre>
                ))}

                <div className="absolute bottom-6 right-10 flex items-center gap-5">
                  {status === "Pending" ? (
                    <>
                      <motion.button
                        whileHover={{
                          scale: 1.07,
                          boxShadow: "0px 0px 15px 3px #22c55e80",
                        }}
                        whileTap={{ scale: 0.96 }}
                        onClick={handleapprove}
                        className="flex items-center gap-2 px-5 py-2 rounded-lg font-medium text-white 
                        bg-gradient-to-r from-emerald-500 via-green-600 to-emerald-700 
                        hover:from-emerald-400 hover:to-emerald-600 
                        shadow-lg shadow-emerald-500/30 relative overflow-hidden transition-all duration-300"
                      >
                        <span className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_30%,#a7f3d0,transparent_70%)] animate-pulse" />
                        <CheckCircle2 size={18} /> Accept
                      </motion.button>

                      <motion.button
                        whileHover={{
                          scale: 1.07,
                          boxShadow: "0px 0px 15px 3px #ef444480",
                        }}
                        whileTap={{ scale: 0.96 }}
                        onClick={handlereject}
                        className="flex items-center gap-2 px-5 py-2 rounded-lg font-medium text-white 
                        bg-gradient-to-r from-red-600 via-rose-600 to-red-700 
                        hover:from-rose-500 hover:to-red-600 
                        shadow-lg shadow-red-500/30 relative overflow-hidden transition-all duration-300"
                      >
                        <span className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_70%_70%,#fecaca,transparent_70%)] animate-pulse" />
                        <XCircle size={18} /> Reject
                      </motion.button>
                    </>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={handlerevert}
                      className="flex items-center gap-2 px-5 py-2 rounded-lg font-medium text-white
                      bg-gradient-to-r from-purple-500 via-violet-600 to-purple-700
                      hover:from-violet-400 hover:to-purple-600 
                      shadow-md shadow-purple-500/40 transition-all duration-300"
                    >
                      <RotateCcw size={18} /> Revert
                    </motion.button>
                  )}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Requests;

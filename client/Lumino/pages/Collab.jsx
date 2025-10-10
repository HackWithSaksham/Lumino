import React, { useContext, useState, useEffect } from "react";
import { Search, CheckCircle2, Clock, User, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AppContent } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function RequestCard({
  req,
  showRequester = true,
  handleviewrequest,
  handleviewcollaboration,
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      className="lumino-glass lumino-outline p-5 rounded-xl border border-transparent"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-lumino-text">{req.idea}</h3>
          {showRequester ? (
            <div className="text-sm text-lumino-muted mt-1 flex items-center gap-2">
              <User size={14} /> <span>{req.requester || "Anonymous"}</span>
              <span className="mx-2">·</span>
              <Clock size={12} /> <span className="ml-1">{req.date}</span>
            </div>
          ) : (
            <div className="text-sm text-lumino-muted mt-1 flex items-center gap-2">
              <Clock size={12} /> <span className="ml-1">{req.date}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {req.status === "Accepted" ? (
            <div className="flex items-center gap-2 text-green-300 text-sm">
              <CheckCircle2 size={18} /> Accepted
            </div>
          ) : req.status === "Rejected" ? (
            <div className="flex items-center gap-2 text-red-300 text-sm">
              <XCircle size={18} /> Rejected
            </div>
          ) : (
            <div className="flex items-center gap-2 text-yellow-200 text-sm">
              <Clock size={18} /> Pending
            </div>
          )}
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-200/85">{req.message}</p>

      <div className="mt-5 flex justify-end">
        <button
          onClick={() =>
            showRequester
              ? handleviewrequest(req)
              : handleviewcollaboration(req)
          }
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#8b5cf6] to-[#c084fc] text-white font-medium text-sm hover:scale-[1.02] transition"
        >
          View Section
        </button>
      </div>
    </motion.div>
  );
}

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex justify-center mt-6 gap-2 flex-wrap">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md bg-[#1b1536] text-sm text-lumino-muted hover:text-white hover:bg-[#2a2157] disabled:opacity-40 transition"
      >
        &lt;
      </button>
      <AnimatePresence mode="popLayout" initial={false}>
        {pages.map((page, index) =>
          page === "..." ? (
            <motion.span
              key={`ellipsis-${index}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="px-3 py-1 text-sm text-lumino-muted select-none"
            >
              ...
            </motion.span>
          ) : (
            <motion.button
              key={page}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 rounded-md text-sm transition ${
                currentPage === page
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-[#1b1536] text-lumino-muted hover:bg-[#2a2157] hover:text-white"
              }`}
            >
              {page}
            </motion.button>
          )
        )}
      </AnimatePresence>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md bg-[#1b1536] text-sm text-lumino-muted hover:text-white hover:bg-[#2a2157] disabled:opacity-40 transition"
      >
        &gt;
      </button>
    </div>
  );
};

export default function Collab() {
  const { userData, sethistoryid, setrequestid } = useContext(AppContent);
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [collabs, setCollabs] = useState([]);
  const [q, setQ] = useState("");
  const [reqPage, setReqPage] = useState(1);
  const [collabPage, setCollabPage] = useState(1);
  const perPage = 3;
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) setLoading(false);

    const contributionrequest = userData?.requests || [];
    const contribs = contributionrequest.flatMap((contrib) =>
      contrib.history.map((history) => ({
        id: history._id,
        idea: contrib.ideaid.title,
        requester: history.requester,
        message: history.changeSummary,
        date: history.createdAt,
        status: history.requeststatus,
      }))
    );

    const contribution = userData?.contribution || [];
    const usercontribs = contribution.flatMap((contrib) =>
      contrib.history.map((history) => ({
        id: history._id,
        idea: contrib.ideaid.title,
        message: history.changeSummary,
        date: history.createdAt,
        status: history.requeststatus,
      }))
    );

    setRequests(contribs);
    setCollabs(usercontribs);
  }, [userData]);

  const handleviewcollaboration = (req) => {
    sethistoryid(req.id);
    navigate("/contribution");
  };

  const handleviewrequest = (req) => {
    setrequestid(req.id);
    navigate("/request");
  };

  const filteredRequests = requests.filter((r) =>
    `${r.idea} ${r.requester} ${r.message}`.toLowerCase().includes(q.toLowerCase())
  );
  const filteredCollabs = collabs.filter((r) =>
    `${r.idea} ${r.message}`.toLowerCase().includes(q.toLowerCase())
  );

  const paginatedRequests = filteredRequests.slice((reqPage - 1) * perPage, reqPage * perPage);
  const paginatedCollabs = filteredCollabs.slice((collabPage - 1) * perPage, collabPage * perPage);
  const totalReqPages = Math.ceil(filteredRequests.length / perPage);
  const totalCollabPages = Math.ceil(filteredCollabs.length / perPage);

  return (
    <>
      <Navbar className="bg-lumino-page"/>
      <div className="min-h-screen p-8 bg-lumino-page text-lumino-text">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-semibold">Collaboration Requests</h1>
              <p className="text-sm text-lumino-muted mt-1">
                Manage incoming requests and your accepted collaborations
              </p>
            </div>
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-lumino-muted"
              />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search idea..."
                className="pl-10 pr-4 py-2 rounded-lg bg-[#13102a]/70 border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 placeholder:text-lumino-muted text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lumino-glass lumino-outline p-6 rounded-2xl"
            >
              <h2 className="text-xl font-semibold mb-4">Incoming Requests</h2>
              <div className="flex flex-col gap-4">
                <AnimatePresence>
                  {loading ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-gray-400 py-8 text-center"
                    >
                      Data loading...
                    </motion.div>
                  ) : paginatedRequests.length > 0 ? (
                    paginatedRequests.map((r) => (
                      <RequestCard
                        key={r.id}
                        req={r}
                        handleviewrequest={() => handleviewrequest(r)}
                      />
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-gray-300 py-8 text-center"
                    >
                      No requests found.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {totalReqPages > 1 && (
                <Pagination
                  currentPage={reqPage}
                  totalPages={totalReqPages}
                  onPageChange={setReqPage}
                />
              )}
            </motion.div>

            <motion.div
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lumino-glass lumino-outline p-6 rounded-2xl"
            >
              <h2 className="text-xl font-semibold mb-4">Your Collaborations</h2>
              <div className="flex flex-col gap-4">
                <AnimatePresence>
                  {loading ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-gray-400 py-8 text-center"
                    >
                      Data loading...
                    </motion.div>
                  ) : paginatedCollabs.length > 0 ? (
                    paginatedCollabs.map((r) => (
                      <RequestCard
                        key={r.id}
                        req={r}
                        showRequester={false}
                        handleviewcollaboration={() => handleviewcollaboration(r)}
                      />
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-gray-300 py-8 text-center"
                    >
                      No collaborations yet.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {totalCollabPages > 1 && (
                <Pagination
                  currentPage={collabPage}
                  totalPages={totalCollabPages}
                  onPageChange={setCollabPage}
                />
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

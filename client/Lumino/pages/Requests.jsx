import React, { useContext, useEffect, useState } from "react";
import { diffLines } from "diff";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";


const Requests = () => {
  const { userData, backendUrl } = useContext(AppContent);

  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [previouscontent, setpreviouscontent] = useState("");
  const [newcontent, setnewcontent] = useState("");
  const [text, setText] = useState([]);
  const [status, setStatus] = useState("");
  const [historyid, sethistoryid] = useState("");
  const [contributionid, setcontributionid] = useState("");

  const {
    profileimage = "",
    name = "Unknown User",
    passion = "No passion set",
    country = "Earth",
    rank = 0,
    badges = [],
    streak = 0,
    ideas = [],
    contribution = [],
    requests = [],
  } = userData || {};


  const contributionrequest = userData?.requests || [];

  useEffect(() => {
    if (!contributionrequest.length) return;

    setCategory(contributionrequest[0].ideaid?.category || "");
    setTitle(contributionrequest[0].ideaid?.title || "");

    if (contributionrequest[0].history?.length > 0) {
      const firstChange = contributionrequest[0].history[0];
      const prev = firstChange.previousContent || "";
      const next = firstChange.newContent || "";
      setpreviouscontent(prev);
      setnewcontent(next);
      sethistoryid(firstChange._id);
      setcontributionid(contributionrequest[0]._id);
      setStatus(firstChange.requeststatus || "");

      const diff = diffLines(prev, next);
      setText(diff);
    }
  }, [contributionrequest]);

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <p className="text-lg">Loading profile...</p>
      </div>
    );
  }

  const handleapprove = async () => {

  try {
    const { data } = await axios.post(
      `${backendUrl}/api/user/acceptrequest`,
      { contributionid, historyid },
      { withCredentials: true }
    );

    if (data.success) {
      toast.success("Request Accepted successfully");
      setStatus("Accepted");
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error.message);
    toast.error("Something went wrong");
  }
};

const handlereject = async () => {
  try {
    const { data } = await axios.post(
      `${backendUrl}/api/user/rejectrequest`,
      { contributionid, historyid },
      { withCredentials: true }
    );

    if (data.success) {
      toast.success("Request Rejected");
      setStatus("Rejected");
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error.message);
    toast.error("Something went wrong");
  }
};

const handlerevert = async () => {
  try {
    const { data } = await axios.post(
      `${backendUrl}/api/user/revertrequest`,
      { contributionid, historyid },
      { withCredentials: true }
    );

    if (data.success) {
      toast.success("Request Reverted");
      setStatus("Pending");
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error.message);
    toast.error("Something went wrong");
  }
};


  const handlechangedata = (contribution,contri) => {
    setcontributionid(contribution._id);
    sethistoryid(contri._id);
    setTitle(contribution.ideaid.title);
    setCategory(contribution.ideaid.category);
    setpreviouscontent(contri.previousContent);
    setnewcontent(contri.newContent);
    const diff = diffLines(previouscontent, newcontent);
      setText(diff);
  };

  if (!contributionrequest) {
    return (
      <div className="text-gray-300 p-8 text-center">
        No contributionrequest selected.
      </div>
    );
  }

  return (
    <div className="flex flex-row min-h-screen bg-[#0D0F2D] text-gray-100">
      <aside className="w-1/4 bg-[#151136] p-6 border-r border-gray-800">
        <h2 className="text-lg font-semibold mb-6 text-gray-200">
          Your Requests
        </h2>
        <div className="flex flex-col gap-4 text-gray-300">
          {contributionrequest.length > 0 ? (
            contributionrequest.map((contribution, idx) => (
              contribution.history.map((contri,idx2)=>(
                <div
                key={idx2}
                onClick={() => handlechangedata(contribution,contri)}
                className="p-3 bg-[#1F1B44] hover:bg-[#2B2566] rounded-lg cursor-pointer transition-all"
              >
                <p className="truncate text-sm text-gray-300">
                  {contri.changeSummary || "Change " + (idx + 1)}
                </p>
                <p className="text-xs text-gray-400">
                  {contri.requeststatus || "Pending"}
                </p>
              </div>
              ))
            ))
          ) : (
            <p className="text-gray-500">No changes yet.</p>
          )}
        </div>
      </aside>

      <main className="flex-1 bg-[#1B1537] p-8 flex flex-col gap-6">
        <div className="flex items-center gap-6">
          <div className="bg-[#0D0F2D] text-gray-200 px-4 py-2 rounded-md w-1/3">
            {title}
          </div>
          <span className="text-gray-400">{category}</span>
        </div>

        <div className="flex-1 flex flex-col relative p-4 bg-[#0D0F2D] rounded-lg overflow-auto">
          {text.map((part, i) => (
            <pre
              key={i}
              className={`whitespace-pre-wrap px-2 py-1 rounded-md transition-all ${
                part.added
                  ? "bg-green-800/30"
                  : part.removed
                  ? "bg-red-800/30"
                  : ""
              }`}
            >
              {part.value}
            </pre>
          ))}
          <span className="absolute bottom-2 right-4 text-sm text-gray-400">
  {status === "Pending" ? (
    <>
    <span>Status: {status}</span>
      <button
        onClick={handleapprove}
        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded mr-2"
      >
        Approve
      </button>
      <button
        onClick={handlereject}
        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
      >
        Reject
      </button>
    </>
  ) : (
    <>
    <span>Status: {status}</span>
    <button
        onClick={handlerevert}
        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
      >
        Revert Changes
      </button>
      </>
  )}
</span>

        </div>
      </main>
    </div>
  );
};

export default Requests;

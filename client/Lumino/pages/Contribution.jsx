import React, { useContext, useEffect, useState } from "react";
import { diffLines } from "diff";
import { AppContent } from "../context/AppContext";

const Contribution = () => {
  const { contribution } = useContext(AppContent);

  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [previouscontent, setpreviouscontent] = useState("");
  const [newcontent, setnewcontent] = useState("");
  const [text, setText] = useState([]);
  const [status, setStatus] = useState("");
  console.log(contribution);
  useEffect(() => {
    if (!contribution) return;

    setCategory(contribution.ideaid?.category || "");
    setTitle(contribution.ideaid?.title || "");

    if (contribution.history?.length > 0) {
      console.log("Has history");
      const firstChange = contribution.history[0];
      const prev = firstChange.previousContent || "";
      const next = firstChange.newContent || "";
      if(prev != "")console.log("had previous")
      setpreviouscontent(prev);
      setnewcontent(next);
      setStatus(firstChange.requeststatus || "");

      const diff = diffLines(prev, next);
      setText(diff);
    }
  }, [contribution]);

  const handlechangedata = (contri) => {
    const prev = contri.previousContent || "";
    const next = contri.newContent || "";
    const diff = diffLines(prev, next);

    setpreviouscontent(prev);
    setnewcontent(next);
    setStatus(contri.requeststatus || "");
    setText(diff);
  };

  if (!contribution) {
    return (
      <div className="text-gray-300 p-8 text-center">
        No contribution selected.
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
          {contribution.history?.length > 0 ? (
            contribution.history.map((contri, idx) => (
              <div
                key={idx}
                onClick={() => handlechangedata(contri)}
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
            Status: {status}
          </span>
        </div>
      </main>
    </div>
  );
};

export default Contribution;

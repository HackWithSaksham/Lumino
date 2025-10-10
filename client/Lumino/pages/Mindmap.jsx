import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import Navbar from "../components/Navbar";
import { ArrowLeft } from "lucide-react";

export default function MindMaps() {
  const { userData, backendUrl, ideaid, setideaid, sectionid, setsectionid } = useContext(AppContent);
  const [currsectionid, setcurrsectionid] = useState("");
  const [currideaid, setcurrideaid] = useState("");
  const [title, settitle] = useState("All Ideas");
  const [time, settime] = useState("");
  const [acts, setActs] = useState([]);
  const [index, setIndex] = useState(0);
  const [navStack, setNavStack] = useState([]);

  useEffect(() => {
    const fetchSections = async () => {
      if (!userData) return;

      try {
        if (!currideaid) {
          setActs(userData?.ideas || []);
          settime(userData?.time || "");
        } else {
          const { data } = await axios.post(
            `${backendUrl}/api/user/getsection`,
            { parentid: currsectionid, ideaid: currideaid },
            { withCredentials: true }
          );
          setActs(data.results || []);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchSections();
  }, [currideaid, currsectionid, backendUrl, userData]);

  const handlechangeid = (act) => {
    setNavStack((prev) => [...prev, { currideaid, currsectionid, title, time }]);
    settitle(act.title || "Untitled");
    settime(act.time || "Unknown");

    if (!currideaid) setcurrideaid(act._id || "");
    else setcurrsectionid(act._id || "");
  };

  const prev = () => {
    if (!acts.length) return;
    setIndex((index - 1 + acts.length) % acts.length);
  };
  const next = () => {
    if (!acts.length) return;
    setIndex((index + 1) % acts.length);
  };
  const goBack = () => {
    if (!navStack.length) {
      setcurrideaid("");
      setcurrsectionid("");
      settitle("All Ideas");
      return;
    }

    const last = navStack.pop();
    setNavStack([...navStack]);
    setcurrideaid(last.currideaid);
    setcurrsectionid(last.currsectionid);
    settitle(last.title);
    settime(last.time);
  };

  if (!userData?.ideas) return <div className="text-white text-center mt-20">No Ideas Found</div>;

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <div className="relative flex flex-col items-center justify-start min-h-screen bg-gradient-to-b from-[#080A1C] to-[#1B1537] overflow-hidden pt-30">
        <div className="w-full flex items-center justify-between px-10 mb-6">
          {currideaid && (
            <motion.button
              onClick={goBack}
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-gradient-to-r from-[#3C2A6E] to-[#241F3F] px-5 py-2 rounded-xl shadow-lg text-white hover:shadow-2xl border border-purple-700"
            >
              <ArrowLeft size={18} />
              Back
            </motion.button>
          )}
          <h1 className="text-white text-3xl font-bold">{title}</h1>
          <span className="text-gray-400">{time}</span>
        </div>

        <div className="relative w-full max-w-4xl h-[400px] flex items-center justify-center">
          <AnimatePresence>
            {acts.map((act, i) => {
              const offset = (i - index + acts.length) % acts.length;
              const distance = offset === 0 ? 0 : offset === 1 ? 200 : offset === acts.length - 1 ? -200 : 0;
              const scale = offset === 0 ? 1 : 0.85;
              const opacity = offset === 0 ? 1 : 0.4;
              const zIndex = offset === 0 ? 2 : 1;

              return (
                <motion.div
                  key={act._id || i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ x: distance, scale, opacity, zIndex }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute w-80 h-96 rounded-2xl shadow-2xl p-6 cursor-pointer bg-gradient-to-br from-[#2E1E4C] to-[#1B1537] text-white hover:scale-105 hover:shadow-3xl transition-all duration-300"
                  onClick={() => handlechangeid(act)}
                >
                  <h2 className="text-xl font-bold mb-2">{act.title}</h2>
                  <p className="text-sm font-light mb-4 line-clamp-6">{act.content}</p>
                  <div className="absolute bottom-4 right-4 text-gray-300 text-xs">{act.time}</div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="flex gap-6 mt-10">
          <button className="px-5 py-2 bg-[#3C2A6E] hover:bg-[#4D3780] text-white rounded-lg shadow-lg" onClick={prev}>
            ← Prev
          </button>
          <button className="px-5 py-2 bg-[#3C2A6E] hover:bg-[#4D3780] text-white rounded-lg shadow-lg" onClick={next}>
            Next →
          </button>
        </div>

        <div className="flex gap-2 mt-6">
          {acts.map((_, idx) => (
            <div key={idx} className={`w-3 h-3 rounded-full ${idx === index ? "bg-purple-400" : "bg-gray-600"}`}></div>
          ))}
        </div>
      </div>
    </>
  );
}

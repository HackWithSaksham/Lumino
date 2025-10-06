import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect } from "react";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";
import homebg from "../public/Homebg2.png";
import * as Icons from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  const navigate = useNavigate();
  const { backendUrl, isLoggedin, setIsLoggedin, ideaid, setideaid ,userData,getUserData,handlelogout} =
    useContext(AppContent);
  
  const features = [
    {
      icon: "NotebookPen",
      title: "Magical Notebook",
      description:
        "A notebook enchanted with wonder, where every spark is preserved like a spell",
      color: "bg-[#B75F69]",
    },
    {
      icon: "Handshake",
      title: "Interactive Collaboration",
      description:
        "Not just working together, but conjuring together, turning scattered sparks into shining constellations.",
      color: "bg-[#54A243]",
    },
    {
      icon: "Save",
      title: "Autosave Idea",
      description:
        "No spark ever fades, every thought is captured the moment it’s born.",
      color: "bg-[#9A358B]",
    },
    {
      icon: "BrainCircuit",
      title: "Mind-Maps",
      description:
        "Trace the threads of inspiration, and uncover the hidden design of your ideas.",
      color: "bg-[#462AA0]",
    },
    {
      icon: "Mic",
      title: "Voice to Text Input",
      description: "Whisper an idea, and watch it etch itself in glowing ink.",
      color: "bg-[#1C7886]",
    },
    {
      icon: "Bot",
      title: "AI Assistance",
      description:
        "A hidden guide at every step, illuminating paths you never saw.",
      color: "bg-[#6757AA]",
    },
  ];

  const whatotherssay = [
    {
      quote: "Collaboration feels natural, almost like we're in the same room.",
      name: "Sara Johnson",
      profile: "images/woman.png",
    },
    {
      quote: "Autosave is a lifesaver — no more lost ideas.",
      name: "Mark Davis",
      profile: "images/man.jpg",
    },
    {
      quote: "AI assistance gives my thoughts direction when I'm stuck.",
      name: "James Carter",
      profile: "images/user.png",
    },
  ];

  useEffect(()=>{},[userData])

  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${homebg})` }}
    >
      <Navbar />
      <div className="flex flex-col pt-20 pb-25 px-30 w-[55%] gap-20 items-center">
        <div className="flex flex-col gap-10">
          <p className="text-[40px] font-bold leading-tight text-white/90">
            Preserving and showcasing creative works & performance
          </p>
          <p className="text-md text-white/50">
            Mystical is your creative space where ideas come alive. With magical
            notebooks, interactive mind maps, AI assistance, and seamless
            collaboration, it captures every spark and turns it into something
            extraordinary. Step in, create, and let your imagination flow.
          </p>
        </div>
        <div className="flex w-[80%]">
          {isLoggedin ? (
            <div className="flex gap-5 items-center w-full">
              <button
                className="bg-[#080A31] py-2 rounded-lg text-white/80 text-md shadow-lg w-full text-center"
                onClick={()=>handlelogout()}
              >
                Logout
              </button>
              <NavLink
                to="/idea"
                className="bg-[#080A31] py-2 rounded-lg text-white/80 text-md shadow-lg w-full text-center"
                onClick={() => setideaid("")}
              >
                New idea
              </NavLink>
            </div>
          ) : (
            <div className="flex gap-5 items-center w-full">
              <NavLink
                to="/login"
                className="w-full bg-[#080A31] py-2 rounded-lg text-white/80 text-md shadow-lg text-center"
              >
                Get Started
              </NavLink>
              <NavLink
                to="/login"
                className="w-full bg-[#080A31] py-2 rounded-lg text-white/80 text-md shadow-lg text-center"
              >
                New idea
              </NavLink>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="text-center text-4xl font-bold mb-12">
          Our Competitive Advantage
        </div>
        <div className="grid grid-cols-2 gap-x-18 gap-y-7 w-[60%]">
          {features.map((f, idx) => {
            const IconComponent = Icons[f.icon];
            return (
              <div
                key={idx}
                className={`flex flex-col items-center ${f.color} rounded-2xl px-10 py-8 text-center gap-5`}
              >
                <IconComponent size={35} className="text-white/80" />
                <div className="flex flex-col items-center gap-1">
                  <h3 className="text-xl font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm text-gray-200">{f.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="py-35 px-6">
        <h2 className="text-center text-3xl font-bold mb-8">
          What Others Say About Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-30 mx-auto">
          {whatotherssay.map((t, idx) => (
            <div
              key={idx}
              className=" flex flex-col items-center gap-6 bg-[#242254] text-center rounded-2xl p-6 shadow-lg"
            >
              <p className="italic text-lg text-white/70">"{t.quote}"</p>
              <div className="items-center flex flex-col gap-2 text-white/50">
                <img src={t.profile} className="w-10 h-10 rounded-full" />
                <p className="font-semibold">{t.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;

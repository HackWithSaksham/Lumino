import React, { useState } from "react";
import * as Icons from "lucide-react";
import { useContext } from "react";
import { AppContent } from "../context/AppContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const Profile = () => {
  const [activetab, setactivetab] = useState("ideas");
  const [searchvalue, setsearchvalue] = useState("");
  const [searchcurrent, setsearchcurrent] = useState("all");
  const [filteredIdeas, setFilteredIdeas] = useState([]);
  const navigate = useNavigate();
  const { userData, backendUrl, allbadges, ideaid, setideaid, setUserData ,setcontribution} =
    useContext(AppContent);
  const formatContributors = (num) => {
    if (num < 10) return `${num} Contributors`;
    if (num < 1000) {
      const rounded = Math.floor(num / 100) * 100;
      return `${rounded}+ Contributors`;
    }
    if (num < 1000000) {
      const thousands = (num / 1000).toFixed(1);
      return `${
        thousands.endsWith(".0") ? thousands.slice(0, -2) : thousands
      }K+ Contributors`;
    }
    const millions = (num / 1000000).toFixed(1);
    return `${
      millions.endsWith(".0") ? millions.slice(0, -2) : millions
    }M+ Contributors`;
  };
  const handlecontribution = async(contribe)=>{
    setcontribution(contribe);
    navigate("/contribution");
  }
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
    requests=[]
  } = userData || {};
  useEffect(() => {
    if (ideas?.length > 0) {
      setFilteredIdeas(ideas);
    }
  }, [ideas]);
  useEffect(()=>{},[userData])
  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <p className="text-lg">Loading profile...</p>
      </div>
    );
  }
  const searchbar = (categoryvalue, currentvalue) => {
    setsearchvalue(categoryvalue);
    setsearchcurrent(currentvalue);
    const results = ideas.filter((idea) => {
      const matchCategory =
        categoryvalue === "" ||
        idea.category.toLowerCase().includes(categoryvalue.toLowerCase());

      const matchCurrent =
        currentvalue === "all" ||
        idea.current.toLowerCase() === currentvalue.toLowerCase();

      return matchCategory && matchCurrent;
    });
    setFilteredIdeas(results);
  };

  const handleideadelete = async (idea) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/removeidea`, {
        ideaid: idea._id,userId:userData._id
      });
      if (data.success) {
        toast.success(data.message);
        const result = userData.ideas.filter((i) => i._id != idea._id);
        setUserData({ ...userData, ideas: result });
      } else {
        toast.error(data.error);
        return;
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleideamodify = async (idea) => {
    setideaid(idea._id);
    navigate("/idea");
  };

  return (
    <div className="flex flex-col px-50 pt-20 gap-22 bg-[#0D0B1A] min-h-screen text-white">
      <div className="flex justify-between">
        <div className="flex gap-7 items-center ">
          <img
            src={`${backendUrl}${profileimage}`}
            className="w-30 h-30 rounded-full border-3 border-[#261f44]"
          />
          <div className="flex flex-col gap-3.5">
            <div className="flex gap-7 items-center justify-center">
              <p className="flex text-4xl font-bold">{name}</p>
              <img
                src={`https://flagcdn.com/h40/${country}.png`}
                className="rounded-full h-[28px] w-[28px] border-2 border-[#261f44]"
              />
            </div>
            <p className="text-sm">{passion}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className=" bg-[#1A132B] flex flex-col gap-1 py-2 pl-6 pr-15">
            <p className="text-md font-extralight">Rank</p>
            <div className="flex gap-2 items-center">
              <Icons.Trophy size={25} className="text-[#0B4907]" />
              <p className="text-2xl font-bold">{rank}</p>
            </div>
          </div>
          <div className=" bg-[#1A132B] flex flex-col gap-1 py-2 pl-6 pr-15">
            <p className="text-md font-extralight">Badges</p>
            <div className="flex gap-2 items-center">
              <Icons.Award size={25} className="text-[#0B4907]" />
              <p className="text-2xl font-bold">{badges.length}</p>
            </div>
          </div>
          <div className=" bg-[#1A132B] flex flex-col gap-1 py-2 pl-6 pr-15">
            <p className="text-md font-extralight">Streak</p>
            <div className="flex gap-2 items-center">
              <Icons.Flame size={25} className="text-[#0B4907]" />
              <p className="text-2xl font-bold">{streak}</p>
            </div>
          </div>
          <div className=" bg-[#1A132B] flex flex-col gap-1 py-2 pl-6 pr-15">
            <p className="text-md font-extralight">Completed Ideas</p>
            <div className="flex gap-2 items-center">
              <Icons.Lightbulb size={25} className="text-[#0B4907]" />
              <p className="text-2xl font-bold">{ideas.length}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <div className="flex text-lg gap-0">
          <div className="hover:cursor-pointer flex flex-col items-start text-[17px]">
            <span
              onClick={() => setactivetab("ideas")}
              className="hover:bg-[#52427E]/50 py-2 px-6"
            >
              Completed Ideas
            </span>
            <hr
              className={`${
                activetab === "ideas" ? "block" : "hidden"
              } w-full border-t-2 border-[#7375D9]`}
            />
          </div>

          <div className="hover:cursor-pointer flex flex-col items-start text-[17px]">
            <span
              onClick={() => setactivetab("contribution")}
              className="hover:bg-[#52427E]/50 py-2 px-6"
            >
              Your Contribution
            </span>
            <hr
              className={`${
                activetab === "contribution" ? "block" : "hidden"
              } w-full border-t-2 border-[#7375D9]`}
            />
          </div>

          <div className="hover:cursor-pointer flex flex-col items-start text-[17px]">
            <span
              onClick={() => setactivetab("achievements")}
              className="hover:bg-[#52427E]/50 py-2 px-6"
            >
              Achievements
            </span>
            <hr
              className={`${
                activetab === "achievements" ? "block" : "hidden"
              } w-full border-t-2 border-[#7375D9]`}
            />
          </div>
        </div>
        <div>
          {activetab == "ideas" && (
            <div className="flex flex-col gap-7">
              <div className="relative w-full flex justify-between">
                <Icons.Search className="absolute w-4.5 h-4.5 left-8 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by category..."
                  className="w-[67%] bg-[#1A132B] px-18 py-2 rounded-xl outline-none"
                  value={searchvalue}
                  onChange={(e) => searchbar(e.target.value, searchcurrent)}
                />
                <select
                  className="pr-40 pl-8 bg-[#1A132B] rounded-xl outline-none text-white/60 h-[40px] flex items-center appearance-none"
                  value={searchcurrent}
                  onChange={(e) => searchbar(searchvalue, e.target.value)}
                >
                  <option value="all">Select Current Status</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Collaboration">Collaboration</option>
                </select>
                <Icons.ChevronDown className="absolute w-4.5 h-4.5 right-5 top-1/2 -translate-y-1/2" />
              </div>
              <div className="flex flex-col gap-5">
                {filteredIdeas.map((idea, i) => (
                  <div
                    className={`flex pb-0.5 rounded-2xl ${
                      idea.current === "In Progress"
                        ? "bg-gradient-to-br from-[#524607] to-[#9d881c]"
                        : idea.current === "Completed"
                        ? "bg-gradient-to-br from-[#084f08] to-[#00a900]"
                        : "bg-gradient-to-br from-[#450d07] to-[#862318]"
                    }`}
                  >
                    <div className="flex flex-col gap-3 rounded-2xl px-10 py-6 bg-[#1A132B] flex-grow">
                      <div className="flex justify-between">
                        <div className="flex gap-10 items-center">
                          <p className="text-2xl font-bold">{idea.title}</p>
                          <div className="px-10 py-1 rounded-lg bg-gradient-to-r from-[#430669] via-[#7713b6] to-[#9318e0]">
                            <p className=" text-[16px]">{idea.category}</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Icons.Trash2
                            className="w-5 h-5 hover:cursor-pointer"
                            onClick={() => handleideadelete(idea)}
                          />
                          <Icons.Pencil
                            className="w-5 h-5 hover:cursor-pointer"
                            onClick={() => handleideamodify(idea)}
                          />
                          <Icons.Star className="w-5 h-5 hover:cursor-pointer" />
                        </div>
                      </div>
                      <div>{idea.description}</div>
                    </div>
                    <div className="flex items-center justify-center px-1 rounded-r-2xl">
                      <span
                        className="text-white font-semibold"
                        style={{
                          writingMode: "vertical-rl",
                          textOrientation: "mixed",
                        }}
                      >
                        {idea.current}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activetab == "contribution" && (
            <div className="flex flex-col">
              <div className="grid grid-cols-3 gap-x-15 gap-y-15 items-center justify-center">
                {contribution.map((contribe, i) => {
                  const idea = contribe.ideaid;
                  const createdDate = new Date(
                    idea.createdAt
                  ).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  });
                  return (
                    <div className="flex flex-col">
                      <div
                        className={`text-sm px-15 py-1.5 rounded-t-lg w-fit ${
                          idea.category === "Fantasy"
                            ? "bg-gradient-to-r from-[#771489] to-[#64B5F6]"
                            : idea.category === "Science Fiction"
                            ? "bg-gradient-to-r from-[#64B5F6] to-[#9575CD]"
                            : idea.category === "Mystery"
                            ? "bg-gradient-to-r from-[#4DB6AC] to-[#F06292]"
                            : idea.category === "Romance"
                            ? "bg-gradient-to-r from-[#F06292] to-[#4DB6AC]"
                            : idea.category === "Thriller"
                            ? "bg-gradient-to-r from-[#E57373] to-[#FFD54F]"
                            : idea.category === "Biography"
                            ? "bg-gradient-to-r from-[#FFD54F] to-[#90A4AE]"
                            : idea.category === "Essay"
                            ? "bg-gradient-to-r from-[#90A4AE] to-[#FFB74D]"
                            : idea.category === "Travel"
                            ? "bg-gradient-to-r from-[#FFB74D] to-[#9575CD]"
                            : "bg-gradient-to-r from-[#9575CD] to-[#F06292]"
                        }`}
                      >
                        {idea.category}
                      </div>
                      <div className="flex flex-col gap-10 bg-[#1A132B] px-10 py-8 rounded-b-xl rounded-tr-xl">
                        <p className="text-2xl text-[#EDE9FE] font-bold">
                          {idea.title}
                        </p>
                        <div className="flex flex-col gap-2.5 text-white/70">
                          <div className="flex gap-2 items-center">
                            <img
                              src={`${backendUrl}${idea.authorimage}`}
                              className="w-5 h-5 rounded-full"
                            />
                            <p className="text-[14px]">{idea.author}</p>
                          </div>
                          <p className="text-[14px]">Created : {createdDate}</p>
                          <div className="text-[16px] flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              {idea.contributors.slice(0, 3).map((user, i) => {
                                return (
                                  <img
                                    key={i}
                                    src={`${backendUrl}${user.profileimage}`}
                                    alt={user.name}
                                    className="w-6 h-6 rounded-full border border-[#261f44]"
                                  />
                                );
                              })}
                            </div>
                            <p className="text-[14px] text-white/70">
                              {formatContributors(idea.contributors.length)}
                            </p>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-[#430669] via-[#6b12a2] to-[#690da2] py-2 text-[16px] text-white/70 rounded-md text-center hover:cursor-pointer" onClick={()=>handlecontribution(contribe)}>
                          View Contribution
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {activetab == "achievements" && (
            <div className="flex flex-col gap-10">
              <div>
                <p className="text-2xl font-bold text-white/70">Your Badges</p>
                {badges.length > 0 ? (
                  <div className="grid grid-cols-3 gap-x-3 gap-y-10">
                    {badges.map((badge, i) => {
                      const Icon = Icons[badge.icon];
                      return (
                        <div className="flex gap-5 items-center hover:bg-[#1A132B] px-10 py-5">
                          <div
                            className={`w-24 h-24 ${
                              badge.popularity === "Common"
                                ? "bg-[#3642B0]"
                                : badge.popularity === "Rare"
                                ? "bg-[#367E49]"
                                : "bg-[#52427E]"
                            }  flex items-center justify-center`}
                            style={{
                              clipPath:
                                "polygon(50% 0% , 0% 25% , 0% 75% , 50% 100% , 100% 75% , 100% 25%)",
                            }}
                          >
                            <div
                              className={`w-20 h-20 ${
                                badge.popularity === "Common"
                                  ? "bg-[#4252E7]"
                                  : badge.popularity === "Rare"
                                  ? "bg-[#4FA645]"
                                  : "bg-[#7945A6]"
                              } flex items-center justify-center`}
                              style={{
                                clipPath:
                                  "polygon(50% 0% , 0% 25% , 0% 75% , 50% 100% , 100% 75% , 100% 25%)",
                              }}
                            >
                              <Icon size={37} className="text-white/80" />
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <p className="text-[18px] font-bold text-white/80">
                              {badge.title}
                            </p>
                            <div className="flex flex-col gap-1">
                              <p className="text-[14px] text-white/80">
                                {badge.description}
                              </p>
                              <p
                                className={`text-[10px] px-5 py-0.5 rounded-2xl w-fit text-white/80 ${
                                  badge.popularity === "Common"
                                    ? "bg-[#3642B0]/20 text-[#3642B0]"
                                    : badge.popularity === "Rare"
                                    ? "bg-[#367E49]/20 text-[#367E49]"
                                    : "bg-[#52427E]/20 text-[#52427E]"
                                }`}
                              >
                                {badge.popularity} : {badge.percentage} %
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="flex w-full h-30 justify-center items-center text-lg text-white/50">
                    No badges earned...
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <p className="text-2xl font-bold text-white/70">
                  All Achievements
                </p>
                <div className="grid grid-cols-3 gap-x-3 gap-y-10">
                  {allbadges.data.map((badge, i) => {
                    const Icon = Icons[badge.icon];
                    return (
                      <div className="flex gap-5 items-center hover:bg-[#1A132B] px-10 py-5">
                        <div
                          className={`w-24 h-24 ${
                            badge.popularity === "Common"
                              ? "bg-[#3642B0]"
                              : badge.popularity === "Rare"
                              ? "bg-[#367E49]"
                              : "bg-[#52427E]"
                          }  flex items-center justify-center`}
                          style={{
                            clipPath:
                              "polygon(50% 0% , 0% 25% , 0% 75% , 50% 100% , 100% 75% , 100% 25%)",
                          }}
                        >
                          <div
                            className={`w-20 h-20 ${
                              badge.popularity === "Common"
                                ? "bg-[#4252E7]"
                                : badge.popularity === "Rare"
                                ? "bg-[#4FA645]"
                                : "bg-[#7945A6]"
                            } flex items-center justify-center`}
                            style={{
                              clipPath:
                                "polygon(50% 0% , 0% 25% , 0% 75% , 50% 100% , 100% 75% , 100% 25%)",
                            }}
                          >
                            <Icon size={37} className="text-white/80" />
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <p className="text-[18px] font-bold text-white/80">
                            {badge.title}
                          </p>
                          <div className="flex flex-col gap-1">
                            <p className="text-[14px] text-white/80">
                              {badge.description}
                            </p>
                            <p
                              className={`text-[10px] px-5 py-0.5 rounded-2xl w-fit text-white/80 ${
                                badge.popularity === "Common"
                                  ? "bg-[#3642B0]/20 text-[#3642B0]"
                                  : badge.popularity === "Rare"
                                  ? "bg-[#367E49]/20 text-[#367E49]"
                                  : "bg-[#52427E]/20 text-[#52427E]"
                              }`}
                            >
                              {badge.popularity} : {badge.percentage} %
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

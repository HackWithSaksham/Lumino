import React, { useState } from "react";
import { Trash2, Pencil, Star, Search, ChevronDown } from "lucide-react";
const Profile = () => {
  const [activetab, setactivetab] = useState("ideas");
  const [searchvalue, setsearchvalue] = useState("");
  const [searchcurrent, setsearchcurrent] = useState("all");
  const ideas = [
    {
      title: "Comedy Act Arena",
      category: "Creative",
      current: "In progress",
      description:
        "Clown enters carrying a giant balloon, trips, and the balloon pops to reveal confetti inside.Two aerialists swap trapezes mid-air blindfolded.",
    },
    {
      title: "Comedy Act Arena",
      category: "Comedy",
      current: "Completed",
      description:
        "Clown enters carrying a giant balloon, trips, and the balloon pops to reveal confetti inside.Two aerialists swap trapezes mid-air blindfolded.",
    },
    {
      title: "Comedy Act Arena",
      category: "Action",
      current: "Collaboration",
      description:
        "Clown enters carrying a giant balloon, trips, and the balloon pops to reveal confetti inside.Two aerialists swap trapezes mid-air blindfolded.",
    },
  ];
  const [filteredIdeas, setFilteredIdeas] = useState(ideas);
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
  return (
    <div className="flex flex-col px-50 pt-20 gap-22 bg-[#25183C] min-h-screen text-white">
      <div className="flex justify-between">
        <div className="flex gap-10 items-center">
          <img src="" className="w-30 h-30 rounded-full" />
          <div className="flex flex-col gap-1.5">
            <p className="text-4xl font-bold">Saksham Garg</p>
            <p className="text-xs">Comedy Writer,Action Films</p>
          </div>
          <img src="" className="w-5 h-5 rounded-full" />
        </div>
        <div></div>
      </div>
      <div className="flex flex-col gap-10">
        <div className="flex text-lg gap-10">
          <span
            onClick={() => setactivetab("ideas")}
            className="hover:cursor-pointer group hover:bg-[#52427E]/50 pt-2 mb-2"
          >
            Completed Ideas
            <hr className={`${activetab === "ideas" ? "block":"hidden"} text-[#7375D9]`} />
          </span>
          <span
            onClick={() => {
              setactivetab("contribution");
            }}
            className="hover:cursor-pointer group hover:bg-[#52427E]/50 pt-2 mb-2"
          >
            Your Contribution
            <hr className={`${activetab === "contribution" ? "block":"hidden"} text-[#7375D9]`} />
          </span>
          <span
            onClick={() => {
              setactivetab("achievements");
            }}
            className="hover:cursor-pointer group hover:bg-[#52427E]/50 pt-2 mb-2"
          >
            Achievements
            <hr className={`${activetab === "achievements" ? "block":"hidden"} text-[#7375D9]`} />
          </span>
        </div>
        <div>
          {activetab == "ideas" && (
            <div className="flex flex-col gap-10">
              <div className="relative w-full flex justify-between">
                <Search className="absolute w-4.5 h-4.5 left-8 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by category..."
                  className="w-[67%] bg-[#080A31] px-18 py-2 rounded-2xl outline-none"
                  value={searchvalue}
                  onChange={(e) => searchbar(e.target.value, searchcurrent)}
                />
                <select
                  className="pr-40 pl-8 bg-[#080A31] rounded-2xl outline-none text-white/60 h-[40px] flex items-center appearance-none"
                  value={searchcurrent}
                  onChange={(e) => searchbar(searchvalue, e.target.value)}
                >
                  <option value="all">Select Current Status</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Collaboration">Collaboration</option>
                </select>
                <ChevronDown  className="absolute w-4.5 h-4.5 right-5 top-1/2 -translate-y-1/2" />
              </div>
              <div className="flex flex-col gap-5">
                {filteredIdeas.map((idea, i) => (
                  <div
                    className={`flex pb-0.5 rounded-2xl ${
                      idea.current === "In progress"
                        ? "bg-[#93843C]"
                        : idea.current === "Completed"
                        ? "bg-[#3C933C]"
                        : "bg-[#93453C]"
                    }`}
                  >
                    <div className="flex flex-col gap-3 rounded-2xl px-10 py-6 bg-[#080A31] flex-grow">
                      <div className="flex justify-between">
                        <div className="flex gap-10 items-center">
                          <p className="text-2xl font-bold">{idea.title}</p>
                          <div className="px-5 py-1 rounded-lg bg-[#9B75CA]">
                            <p className=" text-[16px]">{idea.category}</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Trash2 className="w-5 h-5" />
                          <Pencil className="w-5 h-5" />
                          <Star className="w-5 h-5" />
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
          {activetab == "contribution" && <div>contribution</div>}
          {activetab == "achievements" && <div>achieve</div>}
        </div>
      </div>
    </div>
  );
};

export default Profile;

import React, { useEffect, useState, useContext } from "react";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { Search } from "lucide-react";

const AddContribution = () => {
  const [newcontent, setnewcontent] = useState("Text Appear Here");
  const [ideaid, setideaid] = useState("");
  const [ownerid, setownerid] = useState("");
  const [title, setTitle] = useState("Title Here");
  const [category, setCategory] = useState("Category Here");
  const [changeSummary, setchangesummary] = useState("");
  const [selectcategory, setselectcategory] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredIdeas, setFilteredIdeas] = useState([]);

  const { ideaslist, backendUrl, userData } = useContext(AppContent);

  const categories = [
    "Fantasy",
    "Comedy",
    "Essay",
    "Science Fiction",
    "Mystery",
    "Romance",
    "Biography",
    "Horror",
    "Thriller",
    "Drama",
    "Adventure",
    "Innovation",
  ];

  useEffect(() => {
    setFilteredIdeas(ideaslist);
  }, [ideaslist]);

  const handleApplyFilter = () => {
    const filtered = ideaslist.filter(
      (idea) =>
        (category === "All" || idea.category === category) &&
        (searchText.trim() === "" ||
          idea.title.toLowerCase().includes(searchText.toLowerCase()))
    );
    setFilteredIdeas(filtered);
  };

  const handleResetFilters = () => {
    setFilteredIdeas(ideaslist);
    setCategory("All");
    setSearchText("");
  };

  const handlechangedata = (idea) => {
    setTitle(idea.title);
    setCategory(idea.category);
    setnewcontent(idea.description);
    setideaid(idea._id);
    setownerid(idea.authorid);
  };

  const handlecontribution = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/addcontribution`,
        { ideaid, newcontent, changeSummary, ownerid },
        { withCredentials: true }
      );
      data.success ? toast.success(data.message) : toast.error(data.message);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0F2D] text-gray-100 flex flex-col">
      <Navbar />

      {selectcategory ? (
        <div className="flex-1 flex flex-col p-10">
          <div className="flex gap-4 items-center mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search for category"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="bg-[#1B1537] pl-10 pr-4 py-2 w-full rounded-lg text-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <button
              onClick={handleApplyFilter}
              className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
            >
              Apply Filter
            </button>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
            >
              Reset
            </button>
          </div>

          <div className="grid grid-cols-4 gap-6 mt-6">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setCategory(cat);
                  handleApplyFilter();
                }}
                className={`relative h-48 w-48 bg-[#1F1B44] flex items-center justify-center text-xl font-semibold text-gray-100 rounded-2xl cursor-pointer transition-all hover:scale-105 ${
                  category === cat
                    ? "shadow-[0_0_25px_5px_rgba(125,110,255,0.8)]"
                    : "hover:shadow-[0_0_25px_5px_rgba(125,110,255,0.5)]"
                }`}
                style={{
                  backgroundImage: `url('/category-images/${cat
                    .toLowerCase()
                    .replace(/ /g, "-")}.jpg')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>
                <span className="z-10">{cat}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-row flex-1">
          <aside className="w-1/4 bg-[#151136] p-6 border-r border-gray-800">
            <h2 className="text-lg font-semibold mb-6 text-gray-200">
              Filtered Ideas
            </h2>
            <div className="flex flex-col gap-4 text-gray-300">
              {filteredIdeas.length > 0 ? (
                filteredIdeas.map((idea, idx) => (
                  <div
                    key={idx}
                    onClick={() => handlechangedata(idea)}
                    className="p-3 bg-[#1F1B44] hover:bg-[#2B2566] rounded-lg cursor-pointer transition-all"
                  >
                    {idea.title}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No ideas found</p>
              )}
            </div>
          </aside>
          <main className="flex-1 bg-[#1B1537] p-8 flex flex-col gap-6">
            <div className="flex items-center gap-6">
              <div className="bg-[#0D0F2D] text-gray-200 px-4 py-2 rounded-md w-1/3 text-lg font-semibold">
                {title}
              </div>
              <span
                onClick={() => setselectcategory(true)}
                className="text-gray-400 cursor-pointer hover:text-indigo-400"
              >
                {category}
              </span>
            </div>

            <div className="flex-1 flex flex-col relative p-4 bg-[#0D0F2D] rounded-lg overflow-auto">
              <textarea
                rows={8}
                className="bg-[#0D0F2D] text-gray-200 px-4 py-2 rounded-md w-full resize-none border border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none"
                value={newcontent}
                onChange={(e) => setnewcontent(e.target.value)}
              />
              <input
                type="text"
                className="bg-[#0D0F2D] text-gray-200 px-4 py-2 rounded-md border border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none mt-3"
                placeholder="Enter Change Summary"
                value={changeSummary}
                onChange={(e) => setchangesummary(e.target.value)}
              />

              <button
                onClick={() => handlecontribution()}
                className="mt-5 self-start bg-indigo-600 hover:bg-indigo-700 transition text-white px-5 py-2 rounded-lg font-semibold"
              >
                Request Contribution
              </button>
            </div>
          </main>
        </div>
      )}
    </div>
  );
};

export default AddContribution;

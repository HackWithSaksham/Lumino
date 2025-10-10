import React, { useContext, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { AppContent } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { Users, Calendar, Search } from "lucide-react";

const FilterAndContribution = () => {
  const { ideaslist, userData ,sethistoryid} = useContext(AppContent);
  const contributionin = userData?.contribution || [];
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("filters");
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredIdeas, setFilteredIdeas] = useState([]);

  useEffect(() => {
    setFilteredIdeas(ideaslist || []);
  }, [ideaslist]);

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

  const handleViewContributionSection = () => {
    navigate("/contribution");
  };

  const handleViewNewContributionSection = () => {
    navigate("/addcontribution");
  };

  const handleViewContribution = (ideaId) => {
    sethistoryid(ideaId)
    console.log(ideaId)
    navigate("/contribution"); 
  };

  const handleAddContribution = (ideaId) => {
    navigate("/addcontribution");
  };

  const handleApplyFilter = () => {
    const filtered = ideaslist.filter(
      (idea) =>
        (selectedCategory === "All" || idea.category === selectedCategory) &&
        (searchText.trim() === "" ||
          idea.title.toLowerCase().includes(searchText.toLowerCase()))
    );
    setFilteredIdeas(filtered);
    setActiveTab("new");
  };

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSearchText("");
    setFilteredIdeas(ideaslist);
  };

  const renderCard = (idea, idx, isContributionIn = false) => (
    <div
      key={idx}
      className="bg-gradient-to-r from-[#261B5B] to-[#3B2E8D] rounded-2xl p-5 shadow-lg hover:shadow-indigo-700/40 transition-all"
    >
      <h3 className="text-lg font-semibold mb-2 text-white">{idea.title}</h3>
      <p className="text-gray-300 text-sm mb-3 line-clamp-3">{idea.description}</p>
      <div className="flex justify-between items-center text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span>{idea.contributors?.length || "100+"} contributors</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>
            {idea.createdAt
              ? new Date(idea.createdAt).toLocaleDateString()
              : "1 Oct 2025"}
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={() =>
          isContributionIn
            ? handleViewContribution(idea._id)
            : handleAddContribution(idea._id)
        }
        className={`mt-4 ${
          isContributionIn
            ? "bg-purple-600 hover:bg-purple-700"
            : "bg-indigo-600 hover:bg-indigo-700"
        } text-white px-4 py-2 rounded-lg transition`}
      >
        {isContributionIn ? "View Contribution" : "Add Contribution"}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0D0F2D] text-gray-100 flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <aside
          className="w-[20%] bg-[#151136] p-6 border-r border-gray-800 
                     flex flex-col justify-between fixed top-22.5 bottom-0 left-0 z-20"
        >
          <div className="overflow-y-auto">
            <h2 className="text-md font-semibold mb-4 text-gray-300">Filters</h2>
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={handleResetFilters}
                className="bg-[#292260] hover:bg-[#3a2e7b] transition p-2 rounded-lg text-left text-sm"
              >
                Reset Filters
              </button>
              <button
                type="button"
                onClick={handleApplyFilter}
                className="bg-[#292260] hover:bg-[#3a2e7b] transition p-2 rounded-lg text-left text-sm"
              >
                Apply Filter
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("filters")}
                className={`p-2 rounded-lg text-left text-sm ${
                  activeTab === "filters"
                    ? "bg-gradient-to-r from-[#7B5CFF] to-[#A07FFF]"
                    : "bg-[#292260] hover:bg-[#3a2e7b]"
                }`}
              >
                All
              </button>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-md font-semibold mb-4 text-gray-300">
              Contributions
            </h2>
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => setActiveTab("contribution-in")}
                className={`p-2 rounded-lg text-left text-sm ${
                  activeTab === "contribution-in"
                    ? "bg-gradient-to-r from-[#7B5CFF] to-[#A07FFF]"
                    : "bg-[#292260] hover:bg-[#3a2e7b]"
                }`}
              >
                Contribution-in
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("new")}
                className={`p-2 rounded-lg text-left text-sm ${
                  activeTab === "new"
                    ? "bg-gradient-to-r from-[#7B5CFF] to-[#A07FFF]"
                    : "bg-[#292260] hover:bg-[#3a2e7b]"
                }`}
              >
                New Contribution
              </button>
            </div>
          </div>
        </aside>

        <main className="flex-1 ml-[20%] p-10 w-[90%] mx-auto">
          {activeTab === "filters" && (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="bg-[#1B1537] pl-10 pr-4 py-2 w-full rounded-lg text-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleApplyFilter}
                  className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
                >
                  Apply Filter
                </button>
              </div>

              <div className="grid grid-cols-4 gap-8">
                {categories.map((cat, idx) => (
                  <div
                    key={idx}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`relative h-48 w-60 flex items-center justify-center text-xl font-semibold rounded-2xl cursor-pointer transition-all ${
                      selectedCategory === cat
                        ? "shadow-[0_0_25px_5px_rgba(125,110,255,0.8)] scale-105"
                        : "hover:shadow-[0_0_25px_5px_rgba(125,110,255,0.5)] hover:scale-105"
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
            </>
          )}

          {activeTab === "contribution-in" && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">
                  Contribution-in
                </h2>
                <button
                  type="button"
                  onClick={handleViewContributionSection}
                  className="text-indigo-400 hover:text-indigo-300 transition"
                >
                  View More →
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {contributionin.length > 0
                  ? contributionin
                      .slice(0, 3)
                      .map((idea, idx) => renderCard(idea, idx, true))
                  : "No contributions yet."}
              </div>
            </>
          )}

          {activeTab === "new" && (
            <>
              <div className="flex justify-between items-center mb-6 mt-10">
                <h2 className="text-xl font-semibold text-white">
                  New Contributions
                </h2>
                <button
                  type="button"
                  onClick={handleViewNewContributionSection}
                  className="text-indigo-400 hover:text-indigo-300 transition"
                >
                  View More →
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredIdeas.length > 0
                  ? filteredIdeas
                      .slice(0, 3)
                      .map((idea, idx) => renderCard(idea, idx, false))
                  : "No ideas available."}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default FilterAndContribution;

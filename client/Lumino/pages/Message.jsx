import { useState } from "react";
import { FaSearch, FaPaperPlane, FaSmile, FaPaperclip, FaMicrophone, FaEdit } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

export default function Message() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "This is Saksham Garg, wants to meet!!", sender: "collaborator", time: "16:05" },
    { id: 2, text: "This is Saksham Garg, wants to meet!!", sender: "you", time: "16:08" },
  ]);

  const [collaborators] = useState([
    { id: 1, name: "Saksham Garg", role: "Comedy writer" },
    { id: 2, name: "Saksham Garg", role: "Comedy writer" },
    { id: 3, name: "Saksham Garg", role: "Comedy writer" },
    { id: 4, name: "Saksham Garg", role: "Comedy writer" },
    { id: 5, name: "Saksham Garg", role: "Comedy writer" },
  ]);

  const [search, setsearch] = useState("");
  const filteredCollaborators = collaborators.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleSend = () => {
    if (!message.trim()) return;
    const newMsg = {
      id: messages.length + 1,
      text: message,
      sender: "you",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }),
    };
    setMessages([...messages, newMsg]);
    setMessage("");
  };


  return (
    <div className="min-h-screen bg-[#070C2B] text-white flex flex-col">
      <div className="flex justify-between items-center px-8 py-6">
        <div className="flex items-center gap-2">
          <img src="/images/logo.png" className="w-10 h-10" />
          <div className="text-2xl font-bold">Lumino</div>
        </div>
        <ul className="hidden md:flex gap-8 text-lg">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ?"text-indigo-400 font-semibold"
                  :"hover:text-indigo-300"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({isActive}) =>
                isActive
                  ? "text-indigo-400 font-semibold"
                  :"hover:text-indigo-300"
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/features"
              className={({isActive}) =>
                isActive
                  ?"text-indigo-400 font-semibold"
                  : "hover:text-indigo-300"
              }
            >
              Features
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/faq"
              className={({isActive}) =>
                isActive
                  ? "text-indigo-400 font-semibold"
                  : "hover:text-indigo-300"
              }
            >
              FAQ
            </NavLink>
          </li>
        </ul>
        <Link to="/profile">
          <img src="/images/user.png" className="w-8 h-8 rounded-full" />
        </Link>
      </div>

      <div className="flex flex-1 px-6 pb-6 pt-4 gap-6">
        <aside className="w-[22%] bg-[#1B1537] p-6 flex flex-col border-r border-[#2A2D5C] rounded-lg">
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Find collaborator"
              value={search}
              onChange={(e) => setsearch(e.target.value)}
              className="w-full bg-[#0D0F2D] text-white px-4 py-2 rounded-md pl-10 placeholder-gray-400 outline-none"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <div className="flex flex-col gap-4 overflow-y-auto">
            {filteredCollaborators.length > 0 ? (
              filteredCollaborators.map((person) => (
                <div
                  key={person.id}
                  className="flex items-center gap-3 bg-[#0D0F2D] p-3 rounded-md cursor-pointer hover:bg-[#181B44] transition"
                >
                  <img src="/images/user.png" alt="User" className="w-8 h-8 rounded-full" />
                  <div>
                    <p className="font-semibold">{person.name}</p>
                    <p className="text-sm text-gray-400">{person.role}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm italic">No matches found</p>
            )}
          </div>
        </aside>

        <main className="flex-1 bg-[#1B1537] border-l border-[#2A2D5C] rounded-lg flex flex-col p-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <img src="/images/user.png" alt="User" className="w-10 h-10 rounded-full" />
              <div>
                <p className="text-lg font-semibold">Saksham Garg</p>
                <p className="text-sm text-gray-400">Comedy writer</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              Online
            </div>
          </div>

          <div className="flex-1 bg-[#0D0F2D] rounded-2xl flex flex-col p-4 gap-4">
            <div className="flex-1 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${
                    msg.sender=== "you"? "justify-end":"justify-start"
                  }`}
                >
                  {msg.sender !== "you" && (
                    <img src="/images/user.png" alt="User" className="w-6 h-6 rounded-full" />
                  )}

                  <div className="max-w-xs px-4 py-3 rounded-md text-sm bg-[#181B44]">
                    <p>{msg.text}</p>
                    <span className="text-xs text-gray-400 block mt-1">{msg.time}</span>
                  </div>

                  {msg.sender === "you" && (
                    <img src="/images/user.png" alt="you" className="w-6 h-6 rounded-full" />
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 bg-[#18133D] rounded-xl px-4 py-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key==="Enter") handleSend();
                }}
                placeholder="Write message here..."
                className="flex-1 bg-transparent outline-none text-white placeholder-white px-2"
              />
              <FaPaperPlane
                onClick={handleSend}
                className="text-purple-800 hover:text-purple-300 cursor-pointer"
                size={18}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

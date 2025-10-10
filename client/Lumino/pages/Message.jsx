import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { io } from "socket.io-client";
import Navbar from "../components/Navbar";

const socket = io("http://localhost:4000", { withCredentials: true });

const Message = () => {
  const { backendUrl, userData, usersData } = useContext(AppContent);

  const [receiverId, setReceiverId] = useState("");
  const [thisMessage, setThisMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [senderId, setSenderId] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [receiverUser, setReceiverUser] = useState(null);
  const messageEndRef = useRef(null);

  const normalizedUserId = userData?.id || userData?._id;

  const scrollMessage = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!normalizedUserId) return;

    setSenderId(normalizedUserId);
    socket.emit("register", normalizedUserId);

    socket.on("receivermessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("receivermessage");
  }, [normalizedUserId]);

  useEffect(() => {
    if (!receiverId || !senderId) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${backendUrl}/api/user/${senderId}/${receiverId}`
        );
        setMessages(res.data || []);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [backendUrl, senderId, receiverId]);

  useEffect(() => {
    scrollMessage();
  }, [messages]);

  const handleMessageSubmit = () => {
    if (!receiverId || !thisMessage.trim()) return;

    const messageObj = {
      senderid: normalizedUserId,
      receiverid: receiverId,
      text: thisMessage.trim(),
    };

    socket.emit("sendmessage", messageObj);
    setMessages((prev) => [
      ...prev,
      { senderid: normalizedUserId, text: thisMessage.trim() },
    ]);
    setThisMessage("");
  };

  if (!userData || !normalizedUserId) {
    return (
      <div className="flex items-center justify-center h-screen text-lg text-white bg-black">
        Loading user data...
      </div>
    );
  }

  const filteredData = usersData.filter((item) => {
    const itemId = item._id || item.id;
    if (itemId === normalizedUserId) return false;
    return item.name.toLowerCase().includes(searchUser.toLowerCase());
  });

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <div className="flex justify-center w-full pt-[120px] pb-4">
        <div className="flex w-[65%] bg-[#261431]/75 rounded-xl border border-[#AD46FF]/20 h-[calc(100vh-140px)] overflow-hidden relative">
          
          <div className="flex flex-col w-[290px] bg-[#1E0F2F] p-4 gap-4 overflow-y-auto">
            <div className="w-full bg-[#3B1D5B]/50 rounded-lg p-2 flex items-center gap-2">
              <input
                type="text"
                placeholder="Search User..."
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                className="w-full px-2 py-1 bg-transparent text-white outline-none placeholder:text-gray-300 rounded"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
                />
              </svg>
            </div>

            <div className="flex flex-col mt-4 gap-3 w-full">
              {filteredData.length > 0 ? (
                filteredData.map((user) => {
                  const userId = user._id || user.id;
                  return (
                    <div
                      key={userId}
                      onClick={() => {
                        setReceiverId(userId);
                        setReceiverUser(user);
                      }}
                      className={`flex items-center gap-3 pl-2 pr-4 py-1 rounded-lg cursor-pointer transition ${
                        receiverId === userId
                          ? "bg-[#5A3EA1]/50"
                          : "hover:bg-[#5A3EA1]/30"
                      }`}
                    >
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex flex-col leading-tight">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.college}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-gray-400 text-sm">No users found</div>
              )}
            </div>
          </div>

          {!receiverId ? (
            <div className="flex flex-col flex-1 justify-center items-center text-gray-400 text-lg">
              Select a user to start chatting
            </div>
          ) : (
            <div className="flex flex-col flex-1 p-4">
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={receiverUser?.image}
                  className="h-11 w-11 rounded-full"
                  alt={receiverUser?.name}
                />
                <p className="text-[18px] text-[#F3F3F3] font-semibold">
                  {receiverUser?.name}
                </p>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2">
                {messages.map((m, idx) => {
                  const sender = m.senderid || m.sender;
                  return (
                    <div
                      key={idx}
                      className={`flex ${
                        sender === normalizedUserId
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] px-3 py-2 text-sm break-words rounded-lg ${
                          sender === normalizedUserId
                            ? "bg-[#5A3EA1] rounded-br-none text-white"
                            : "bg-[#8B5CF6] rounded-bl-none text-white"
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  );
                })}
                <div ref={messageEndRef} />
              </div>

              <div className="mt-2 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={thisMessage}
                  onChange={(e) => setThisMessage(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg bg-[#3B1D5B] text-white outline-none"
                  onKeyDown={(e) => e.key === "Enter" && handleMessageSubmit()}
                />
                <button
                  onClick={handleMessageSubmit}
                  className="px-4 py-2 bg-[#5A3EA1] rounded-full text-white"
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;

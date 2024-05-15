"use client";
import React, { useState } from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("chat");

  return (
    <div className="fixed h-[100vh] px-3 py-4 bg-[#25262D] top-0 w-[25%]">
      <div className="text-white font-bold text-xl">Voyager</div>
      <div className="w-[100%] mt-5 flex bg-black rounded pt-2 pb-2 justify-center items-center gap-1">
        <button
          className={`w-1/2 flex ml-2 p-2 rounded justify-center items-center gap-2 ${
            activeTab === "chat" ? "bg-gray-100 text-black" : "text-gray-50"
          }`}
          id="chat"
          onClick={() => setActiveTab("chat")}
        >
          <IoChatbubbleEllipsesOutline />
          Chat
        </button>
        <button
          className={`w-1/2 p-2 rounded mr-2 flex justify-center items-center gap-2  ${
            activeTab === "friends" ? "bg-gray-100 text-black" : "text-gray-50"
          }`}
          id="friends"
          onClick={() => setActiveTab("friends")}
        >
          <FaUserFriends />
          Friends
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

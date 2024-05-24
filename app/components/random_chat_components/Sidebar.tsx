"use client";
import React, { useState, useEffect } from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { FaUserFriends } from "react-icons/fa";
import { useRouter } from "next/navigation";
import SidebarList from "./SidebarList";
import Link from "next/link";

const usersListForChatTab = [
  { name: "deepak" },
  { name: "Aman" },
  { name: "Deepti" },
  { name: "tanya" },
  { name: "Suman" },
  { name: "Madhav" },
  { name: "deepak" },
  { name: "Aman" },
  { name: "Deepti" },
  { name: "tanya" },
  { name: "Suman" },
  { name: "Madhav" },
]; //This is hardcoded for now

const usersListForFriendTab = [
  { name: "shashank" },
  { name: "Prithvi" },
  { name: "Hema" },
  { name: "Jaya" },
]; //This is hardcoded for now

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const [chatUsersList, setChatUsersList] = useState([...usersListForChatTab]);
  const [friendList, setFriendList] = useState([...usersListForFriendTab]);
  const router = useRouter();

  const IP_ADDRESS = process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS;

  useEffect(() => {
    if (typeof window !== undefined) {
      const userId = localStorage.getItem("userId");
      const userFriends = fetch(
        `http://${IP_ADDRESS}/v1.0/voyager/user_friends/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Network response was not okay " + response.statusText
            );
          }
          return response.json();
        })
        .then((data) => {
          return data;
        })
        .catch((error) => console.log(error));
      // setFriendList(userFriends);
    }
  }, [chatUsersList, friendList]);

  return (
    <div className="fixed h-[100vh] px-3 py-4 bg-[#25262D] top-0 w-[25%]">
      <Link
        href="/"
        className="text-white font-bold text-xl hover:text-gray-300"
      >
        Voyager
      </Link>
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

      {/* --------------------------------todo--------------*/}
      <div className="flex flex-col h-[74%] overflow-auto my-2 pr-2">
        {activeTab === "chat" &&
          chatUsersList.map((userData, idx) => (
            <SidebarList key={idx} name={userData.name} />
          ))}
        {activeTab === "friends" &&
          friendList.map((userData, idx) => (
            <SidebarList key={idx} name={userData.name} />
          ))}
      </div>
      {/* ----------------------------- */}
      {/* to change routing */}
      <button
        className="fixed flex items-center bottom-0 left-0 w-[25%] mx-auto p-2 rounded font-md text-lg bg-black text-gray-50 hover:bg-[#201828] px-3"
        onClick={() => router.push("/voyager/profile")}
      >
        <span className="ml-2">Edit your profile now</span>
        <span className="ml-5 font-semibold text-2xl">
          <CiEdit />
        </span>
      </button>
    </div>
  );
};

export default Sidebar;

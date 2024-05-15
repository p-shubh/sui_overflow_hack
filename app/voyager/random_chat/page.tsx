"use client";

import { useState } from "react";
import Sidebar from "@/app/components/random_chat_components/Sidebar";
import Image from "next/image";

const RandomChat = () => {
  const [message, setMessage] = useState<string>("");

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
    console.log("Message: ", event.target.value);
  };

  return (
    <div className="flex w-full h-full">
      <Sidebar />
      <div className="flex h-[100vh] w-full ml-[25%] bg-[#393E46]">
        <div className="w-[90%] self-end mx-auto mb-5">
          <input
            type="text"
            id="default-input"
            className="text-gray-50 text-sm rounded-lg block p-2.5 w-full bg-gray-500 outline-none"
            placeholder="Enter text here..."
            value={message}
            onChange={handleMessageChange}
          />
        </div>
        <div className="absolute flex flex-col bg-white rounded p-4">
          <div className="flex justify-around">
            <Image
              src="/female.png"
              height={20}
              width={20}
              alt="profile-picture"
            />
            <Image
              src="/male.png"
              height={20}
              width={20}
              alt="profile-picture"
            />
            <Image
              src="/unknown_gender.png"
              height={20}
              width={20}
              alt="profile-picture"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomChat;

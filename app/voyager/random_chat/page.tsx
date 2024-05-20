"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/app/components/random_chat_components/Sidebar";
import CategoriesAndGenderDetailsPopup from "@/app/components/random_chat_components/CategoriesAndGenderDetailsPopup";

interface ChatData {
  id: string;
  userId: string;
  content: string;
  username: string;
  commonPass: string;
  created_at: string;
}

const RandomChat = () => {
  const [inputMessage, setInputMessage] = useState<string>("");
  const [chatData, setChatData] = useState<ChatData[]>([]);
  const [isSocketOpen, setIsSocketOpen] = useState<boolean>(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const IP_ADDRESS = process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS;
 
  useEffect(() => {
    // if(){
    // setIsSocketOpen(true);
    const newSocket = new WebSocket(
      `ws://${IP_ADDRESS}/v1.0/voyager_web_socket/ws`
    );

    newSocket.onopen = () => {
      setSocket(newSocket);
    };

    newSocket.onmessage = (event) => {
      const newChatData = JSON.parse(event.data);
      
      setChatData((prevData) => [...prevData, newChatData]);
    };
    return () => {
      newSocket.close();
    };
    // }
    // eslint-disable-next-line
  }, []); // Only runs once when the component mounts

  function sendMessage(event: React.KeyboardEvent<HTMLInputElement>) {
    if (
      event.key === "Enter" &&
      socket &&
      socket.readyState === WebSocket.OPEN &&
      inputMessage.length >= 1
    ) {
      socket.send(
        JSON.stringify({
          userId: "550e8400-e29b-41d4-a716-446655440000",
          content: inputMessage,
          commonPass: "secret",
          username: "Mahindra",
        })
      );
      setInputMessage(""); // Clear input field after sending message
    } else {
      console.error("WebSocket connection is not open.");
    }
  }

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(event.target.value);
  };

  return (
    <div className="flex w-full h-full">
      <Sidebar />
      <div className="flex flex-col justify-between h-[100vh] w-full ml-[25%] bg-[#393E46]">
        <div className="p-2 m-5 overflow-auto">
          {chatData.map((data, idx) => (
            <div
              key={idx}
              className="bg-white rounded-l-full rounded-r-full px-3 py-1 text-black max-w-fit mb-3"
            >
              {data.content}
            </div>
          ))}
        </div>
        <div className="w-full ">
          <div className="w-[95%] mx-auto mb-4">
            <input
              type="text"
              id="default-input"
              className={`text-gray-50 text-sm rounded-lg block p-2.5 w-full bg-gray-500 outline-none`}
              placeholder="Enter text here..."
              value={inputMessage}
              onChange={handleMessageChange}
              onKeyDown={(event) => {
                sendMessage(event);
              }}
              // onKeyDown={(event) => {
              //   isSocketOpen && sendMessage(event);
              // }}
              // disabled={isSocketOpen === false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomChat;

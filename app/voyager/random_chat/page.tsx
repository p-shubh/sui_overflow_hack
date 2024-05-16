"use client"

import { useState, useEffect } from "react";
import Sidebar from "@/app/components/random_chat_components/Sidebar";

const RandomChat = () => {
  const [inputMessage, setInputMessage] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const newSocket = new WebSocket(
      "ws://3.131.171.245:8181/v1.0/voyager_web_socket/ws"
    );

    newSocket.onopen = () => {
      setSocket(newSocket);
    };

    newSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setChatMessages((prevMessages) => [...prevMessages, message.content]);
    };

    return () => {
      newSocket.close();
    };
  }, []); // Only runs once when the component mounts

  function sendMessage(event: React.KeyboardEvent<HTMLInputElement>) {
    if (
      event.key === "Enter" &&
      socket &&
      socket.readyState === WebSocket.OPEN
    ) {
      // Send the message
      socket.send(JSON.stringify({ content: inputMessage }));
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
      <div className="flex h-[100vh] w-full ml-[25%] bg-[#393E46]">
        <div className="bg-blue text-white p-2">
          {chatMessages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>

        <div className="w-[90%] self-end mx-auto mb-5">
          <input
            type="text"
            id="default-input"
            className="text-gray-50 text-sm rounded-lg block p-2.5 w-full bg-gray-500 outline-none"
            placeholder="Enter text here..."
            value={inputMessage}
            onChange={handleMessageChange}
            onKeyDown={sendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default RandomChat;

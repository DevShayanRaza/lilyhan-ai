import React, { useState } from "react";
import arrow from "../assets/arrow.svg";
import attach from "../assets/attachFile.svg";
import "../custom.css";

function ChatField() {
  const [message, setMessage] = useState(""); // Tracks the message input
  const [messages, setMessages] = useState([]); // Stores the chat history

  // Handle sending the message
  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, message]); // Append the message to the list
      setMessage(""); // Clear the input field
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent default behavior (line break)
      handleSendMessage(); // Send the message
    }
  };

  return (
    <div className="fixed bottom-10 left-50 w-[60%] bg-gray-100/10 backdrop-blur-lg">
      {/* Chat Messages Display */}
      {/* <div className="mb-4 p-4 bg-white rounded-lg h-[200px] overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="p-2 mb-2 bg-gray-100 rounded-lg text-[16px] font-[400]"
          >
            {msg}
          </div>
        ))}
      </div> */}

      {/* Input Field */}
      <div className=" border-t p-4 bg-gray-100/10  backdrop-blur-lg">
        <div className="flex items-center bg-[#F4F4F4] rounded-[26px]">
          <img src={attach} alt="Attach" className="ml-2" />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={1}
            className="flex-grow p-2 border-none outline-none bg-[#F4F4F4] rounded-[26px] text-[16px] font-[400] resize-none focus:outline-none focus:ring-0"
          />
          <button
            onClick={handleSendMessage}
            className="mx-2 bg-[#0556B3] text-white w-[32px] h-[32px] rounded-[16px] items-center justify-center flex"
          >
            <img src={arrow} alt="Send" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatField;

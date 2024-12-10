import React from "react";

function ChatField() {
  return (
    <div className="fixed bottom-10 right-0 w-[80%] bg-gray-100 border-t p-4 bg-gray-100/70 backdrop-blur-lg ">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-grow p-2 border rounded-md focus:outline-none"
        />
        <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md">
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatField;

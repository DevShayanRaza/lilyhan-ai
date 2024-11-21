// components/Header.js
import React from "react";
import notification from "../assets/notification.svg";
import user from "../assets/user.svg";
import hamburger from "../assets/hamburger.svg";

const Header = () => {
  return (
    <header className="flex justify-end items-center p-4 bg-white">
      {/* <div className="text-2xl font-semibold">Welcome, Jonas</div> */}
      <div className="flex items-center space-x-6 justify-between">
        <img src={notification} />
        <div className="flex items-center justify-center ">
          <img src={user} />
          <div className="flex flex-col items-start justify-center mx-2 ">
            <p className="font-[400] text-[14px] text-[#1D1D3E] ">Jonas Kh</p>
            <p className="font-[400] text-[14px] text-[#9F9F9F] ">Admin</p>
          </div>
        </div>

        <img src={hamburger} />
      </div>
    </header>
  );
};

export default Header;

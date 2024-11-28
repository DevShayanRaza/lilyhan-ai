import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toggleMoveLeft, selectMoveLeft } from '../store/sidebarSlice';
import { useNavigate } from "react-router-dom";
import lightlogo from "../assets/lightlogo.svg";
import openclose from "../assets/openclose.svg";
import unified from "../assets/unified.svg";
import chevron from "../assets/chevron.svg";
import { admin, engines, otherEngine, moreEngines } from "../utils/demodata";
import Dropdown from "../svg/Dropdown"
import DataSource from "../svg/DataSource";


const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState(null);
   const [isHidden, setIsHidden] = useState(true); 
  //  const [moveLeft, setMoveLeft] = useState(false);
  //  const [isHide, setIsHide] = useState(true); 
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const moveLeft = useSelector(selectMoveLeft); 

  const handleItemClick = (itemId, url = null) => {
    setSelectedItem(itemId);
    if (url) {
      navigate(url);
    }
  };

  const navigatetohome = () => {
    setSelectedItem(null);
    navigate("/home");
  };
  const handleClick = () => {
    dispatch(toggleMoveLeft()); 
  };

  return (
    <div className="">
      <>
      <aside  className={` sm:w-64 xl:w-64 2xl:w-80 pb-5 bg-[#0056B3] text-white fixed overflow-y-scroll h-screen customsb 
         rounded-md transition-transform duration-1000 ${moveLeft ? 'xl:translate-x-[-230px] 2xl:translate-x-[-295px]' : 'translate-x-0'}`}>
      <div className="p-4 flex justify-between items-center">
        <img src={lightlogo} alt="logo" />
        <div onClick={handleClick} className="cursor-pointer" >
        <img src={openclose} alt="toggle" />
        </div>

     
      </div>

      <div
        onClick={navigatetohome}
        className={`cursor-pointer ${
          selectedItem === null
            ? "border-[1px] border-[#80B7F3] rounded-[14px] py-2 mx-4 bg-gradient-to-r from-[#0051A8] to-[#007BFF]"
            : ""
        } flex`}
      >
        <img src={unified} className="px-2 mx-4" alt="unified" />
        <p className="font-[600] sm:truncate text-[14px] 2xl:font-bold 2xl:text-[25px]">Unified Engine</p>
      </div>

      <ul className="space-y-2 mt-4 w-[95%]">
        {/* Try Out Our Engines */}
        <li className="font-semibold p-4">Try Out Our Engines</li>
        {engines.map((engine, index) => (
          <li
            key={`engine-${index}`}
            className={`p-2 rounded-[14px] flex items-center ml-2 cursor-pointer ${
              selectedItem === `engine-${index}`
                ? "border-[1px] ml-5 border-[#80B7F3] bg-gradient-to-r from-[#0051A8] to-[#007BFF]"
                : "hover:bg-blue-800 "
            }`}
            onClick={() => handleItemClick(`engine-${index}`, engine.url)}
          >
            <img src={engine.icon} className="w-[18px] h-[18px] mx-2" alt="icon" />
            <p className="font-[600] sm:truncate text-[14px]  2xl:text-[15px]">{engine.title}</p>
          </li>
        ))}
        <div className="h-[1px] justify-center w-[95%] mx-auto flex items-center bg-[#80B7F3]"></div>

        {/* Analytics Dashboard */}
        {/* <li className="font-semibold p-4">Analytics Dashboard</li> */}
        {otherEngine.map((item, index) => (
          <li
            key={`otherEngine-${index}`}
            className={`p-2 rounded-[14px] flex items-center ml-2 cursor-pointer ${
              selectedItem === `otherEngine-${index}`
                ? "border-[1px] border-[#80B7F3] ml-5  bg-gradient-to-r from-[#0051A8] to-[#007BFF]"
                : "hover:bg-blue-800"
            }`}
            onClick={() => handleItemClick(`otherEngine-${index}`, item.url)}
          >
            <img src={item.icon} className="w-[18px] h-[18px] mx-2" alt="icon" />
            <p className="font-[600] sm:truncate text-[14px]  2xl:text-[15px]">
            {item.title}
            </p>
           
          </li>
        ))}

        <div className="h-[1px] mb-10 justify-center w-[95%] mx-auto flex items-center bg-[#80B7F3] "></div>

        {/* Admin Area */}

        <div className="flex items-center justify-between mx-3 ">
          <p class=" text-[18px]">Admin Area</p>
          <div   onClick={() => setIsHidden(!isHidden)} >
          <Dropdown/> 
          </div>
        </div>
        <div>
                  {/* Analytics Dashboard */}
                  <div>
 

        {/* Conditionally render the hidden content */}
        <div className={`${isHidden ? "hidden" : ""}`}>
        <div
          className="flex items-center ml-6 "
        
        >
          <DataSource />
          <li className="font-semibold p-4">Data Source Management</li>
        </div>
          {admin.map((item, index) => (
            <li
              key={`otherEngine-${index}`}
              className={`p-2 rounded-[14px] flex items-center ml-6 mb-3 cursor-pointer sm:truncate  2xl:text-[14px] ${
                selectedItem === `admin-${index}`
                  ? "border-[1px] border-[#80B7F3] ml-8  bg-gradient-to-r from-[#0051A8] to-[#007BFF]"
                  : "hover:bg-blue-800"
              }`}
              onClick={() => handleItemClick(`admin-${index}`, item.url)}
            >
              {/* <img src={item.icon} className="w-[18px] h-[18px] mx-2" alt="icon" /> */}
              <p className="font-[600] sm:truncate text-[14px]  2xl:text-[15px]">{item.title}</p>
            </li>
          ))}
        </div>
      </div>
        </div>

        {/* More Engines */}
        {moreEngines.map((items, index) => (
          <li
            key={`moreEngine-${index}`}
            className={`p-2 rounded-[14px] flex items-center ml-2 cursor-pointer  ${
              selectedItem === `moreEngine-${index}`
                ? "border-[1px] border-[#80B7F3] ml-5  bg-gradient-to-r from-[#0051A8] to-[#007BFF]"
                : "hover:bg-blue-800"
            }`}
            onClick={() => handleItemClick(`moreEngine-${index}`, items.url)}
          >
            <img src={items.icon} className="w-[18px] h-[18px] mx-2" alt="icon" />
            <p className="font-[600] sm:truncate text-[14px]  2xl:text-[15px]">{items.title}</p>
          </li>
        ))}
      </ul>
    </aside>
      </>

    </div>
 
  );
};

export default Sidebar;

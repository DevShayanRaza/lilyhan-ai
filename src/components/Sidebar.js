import React, { useState } from "react";
import lightlogo from "../assets/lightlogo.svg";
import openclose from "../assets/openclose.svg";
import unified from "../assets/unified.svg";
import chevron from "../assets/chevron.svg";

import { admin, engines, otherEngine } from "../utils/demodata";

const Sidebar = () => {
  const [itemVisible, setItemVisible] = useState(true);

  const toggleItemVisibility = () => {
    setItemVisible((prevState) => !prevState);
  };
  return (
    <aside className="w-80 bg-[#0056B3] text-white min-h-screen">
      <div className="p-6 flex justify-between items-center">
        <img src={lightlogo} />
        <img src={openclose} />
      </div>
      <div className="border-[1px] border-[#80B7F3] rounded-[11px] p-2 mx-4 bg-gradient-to-r from-[#0051A8] to-[#007BFF] flex">
        <img src={unified} className="px-2" />
        <p className="font-[600] text-[18px] ">Unified Engine</p>
      </div>

      <ul className="space-y-2 mt-4">
        <li className="font-semibold p-4">Try Out Our Engines</li>
        {engines.map((engine) => (
          <li
            key={engine}
            className="p-2 hover:bg-blue-800 rounded flex items-center"
          >
            <img src={engine.icon} className="w-[18px] h-[18px] mx-2" />
            <p className="font-[600] text-[15px]">{engine.title}</p>
          </li>
        ))}
        <div className="h-[1px] justify-center w-[90%] mx-auto flex items-center bg-[#80B7F3]"></div>

        {otherEngine.map((item) => (
          <li
            key={item}
            className="p-2 hover:bg-blue-800 rounded flex items-center"
          >
            <img src={item.icon} className="w-[18px] h-[18px] mx-2" />

            {item.title}
          </li>
        ))}
        <div className="h-[1px] justify-center w-[90%] mx-auto flex items-center bg-[#80B7F3]"></div>
        <div
          className="flex justify-between items-center pr-8"
          onClick={toggleItemVisibility}
        >
          <li className="font-semibold p-4">Admin Area</li>
          <img src={chevron} />
        </div>
        {itemVisible &&
          admin.map((item) => (
            <li
              key={item}
              className={`px-2 py-2 hover:bg-blue-800 rounded flex ${
                item.subItems ? "items-start" : "items-center"
              }`}
            >
              <img src={item.icon} className="w-[18px] h-[18px] mx-2" />
              <div className="flex flex-col">
                <p className="font-[600] text-[15px]">{item.title}</p>

                {item.subItems && (
                  <ul className="mt-2 space-y-1 text-blue-200">
                    {item.subItems.map((subItem, subIndex) => (
                      <li
                        key={subIndex}
                        className="cursor-pointer hover:text-blue-300"
                      >
                        {subItem.title}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
      </ul>
    </aside>
  );
};

export default Sidebar;

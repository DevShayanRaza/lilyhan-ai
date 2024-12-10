import React from "react";
import trending from "../assets/trending.svg";

const AnalyticCard = ({ title, value, description, icon, percentage }) => {
  return (
    <div className="bg-[#F3F3F3] rounded-[15px] p-2 flex items-center justify-between ">
      <div className="w-[100%]">
        <div className="flex flex-row justify-between">
          <div>
            <h3 className="text-[16px] font-[600] text-[#202224]">{title}</h3>
            <p className="text-[28px] font-[700] text-[#202224]">{value}</p>
          </div>
          <div className="bg-[#DDE5ED] rounded-lg mr-5 items-center justify-center">
            {/* <span className="material-icons text-blue-600">{icon}</span> */}
            <img src={icon} className="bg-contain p-3" />
          </div>
        </div>

        {/* <p className="text-sm text-[#606060] flex items-center mt-3"> */}
        <div className="flex flex-row mt-5">
          <img src={trending} className="px-2" />
          <span className="flex">
            <p className="text-[#00B69B]">{percentage}</p>
            <p className="px-1 text-[#606060]">{description}</p>
          </span>
        </div>
        {/* </p> */}
      </div>
    </div>
  );
};

export default AnalyticCard;

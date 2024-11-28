// components/RecentActivities.js
import React from "react";
import { recentActivities } from "../utils/demodata";

const RecentActivities = () => {
  return (
    <div className="p-4 border rounded-[10px] bg-[#F3F3F3]  ">
      <h3 className="font-[700] text-[18px]">Recent Activities</h3>

      <div className="h-[1px]  flex bg-[#E7EFF0] justify-center my-4"></div>
      <ul className="space-y-4">
        {recentActivities.map((activity, index) => (
          <li key={index} className="flex space-x-4 items-center">
            <img src={activity.icon} />
            <div>
              <p className="text-sm">{activity.title}</p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivities;

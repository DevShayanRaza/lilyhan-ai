// components/MainContent.js
import React from "react";
import EngineCard from "./EngineCard";
// import RecentActivities from "./RecentActivities";
import { engines } from "../utils/demodata";
import RecentActivities from "./RecentActivities";

const HomeMainContent = () => {
  //   const engines = [
  //     { title: "OCR Engine", status: "Syncing", connectedServices: ["SharePoint"] },
  //     { title: "Document Engine", status: "Syncing", connectedServices: ["Google Drive"] },
  //     { title: "Image AI Engine", status: "Connected", connectedServices: ["Amazon S3"] },
  //     { title: "Web Search Engine", status: "Not Connected", connectedServices: [] },
  //     { title: "Excel/CSV Engine", status: "Connected", connectedServices: ["Azure Blob Storage"] },
  //     { title: "Database Engine", status: "Connected", connectedServices: ["SQL Server"] },
  //   ];

  return (
    <div className="p-6 flex w-full">
      {/* <div className="grid grid-cols-1 md:grid-cols-3 w-[100%] gap-x-4">
        {engines.map((engine, index) => (
          <EngineCard key={index} {...engine} />
        ))}
      </div> */}
      <div className="flex flex-wrap w-[80%] gap-4">
        {engines.map((engine, index) => (
          <EngineCard key={index} {...engine} />
        ))}
      </div>
      <div className="mr-6">
        <RecentActivities />
      </div>
    </div>
  );
};

export default HomeMainContent;

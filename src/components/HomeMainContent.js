// components/MainContent.js
import React from "react";
import EngineCard from "./EngineCard";
// import RecentActivities from "./RecentActivities";
import { engines } from "../utils/demodata";
import RecentActivities from "./RecentActivities";
import Welcome from "./Welcome";

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
    <>
        <Welcome/>
    <div className="p-6 flex w-full   ">
    
      {/* <div className="grid grid-cols-1 md:grid-cols-3 w-[100%] gap-x-4">
        {engines.map((engine, index) => (
          <EngineCard key={index} {...engine} />
        ))}
      </div> */}
      <div className="md:w-[60%] lg:w-[80%] " >
        <div className="xl:flex flex-wrap md:grid md:grid-cols-1 md:w-[80%] lg:w-[100%] gap-4 ">
        {engines.map((engine, index) => (
          <EngineCard key={index} {...engine} />
        ))}
        </div>
      </div>
      <div className=" md:w-[40%] lg:w-[20%] overflow-hidden">
        <div className=" md:w-[100%] lg:w-[100%] ">
        <RecentActivities />  
        </div>
   
      </div>
    </div>
    </>

  );
};

export default HomeMainContent;

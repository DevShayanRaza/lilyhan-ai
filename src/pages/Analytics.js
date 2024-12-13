import React, { useRef, useState, useEffect } from "react";

import ViewDetails from "../svg/ViewDetails";
import ViewDetailsGradient from "../svg/ViewDetailsGradient";
import Edit from "../svg/Edit";
import AnalyticCard from "../components/AnalyticCard";
// import document from "../assets/document.svg";
import document from "../assets/docblue.svg";
import time from "../assets/time.svg";
import rate from "../assets/rate.svg";
import AccuracyChart from "../components/AccuracyChart";
import AverageProcessingTimeChart from "../components/AverageProcessTimeChart";
import OverallAccuracyRate from "../components/OverallAccuracyRate";
import ChatField from "../components/ChatField";

function Analytics() {
  const fileInputRef = useRef(null);
  const modalContainerRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [fileTypes, setFileTypes] = useState([]);
  const [fileStatuses, setFileStatuses] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const cards = [
    {
      title: "Total Document processed",
      value: "150",
      description: "Up from yesterday",
      percentage: "8.5%",
      icon: document,
    },
    {
      title: "Average Processing Time",
      value: "12s",
      description: "Up from yesterday",
      percentage: "8.5%",

      icon: time,
    },
    {
      title: "Overall Accuracy Rate",
      value: "98%",
      description: "Up from yesterday",
      percentage: "8.5%",

      icon: rate,
    },
  ];

  const handleViewDetails = (file) => {
    setSelectedFile(file);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedFile(null);
  };

  return (
    <>
      <div className="relative ml-5">
        {" "}
        {/* Added relative class */}
        <div className="ocrengine">
          {/* Heading */}
          <div className="flex justify-between">
            <div className="ml-6 flex flex-col justify-center mb-14">
              <h2 className="font-bold text-[32px]">Analytics Dashboard</h2>
              <p>Lorem ipsum dolor sit amet Maecenas rutru.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cards.map((card, index) => (
              <AnalyticCard
                key={index}
                title={card.title}
                value={card.value}
                description={card.description}
                icon={card.icon}
                percentage={card.percentage}
              />
            ))}
          </div>
          {/* <AnalyticCard /> */}

          {/* File List */}
          <div className="bg-white w-[100%] customsb rounded mt-5">
            {/* Headings */}
            {/* <div className="flex mt-10 ml-5">
              <h4 className="font-bold text-[16px] w-1/4">File Name</h4>
              <h4 className="font-bold text-[16px] w-1/4">Type</h4>
              <h4 className="font-bold text-[16px] w-1/4">Status</h4>
              <h4 className="font-bold text-[16px] w-1/4">Action</h4>
            </div> */}
            <div className="flex w-[100%]">
              <AccuracyChart />
              <AverageProcessingTimeChart />
            </div>
            <div className="w-full my-6">
              <OverallAccuracyRate />
            </div>
          </div>
        </div>
        <ChatField />
      </div>
    </>
  );
}

export default Analytics;

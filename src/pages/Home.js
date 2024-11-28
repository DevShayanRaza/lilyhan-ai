import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Welcome from "../components/Welcome";
import HomeMainContent from "../components/HomeMainContent";
import DocumentList from "../components/DocumentList";
import OcrEngine from "../components/OcrEngine";

const Home = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="flex-1">
        {/* Header */}
        <Header />
    

        {/* Content */}
        <outlet>
        {/* <Welcome /> */}
        {/* <HomeMainContent /> */}
        <DocumentList/>
        <OcrEngine/>
        </outlet>
      
      </div>
    </div>
  );
};
export default Home;

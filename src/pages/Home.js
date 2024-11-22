import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Welcome from "../components/Welcome";
import HomeMainContent from "../components/HomeMainContent";
const Home = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="flex-1">
        {/* Header */}
        <Header />
        <Welcome />

        {/* Content */}
        <HomeMainContent />
      </div>
    </div>
  );
};
export default Home;

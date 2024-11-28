import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup";
import Layout from "./components/Layout"; // New Layout component
import Welcome from "./components/Welcome";
import HomeMainContent from "./components/HomeMainContent";
import DocumentList from "./components/DocumentList";
import OcrEngine from "./components/OcrEngine";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center font-bold">
      <h2>404 - Page Not Found</h2>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
  
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<Signup />} />

     
        <Route element={<Layout />}>
          <Route path="/home" element={<HomeMainContent />} />
    
          <Route path="/ocr-engine" element={<OcrEngine />} />
          <Route path="/document-list" element={<DocumentList />} />
          <Route path="*" element={<NotFound />} />
        </Route>
     
      </Routes>
    </Router>
  );
};

export default App;

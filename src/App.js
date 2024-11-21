import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define all the routes here */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/" element={<Signup />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;

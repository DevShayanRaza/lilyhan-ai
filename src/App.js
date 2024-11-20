import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup";
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define all the routes here */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;

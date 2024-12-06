import React from "react";
import Signup from "./pages/signup";
import Home from "./pages/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/register" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

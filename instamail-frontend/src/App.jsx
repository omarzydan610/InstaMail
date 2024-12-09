import React from "react";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Home from "./pages/home";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      localStorage.removeItem("authToken");
      if (location.pathname !== "/register" && location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
  }, [location]);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;

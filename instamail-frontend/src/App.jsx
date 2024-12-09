import { React, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Home from "./pages/home";
import ProtectedRoute from "./components/ProtectedRoute";

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

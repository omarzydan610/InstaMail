import React, { useState, useEffect } from "react";
import TopBar from "../components/HomePageComponents/TopBar";
import Sidebar from "../components/HomePageComponents/Sidebar";
import PageBody from "../components/HomePageComponents/HomePageBody";
import FloatingButton from "../components/HomePageComponents/FloatingButton";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("Inbox");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };
  const { token } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      console.log();
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div className="h-screen flex flex-col">
      {/* Top Bar */}
      <TopBar toggleSidebar={toggleSidebar} />

      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          isSidebarCollapsed={isSidebarCollapsed}
          activeCategory={activeCategory}
          onCategoryClick={handleCategoryClick}
          className="h-full fixed z-10" // Fixed Sidebar
        />

        {/* Page Body */}
        {/* Make this scrollable */}
        <PageBody activeCategory={activeCategory} />
      </div>

      {/* Floating Button */}
      <FloatingButton className="fixed bottom-8 right-8 z-20" />
    </div>
  );
};

export default Home;

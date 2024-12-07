import React, { useState } from "react";
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import PageBody from "../components/HomePageBody";
import FloatingButton from "../components/FloatingButton";

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("Inbox");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Top Bar */}
      <TopBar toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <Sidebar
          isSidebarCollapsed={isSidebarCollapsed}
          activeCategory={activeCategory}
          onCategoryClick={handleCategoryClick}
        />

        {/* Page Body */}
        <PageBody activeCategory={activeCategory} />
      </div>

      {/* Floating Button */}
      <FloatingButton />
    </div>
  );
};

export default Home;

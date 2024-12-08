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

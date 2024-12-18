import React, { useState, useEffect } from "react";
import TopBar from "../components/HomePageComponents/TopBar";
import Sidebar from "../components/HomePageComponents/Sidebar/Sidebar";
import HomePageBody from "../components/HomePageComponents/HomePageBody";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import SearchModal from "../components/SearchComponents/SearchModal";

const Home = () => {
  const { token } = useAppContext();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("Inbox");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isContactsModalOpen, setIsContactsModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const openContactsModal = () => setIsContactsModalOpen(true);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const [isAddFolderModalOpen, setIsAddFolderModalOpen] = useState(false); // State for Add Folder Modal
  const handleAddFolderClick = () => {
    setIsAddFolderModalOpen(true); // Open Add Folder Modal
  };

  return (
    <div className="h-screen flex flex-col">
      <TopBar
        toggleSidebar={toggleSidebar}
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
        setSearchTerm={setSearchTerm}
      />
      <SearchModal
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <div className="flex flex-grow overflow-hidden">
        <Sidebar
          isSidebarCollapsed={isSidebarCollapsed}
          activeCategory={activeCategory}
          onCategoryClick={handleCategoryClick}
          openContactsModal={openContactsModal}
          onAddFolderClick={handleAddFolderClick}
          isSearchOpen={isSearchOpen}
        />

        <HomePageBody
          activeCategory={activeCategory}
          isContactsModalOpen={isContactsModalOpen}
          setIsContactsModalOpen={setIsContactsModalOpen}
          setIsAddFolderModalOpen={setIsAddFolderModalOpen}
          isAddFolderModalOpen={isAddFolderModalOpen}
          setActiveCategory={setActiveCategory}
          isSearchOpen={isSearchOpen}
        />
      </div>
    </div>
  );
};

export default Home;

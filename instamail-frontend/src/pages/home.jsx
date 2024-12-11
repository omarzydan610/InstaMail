import React, { useState, useEffect } from "react";
import TopBar from "../components/HomePageComponents/TopBar";
import Sidebar from "../components/HomePageComponents/Sidebar";
import HomePageBody from "../components/HomePageComponents/HomePageBody";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import AddFolderModal from "../components/userFolders/AddFolderModal"; // Import the AddFolderModal

const Home = () => {
  const { token } = useAppContext();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("Inbox");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isContactsModalOpen, setIsContactsModalOpen] = useState(false);
  const [isAddFolderModalOpen, setIsAddFolderModalOpen] = useState(false); // State for Add Folder Modal
  const [folderName, setFolderName] = useState("");

  const openContactsModal = () => setIsContactsModalOpen(true);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  useEffect(() => {
    if (!token) {
      console.log();
      navigate("/login");
    }
  }, [token, navigate]);

  const handleAddFolderClick = () => {
    setIsAddFolderModalOpen(true); // Open Add Folder Modal
  };

  const closeAddFolderModal = () => {
    setIsAddFolderModalOpen(false); // Close Add Folder Modal
  };

  const handleSaveFolder = (name) => {
    console.log("Folder saved:", name);
    setFolderName(name); // Update folder name state if necessary
    closeAddFolderModal(); // Close modal after saving
  };

  return (
    <div className="h-screen flex flex-col">
      <TopBar toggleSidebar={toggleSidebar} />

      <div className="flex flex-grow overflow-hidden">
        <Sidebar
          isSidebarCollapsed={false}
          activeCategory={activeCategory}
          onCategoryClick={handleCategoryClick}
          openContactsModal={openContactsModal}
          onAddFolderClick={handleAddFolderClick} // Pass the handler to the Sidebar
        />

        <HomePageBody
          activeCategory={activeCategory}
          isContactsModalOpen={isContactsModalOpen}
          setIsContactsModalOpen={setIsContactsModalOpen}
        />
      </div>

      <AddFolderModal
        isOpen={isAddFolderModalOpen}
        onClose={closeAddFolderModal}
        onSave={handleSaveFolder}
      />
    </div>
  );
};

export default Home;

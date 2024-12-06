import React, { useState } from "react";
import {
  FaInbox,
  FaPaperPlane,
  FaDraftingCompass,
  FaTrashAlt,
  FaBars,
} from "react-icons/fa";

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("Inbox");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleMouseEnter = () => {
    if (!isSidebarCollapsed) return; // Do nothing if not collapsed
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isSidebarCollapsed) return; // Do nothing if not collapsed
    setIsHovered(false);
  };

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between bg-blue-700 text-white px-4 py-3 relative">
        {/* Hamburger Icon */}
        <div
          className="cursor-pointer hover:text-gray-300"
          onClick={toggleSidebar}
        >
          <FaBars />
        </div>
        {/* App Label */}
        <div className="text-lg font-bold ml-4" style={{ userSelect: "none" }}>
          InstaMail
        </div>
        {/* Spacer */}
        <div className="flex-grow"></div>
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search"
          className="w-3/6 px-3 py-1 rounded-full outline-none text-black"
        />
        {/* Spacer */}
        <div className="ml-4"></div>
        {/* Spacer */}
        <div className="flex-grow"></div>
        {/* User Name */}
        <div className="font-semibold mr-4 relative cursor-pointer">
          <span
            className="p-3 rounded-lg hover:bg-blue-600"
            style={{ userSelect: "none" }}
            onClick={() => togglePopup()}
          >
            John Doe
          </span>
          {/* Popup */}
          {isPopupVisible && (
            <div className="absolute top-8 right-0 mt-2 bg-white text-black shadow-lg border border-gray-200 rounded-lg p-4 z-50 w-56">
              <p className="font-semibold">John Doe</p>
              <p className="text-sm text-gray-500">john.doe@example.com</p>
              <p className="text-sm text-gray-500">+123 456 7890</p>
              <button
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                onClick={() => alert("Signed out")}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <div
          className={`transition-all duration-300 ${
            isSidebarCollapsed && !isHovered ? "w-12" : "w-1/5"
          } bg-gray-100 py-4`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ul>
            <li
              className={`flex items-center space-x-2 cursor-pointer text-lg hover:bg-blue-100 py-3 pl-3 rounded-lg ${
                activeCategory === "Inbox" ? "text-blue-600 font-bold" : ""
              }`}
              onClick={() => handleCategoryClick("Inbox")}
            >
              <FaInbox />
              {(!isSidebarCollapsed || isHovered) && (
                <span className="pl-2">Inbox</span>
              )}
            </li>
            <li
              className={`flex items-center space-x-2 cursor-pointer text-lg hover:bg-blue-100 py-3 pl-3 rounded-lg ${
                activeCategory === "Sent" ? "text-blue-600 font-bold" : ""
              }`}
              onClick={() => handleCategoryClick("Sent")}
            >
              <FaPaperPlane />
              {(!isSidebarCollapsed || isHovered) && (
                <span className="pl-2">Sent</span>
              )}
            </li>
            <li
              className={`flex items-center space-x-2 cursor-pointer text-lg hover:bg-blue-100 py-3 pl-3 rounded-lg ${
                activeCategory === "Drafts" ? "text-blue-600 font-bold" : ""
              }`}
              onClick={() => handleCategoryClick("Drafts")}
            >
              <FaDraftingCompass />
              {(!isSidebarCollapsed || isHovered) && (
                <span className="pl-2">Drafts</span>
              )}
            </li>
            <li
              className={`flex items-center space-x-2 cursor-pointer text-lg hover:bg-blue-100 py-3 pl-3 rounded-lg ${
                activeCategory === "Deleted" ? "text-blue-600 font-bold" : ""
              }`}
              onClick={() => handleCategoryClick("Deleted")}
            >
              <FaTrashAlt />
              {(!isSidebarCollapsed || isHovered) && (
                <span className="pl-2">Deleted</span>
              )}
            </li>
          </ul>
        </div>

        {/* Page Body */}
        <div className="flex-grow bg-white p-4">
          <h2 className="text-2xl font-semibold">{activeCategory}</h2>
          {/* Additional content will go here */}
        </div>
        {/* New Message Button */}
        <div className="fixed bottom-6 right-6">
          <button className="flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-transform duration-200 hover:scale-110">
            <span className="text-2xl font-bold -translate-y-0.5">+</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

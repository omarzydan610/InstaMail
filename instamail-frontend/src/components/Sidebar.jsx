import React, { useState } from "react";
import {
  FaInbox,
  FaPaperPlane,
  FaDraftingCompass,
  FaTrashAlt,
} from "react-icons/fa";

const categories = [
  { name: "Inbox", icon: <FaInbox /> },
  { name: "Sent", icon: <FaPaperPlane /> },
  { name: "Drafts", icon: <FaDraftingCompass /> },
  { name: "Trash", icon: <FaTrashAlt /> },
];

const Sidebar = ({ isSidebarCollapsed, activeCategory, onCategoryClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    if (!isSidebarCollapsed) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isSidebarCollapsed) return;
    setIsHovered(false);
  };

  return (
    <div
      className={`transition-all duration-300 ${
        isSidebarCollapsed && !isHovered ? "w-12" : "w-1/5"
      } bg-gray-100 py-4`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ul>
        {categories.map((category) => (
          <li
            key={category.name}
            className={`flex items-center space-x-2 cursor-pointer text-lg hover:bg-blue-100 py-3 pl-3 rounded-lg ${
              activeCategory === category.name ? "text-blue-600 font-bold" : ""
            }`}
            onClick={() => onCategoryClick(category.name)}
          >
            {category.icon}
            {(!isSidebarCollapsed || isHovered) && (
              <span className="pl-2">{category.name}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

import React, { useState } from "react";
import {
  FaInbox,
  FaPaperPlane,
  FaDraftingCompass,
  FaTrashAlt,
  FaAddressBook,
} from "react-icons/fa";

const categories = [
  { name: "Inbox", icon: <FaInbox /> },
  { name: "Sent", icon: <FaPaperPlane /> },
  { name: "Drafts", icon: <FaDraftingCompass /> },
  { name: "Trash", icon: <FaTrashAlt /> },
  { name: "Contacts", icon: <FaAddressBook />, isContacts: true }, // Add Contacts
];

const Sidebar = ({
  isSidebarCollapsed,
  activeCategory,
  onCategoryClick,
  openContactsModal,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    if (!isSidebarCollapsed) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isSidebarCollapsed) return;
    setIsHovered(false);
  };

  const handleCategoryClick = (category) => {
    if (category.isContacts) {
      openContactsModal(); // Open Contacts Modal
    } else {
      onCategoryClick(category.name); // Handle other categories
    }
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
            onClick={() => handleCategoryClick(category)}
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

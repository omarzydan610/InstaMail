import React, { useState } from "react";
import { useAppContext } from "../../../contexts/AppContext";
import CategoryItem from "./CategoryItem";
import FolderList from "./FolderList";
import { CATEGORIES } from "./constants";

const Sidebar = ({
  isSidebarCollapsed,
  activeCategory,
  onCategoryClick,
  openContactsModal,
  onAddFolderClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState({});
  const { fetchContacts } = useAppContext();

  const otherCategories = CATEGORIES.filter(cat => !cat.isContacts);
  const contactsCategory = CATEGORIES.find(cat => cat.isContacts);

  // Mock folders - replace with your actual folders data
  const folders = [
    { id: 1, name: "Personal" },
    { id: 2, name: "Work" },
  ];

  const toggleFolder = (folderId) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

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
      fetchContacts();
      openContactsModal();
    } else {
      onCategoryClick(category.name);
    }
  };

  return (
    <div
      className={`transition-all duration-300 ${
        isSidebarCollapsed && !isHovered ? "w-12" : "w-1/6"
      } bg-gray-100 py-4 flex flex-col justify-between`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ul>
        {otherCategories.map((category) => (
          <React.Fragment key={category.name}>
            <CategoryItem
              category={category}
              isActive={activeCategory === category.name}
              isCollapsed={isSidebarCollapsed}
              isHovered={isHovered}
              onClick={() =>
                category.name === "Folders"
                  ? toggleFolder("main")
                  : handleCategoryClick(category)
              }
              showFolderToggle={category.name === "Folders"}
              isFolderExpanded={expandedFolders["main"]}
            />
            {category.name === "Folders" &&
              expandedFolders["main"] &&
              (!isSidebarCollapsed || isHovered) && (
                <FolderList
                  folders={folders}
                  activeCategory={activeCategory}
                  onCategoryClick={onCategoryClick}
                  onAddFolderClick={onAddFolderClick}
                />
              )}
          </React.Fragment>
        ))}
      </ul>
      <ul>
        <CategoryItem
          category={contactsCategory}
          isActive={activeCategory === contactsCategory.name}
          isCollapsed={isSidebarCollapsed}
          isHovered={isHovered}
          onClick={() => handleCategoryClick(contactsCategory)}
        />
      </ul>
    </div>
  );
};

export default Sidebar; 
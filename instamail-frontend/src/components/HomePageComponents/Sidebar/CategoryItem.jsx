import React from 'react';
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { STYLES } from './constants';

const CategoryItem = ({ 
  category, 
  isActive, 
  isCollapsed, 
  isHovered, 
  onClick, 
  showFolderToggle, 
  isFolderExpanded 
}) => (
  <li
    className={`${STYLES.categoryItem} ${isActive ? STYLES.activeCategory : ""}`}
    onClick={onClick}
  >
    {category.icon}
    {(!isCollapsed || isHovered) && (
      <>
        <span className="pl-2">{category.name}</span>
        {showFolderToggle && (
          <button className="ml-auto mr-2">
            {isFolderExpanded ? <FaChevronDown /> : <FaChevronRight />}
          </button>
        )}
      </>
    )}
  </li>
);

export default CategoryItem; 
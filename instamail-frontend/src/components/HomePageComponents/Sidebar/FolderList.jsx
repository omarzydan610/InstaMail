import React from "react";
import { FaFolder } from "react-icons/fa";
import { STYLES } from "./constants";

const FolderList = ({
  folders,
  activeCategory,
  onCategoryClick,
  onAddFolderClick,
}) => (
  <ul className="ml-6">
    {folders.map((folder) => (
      <li
        key={folder.id}
        className={`${STYLES.folderItem} ${
          typeof activeCategory === "object" &&
          activeCategory.name === folder.name
            ? STYLES.activeCategory
            : ""
        }`}
        onClick={() => onCategoryClick(folder)}
      >
        <FaFolder />
        <span className="pl-2">{folder.name}</span>
      </li>
    ))}
    <li className={STYLES.addFolderButton} onClick={onAddFolderClick}>
      <span>+ Add New Folder</span>
    </li>
  </ul>
);

export default FolderList;

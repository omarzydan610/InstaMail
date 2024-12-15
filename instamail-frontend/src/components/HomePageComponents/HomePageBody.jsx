import React, { useState } from "react";
import EmailList from "../EmailComponents/EmailList";
import ContactsModal from "../ContactsComponents/ContactsModal";
import FloatingButton from "./FloatingButton";
import ErrorMessage from "../ErrorMessage";
import { FaTrash } from "react-icons/fa";
import AddFolderModal from "../userFolders/AddFolderModal";

const HomePageBody = ({
  activeCategory,
  isContactsModalOpen,
  setIsContactsModalOpen,
  onDeleteFolder,
  isAddFolderModalOpen,
  setIsAddFolderModalOpen,
}) => {
  const isFolder =
    activeCategory !== "Inbox" &&
    activeCategory !== "Sent" &&
    activeCategory !== "Drafts" &&
    activeCategory !== "Trash" &&
    activeCategory !== "Starred" &&
    activeCategory !== "Folders";

  const closeContactsModal = () => setIsContactsModalOpen(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [folderName, setFolderName] = useState("");
  console.log(folderName);

  const closeAddFolderModal = () => {
    setIsAddFolderModalOpen(false); // Close Add Folder Modal
  };

  const handleSaveFolder = (name) => {
    setFolderName(name);
    closeAddFolderModal();
  };
  return (
    <div className="flex-1 p-4">
      <div className="flex items-center justify-between mb-4 mx-4">
        <h2 className="text-2xl font-semibold">{activeCategory}</h2>
        {isFolder && (
          <button
            onClick={() => onDeleteFolder(activeCategory)}
            className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-md transition-colors duration-200 ease-in-out flex items-center gap-2"
            title="Delete folder"
          >
            <FaTrash size={16} />
            <span>Delete Folder</span>
          </button>
        )}
      </div>
      <EmailList
        activeCategory={activeCategory}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <ContactsModal
        isOpen={isContactsModalOpen}
        onClose={closeContactsModal}
      />
      <AddFolderModal
        isOpen={isAddFolderModalOpen}
        onClose={closeAddFolderModal}
        onSave={handleSaveFolder}
      />
      <FloatingButton
        activeCategory={activeCategory}
        setCurrentPage={setCurrentPage}
      />
      <ErrorMessage />
    </div>
  );
};

export default HomePageBody;

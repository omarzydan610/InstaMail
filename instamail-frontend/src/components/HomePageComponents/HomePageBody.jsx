import React, { useState } from "react";
import EmailList from "../EmailComponents/EmailList";
import ContactsModal from "../ContactsComponents/ContactsModal";
import FloatingButton from "./FloatingButton";
import ErrorMessage from "../ErrorMessage";
import { FaTrash } from "react-icons/fa";
import AddFolderModal from "../userFolders/AddFolderModal";
import FolderService from "../../services/folderService";
import { useAppContext } from "../../contexts/AppContext";
import ConfirmDeleteModal from "../userFolders/DeleteConfirmModal";

const HomePageBody = ({
  activeCategory,
  isContactsModalOpen,
  setIsContactsModalOpen,
  isAddFolderModalOpen,
  setIsAddFolderModalOpen,
  setActiveCategory,
}) => {
  const { fetchFolders, fetchEmails } = useAppContext();
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
  const getCategoryName = () => {
    if (typeof activeCategory === "object") {
      return activeCategory.name;
    }
    return activeCategory;
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleteModalOpen(false);
    setActiveCategory("Inbox");
    await fetchEmails("Inbox", 0, 6, true);
    setCurrentPage(1);
    await FolderService.deleteFolder(activeCategory.id);
    fetchFolders();
  };

  return (
    <div className="flex-1 p-4">
      <div className="flex items-center justify-between mb-4 mx-4">
        <h2 className="text-2xl font-semibold">{getCategoryName()}</h2>
        {isFolder && (
          <button
            onClick={handleDeleteClick}
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
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        message={`Are you sure you want to delete the folder "${getCategoryName()}"?`}
      />
    </div>
  );
};

export default HomePageBody;

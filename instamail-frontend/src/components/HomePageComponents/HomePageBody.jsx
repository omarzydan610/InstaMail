import React, { useState, useEffect } from "react";
import EmailList from "../EmailComponents/EmailList";
import ContactsModal from "../ContactsComponents/ContactsModal";
import FloatingButton from "./FloatingButton";
import ErrorMessage from "../ErrorMessage";
import { FaTrash, FaEdit, FaSort } from "react-icons/fa";
import AddFolderModal from "../userFolders/AddFolderModal";
import FolderService from "../../services/folderService";
import { useAppContext } from "../../contexts/AppContext";
import ConfirmDeleteModal from "../userFolders/DeleteConfirmModal";
import RenameFolderModal from "../userFolders/RenameFolderModal";

const HomePageBody = ({
  activeCategory,
  isContactsModalOpen,
  setIsContactsModalOpen,
  isAddFolderModalOpen,
  setIsAddFolderModalOpen,
  setActiveCategory,
}) => {
  const {
    fetchFolders,
    fetchEmails,
    sortStrategy,
    setSortStrategy,
    sortingTechniques,
    fetchEmailsForFolder,
  } = useAppContext();
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
    console.log(activeCategory);

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

  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);

  const handleRenameClick = () => {
    setIsRenameModalOpen(true);
  };

  const handleRenameConfirm = async (newName) => {
    await FolderService.renameFolder(activeCategory.id, newName);
    activeCategory.name = newName;
    console.log(newName);
    setIsRenameModalOpen(false);
  };

  useEffect(() => {
    setSortStrategy(1);
  }, [activeCategory]);

  useEffect(() => {
    const changeSort = async () => {
      if (typeof activeCategory === "object") {
        await fetchEmailsForFolder(activeCategory.id, 0, 6, true);
      } else {
        await fetchEmails(activeCategory, 0, 6, true);
      }
      setCurrentPage(1);
    };
    changeSort();
  }, [sortStrategy]);

  const changeSortStrategy = async () => {
    console.log("changeSortStrategy", sortStrategy);
    setSortStrategy((prev) => (prev === 5 ? 1 : prev + 1));
  };

  return (
    <div className="flex-1 p-4">
      <div className="flex items-center justify-between mb-4 mx-4">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-semibold">{getCategoryName()}</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={changeSortStrategy}
              className="p-2 text-gray-600 hover:text-blue-500 rounded-full hover:bg-gray-100 transition-colors duration-200 ease-in-out"
              title="Change sort order"
            >
              <FaSort size={20} />
            </button>
            <div>
              <span>{sortingTechniques[sortStrategy]}</span>
            </div>
          </div>
        </div>
        {isFolder && (
          <div className="flex gap-2">
            <button
              onClick={handleRenameClick}
              className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-md transition-colors duration-200 ease-in-out flex items-center gap-2"
              title="Rename folder"
            >
              <FaEdit size={16} />
              <span>Rename</span>
            </button>
            <button
              onClick={handleDeleteClick}
              className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-md transition-colors duration-200 ease-in-out flex items-center gap-2"
              title="Delete folder"
            >
              <FaTrash size={16} />
              <span>Delete Folder</span>
            </button>
          </div>
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
      <RenameFolderModal
        isOpen={isRenameModalOpen}
        onClose={() => setIsRenameModalOpen(false)}
        renameFolder={handleRenameConfirm}
      />
    </div>
  );
};

export default HomePageBody;

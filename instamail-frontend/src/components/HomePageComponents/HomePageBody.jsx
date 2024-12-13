import React from "react";
import EmailList from "../EmailComponents/EmailList";
import ContactsModal from "../ContactsComponents/ContactsModal";
import FloatingButton from "./FloatingButton";
import ErrorMessage from "../ErrorMessage";
import { FaTrash } from "react-icons/fa";

const HomePageBody = ({
  activeCategory,
  isContactsModalOpen,
  setIsContactsModalOpen,
  onDeleteFolder,
}) => {
  const isFolder =
    activeCategory !== "Inbox" &&
    activeCategory !== "Sent" &&
    activeCategory !== "Drafts" &&
    activeCategory !== "Trash" &&
    activeCategory !== "Starred" &&
    activeCategory !== "Folders";

  const closeContactsModal = () => setIsContactsModalOpen(false);
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
      <EmailList activeCategory={activeCategory} />
      <ContactsModal
        isOpen={isContactsModalOpen}
        onClose={closeContactsModal}
      />
      <FloatingButton />
      <ErrorMessage />
    </div>
  );
};

export default HomePageBody;

import React, { useState } from "react";
import { useAppContext } from "../../contexts/AppContext";
import MailsService from "../../services/MailsService";
import FolderService from "../../services/folderService";

const NormalEmailModal = ({
  email,
  onClose,
  setEmails,
  activeCategory,
  setCurrentPage,
}) => {
  const { userEmail, fetchEmails, folders } = useAppContext();
  const [isStarred, setIsStarred] = useState(
    userEmail === email.senderEmail
      ? email.isSenderStarred
      : email.isReceiverStarred
  );
  const [selectedFolder, setSelectedFolder] = useState(""); // Track the selected folder
  const [showFolderModal, setShowFolderModal] = useState(false); // Control the folder modal visibility

  // Handle Star Toggle
  const handleStarToggle = async () => {
    await MailsService.toggleStar(email.id);
    setIsStarred(!isStarred);

    // Update the email in the emails list
    setEmails((prevEmails) =>
      prevEmails.map((prevEmail) =>
        prevEmail.id === email.id
          ? {
              ...prevEmail,
              isSenderStarred:
                userEmail === email.senderEmail
                  ? !prevEmail.isSenderStarred
                  : prevEmail.isSenderStarred,
              isReceiverStarred:
                userEmail === email.receiverEmail
                  ? !prevEmail.isReceiverStarred
                  : prevEmail.isReceiverStarred,
            }
          : prevEmail
      )
    );
    if (activeCategory === "Starred") {
      await fetchEmails("Starred", 0, 6, true);
      setCurrentPage(1);
    }
  };

  // Handle Move to Folder
  const handleMoveToFolder = async () => {
    if (selectedFolder) {
      console.log(selectedFolder);
      await FolderService.moveMailToFolder( email.id, selectedFolder);
      setEmails((prevEmails) =>
        prevEmails.filter((prevEmail) => prevEmail.id !== email.id)
      );
      setCurrentPage(1);
      onClose();
      setShowFolderModal(false); // Close the folder modal
    } else {
      alert("Please select a folder to move the email to.");
    }
  };

  const handleDelete = async () => {
    await MailsService.toggleDeletion(email.id);
    setEmails((prevEmails) =>
      prevEmails.filter((prevEmail) => prevEmail.id !== email.id)
    );
    setCurrentPage(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
      <div className="bg-white/95 dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-3xl h-[85vh] overflow-hidden relative border border-gray-200 dark:border-gray-700 animate-slideUp">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
        >
          <svg
            className="w-6 h-6 text-gray-500 hover:text-gray-700 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Email Content */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="pb-4 border-b dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                {email.subject}
              </h2>
            </div>

            <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <span className="font-medium">From:</span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                  {email.senderEmail}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">To:</span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                  {email.receiverEmail}
                </span>
              </div>
            </div>
          </div>

          <div className="email-body overflow-y-auto max-h-[50vh] pr-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p className="whitespace-pre-wrap">{email.content}</p>
          </div>
        </div>

        {/* Star Checkbox */}
        <div className="absolute bottom-16 right-6 flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={isStarred}
              onChange={handleStarToggle}
              className="hidden"
            />
            <svg
              className={`w-8 h-8 transition-colors duration-200 ${
                isStarred
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-400 hover:text-yellow-400"
              }`}
              fill={isStarred ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </label>
        </div>

        {/* Buttons at Bottom */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-6">
          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className="group flex items-center gap-2 py-3 px-6 bg-red-500/90 text-white rounded-xl hover:bg-red-600 transition-all duration-300 hover:shadow-lg"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            <span>Delete Email</span>
          </button>
          {/* Move to Folder Button */}
          <button
            onClick={() => setShowFolderModal(true)} // Show the folder modal
            className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Move to Folder
          </button>

        </div>
      </div>

      {/* Folder Modal (Pop-up) */}
      {showFolderModal && (
        <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
          <div className="bg-white p-6 rounded-lg shadow-xl w-80">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Select Folder</h3>
            <select
              value={selectedFolder}
              onChange={(e) => setSelectedFolder(e.target.value)}
              className="p-2 border rounded-lg mb-4 w-full"
            >
              <option value="">Select Folder</option>
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleMoveToFolder}
                className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Move
              </button>
              <button
                onClick={() => setShowFolderModal(false)}
                className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NormalEmailModal;

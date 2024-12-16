import React, { useState } from "react";
import FolderService from "../../services/folderService";
import { useAppContext } from "../../contexts/AppContext";

const AddFolderModal = ({ isOpen, onClose, onSave }) => {
  const [folderName, setFolderName] = useState("");
  const { fetchFolders } = useAppContext();

  if (!isOpen) return null;

  const handleSave = async () => {
    try {
      const response = await FolderService.createFolder(folderName);
      console.log('Folder created successfully:', response);
      setFolderName("");
      onClose();
    } catch (error) {
      console.error('Error creating folder:', error);
      alert('There was an error creating the folder. Please try again.');
    }
    fetchFolders();
  };
  

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add New Folder</h2>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Folder Name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="py-2 px-4 bg-gray-500 text-white rounded-lg mr-2 hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFolderModal;

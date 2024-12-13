import {
  FaInbox,
  FaPaperPlane,
  FaDraftingCompass,
  FaTrashAlt,
  FaAddressBook,
  FaFolder,
  FaStar,
} from "react-icons/fa";

export const CATEGORIES = [
  { name: "Inbox", icon: <FaInbox /> },
  { name: "Sent", icon: <FaPaperPlane /> },
  { name: "Drafts", icon: <FaDraftingCompass /> },
  { name: "Starred", icon: <FaStar /> },
  { name: "Trash", icon: <FaTrashAlt /> },
  { name: "Folders", icon: <FaFolder /> },
  { name: "Contacts", icon: <FaAddressBook />, isContacts: true },
];

export const STYLES = {
  categoryItem: `flex items-center space-x-2 cursor-pointer text-lg hover:bg-blue-100 py-3 pl-3 rounded-lg`,
  activeCategory: `text-blue-600 font-bold`,
  folderItem: `flex items-center space-x-2 cursor-pointer text-lg hover:bg-blue-100 py-2 pl-3 rounded-lg`,
  addFolderButton: `mt-2 flex items-center justify-center space-x-2 cursor-pointer text-sm hover:bg-blue-50 py-1.5 mx-2 rounded-md text-blue-500 border border-blue-300`,
};

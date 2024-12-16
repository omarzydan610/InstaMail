import React, { createContext, useState, useContext, useEffect } from "react";
import ContactService from "../services/ContactsService";
import MailsService from "../services/MailsService";
import FolderService from "../services/folderService";
// Create the context
const AppContext = createContext();

// Create the provider component
export const AppProvider = ({ children }) => {
  // Define the shared state
  const [username, setusername] = useState(null);
  const [userEmail, setuserEmail] = useState(null);
  const [firstName, setfirstName] = useState(null);
  const [lastName, setlastName] = useState(null);
  const [phoneNumber, setphoneNumber] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [contacts, setContacts] = useState([]);
  const [isFetalError, setIsFetalError] = useState(false);
  const [selectedContactEmails, setSelectedContactEmails] = useState(null);
  const [folders, setFolders] = useState([]);

  const fetchContacts = async () => {
    try {
      const data = await ContactService.getContacts();
      setContacts(data);
      return data;
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
      setIsFetalError(true);
    }
  };

  const fetchFolders = async () => {
    try {
      const data = await FolderService.getFolders();
      setFolders(data);
      return data;
    } catch (error) {
      console.error("Failed to fetch folders:", error);
      setIsFetalError(true);
    }
  };


  const fetchContactEmails = async (contact) => {
    try {
      const contactData = await ContactService.getEmails(contact.contactId);
      const contactEmails = contactData.map((item) => item.email);
      console.log("contactEmails", contactEmails);
      setSelectedContactEmails(contactEmails);
      return contactEmails;
    } catch (error) {
      console.error("Failed to fetch contact emails:", error);
      return [];
    }
  };
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    if (username) {
      fetchEmails("inbox", 0, 6, true);
      fetchFolders();
    }
  }, [username]);

  const fetchEmails = async (type, start, size, clear) => {
    type = type.toLowerCase();
    switch (type) {
      case "inbox":
        type = "inbox";
        break;
      case "sent":
        type = "sent";
        break;
      case "drafts":
        type = "drafted";
        break;
      case "starred":
        type = "starred";
        break;
      default:
        type = "deleted";
        break;
    }
    console.log("fetchEmails", type, start, size, clear);
    const emails = await MailsService.getMails(type, start, size);
    console.log("emails", emails);
    if (clear) {
      setEmails([]);
    }
    setEmails((prevEmails) => [...prevEmails, ...emails]);
    return emails;
  };

  // Combine the state into a single object
  const contextValue = {
    username,
    setusername,
    userEmail,
    setuserEmail,
    firstName,
    setfirstName,
    lastName,
    setlastName,
    phoneNumber,
    setphoneNumber,
    token,
    setToken,
    contacts,
    setContacts,
    emails,
    setEmails,
    fetchContacts,
    isFetalError,
    setIsFetalError,
    selectedContactEmails,
    setSelectedContactEmails,
    fetchContactEmails,
    fetchEmails,
    folders,
    setFolders,
    fetchFolders,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};

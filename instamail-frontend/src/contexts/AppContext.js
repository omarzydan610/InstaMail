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
  const sortingTechniques = {
    1: "Date Asc",
    2: "Date Desc",
    3: "Subject Asc",
    4: "Subject Desc",
    5: "Priority",
  };
  const [sortStrategy, setSortStrategy] = useState(1);

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

  const fetchEmailsForFolder = async (categoryId, start, size, clear) => {
    console.log("sortStrategy", sortStrategy);
    const emails = await FolderService.getMailsByFolderId(
      categoryId,
      start,
      size,
      sortStrategy
    );
    if (clear) {
      setEmails(emails);
    } else {
      setEmails((prevEmails) => [...prevEmails, ...emails]);
    }
  };

  useEffect(() => {
    if (username) {
      fetchEmails("inbox", 0, 6, true);
      fetchFolders();
    }
  }, [username]);

  const fetchEmails = async (type, start, size, clear) => {
    console.log("sortStrategy", sortStrategy);
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
    const emails = await MailsService.getMails(type, start, size, sortStrategy);
    console.log("emails", emails);
    if (clear) {
      setEmails([]);
    }
    setEmails((prevEmails) => [...prevEmails, ...emails]);
    return emails;
  };

  const [BackNotify, setBackNotify] = useState(0);

  useEffect(() => {
    // Connect to the SSE endpoint
    const eventSource = new EventSource(
      "http://localhost:8080/api/sse/connect"
    );

    // Listen for email-sent events
    eventSource.addEventListener("email-sent", (event) => {
      console.log("Email Notification Received:", event.data);
      setBackNotify((prev) => prev + 1);
    });

    // Handle errors
    eventSource.onerror = () => {
      console.error("SSE connection error");
      eventSource.close();
    };

    // Cleanup on component unmount
    return () => {
      eventSource.close();
      console.log("SSE connection closed");
    };
  }, []);

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
    sortStrategy,
    setSortStrategy,
    sortingTechniques,
    fetchEmailsForFolder,
    BackNotify,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};

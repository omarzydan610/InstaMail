import React, { createContext, useState, useContext } from "react";
import ContactService from "../services/ContactsService";

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

  const emails = [
    {
      id: 1,
      subject: "Meeting Tomorrow",
      sender: "joe@InstaMail.com",
      receiver: "omar@InstaMail.com",
      body: "Don't forget about the meeting tomorrow.",
    },
    {
      id: 2,
      subject: "Project Update",
      sender: "omar@InstaMail.com",
      receiver: "abdo@InstaMail.com",
      body: "The project is on track. Let's catch up soon.",
    },
    {
      id: 3,
      subject: "quize",
      sender: "abdo@InstaMail.com",
      receiver: "omar@InstaMail.com",
      body: "did you study?",
    },
    {
      id: 4,
      subject: "quize",
      sender: "abdo@InstaMail.com",
      receiver: "omar@InstaMail.com",
      body: "did youa;efmv;ka;kljkhjkb kg hjkg khjghkhj ewngflaknelknglandmlngfaemnglknalekng,mdsnglkjsebnrg\neakjbfkajebfkjabekgfjbva ebwf study?",
    },
    {
      id: 5,
      subject: "quize",
      sender: "abdo@InstaMail.com",
      receiver: "omar@InstaMail.com",
      body: "did you study?",
    },
    {
      id: 6,
      subject: "quize",
      sender: "abdo@InstaMail.com",
      receiver: "omar@InstaMail.com",
      body: "did you study?",
    },
    {
      id: 7,
      subject: "quize",
      sender: "abdo@InstaMail.com",
      receiver: "omar@InstaMail.com",
      body: "did you study?",
    },
    {
      id: 8,
      subject: "quize",
      sender: "abdo@InstaMail.com",
      receiver: "omar@InstaMail.com",
      body: "did you study?",
    },
    {
      id: 9,
      subject: "quize",
      sender: "abdo@InstaMail.com",
      receiver: "omar@InstaMail.com",
      body: "did you study?",
    },
    {
      id: 10,
      subject: "quize",
      sender: "abdo@InstaMail.com",
      receiver: "omar@InstaMail.com",
      body: "did you study?",
    },
  ];

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
    fetchContacts,
    isFetalError,
    setIsFetalError,
    selectedContactEmails,
    setSelectedContactEmails,
    fetchContactEmails,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};

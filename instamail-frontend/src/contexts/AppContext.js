import React, { createContext, useState, useContext } from "react";

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
  const [selectedContact, setSelectedContact] = useState(null);
  const [contacts, setContacts] = useState([
    {
      name: "John Doe",
      emails: ["john@example.com", "jane@example.com"],
    },
    { name: "Jane Smith", emails: ["jane@example.com"] },
  ]);
  const emails = [
    {
      id: 1,
      subject: "Meeting Tomorrow",
      sender: "joe@InstaMail.com",
      reseaver: "omar@InstaMail.com",
      body: "Don't forget about the meeting tomorrow.",
    },
    {
      id: 2,
      subject: "Project Update",
      sender: "omar@InstaMail.com",
      reseaver: "abdo@InstaMail.com",
      body: "The project is on track. Let's catch up soon.",
    },
    {
      id: 3,
      subject: "quize",
      sender: "abdo@InstaMail.com",
      reseaver: "omar@InstaMail.com",
      body: "did you study?",
    },
    {
      id: 4,
      subject: "quize",
      sender: "abdo@InstaMail.com",
      reseaver: "omar@InstaMail.com",
      body: "did youa;efmv;ka;kljkhjkb kg hjkg khjghkhj ewngflaknelknglandmlngfaemnglknalekng,mdsnglkjsebnrg\neakjbfkajebfkjabekgfjbva ebwf study?",
    },
    {
      id: 5,
      subject: "quize",
      sender: "abdo@InstaMail.com",
      reseaver: "omar@InstaMail.com",
      body: "did you study?",
    },
    {
      id: 6,
      subject: "quize",
      sender: "abdo@InstaMail.com",
      reseaver: "omar@InstaMail.com",
      body: "did you study?",
    },
    {
      id: 7,
      subject: "quize",
      sender: "abdo@InstaMail.com",
      reseaver: "omar@InstaMail.com",
      body: "did you study?",
    },
    {
      id: 8,
      subject: "quize",
      sender: "abdo@InstaMail.com",
      reseaver: "omar@InstaMail.com",
      body: "did you study?",
    },
    {
      id: 9,
      subject: "quize",
      sender: "abdo@InstaMail.com",
      reseaver: "omar@InstaMail.com",
      body: "did you study?",
    },
    {
      id: 10,
      subject: "quize",
      sender: "abdo@InstaMail.com",
      reseaver: "omar@InstaMail.com",
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
    selectedContact,
    setSelectedContact,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};

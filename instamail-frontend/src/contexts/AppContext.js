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
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};

import React, { useState } from "react";
import ComposeEmail from "../ComposeEmailComponents/ComposeEmail";
import { useAppContext } from "../../contexts/AppContext";
const FloatingButton = () => {
  const [isComposeVisible, setComposeVisible] = useState(false);

  const [contactsList, setContactsList] = useState([]);
  const { fetchContacts, fetchContactEmails } = useAppContext();
  const handleButtonClick = async () => {
    const contacts = await fetchContacts();
    setContactsList([]);

    const contactsWithEmails = await Promise.all(
      contacts.map(async (contact, index) => {
        const emails = await fetchContactEmails(contact);
        return {
          id: index + 1,
          name: contact.contactName,
          emails: emails,
        };
      })
    );

    setContactsList(contactsWithEmails);
    setComposeVisible(true);
  };
  console.log("contactsxx", contactsList);
  const closeComposeEmail = () => {
    setComposeVisible(false);
  };

  return (
    <div>
      <div className="fixed bottom-6 right-6">
        <button
          onClick={handleButtonClick}
          className="flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-transform duration-200 hover:scale-110"
        >
          <span className="text-2xl font-bold -translate-y-0.5">+</span>
        </button>
      </div>

      {isComposeVisible && (
        <ComposeEmail onClose={closeComposeEmail} contacts={contactsList} />
      )}
    </div>
  );
};

export default FloatingButton;

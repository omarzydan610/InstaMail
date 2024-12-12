import React from "react";

const ContactsList = ({ contacts, onSelectContact }) => {
  if (!contacts || contacts.length === 0) {
    return (
      <div className="p-4 text-gray-500 flex justify-center items-center mt-5 text-lg">
        No contacts found
      </div>
    );
  }

  return (
    <div>
      <ul className="space-y-2">
        {contacts.map((contact) => (
          <li
            key={contact.contactId}
            className="p-4 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer"
            onClick={() => onSelectContact(contact)}
          >
            {contact.contactName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactsList;

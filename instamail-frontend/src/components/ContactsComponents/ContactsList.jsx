import React from 'react';

const ContactsList = ({ contacts, onSelectContact, onAddContact }) => {
  return (
    <div>
      <ul className="space-y-2">
        {contacts.map((contact) => (
          <li
            key={contact.name}
            className="p-4 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer"
            onClick={() => onSelectContact(contact)}
          >
            {contact.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactsList; 
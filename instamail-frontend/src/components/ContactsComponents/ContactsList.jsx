import React from "react";

const ContactsList = ({ contacts, onSelectContact }) => {
  if (!contacts || contacts.length === 0) {
    return (
      <div className="p-4 text-center">
        <div className="text-gray-400">
          <svg
            className="mx-auto h-20 w-20"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <p className="mt-2 text-lg font-medium">No contacts found</p>
          <p className="mt-1 text-lg text-gray-500">
            Add contacts to select them when composing emails
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ul className="space-y-2">
        {contacts.map((contact) => (
          <li
            key={contact.contactId}
            className="p-4 bg-gray-200 hover:bg-gray-300 rounded cursor-pointer"
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

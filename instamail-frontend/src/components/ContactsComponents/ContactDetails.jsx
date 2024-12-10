import React from 'react';

const ContactDetails = ({ contact, onEdit, onDelete, onBack }) => {
  return (
    <div>
      <div className="bg-gray-100 p-4 rounded shadow-md space-y-4">
        <p><strong>Name:</strong> {contact.name}</p>
        {contact.emails?.map((email, index) => (
          <p key={index}>
            <strong>{index === 0 ? 'Email' : `Email ${index + 1}`}:</strong> {email}
          </p>
        ))}

      </div>
      <div className="mt-4 flex space-x-4">
        <button
          onClick={onEdit}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Back to Contacts
        </button>
      </div>
    </div>
  );
};

export default ContactDetails; 
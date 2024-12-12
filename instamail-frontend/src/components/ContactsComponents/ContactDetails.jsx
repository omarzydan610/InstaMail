import React from "react";
import { FiEdit } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { FiArrowLeft } from "react-icons/fi";
const ContactDetails = ({ contact, onEdit, onDelete, onBack, emails }) => {
  const contactName = contact
    ? contact.contactName || "Unnamed Contact"
    : "Loading...";

  return (
    <div>
      {console.log("xxxx", emails)}
      <div className="bg-gray-100 p-4 rounded shadow-md space-y-4">
        <p>
          <strong>Name:</strong> {contactName}
        </p>
        {emails.length > 0 ? (
          emails.map((email, index) => (
            <div key={index}>
              <p>
                <strong>{index === 0 ? "Email" : `Email ${index + 1}`}:</strong>{" "}
                {email}
              </p>
            </div>
          ))
        ) : (
          <p>No emails found for this contact.</p>
        )}
      </div>

      <div className="mt-4 flex justify-between">
        <button
          onClick={onEdit}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
        >
          <FiEdit /> Edit
        </button>
        <button
          onClick={onDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-2"
        >
          <FiTrash2 /> Delete
        </button>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 flex items-center gap-2"
        >
          <FiArrowLeft /> Back to Contacts
        </button>
      </div>
    </div>
  );
};

export default ContactDetails;

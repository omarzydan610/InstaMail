import React, { useState, useEffect } from "react";
import { useAppContext } from "../../contexts/AppContext";
import ContactServices from "../../services/ContactsService";

const ContactDetails = ({ selectedcontact, onEdit, onDelete, onBack }) => {
  const [contact, setContact] = useState(null);
  const [emails, setEmails] = useState([]);
  const [error, setError] = useState(null);
  

  setContact(selectedcontact);
  console.log(contact)
  console.log(selectedcontact);

  useEffect(() => {
    const fetchContact = async () => {
      if (selectedcontact && selectedcontact.contactId) {
        try {
          const contactData = await ContactServices.getEmails(selectedcontact.contactId);
          setContact(contactData);
          setEmails(contactData.emails || []);
        } catch (error) {
          setError("Failed to load contact details or emails");
          console.error(error);
        }
      } else {
        setError("Selected contact is invalid");
      }
    };

    // Only fetch contact details if selectedcontact is valid
    if (selectedcontact) {
      fetchContact();
    }else {}
  }, [selectedcontact]);

  const contactName = contact ? contact.contactName || 'Unnamed Contact' : 'Loading...';

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="bg-gray-100 p-4 rounded shadow-md space-y-4">
        <p><strong>Name:</strong> {contactName}</p>
        {emails.length > 0 ? (
          emails.map((email, index) => (
            <div key={index}>
              <p>
                <strong>{index === 0 ? 'Email' : `Email ${index + 1}`}:</strong> {email}
              </p>
            </div>
          ))
        ) : (
          <p>No emails found for this contact.</p>
        )}
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

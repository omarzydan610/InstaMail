import React, { useState } from "react";
import { useAppContext } from "../../contexts/AppContext";

const ContactsModal = ({ isOpen, onClose }) => {
  const { contacts } = useAppContext();
  const [selectedContact, setSelectedContact] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Track edit mode
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false); // Track delete confirmation

  if (!isOpen) return null;

  const handleEdit = (updatedContact) => {
    // Simulate saving changes to the contact
    setSelectedContact(updatedContact);
    setIsEditing(false); // Exit edit mode
  };

  const handleDelete = () => {
    // Simulate deleting the contact
    onClose(); // Close the modal after deleting
  };

  const handleCloseModal = () => {
    setSelectedContact(null);
    setIsEditing(false);
    setIsConfirmingDelete(false);
    onClose();
  };

  const handleBackToContacts = () => {
    setSelectedContact(null); // Return to the contacts list
    setIsEditing(false); // Ensure we exit edit mode
    setIsConfirmingDelete(false); // Exit delete confirmation
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-1/2 h-5/6 rounded-lg shadow-lg p-8 overflow-y-auto relative">
        <div className=" flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {selectedContact
              ? isEditing
                ? "Edit Contact"
                : "Contact Details"
              : "Contacts"}
          </h2>
          <button
            onClick={handleCloseModal}
            className="absolute top-3 right-4 text-xl text-gray-500 rounded-full hover:bg-gray-200 px-1.5"
          >
            &times;
          </button>
        </div>

        {selectedContact ? (
          isEditing ? (
            // Edit Contact Form
            <div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const updatedContact = {
                    name: e.target.name.value,
                    email: e.target.email.value,
                    phone: e.target.phone.value,
                  };
                  handleEdit(updatedContact);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block font-bold">Name:</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={selectedContact.name}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block font-bold">Email:</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={selectedContact.email}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block font-bold">Phone:</label>
                  <input
                    type="text"
                    name="phone"
                    defaultValue={selectedContact.phone}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : isConfirmingDelete ? (
            // Delete Confirmation Dialog
            <div className="text-center">
              <p className="mb-4 text-lg">
                Are you sure you want to delete this contact?
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => setIsConfirmingDelete(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            // Contact Details View
            <div>
              <div className="bg-gray-100 p-4 rounded shadow-md space-y-4">
                <p>
                  <strong>Name:</strong> {selectedContact.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedContact.email}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedContact.phone}
                </p>
              </div>
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => setIsConfirmingDelete(true)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={handleBackToContacts}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Back to Contacts
                </button>
              </div>
            </div>
          )
        ) : (
          // Contacts List View
          <ul className="space-y-2">
            {contacts.map((contact) => (
              <li
                key={contact.name}
                className="p-4 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer"
                onClick={() => setSelectedContact(contact)}
              >
                {contact.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ContactsModal;

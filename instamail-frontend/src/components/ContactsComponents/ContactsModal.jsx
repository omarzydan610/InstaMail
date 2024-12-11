import React, { useState, useEffect } from "react";
import { useAppContext } from "../../contexts/AppContext";
import { IoPersonAdd } from "react-icons/io5";
import ContactsList from "./ContactsList";
import ContactDetails from "./ContactDetails";
import ContactForm from "./ContactForm";
import UserService from "../../services/UserService";
import ContactServices from "../../services/ContactServices";

const ContactsModal = ({ isOpen, onClose }) => {
  const { contacts, setContacts } = useAppContext();
  const [selectedContact, setSelectedContact] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const data = await ContactServices.getContacts();
        setContacts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchContacts();
    }
  }, [isOpen, setContacts]);

  if (!isOpen) return null;

  const handleEdit = async (updatedContact) => {
    try {
      const editedContact = await ContactServices.editContact(selectedContact.id, updatedContact);
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact.id === selectedContact.id ? editedContact : contact
        )
      );
      setIsEditing(false);
      setSelectedContact(editedContact);
    } catch (error) {
      console.error("Failed to edit contact:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await ContactServices.deleteContact(selectedContact.id);
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact.id !== selectedContact.id)
      );
      setIsConfirmingDelete(false);
      setSelectedContact(null);
      onClose();
    } catch (error) {
      console.error("Failed to delete contact:", error);
    }
  };

  const handleCloseModal = () => {
    setSelectedContact(null);
    setIsEditing(false);
    setIsConfirmingDelete(false);
    setIsAdding(false);
    onClose();
  };

  const handleCreate = async (newContact) => {
    try {
      const createdContact = await UserService.addContact(newContact);
      setContacts((prevContacts) => [...prevContacts, createdContact]);
      setIsAdding(false);
    } catch (error) {
      console.error("Failed to add contact:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-1/2 h-5/6 rounded-lg shadow-lg p-8 overflow-y-auto relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {isAdding
              ? "Add Contact"
              : selectedContact
              ? isEditing
                ? "Edit Contact"
                : "Contact Details"
              : "Contacts"}
          </h2>
          <div className="flex items-center gap-4">
            {!isAdding && !selectedContact && (
              <button
                onClick={() => setIsAdding(true)}
                className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
              >
                <IoPersonAdd className="text-xl" />
              </button>
            )}
            <button
              onClick={handleCloseModal}
              className="absolute top-1 right-2 text-xl text-gray-500 rounded-full hover:bg-gray-200 px-1.5"
            >
              &times;
            </button>
          </div>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : isAdding ? (
          <ContactForm
            onSubmit={handleCreate}
            onCancel={() => setIsAdding(false)}
          />
        ) : selectedContact ? (
          isEditing ? (
            <ContactForm
              contact={selectedContact}
              onSubmit={handleEdit}
              onCancel={() => setIsEditing(false)}
            />
          ) : isConfirmingDelete ? (
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
            <ContactDetails
              contact={selectedContact}
              onEdit={() => setIsEditing(true)}
              onDelete={() => setIsConfirmingDelete(true)}
              onBack={() => setSelectedContact(null)}
            />
          )
        ) : (
          <ContactsList
            contacts={contacts}
            onSelectContact={setSelectedContact}
            onAddContact={() => setIsAdding(true)}
          />
        )}
      </div>
    </div>
  );
};

export default ContactsModal;

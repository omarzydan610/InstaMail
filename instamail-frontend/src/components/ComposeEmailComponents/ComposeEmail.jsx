import React from "react";
import ContactsModal from "./ContactsModal";
import EmailForm from "./EmailForm";

const ComposeEmail = ({ onClose, contacts }) => {
  const [showContacts, setShowContacts] = React.useState(false);
  const [selectedContact, setSelectedContact] = React.useState(null);
  const [recipients, setRecipients] = React.useState([]);
  const [error, setError] = React.useState("");
  const contactsRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (contactsRef.current && !contactsRef.current.contains(event.target)) {
        setShowContacts(false);
        setSelectedContact(null);
      }
    };

    if (showContacts) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showContacts]);

  const handleContactSelect = (contact) => {
    if (selectedContact && selectedContact.id === contact.id) {
      setSelectedContact(null);
    } else if (contact.emails.length === 1) {
      if (!recipients.includes(contact.emails[0])) {
        setRecipients((prev) => [...prev, contact.emails[0]]);
        setError("");
      } else {
        setError("This email is already in the recipients list");
      }
      setSelectedContact(null);
      setShowContacts(false);
    } else {
      setSelectedContact(contact);
    }
  };

  const handleEmailSelect = (email) => {
    if (!recipients.includes(email)) {
      setRecipients((prev) => [...prev, email]);
      setError("");
    } else {
      setError("This email is already in the recipients list");
    }
    setSelectedContact(null);
    setShowContacts(false);
  };

  const handleSaveDraft = () => {
    alert("Email saved as draft!");
    onClose();
  };

  const inputStyles =
    "w-full px-4 py-3 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-500";

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center  z-50">
      <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-4xl p-8 relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Compose Email</h2>
          <button
            onClick={onClose}
            className="absolute top-1 right-2 text-xl text-gray-500 rounded-full hover:bg-gray-200 px-1.5"
          >
            &times;
          </button>
        </div>

        <EmailForm
          inputStyles={inputStyles}
          showContacts={showContacts}
          setShowContacts={setShowContacts}
          setSelectedContact={setSelectedContact}
          handleSaveDraft={handleSaveDraft}
          onClose={onClose}
          recipients={recipients}
          setRecipients={setRecipients}
          error={error}
          setError={setError}
        >
          {showContacts && (
            <ContactsModal
              contacts={contacts}
              showContacts={showContacts}
              selectedContact={selectedContact}
              onContactSelect={handleContactSelect}
              onEmailSelect={handleEmailSelect}
              contactsRef={contactsRef}
            />
          )}
        </EmailForm>
      </div>
    </div>
  );
};

export default ComposeEmail;

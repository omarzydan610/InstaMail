import React from "react";

const ContactsModal = ({
  contacts,
  showContacts,
  selectedContact,
  onContactSelect,
  onEmailSelect,
  contactsRef,
}) => {
  return (
    <div
      ref={contactsRef}
      className="absolute mt-2 w-72 bg-white border rounded-lg shadow-xl overflow-hidden transform transition-all duration-200 ease-out origin-top-right"
      style={{
        opacity: showContacts ? 1 : 0,
        transform: showContacts
          ? "scale(1) translateY(0)"
          : "scale(0.95) translateY(-10px)",
      }}
    >
      <div className="bg-gray-50 px-4 py-3 border-b">
        <h3 className="text-sm font-semibold text-gray-700">Select Contact</h3>
      </div>
      <div className="max-h-64 overflow-y-auto">
        {contacts.length === 0 ? (
          <div className="p-4 text-center">
            <div className="text-gray-400">
              <svg
                className="mx-auto h-12 w-12"
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
              <p className="mt-2 text-sm font-medium">No contacts found</p>
              <p className="mt-1 text-sm text-gray-500">
                Add contacts to select them when composing emails
              </p>
            </div>
          </div>
        ) : (
          contacts.map((contact) => (
            <div
              key={contact.id}
              className={`border-b last:border-b-0 transition-colors duration-150 cursor-pointer ${
                selectedContact && selectedContact.id === contact.id
                  ? ""
                  : "hover:bg-blue-50"
              }`}
              onClick={() => {
                if (contact.emails.length === 1) {
                  onEmailSelect(contact.emails[0]);
                } else {
                  onContactSelect(contact);
                }
              }}
            >
              <div className="p-3">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-medium text-sm">
                      {contact.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {contact.name}
                    </p>
                    {!selectedContact || selectedContact.id !== contact.id ? (
                      <p className="text-sm text-gray-500 truncate">
                        {contact.emails.length === 1 && contact.emails[0]
                          ? contact.emails[0]
                          : `${contact.emails.length} emails`}
                      </p>
                    ) : null}
                  </div>
                </div>

                {selectedContact && selectedContact.id === contact.id && (
                  <div className="mt-2 ml-11 space-y-1">
                    {contact.emails.map((email, index) => (
                      <div
                        key={index}
                        className="p-2 rounded-md hover:bg-blue-100 transition-colors duration-150"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEmailSelect(email);
                        }}
                      >
                        <span className="text-sm text-gray-600">{email}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ContactsModal;

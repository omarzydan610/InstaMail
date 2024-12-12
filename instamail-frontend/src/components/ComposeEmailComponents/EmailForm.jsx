import React from 'react';
import { FaSave, FaPaperPlane, FaTimes, FaUserFriends } from "react-icons/fa";
import ActionButton from "./Button";

const EmailForm = ({ 
  inputStyles, 
  showContacts, 
  setShowContacts, 
  setSelectedContact,
  handleSaveDraft,
  onClose,
  children 
}) => {
  return (
    <form>
      <div className="mb-4">
        <label htmlFor="to" className="block text-sm font-medium">
          To
        </label>
        <div className="flex items-center">
          <input
            id="to"
            type="email"
            className={`${inputStyles} flex-grow`}
            placeholder="Recipient email"
          />
          <button
            type="button"
            onClick={() => {
              setShowContacts(!showContacts);
              if (showContacts) {
                setSelectedContact(null);
              }
            }}
            className="ml-2 p-2 text-blue-500 hover:text-blue-600"
            title="Select from contacts"
          >
            <FaUserFriends size={20} />
          </button>
        </div>
        {children} {/* This is where the ContactsModal will be rendered */}
      </div>

      <div className="mb-4">
        <label htmlFor="subject" className="block text-sm font-medium">
          Subject
        </label>
        <input
          id="subject"
          type="text"
          className={inputStyles}
          placeholder="Subject"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="body" className="block text-sm font-medium">
          Body
        </label>
        <textarea
          id="body"
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Write your message here"
          rows="10"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <ActionButton
          onClick={handleSaveDraft}
          label="Save as Draft"
          icon={FaSave}
          bgColor="bg-green-500"
          hoverColor="bg-green-600"
        />
        <ActionButton
          onClick={onClose}
          label="Cancel"
          icon={FaTimes}
          bgColor="bg-red-500"
          hoverColor="bg-red-600"
        />
        <ActionButton
          onClick={() => alert("Email sent!")}
          label="Send"
          icon={FaPaperPlane}
          bgColor="bg-blue-500"
          hoverColor="bg-blue-600"
        />
      </div>
    </form>
  );
};

export default EmailForm; 
import React from "react";

const EmailModal = ({ email, onClose, onDelete }) => {
  if (!email) return null; 

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-4xl h-[90vh] overflow-hidden relative">
        {/* Exit Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl text-gray-500"
        >
          &times;
        </button>
        
        {/* Email Content */}
        <h3 className="text-2xl font-semibold mb-2">{email.subject}</h3>
        <p className="text-sm text-gray-500 mb-4">{email.sender}</p>

        {/* Scrollable email body */}
        <div className="email-body overflow-y-auto max-h-[70vh]">
          <p>{email.body}</p>
        </div>

        {/* Trash Button */}
        <button
          onClick={onDelete}
          className="absolute bottom-4 left-4 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Trash
        </button>
      </div>
    </div>
  );
};

export default EmailModal;

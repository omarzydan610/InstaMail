import React from "react";

const InBoxEmailModal = ({ email, onClose, onDelete }) => {
  if (!email) return null; // Don't render anything if no email is passed

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-4xl h-[90vh] overflow-hidden relative">
        {/* Exit Button */}
        <button
          onClick={onClose}
          className="absolute top-1 right-2 text-xl text-gray-500 rounded-full hover:bg-gray-200 px-1.5"
        >
          &times;
        </button>

        {/* Email Information */}
        <div className="mb-4">
          {/* From and To under Subject */}
          <div className="justify-between ">
            <div>
              <span className="font-semibold">From: </span>
              <span>{email.sender}</span>
            </div>
          </div>

          <div className="mt-2">
            <span className="font-semibold">Subject: </span>
            <span>{email.subject}</span>
          </div>
        </div>

        {/* Line separating Subject and Body */}
        <hr className="border-t my-4 border-gray-300" />

        {/* Scrollable email body */}
        <div className="email-body overflow-y-auto max-h-[60vh]">
          <p>{email.body}</p>
        </div>

        {/* Trash Button */}
        <button
          onClick={onDelete}
          className="absolute bottom-4 left-4 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          delete
        </button>
      </div>
    </div>
  );
};

export default InBoxEmailModal;

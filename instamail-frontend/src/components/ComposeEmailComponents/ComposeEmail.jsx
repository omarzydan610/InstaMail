import React from "react";
import { FaSave, FaPaperPlane, FaTimes } from "react-icons/fa";
import ActionButton from "./Button";

const ComposeEmail = ({ onClose }) => {
  const handleSaveDraft = () => {
    alert("Email saved as draft!");
    onClose();
  };

  const inputStyles =
    "w-full px-4 py-3 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-500";

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-4xl p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Compose Email</h2>
        </div>
        {/* Form */}
        <form>
          {/* To Field */}
          <div className="mb-4">
            <label htmlFor="to" className="block text-sm font-medium">
              To
            </label>
            <input
              id="to"
              type="email"
              className={inputStyles}
              placeholder="Recipient email"
            />
          </div>

          {/* Subject Field */}
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

          {/* Body Field */}
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

          {/* Buttons */}
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
      </div>
    </div>
  );
};

export default ComposeEmail;

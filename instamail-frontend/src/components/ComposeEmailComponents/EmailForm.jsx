import React from "react";
import { FaSave, FaPaperPlane, FaTimes, FaUserFriends } from "react-icons/fa";
import ActionButton from "./Button";
import AttachmentsSection from "./AttachmentsComponents/AttachmentsSection";

const EmailForm = ({
  inputStyles,
  showContacts,
  setShowContacts,
  setSelectedContact,
  handleSaveDraft,
  onClose,
  children,
}) => {
  const [attachments, setAttachments] = React.useState([]);
  const formRef = React.useRef(null);

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);

    setAttachments((prev) => [...prev, ...newFiles]);

    setTimeout(() => {
      formRef.current?.scrollTo({
        top: formRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  };

  const handleRemoveAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <form ref={formRef} className="h-[500px] overflow-y-auto px-2">
      <div className="mb-2">
        <label htmlFor="to" className="block text-xs font-medium">
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
            className="ml-1 p-1 text-blue-500 hover:text-blue-600"
            title="Select from contacts"
          >
            <FaUserFriends size={16} />
          </button>
        </div>
        {children}
      </div>

      <div className="mb-2">
        <label htmlFor="subject" className="block text-xs font-medium">
          Subject
        </label>
        <input
          id="subject"
          type="text"
          className={inputStyles}
          placeholder="Subject"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="body" className="block text-xs font-medium">
          Body
        </label>
        <textarea
          id="body"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 resize-none"
          placeholder="Write your message here"
          rows="8"
        />
      </div>

      <AttachmentsSection
        attachments={attachments}
        handleFileChange={handleFileChange}
        handleRemoveAttachment={handleRemoveAttachment}
      />

      <div className="sticky bottom-0 bg-white pt-2 border-t">
        <div className="flex justify-end space-x-2">
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
      </div>
    </form>
  );
};

export default EmailForm;

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
  recipients,
  setRecipients,
  error,
  setError,
  children,
}) => {
  const [currentEmail, setCurrentEmail] = React.useState("");
  const [attachments, setAttachments] = React.useState([]);
  const formRef = React.useRef(null);

  const handleAddRecipient = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const trimmedEmail = currentEmail.trim().toLowerCase();

    if (trimmedEmail && emailRegex.test(trimmedEmail)) {
      if (!recipients.some((email) => email.toLowerCase() === trimmedEmail)) {
        setRecipients((prev) => [...prev, trimmedEmail]);
        setCurrentEmail("");
        setError("");
      } else {
        setError("This email is already in the recipients list");
      }
    } else {
      setError("Please enter a valid email address");
    }
  };

  const removeRecipient = (index) => {
    setRecipients((prev) => prev.filter((_, i) => i !== index));
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Recipients:", recipients);
    console.log("Subject:", e.target.subject.value);
    console.log("Body:", e.target.body.value);

    if (recipients.length === 0) {
      alert("Please add at least one recipient");
      return;
    }

    // Replace the alert with your actual email sending logic
    alert(`Sending email to: ${recipients.join(", ")}`);
  };

  return (
    <form
      ref={formRef}
      className="h-[500px] overflow-y-auto px-2"
      onSubmit={handleSubmit}
    >
      <div className="mb-2">
        <label htmlFor="to" className="block text-xs font-medium">
          To
        </label>
        <div className="flex flex-col">
          <div className="flex flex-wrap gap-1 p-1 border rounded-lg mb-1">
            {recipients.map((email, index) => (
              <span
                key={index}
                className="bg-blue-100 px-2 py-1 rounded-full text-sm flex items-center"
              >
                {email}
                <button
                  type="button"
                  onClick={() => removeRecipient(index)}
                  className="ml-1 text-gray-500 hover:text-red-500"
                >
                  <FaTimes size={12} />
                </button>
              </span>
            ))}
            <div className="flex items-center flex-grow">
              <input
                id="to"
                type="email"
                value={currentEmail}
                onChange={(e) => {
                  setCurrentEmail(e.target.value);
                  setError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddRecipient(e);
                  }
                }}
                className={`${inputStyles} flex-grow border-none focus:ring-0 ${
                  error ? "border-red-500" : ""
                }`}
                placeholder="Enter email addresses"
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
          </div>
          {error && (
            <div className="text-red-500 text-sm mt-1 ml-1">
              {error}
            </div>
          )}
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
            type="button"
            onClick={handleSaveDraft}
            label="Save as Draft"
            icon={FaSave}
            bgColor="bg-green-500"
            hoverColor="bg-green-600"
          />
          <ActionButton
            type="button"
            onClick={onClose}
            label="Cancel"
            icon={FaTimes}
            bgColor="bg-red-500"
            hoverColor="bg-red-600"
          />
          <ActionButton
            type="submit"
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

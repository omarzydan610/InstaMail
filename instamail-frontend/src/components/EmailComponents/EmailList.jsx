import React, { useState } from "react";
import EmailModal from "../EmailComponents/EmailModal";
import sentEmailModal from "./sentEmailModal";
import { useAppContext } from "../../contexts/AppContext";
import inBoxEmailModal from "./inBoxEmailModal";
const EmailList = (activeCategory) => {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const { emails } = useAppContext();

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  const handleCloseModal = () => {
    setSelectedEmail(null);
  };

  return (
    <div>
      {emails.map((email) => (
        <div
          key={email.id}
          className="email-item border-b p-4 hover:bg-gray-100 cursor-pointer"
          onClick={() => handleEmailClick(email)}
        >
          <div className="flex justify-between">
            <h6 className="text-lg font-semibold">{email.subject}</h6>
          </div>
          <h3 className="text-lg text-gray-500">{email.sender}</h3>
        </div>
      ))}

      {/* Modals */}
      {activeCategory === "sent" && selectedEmail && (
        <sentEmailModal email={selectedEmail} onClose={handleCloseModal} />)}
      {activeCategory === "inpox" && selectedEmail && (
        <inBoxEmailModal email={selectedEmail} onClose={handleCloseModal} />)}
      
    </div>
  );
};

export default EmailList;

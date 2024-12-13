import React, { useState } from "react";
import { useAppContext } from "../../contexts/AppContext";
import NormalEmailModal from "./NormalEmailModal";
import DraftedEmailModal from "./DraftedEmailModal";
import TrashEmailModal from "./TrashEmailModal";

const EmailList = ({activeCategory}) => {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const { emails } = useAppContext();

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  const handleCloseModal = () => {
    setSelectedEmail(null);
  };

  let emailModal = null;
  if (activeCategory === "Sent" && selectedEmail) {
    emailModal = <NormalEmailModal email={selectedEmail} onClose={handleCloseModal} />;
  }else if(activeCategory === "Inbox" && selectedEmail){
    emailModal = <NormalEmailModal email={selectedEmail} onClose={handleCloseModal} />
  }else if(activeCategory === "Drafts" && selectedEmail){
    emailModal = <DraftedEmailModal email={selectedEmail} onClose={handleCloseModal} />
  }else if(activeCategory === "Trash" && selectedEmail){
    emailModal = <TrashEmailModal email={selectedEmail} onClose={handleCloseModal} />
  }else if(activeCategory === "Starred" && selectedEmail){
    emailModal = <NormalEmailModal email={selectedEmail} onClose={handleCloseModal} />
  }

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
      
      {emailModal}
      
    </div>
  );
};

export default EmailList;

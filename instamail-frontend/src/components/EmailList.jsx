import React, { useState } from "react";
import EmailModal from "./EmailModal";

const EmailList = () => {
    const emails = [
        { id: 1, subject: "Meeting Tomorrow", sender: "joe@InstaMail.com",reseaver:"omar@InstaMail.com", body: "Don't forget about the meeting tomorrow." },
        { id: 2, subject: "Project Update", sender: "omar@InstaMail.com",reseaver:"abdo@InstaMail.com", body: "The project is on track. Let's catch up soon." },
        { id: 3, subject: "quize", sender: "abdo@InstaMail.com",reseaver:"omar@InstaMail.com", body: "did you study?" },
        { id: 4, subject: "quize", sender: "abdo@InstaMail.com",reseaver:"omar@InstaMail.com", body: "did youa;efmv;ka;kljkhjkb kg hjkg khjghkhj ewngflaknelknglandmlngfaemnglknalekng,mdsnglkjsebnrg\neakjbfkajebfkjabekgfjbva ebwf study?" },
        { id: 5, subject: "quize", sender: "abdo@InstaMail.com",reseaver:"omar@InstaMail.com", body: "did you study?" },
        { id: 6, subject: "quize", sender: "abdo@InstaMail.com",reseaver:"omar@InstaMail.com", body: "did you study?" },
        { id: 7, subject: "quize", sender: "abdo@InstaMail.com",reseaver:"omar@InstaMail.com", body: "did you study?" },
        { id: 8, subject: "quize", sender: "abdo@InstaMail.com",reseaver:"omar@InstaMail.com", body: "did you study?" },
        { id: 9, subject: "quize", sender: "abdo@InstaMail.com",reseaver:"omar@InstaMail.com", body: "did you study?" },
        { id: 10, subject: "quize", sender: "abdo@InstaMail.com",reseaver:"omar@InstaMail.com", body: "did you study?" },
      ];
  const [selectedEmail, setSelectedEmail] = useState(null);

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

      {/* Modal */}
      <EmailModal email={selectedEmail} onClose={handleCloseModal} />
    </div>
  );
};

export default EmailList;

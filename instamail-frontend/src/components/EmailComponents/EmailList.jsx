import React, { useState, useEffect } from "react";
import { useAppContext } from "../../contexts/AppContext";
import NormalEmailModal from "./NormalEmailModal";
import DraftedEmailModal from "./DraftedEmailModal";
import TrashEmailModal from "./TrashEmailModal";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MailsService from "../../services/MailsService";

const EmailList = ({ activeCategory, currentPage, setCurrentPage }) => {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const { emails, setEmails, fetchEmails, fetchEmailsForFolder } =
    useAppContext();
  const [isEditDraftVisible, setIsEditDraftVisible] = useState(false);

  const emailsPerPage = 5;
  const IndexOfLastEmail = currentPage * emailsPerPage;
  const IndexOfFirstEmail = IndexOfLastEmail - emailsPerPage;
  const [currentEmails, setCurrentEmails] = useState(
    emails.slice(IndexOfFirstEmail, IndexOfLastEmail)
  );
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setCurrentEmails(emails.slice(IndexOfFirstEmail, IndexOfLastEmail));
    setTotalPages(Math.ceil(emails.length / emailsPerPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emails, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    if (activeCategory.id) {
      fetchEmailsForFolder(activeCategory.id, 0, 6, true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);

  const handleEmailClick = async (email) => {
    if (activeCategory === "Inbox" && !email.isRead) {
      setEmails((prevEmails) =>
        prevEmails.map((prevEmail) =>
          prevEmail.id === email.id ? { ...prevEmail, isRead: true } : prevEmail
        )
      );
      await MailsService.markAsRead(email.id);
    }
    setSelectedEmail(email);
  };

  const handleCloseModal = () => {
    setSelectedEmail(null);
  };

  const nextPage = async () => {
    console.log("emailsss", emails);
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    if (emails.length > 5 * currentPage + 1) {
      return;
    }
    if (activeCategory.id) {
      await fetchEmailsForFolder(
        activeCategory.id,
        currentPage * 5 + 1,
        emailsPerPage,
        false
      );
    } else {
      await fetchEmails(
        activeCategory,
        currentPage * 5 + 1,
        emailsPerPage,
        false
      );
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  let emailModal = null;
  if (activeCategory === "Sent" && selectedEmail) {
    emailModal = (
      <NormalEmailModal
        email={selectedEmail}
        onClose={handleCloseModal}
        setEmails={setEmails}
        setCurrentPage={setCurrentPage}
        activeCategory={activeCategory}
      />
    );
  } else if (activeCategory === "Inbox" && selectedEmail) {
    emailModal = (
      <NormalEmailModal
        email={selectedEmail}
        onClose={handleCloseModal}
        setEmails={setEmails}
        setCurrentPage={setCurrentPage}
        activeCategory={activeCategory}
      />
    );
  } else if (activeCategory === "Drafts" && selectedEmail) {
    emailModal = (
      <DraftedEmailModal
        email={selectedEmail}
        onClose={handleCloseModal}
        setEmails={setEmails}
        setCurrentPage={setCurrentPage}
        activeCategory={activeCategory}
        setIsEditDraftVisible={setIsEditDraftVisible}
        isEditDraftVisible={isEditDraftVisible}
      />
    );
  } else if (activeCategory === "Trash" && selectedEmail) {
    emailModal = (
      <TrashEmailModal
        email={selectedEmail}
        onClose={handleCloseModal}
        setEmails={setEmails}
        setCurrentPage={setCurrentPage}
        activeCategory={activeCategory}
      />
    );
  } else if (activeCategory === "Starred" && selectedEmail) {
    emailModal = (
      <NormalEmailModal
        email={selectedEmail}
        onClose={handleCloseModal}
        setEmails={setEmails}
        activeCategory={activeCategory}
        setCurrentPage={setCurrentPage}
      />
    );
  } else if (activeCategory.id && selectedEmail) {
    emailModal = (
      <NormalEmailModal
        email={selectedEmail}
        onClose={handleCloseModal}
        setEmails={setEmails}
        setCurrentPage={setCurrentPage}
        fetchEmailsForFolder={fetchEmailsForFolder}
        activeCategory={activeCategory}
      />
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Email List */}
      <div>
        {currentEmails.length > 0 ? (
          currentEmails.map((email) => (
            <div
              key={email.id}
              className="email-item border-b p-4 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleEmailClick(email)}
            >
              <div className="flex justify-between items-start">
                {activeCategory === "Inbox" ? (
                  <>
                    <h6 className="text-lg font-semibold text-green-600">
                      {email.senderEmail}
                    </h6>
                    {email.isRead ? (
                      <span className="text-sm text-gray-500">
                        {formatDate(email.createdAt)}
                      </span>
                    ) : (
                      <span className="text-sm text-green-500 font-bold flex items-center gap-1 flex-col">
                        <span>New</span>
                        {formatDate(email.createdAt)}
                      </span>
                    )}
                  </>
                ) : (
                  (activeCategory === "Sent" ||
                    activeCategory === "Drafts") && (
                    <>
                      <h6 className="text-lg font-semibold text-red-600">
                        {email.receiverEmail}
                      </h6>
                      <span className="text-sm text-gray-500">
                        {formatDate(email.createdAt)}
                      </span>
                    </>
                  )
                )}
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-700 mt-1">{email.subject}</p>
                {activeCategory !== "Inbox" &&
                  activeCategory !== "Sent" &&
                  activeCategory !== "Drafts" && (
                    <span className="text-sm text-gray-500">
                      {formatDate(email.createdAt)}
                    </span>
                  )}
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-500 text-lg">No emails to display</p>
          </div>
        )}
      </div>

      {/* Pagination Controls - Only show if there are emails */}
      {currentEmails.length > 0 && (
        <div className="flex justify-center items-center gap-2 pyt-2 mt-10">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded bg-blue-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <FaChevronLeft size={14} />
          </button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="p-2 rounded bg-blue-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <FaChevronRight size={14} />
          </button>
        </div>
      )}

      {/* Modals */}
      {emailModal}
    </div>
  );
};

export default EmailList;

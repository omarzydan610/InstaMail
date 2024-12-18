import React from "react";
import MailsService from "../../services/MailsService";
import { useAppContext } from "../../contexts/AppContext";
import EditDraftModal from "../ComposeEmailComponents/EditDraft/EditDraftModal";
import AttachmentService from "../../services/attachementsService";

const DraftedEmailModal = ({
  email,
  attachmentsOfMail,
  onClose,
  setEmails,
  activeCategory,
  setIsEditDraftVisible,
  isEditDraftVisible,
}) => {
  const { fetchEmails } = useAppContext();

  const handleDelete = () => {
    MailsService.deleteDraft(email.id);
    setEmails((prevEmails) =>
      prevEmails.filter((prevEmail) => prevEmail.id !== email.id)
    );
    onClose();
  };

  const closeEditDraftModal = async () => {
    setIsEditDraftVisible(false);
    await fetchEmails("Drafts", 0, 6, true);
    onClose();
  };

  const handleEdit = () => {
    setIsEditDraftVisible(true);
  };

  // Handle attachment download
  const handleDownload = async (attachmentId, attachmentName) => {
    const response = await AttachmentService.downloadAttachment(attachmentId);
    const blob = new Blob([response.data], {
      type: response.headers["content-type"],
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      attachmentName || response.headers["content-language"]
    ); // Use filename if provided
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
        <div className="bg-white/95 dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-3xl h-[85vh] overflow-hidden relative border border-gray-200 dark:border-gray-700 animate-slideUp">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
          >
            <svg
              className="w-6 h-6 text-gray-500 hover:text-gray-700 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Draft Badge */}
          <div className="flex gap-2 mb-4">
            <div className="inline-block px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm font-medium">
              Draft
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                email.priority === 3
                  ? "bg-red-200 text-red-800"
                  : email.priority === 2
                  ? "bg-yellow-200 text-yellow-800"
                  : "bg-blue-200 text-blue-800"
              }`}
            >
              {email.priority === 3
                ? "Important"
                : email.priority === 2
                ? "Normal"
                : "Spam"}
            </span>
          </div>

          {/* Email Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="pb-4 border-b dark:border-gray-700">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                  {email.subject || "No Subject"}
                </h2>
              </div>

              <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <span className="font-medium">To:</span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                    {email.receiverEmail || "No recipient"}
                  </span>
                </div>
              </div>
            </div>

            <div className="email-body overflow-y-auto max-h-[50vh] pr-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p className="whitespace-pre-wrap">
                {email.content || "No content"}
              </p>
            </div>
          </div>

          {/* Attachments Section */}
          {attachmentsOfMail && attachmentsOfMail.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Attachments:
              </h3>
              <div className="space-y-2">
                {attachmentsOfMail && attachmentsOfMail.length > 0 ? (
                  attachmentsOfMail.map((attachment) => (
                    <div
                      key={attachment.id}
                      className="flex justify-between items-center py-2 px-4 bg-gray-100 dark:bg-gray-700 rounded-lg"
                    >
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {attachment.name}
                      </span>
                      <button
                        onClick={() =>
                          handleDownload(attachment.id, attachment.name)
                        }
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      >
                        Download
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    No attachments
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="absolute bottom-6 left-6 flex gap-4">
            <button
              onClick={handleDelete}
              className="group flex items-center gap-2 py-3 px-6 bg-red-500/90 text-white rounded-xl hover:bg-red-600 transition-all duration-300 hover:shadow-lg"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              <span>Delete Draft</span>
            </button>

            <button
              onClick={handleEdit}
              className="group flex items-center gap-2 py-3 px-6 bg-blue-500/90 text-white rounded-xl hover:bg-blue-600 transition-all duration-300 hover:shadow-lg"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              <span>Continue Editing</span>
            </button>
          </div>
        </div>
      </div>
      {isEditDraftVisible && (
        <EditDraftModal
          onClose={closeEditDraftModal}
          activeCategory={activeCategory}
          attachmentsOfMail={attachmentsOfMail}
          email={email.receiverEmail}
          body={email.content}
          subject={email.subject}
          priority={email.priority}
          emailId={email.id}
        />
      )}
    </>
  );
};

export default DraftedEmailModal;

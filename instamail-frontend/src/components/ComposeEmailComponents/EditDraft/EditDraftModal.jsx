import React from "react";
import EditDraftForm from "./EditDraftForm";

const EditDraft = ({ onClose, email, body, subject, priority, emailId, attachmentsOfMail }) => {
  const inputStyles =
    "w-full px-4 py-3 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-500";

  return (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
      <div className="bg-white/95 dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-3xl h-[95vh] overflow-hidden relative border border-gray-200 dark:border-gray-700 animate-slideUp">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Compose Email</h2>
          <button
            onClick={onClose}
            className="absolute top-1 right-2 text-xl text-gray-500 rounded-full hover:bg-gray-200 px-1.5"
          >
            &times;
          </button>
        </div>

        <EditDraftForm
          inputStyles={inputStyles}
          onClose={onClose}
          defaultEmail={email}
          emailId={emailId}
          defaultBody={body}
          defaultSubject={subject}
          defaultPriority={priority}
          attachmentsOfMail={attachmentsOfMail}
        />
      </div>
    </div>
  );
};

export default EditDraft;

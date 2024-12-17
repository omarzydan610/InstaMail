import React, { useState } from "react";
import { FaSave, FaPaperPlane, FaTimes } from "react-icons/fa";
import ActionButton from "../Button";
import AttachmentsSection from "../AttachmentsComponents/AttachmentsSection";
import MailsService from "../../../services/MailsService";
const EditDraftForm = ({
  inputStyles,
  onClose,
  emailId,
  defaultEmail,
  defaultBody,
  defaultSubject,
  defaultPriority,
}) => {
  const [attachments, setAttachments] = React.useState([]);
  const formRef = React.useRef(null);
  const [subject, setSubject] = useState(defaultSubject);
  const [body, setBody] = useState(defaultBody);
  const [priority, setPriority] = useState(defaultPriority);

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

  const handleSend = async () => {
    const mail = {
      id: emailId,
      subject: subject,
      body: body,
      priority: priority,
    };

    await MailsService.sendDraft(mail);
    console.log(`Sending email to: ${defaultEmail}`);
    onClose();
  };

  const handleDraft = async () => {
    const mail = {
      id: emailId,
      subject: subject,
      body: body,
      priority: priority,
    };

    await MailsService.editDraft(mail);
    console.log(`Draft saved for: ${defaultEmail}`);
    onClose();
  };

  const Submit = (type) => {
    if (type === "draft") {
      return handleDraft;
    } else {
      return handleSend;
    }
  };

  return (
    <form
      ref={formRef}
      className="h-[93%] flex flex-col justify-between px-2"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="flex-1 overflow-y-auto">
        <div className="mb-2">
          <label htmlFor="to" className="block text-xs font-medium">
            To
          </label>
          <div className="flex flex-col">
            <div className="flex flex-wrap gap-1 p-1 border rounded-lg mb-1">
              <div className="flex items-center flex-grow">
                <input id="to" type="email" value={defaultEmail} disabled />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-2 flex gap-2">
          <div className="flex-grow">
            <label htmlFor="subject" className="block text-xs font-medium">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              required
              className={inputStyles}
              onChange={(e) => {
                setSubject(e.target.value);
              }}
              defaultValue={defaultSubject}
            />
          </div>

          <div className="w-1/4">
            <label htmlFor="priority" className="block text-xs font-medium">
              Priority
            </label>
            <select
              id="priority"
              className={`${inputStyles} w-full h-12`}
              onChange={(e) => setPriority(e.target.value)}
              defaultValue={
                defaultPriority === 3
                  ? "important"
                  : defaultPriority === 2
                  ? "normal"
                  : "spam"
              }
            >
              <option value="important">Important</option>
              <option value="normal">Normal</option>
              <option value="spam">Spam</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="body" className="block text-xs font-medium">
            Body
          </label>
          <textarea
            id="body"
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 resize-none"
            placeholder="Write your message here"
            rows="8"
            defaultValue={defaultBody}
            onChange={(e) => {
              setBody(e.target.value);
            }}
          />
        </div>

        <AttachmentsSection
          attachments={attachments}
          handleFileChange={handleFileChange}
          handleRemoveAttachment={handleRemoveAttachment}
        />
      </div>

      <div className="mt-auto pt-4">
        <div className="flex justify-end space-x-2">
          <ActionButton
            type="submit"
            onClick={Submit("draft")}
            label="Save as Draft"
            icon={FaSave}
            bgColor="bg-yellow-500"
            hoverColor="bg-yellow-600"
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
            onClick={Submit("send")}
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

export default EditDraftForm;

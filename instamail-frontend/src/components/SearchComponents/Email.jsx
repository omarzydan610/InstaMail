import AttachmentsService from "../../services/attachementsService";
import { useAppContext } from "../../contexts/AppContext";

const Email = ({ email, setSelectedEmail, setAttachmentsOfMail }) => {
  const { userEmail } = useAppContext();
  const handleEmailClick = async (email) => {
    const attachments = await AttachmentsService.getAttachmentname(email.id);
    setAttachmentsOfMail(attachments);
    setSelectedEmail(email);
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

  return (
    <div
      className="email-item border-b p-4 hover:bg-gray-100 cursor-pointer"
      onClick={() => handleEmailClick(email)}
    >
      <div className="flex justify-between items-start">
        <>
          {email.senderEmail === userEmail ? (
            <h6 className="text-lg font-semibold text-red-600">
              {email.receiverEmail}
            </h6>
          ) : (
            <h6 className="text-lg font-semibold text-green-600">
              {email.senderEmail}
            </h6>
          )}
          <span className="text-sm text-gray-500">
            {formatDate(email.createdAt)}
          </span>
        </>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-gray-700 mt-1">{email.subject}</p>
      </div>
    </div>
  );
};

export default Email;

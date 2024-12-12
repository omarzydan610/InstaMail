import React from "react";
import { FaPaperclip } from "react-icons/fa";
import FilePreview from "./FilePreview";

const AttachmentsSection = ({
  attachments,
  handleFileChange,
  handleRemoveAttachment,
}) => {
  return (
    <>
      <div className="mb-2">
        <label className="block text-xs font-medium mb-1">Attachments</label>
        <div className="flex flex-col space-y-1">
          <div className="flex items-center space-x-1">
            <label className="cursor-pointer inline-flex items-center px-3 py-1 border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 bg-white hover:bg-gray-50">
              <FaPaperclip className="mr-1" />
              Add Files
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <span className="text-xs text-gray-500">
              {attachments.length} file(s) selected
            </span>
          </div>
        </div>
      </div>

      {attachments.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2 justify-between">
          {attachments.map((file, index) => (
            <FilePreview
              key={index}
              file={file}
              index={index}
              handleRemoveAttachment={handleRemoveAttachment}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default AttachmentsSection;

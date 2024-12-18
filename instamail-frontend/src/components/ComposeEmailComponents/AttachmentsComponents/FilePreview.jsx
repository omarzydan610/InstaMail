import React from "react";
import { FaTimes } from "react-icons/fa";
import FileIcon from "./FileIcon";

const FilePreview = ({ file, index, handleRemoveAttachment }) => {
  const [preview, setPreview] = React.useState(null);

  // Add helper function to get mime type from file extension
  const getMimeTypeFromFileName = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();
    const mimeTypes = {
      pdf: "application/pdf",
      doc: "application/msword",
      docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      xls: "application/vnd.ms-excel",
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      txt: "text/plain",
      // Add more mappings as needed
    };
    return mimeTypes[extension] || "application/octet-stream";
  };

  React.useEffect(() => {
    if (file && file.type && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [file, preview]);

  // Log file object for debugging
  console.log("File object:", file);

  // If no file or no valid file type, show error
  if (!file) {
    return <p className="text-red-500">No file provided</p>;
  }

  // Replace the existing type check with this
  const fileType = file.type || getMimeTypeFromFileName(file.name);

  return (
    <div className="w-[48%] flex items-center p-2 bg-gray-50 rounded-lg">
      <div className="w-8 h-8 flex items-center justify-center mr-2">
        {fileType.startsWith("image/") && preview ? (
          <img
            src={preview}
            alt={file.name}
            className="w-8 h-8 object-cover rounded"
          />
        ) : (
          <FileIcon fileType={fileType} />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-900 truncate">
          {file.name}
        </p>
        <p className="text-xs text-gray-500">
          {(file.size / 1024 / 1024).toFixed(2)} MB
        </p>
      </div>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          if (preview) URL.revokeObjectURL(preview);
          handleRemoveAttachment(file, index);
        }}
        className="ml-2 text-red-500 hover:text-red-700"
      >
        <FaTimes size={14} />
      </button>
    </div>
  );
};

export default FilePreview;

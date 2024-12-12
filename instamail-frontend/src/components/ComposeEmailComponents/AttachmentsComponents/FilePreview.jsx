import React from "react";
import { FaTimes } from "react-icons/fa";
import FileIcon from "./FileIcon";

const FilePreview = ({ file, index, handleRemoveAttachment }) => {
  const [preview, setPreview] = React.useState(null);

  React.useEffect(() => {
    if (file.type.startsWith("image/")) {
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

  return (
    <div className="w-[48%] flex items-center p-2 bg-gray-50 rounded-lg">
      <div className="w-8 h-8 flex items-center justify-center mr-2">
        {file.type.startsWith("image/") && preview ? (
          <img
            src={preview}
            alt={file.name}
            className="w-8 h-8 object-cover rounded"
          />
        ) : (
          <FileIcon fileType={file.type} />
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
          handleRemoveAttachment(index);
        }}
        className="ml-2 text-red-500 hover:text-red-700"
      >
        <FaTimes size={14} />
      </button>
    </div>
  );
};

export default FilePreview;

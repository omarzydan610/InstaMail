import {
  FaFile,
  FaFileImage,
  FaFileAudio,
  FaFileVideo,
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFilePowerpoint,
  FaFileArchive,
  FaFileCode,
} from "react-icons/fa";

const FileIcon = ({ fileType }) => {
  const getIcon = () => {
    const type = fileType.toLowerCase();
    if (type.startsWith("image/")) return FaFileImage;
    if (type.startsWith("audio/")) return FaFileAudio;
    if (type.startsWith("video/")) return FaFileVideo;
    if (type === "application/pdf") return FaFilePdf;
    if (type.includes("word")) return FaFileWord;
    if (type.includes("excel") || type.includes("spreadsheet"))
      return FaFileExcel;
    if (type.includes("powerpoint") || type.includes("presentation"))
      return FaFilePowerpoint;
    if (type.includes("zip") || type.includes("rar") || type.includes("7z"))
      return FaFileArchive;
    if (
      type.includes("code") ||
      type.includes("javascript") ||
      type.includes("html")
    )
      return FaFileCode;
    return FaFile;
  };

  const Icon = getIcon();
  return <Icon size={24} className="text-gray-500" />;
};

export default FileIcon;

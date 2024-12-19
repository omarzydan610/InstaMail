import api from "./api";

class AttachmentService {
  static uploadAttachment = async (mailId, files) => {
    if (files.length === 0) {
      return;
    }
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    const response = await api.post(`/upload-attachment/${mailId}`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  };
  static downloadAttachment = async (attachmentId) => {
    const response = await api.get(`/download-attachment/${attachmentId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      responseType: "blob",
    });
    return response;
  };
  static getAttachmentname = async (mailId) => {
    const response = await api.get(`/get-all-attachments/${mailId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return response.data;
  };
  static multiRecievers = async (mailId, remainingReceivers) => {
    const response = await api.post(
      `/mail-attachments-for-multiple-mails/${mailId}`,
      remainingReceivers,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    return response.data;
  };
  static deleteAttachment = async (attachmentId) => {
    const response = await api.delete(`/delete-attachment/${attachmentId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return response.data;
  };

  static uploadNewAttachment = async (mailId, files) => {
    if (files.length === 0) {
      return;
    }
    const formData = new FormData();
    let count = 0;
    files.forEach((file) => {
      if (!file.file) {
        count++;
        formData.append("files", file);
      }
    });
    if (count === 0) {
      return;
    }

    const response = await api.post(`/upload-attachment/${mailId}`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  };
}

export default AttachmentService;

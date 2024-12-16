import api from "./api"; // Assuming you have an api configuration file

class FolderService {
  static async createFolder(folderName) {
    const token = localStorage.getItem("authToken");
    console.log(folderName);
    console.log(token);
    const response = await api.post(
      "/create-folder",
      {
        name: folderName,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  }

  static async getFolders() {
    console.log("getFolders");
    const token = localStorage.getItem("authToken");
    const response = await api.get("/get-folders", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data);
    return response.data;
  }

  static async deleteFolder(folderId) {
    const token = localStorage.getItem("authToken");
    const response = await api.delete(`/delete-folder/${folderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async getMailsByFolderId(folderId, start, size) {
    console.log(folderId);
    const token = localStorage.getItem("authToken");
    const response = await api.get(`/get-folders-mails/${folderId}`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { start: start, size: size },
    });
    console.log(response.data);
    return response.data;
  }

  static async moveMailToFolder(mailId, folderId) {
    const token = localStorage.getItem("authToken");
    const body = { folderId };
    const response = await api.put(`/change-folder/${mailId}`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async updateFolder(folderId, newName) {
    const token = localStorage.getItem("authToken");
    const response = await api.post(`/folders/${folderId}/mails`, newName, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async renameFolder(folderId, newName) {
    const token = localStorage.getItem("authToken");
    const response = await api.put(`/rename-folder/${folderId}`, newName, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async getFolderName(folderId) {
    const token = localStorage.getItem("authToken");
    const response = await api.get(`/get-folder-name/${folderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("response", response);
    return response.data;
  }
}

export default FolderService;

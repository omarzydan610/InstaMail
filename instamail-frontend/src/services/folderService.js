import api from './api'; // Assuming you have an api configuration file

class FolderService {
  static async deleteFolder(folderName) {
    const token = localStorage.getItem("authToken");
    const response = await api.delete(`/folders/${folderName}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async getFolder() {
    const token = localStorage.getItem("authToken");
    const response = await api.get('/folder', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async getFolders() {
    const token = localStorage.getItem("authToken");
    const response = await api.get('/folders', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async createFolder(folderName) {
    const token = localStorage.getItem("authToken");
    console.log(folderName)
    console.log(token)
    const response = await api.post('/create-folder', {
      name : folderName,
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async putMailInFolder(folderName, mailData) {
    const token = localStorage.getItem("authToken");
    const response = await api.post(`/folders/${folderName}/mails`, mailData, {
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

}

export default FolderService;

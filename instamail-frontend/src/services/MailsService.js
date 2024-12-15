import api from "./api";

class MailsService {
  static async addMail(mail, draft) {
    const receiver = mail.Recipients[0];
    const remainingReceivers = mail.Recipients.slice(1);
    const mailToSend = {
      subject: mail.subject,
      content: mail.body,
      receiverEmail: receiver,
    };
    const requestData = {
      mail: mailToSend,
      remainingReceivers: remainingReceivers,
    };
    console.log("mailToSend", mailToSend);
    console.log("remainingReceivers", remainingReceivers);
    const token = localStorage.getItem("authToken");
    let response;
    console.log("draft", draft);
    if (draft) {
      response = await api.post(`/draft-mail`, requestData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      response = await api.post(`/send-mail`, requestData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    console.log("response", response);
    return response.data;
  }

  static async getMails(type, start, size) {
    const token = localStorage.getItem("authToken");
    const response = await api.get(`/get-mails/${type}`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { start: start, size: size },
    });
    return response.data;
  }

  static async toggleStar(id) {
    const token = localStorage.getItem("authToken");
    const response = await api.put(
      `/toggle-star/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  }

  static async toggleDeletion(id) {
    const token = localStorage.getItem("authToken");
    const response = await api.delete(`/toggle-deletion/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async deletePermanently(id) {
    const token = localStorage.getItem("authToken");
    const response = await api.delete(`/delete-permanently/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async deleteDraft(id) {
    const token = localStorage.getItem("authToken");
    const response = await api.delete(`/delete-draft/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async markAsRead(id) {
    const token = localStorage.getItem("authToken");
    const response = await api.put(
      `/mark-as-read/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  }
}

export default MailsService;

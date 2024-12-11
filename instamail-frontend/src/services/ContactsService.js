import api from "./api";

class ContactServices {
  static async getContacts() {
    const token = localStorage.getItem("authToken");
    try {
      const response = await api.get("/contacts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
      throw error;
    }
  }

  static async deleteContact(contactId) {
    const token = localStorage.getItem("authToken");
    try {
      const response = await api.delete(`/contacts/${contactId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to delete contact:", error);
      throw error;
    }
  }

  static async editContact(contactId, updatedContact) {
    const token = localStorage.getItem("authToken");
    try {
      const response = await api.put(`/contacts/${contactId}`, updatedContact, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to edit contact:", error);
      throw error;
    }
  }
}

export default ContactServices;
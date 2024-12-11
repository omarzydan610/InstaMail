import api from "./api";

class ContactServices {
  // Fetch all contacts
  static async getContacts() {
    const token = localStorage.getItem("authToken");
    try {
      const response = await api.get("/get-contacts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
      throw error;
    }
  }

  // Delete a contact
  static async deleteContact(contactId) {
    const token = localStorage.getItem("authToken");
    try {
      const response = await api.delete(`/delete-contact/${contactId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to delete contact:", error);
      throw error;
    }
  }

  // Get emails for a specific contact
  static async getEmails(contactId) {
    const token = localStorage.getItem("authToken");
    try {
      const response = await api.get(`/get-contact-emails/${contactId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to get emails:", error);
      throw error;
    }
  }

  // Edit a contact's information
  static async editContact(contactId, updatedContact) {
    const token = localStorage.getItem("authToken");
    try {
      const response = await api.put(`/update-contact/${contactId}`, updatedContact, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to edit contact:", error);
      throw error;
    }
  }

  // Add a new contact
  static async addContact(newContact) {
    const token = localStorage.getItem("authToken");
    try {
      const response = await api.post("/add-contact", newContact, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to add contact:", error);
      throw error;
    }
  }
}

export default ContactServices;

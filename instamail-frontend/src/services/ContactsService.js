import api from "./api";

class ContactService {
  static async addContact(contact) {
    const transformedContact = {
      name: contact.name,
    };

    contact.emails.forEach((email, index) => {
      transformedContact[`email${index + 1}`] = email;
    });
    console.log(transformedContact);

    const token = localStorage.getItem("authToken");
    const response = await api.post("/add-contact", transformedContact, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

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
    const transformedContact = {
      name: updatedContact.name,
    };
    updatedContact.emails.forEach((email, index) => {
      transformedContact[`email${index + 1}`] = email;
    });
    console.log(transformedContact);
    const token = localStorage.getItem("authToken");

    try {
      const response = await api.put(
        `/update-contact/${contactId}`,
        transformedContact,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to edit contact:", error);
      throw error;
    }
  }

  // Add a new contact
}

export default ContactService;

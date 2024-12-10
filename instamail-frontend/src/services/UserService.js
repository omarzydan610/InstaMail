import api from "./api";

class UserService {
  static async getUserFromToken(
    token,
    setusername,
    setuserEmail,
    setphoneNumber
  ) {
    console.log("user request");

    const response = await api.get("/user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setphoneNumber(response.data.phoneNumber || "");
    setuserEmail(response.data.email || "");
    setusername(response.data.username || "");
  }

  static async addContact(contact) {
    // Transform contact format
    const transformedContact = {
      name: contact.name,
    };

    // Add email fields dynamically
    contact.emails.forEach((email, index) => {
      transformedContact[`email${index + 1}`] = email;
    });
    console.log(transformedContact);

    const token = localStorage.getItem("authToken");
    const response = await api.post("/user/add-contact", transformedContact, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
}

export default UserService;

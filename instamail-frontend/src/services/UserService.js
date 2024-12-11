import api from "./api";

class UserService {
  static async getUserFromToken(
    token,
    setToken,
    setusername,
    setuserEmail,
    setphoneNumber
  ) {
    console.log("user request");
    console.log(token);

    try {
      const response = await api.get("/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      setphoneNumber(response.data.phoneNumber || "");
      setuserEmail(response.data.email || "");
      setusername(response.data.username || "");
    } catch (error) {
      console.log("Failed to fetch user data:", error);
      localStorage.removeItem("authToken");
      setToken(null);
      // throw error;
    }
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
    const response = await api.post("/add-contact", transformedContact, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
}

export default UserService;

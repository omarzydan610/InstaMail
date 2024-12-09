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
}

export default UserService;

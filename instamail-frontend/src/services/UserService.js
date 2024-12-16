import api from "./api";

class UserService {
  static async getUserFromToken(
    token,
    setToken,
    setusername,
    setuserEmail,
    setphoneNumber
  ) {

    try {
      const response = await api.get("/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setphoneNumber(response.data.phoneNumber || "");
      setuserEmail(response.data.email || "");
      setusername(response.data.username || "");
    } catch (error) {
      localStorage.removeItem("authToken");
      setToken(null);
    }
  }

  
}

export default UserService;

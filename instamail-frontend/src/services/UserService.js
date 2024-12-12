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
    }
  }

  
}

export default UserService;

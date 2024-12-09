import api from "../services/api"; // Import your custom Axios instance

class AuthContext {
  /**
   * Signup method
   * @param {string} email
   * @param {string} password
   * @param {string} firstName
   * @param {string} secondName
   * @param {string} username
   * @param {string} phoneNumber
   * @returns {Promise}
   */
  static async signup(
    email,
    password,
    firstName,
    secondName,
    username,
    phoneNumber,
    setLoading,
    setError,
    navigate
    // setToken
  ) {
    setLoading(true);

    try {
      // Signup request
      const response = await api.post("/auth/signup", {
        email,
        password,
        firstName,
        lastName: secondName,
        username,
        phoneNumber,
      });
      if (response.status === 200) {
        // setToken(response.data.token);
        localStorage.setItem("authToken", response.data.token);
        console.log("Signup successful, token set:", response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      setError("Error: " + (error.response?.data || "Something went wrong"));
    } finally {
      setLoading(false);
    }
  }

  /**
   * Login method
   * @param {string} email
   * @param {string} password
   * @returns {Promise}
   */
  static async login(
    email,
    password,
    setLoading,
    setError,
    navigate
    // setToken
  ) {
    setLoading(true);

    try {
      // Login request
      const response = await api.post("/auth/login", { email, password });
      if (response.status === 200) {
        // setToken(response.data.token);
        localStorage.setItem("authToken", response.data.token);
        console.log("Login successful, token set:", response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.error(error.response.data || error.message);
      setError("Error: " + (error.response?.data || "Something went wrong"));
    } finally {
      setLoading(false);
    }
  }
  
}

export default AuthContext;

import api from "../services/api"; // Import your custom Axios instance

class AuthContext {
  /**
   * Signup method
   * @param {string} email
   * @param {string} password
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} username
   * @param {string} phoneNumber
   * @returns {Promise}
   */
  static signup = async (
    email,
    password,
    firstName,
    lastName,
    username,
    phoneNumber,
    setLoading,
    setError,
    navigate,
    setToken
  ) => {
    setLoading(true);

    try {
      // Signup request
      const response = await api.post("/auth/signup", {
        email,
        password,
        firstName,
        lastName: lastName,
        username,
        phoneNumber,
      });
      if (response.status === 200) {
        localStorage.setItem("authToken", response.data.token);
        console.log("Signup successful, token set:", response.data.token);
        setToken(response.data.token);
        console.log(response.data.user);
        navigate("/");
        return response.data.user;
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      setError("Error: " + (error.response?.data || "Something went wrong"));
    } finally {
      setLoading(false);
    }
  };

  /**
   * Login method
   * @param {string} email
   * @param {string} password
   * @returns {Promise}
   */
  static login = async (
    email,
    password,
    setLoading,
    setError,
    navigate,
    setToken
  ) => {
    setLoading(true);

    try {
      const response = await api.post("/auth/login", { email, password });
      if (response.status === 200) {
        console.log(response);

        localStorage.setItem("authToken", response.data.token);
        console.log("Login successful, token set:", response.data.token);
        setToken(response.data.token);
        console.log(response.data.user);
        navigate("/");
        return response.data.user;
      }
    } catch (error) {
      console.error(error.response.data || error.message);
      setError("Error: " + (error.response?.data || "Something went wrong"));
    } finally {
      setLoading(false);
    }
  };

  static signOut = (setToken) => {
    localStorage.removeItem("authToken");
    setToken(null);
  };
}

export default AuthContext;

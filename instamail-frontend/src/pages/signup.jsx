import React, { useState } from "react";
import InputField from "../components/InputField";
import LinkToLogin from "../components/LinkToLogin";
import axios from "axios";
import useAuthStore from "../store/authStore";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Error state to handle validation messages
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const setToken = useAuthStore((state) => state.setToken);

  // Validation for password match
  const validateForm = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    if (!email || !password || !confirmPassword || !firstName || !secondName || !username || !phoneNumber) {
      setError("All fields are required.");
      return false;
    }
    setError(""); // Clear previous errors
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop submission if form is invalid
    }

    setLoading(true);

    try {
      // Signup request
      const response = await axios.post("https://localhost:8080/signup", {
        firstName,
        secondName,
        username,
        phoneNumber,
        email,
        password,
      });

      if (response.status === 200) {
        console.log("Signup successful, now logging in...");
        
        // After successful signup, log the user in
        const loginResponse = await axios.post("https://localhost:8080/login", {
          email,
          password,
        });

        if (loginResponse.status === 200) {
          setToken(loginResponse.data.token); // Set token in the store
          console.log("Login successful, token set:", loginResponse.data.token);
        } else {
          setError("Login failed after signup");
        }
      } else {
        setError("Signup failed");
      }
    } catch (error) {
      console.error("An error occurred:", error.response ? error.response.data.message : error.message);
      setError("An error occurred during signup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-800 via-blue-400 to-blue-800">
      <div className="w-full max-w-md py-6 px-8 space-y-1 bg-white shadow-xl rounded-xl border border-blue-200">
        <h2 className="text-3xl font-extrabold text-center text-blue-700">
          Create New Account
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {/* First and Second Name */}
            <div className="flex space-x-4">
              {/* First name */}
              <div className="w-1/2">
                <InputField
                  label="First Name"
                  id="first-name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                />
              </div>
              {/* Second name */}
              <div className="w-1/2">
                <InputField
                  label="Second Name"
                  id="second-name"
                  type="text"
                  value={secondName}
                  onChange={(e) => setSecondName(e.target.value)}
                  placeholder="Second Name"
                />
              </div>
            </div>

            {/* Username */}
            <InputField
              label="Username"
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />

            {/* Email */}
            <InputField
              label="Email Address"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
            />

            {/* Phone Number */}
            <InputField
              label="Phone Number"
              id="phone-number"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number"
            />

            {/* Password */}
            <InputField
              label="Password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />

            {/* Confirm Password */}
            <InputField
              label="Confirm Password"
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
            />
          </div>

          {/* Display error message */}
          {error && <div className="text-red-500 text-sm">{error}</div>}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}  // Disable the button while loading
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out transform hover:scale-105"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>

          {/* Link to Login */}
          <LinkToLogin />
        </form>
      </div>
    </div>
  );
};

export default Signup;

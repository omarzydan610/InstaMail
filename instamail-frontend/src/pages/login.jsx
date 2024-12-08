import React, { useState } from "react";
import InputField from "../components/InputField";
import LinkToSignup from "../components/LinkToSignup";
import useAuthStore from "../store/authStore";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setToken = useAuthStore((state) => state.setToken);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('https://localhost:8080/login', {
        email,
        password,
      });

      if (response.status === 200) {
        setToken(response.data.token);
        console.log("Login successful, token set:", response.data.token);
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("An error occurred:", error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-800 via-blue-400 to-blue-800">
      <div className="w-full max-w-md py-6 px-8 space-y-1 bg-white shadow-xl rounded-xl border border-blue-200">
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-extrabold text-center text-blue-700">
            Log in
          </h2>

          {/* Email */}
          <InputField
            label="Email Address"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
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
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out transform hover:scale-105"
            >
              Log in
            </button>
          </div>

          {/* link to signup */}
          <LinkToSignup />
        </form>
      </div>
    </div>
  );
};

export default Login;

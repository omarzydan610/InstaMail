import React, { useState } from "react";
import InputField from "../components/inputField";
import LinkToLogin from "../components/inputField";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");

  const handleSubmit = (e) => {
    console.log("sign up");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r  from-blue-800 via-blue-400 to-blue-800">
      <div className="w-full max-w-md py-6 px-8 space-y-1 bg-white shadow-xl rounded-xl border border-blue-200">
        <h2 className="text-3xl font-extrabold text-center text-blue-700">
          Create New Account
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {/* First and Second Name */}
            <div className="flex space-x-4">
              {/* First name*/}
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
              {/* Second name*/}
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
              label="Phone number"
              id="phone-number"
              type="text"
              value={phoneNumber}
              onChange={(e) => setphoneNumber(e.target.value)}
              placeholder="phone number"
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

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out transform hover:scale-105"
            >
              Sign Up
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

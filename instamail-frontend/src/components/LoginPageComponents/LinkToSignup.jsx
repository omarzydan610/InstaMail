import React from "react";

const LinkToSignup = () => {
  return (
    <div className="text-sm text-center">
      <p className="text-gray-600">
        Create a new account?{" "}
        <a
          href="/register"
          className="text-blue-600 font-bold hover:text-blue-800"
        >
          signup
        </a>
      </p>
    </div>
  );
};

export default LinkToSignup;

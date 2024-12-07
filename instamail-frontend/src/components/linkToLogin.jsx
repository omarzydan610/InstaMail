import React from "react";

const LinkToLogin = () => {
  return (
    <div className="text-sm text-center">
      <p className="text-gray-600">
        Already have an account?{" "}
        <a
          href="/login"
          className="text-blue-600 font-bold hover:text-blue-800"
        >
          Login
        </a>
      </p>
    </div>
  );
};

export default LinkToLogin;

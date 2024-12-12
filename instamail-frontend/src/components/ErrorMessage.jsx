import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
const ErrorMessage = () => {
  const { isFetalError, setIsFetalError } = useAppContext();
  const navigate = useNavigate();
  if (!isFetalError) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-100000">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-6 text-center text-lg">
            Sorry,Something went wrong. Please return to login page.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                navigate("/login");
                setIsFetalError(false);
              }}
              className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Return to Login Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;

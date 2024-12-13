import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
const ErrorMessage = () => {
  const { isFetalError, setIsFetalError } = useAppContext();
  const navigate = useNavigate();
  if (!isFetalError) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
      <div className="bg-white/95 dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden relative border border-gray-200 dark:border-gray-700 animate-slideUp">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-6 text-center text-lg">
            Sorry, Something went wrong. Please return to login page.
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

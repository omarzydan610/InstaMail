import React, { useState } from "react";
import ComposeEmail from "../ComposeEmailComponents/ComposeEmail";

const FloatingButton = () => {
  const [isComposeVisible, setComposeVisible] = useState(false);

  const handleButtonClick = () => {
    setComposeVisible(true);
  };

  const closeComposeEmail = () => {
    setComposeVisible(false);
  };

  return (
    <div>
      <div className="fixed bottom-6 right-6">
        <button
          onClick={handleButtonClick}
          className="flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-transform duration-200 hover:scale-110"
        >
          <span className="text-2xl font-bold -translate-y-0.5">+</span>
        </button>
      </div>

      {isComposeVisible && <ComposeEmail onClose={closeComposeEmail} />}
    </div>
  );
};

export default FloatingButton;

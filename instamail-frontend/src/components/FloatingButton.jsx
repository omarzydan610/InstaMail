import React from "react";

const FloatingButton = () => {
  return (
    <div className="fixed bottom-6 right-6">
      <button className="flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-transform duration-200 hover:scale-110">
        <span className="text-2xl font-bold -translate-y-0.5">+</span>
      </button>
    </div>
  );
};

export default FloatingButton;

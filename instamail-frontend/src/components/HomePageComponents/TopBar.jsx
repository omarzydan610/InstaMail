import React, { useState } from "react";
import { FaBars } from "react-icons/fa";

const TopBar = ({ toggleSidebar }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  return (
    <div className="flex items-center justify-between bg-blue-700 text-white px-4 py-3 relative ">
      <div
        className="cursor-pointer p-1 rounded-full hover:bg-blue-600"
        onClick={toggleSidebar}
      >
        <FaBars />
      </div>
      <div className="text-lg font-bold ml-6" style={{ userSelect: "none" }}>
        InstaMail
      </div>
      <div className="flex-grow"></div>
      <input
        type="text"
        placeholder="Search"
        className="w-3/6 px-3 py-1 rounded-full outline-none text-black"
      />
      <div className="flex-grow"></div>
      <div className="font-semibold mr-4 relative cursor-pointer">
        <span
          className="p-3 rounded-lg hover:bg-blue-600"
          onClick={togglePopup}
        >
          John Doe
        </span>
        {isPopupVisible && (
          <div className="absolute top-8 right-0 mt-2 bg-white text-black shadow-lg border border-gray-200 rounded-lg p-4 z-50 w-56">
            <p className="font-semibold">John Doe</p>
            <p className="text-sm text-gray-500">john.doe@example.com</p>
            <p className="text-sm text-gray-500">+123 456 7890</p>
            <button
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              onClick={() => alert("Signed out")}
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;

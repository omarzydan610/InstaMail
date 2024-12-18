import { React, useState } from "react";
import { FaBars } from "react-icons/fa";
import AuthContext from "../../contexts/AuthContext";
import { useAppContext } from "../../contexts/AppContext";
const TopBar = ({
  toggleSidebar,
  isSearchOpen,
  setIsSearchOpen,
  setSearchTerm,
}) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const { username, userEmail, phoneNumber, setToken } = useAppContext();

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleSignOut = () => {
    AuthContext.signOut(setToken);
  };

  const handleSearchChange = (value) => {
    setIsSearchOpen(true);
    setSearchTerm(value);
  };

  return (
    <>
      {!isSearchOpen && (
        <div className="flex items-center justify-between bg-blue-700 text-white px-4 py-3 relative ">
          <div
            className="cursor-pointer p-1 rounded-full hover:bg-blue-600"
            onClick={toggleSidebar}
          >
            <FaBars />
          </div>
          <div
            className="text-lg font-bold ml-6"
            style={{ userSelect: "none" }}
          >
            InstaMail
          </div>
          <div className="flex-grow"></div>
          <input
            type="text"
            placeholder="Search"
            className="w-3/6 px-3 py-1 rounded-full outline-none text-black"
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          <div className="flex-grow"></div>
          <div className="font-semibold mr-4 relative cursor-pointer">
            <span
              className="p-3 rounded-lg hover:bg-blue-600"
              onClick={togglePopup}
              style={{ userSelect: "none" }}
            >
              {username}
            </span>
            {isPopupVisible && (
              <div className="absolute top-8 right-0 mt-2 bg-white text-black shadow-lg border border-gray-200 rounded-lg p-4 z-50 w-56">
                <p className="font-semibold">{username}</p>
                <p className="text-sm text-gray-500">{userEmail}</p>
                <p className="text-sm text-gray-500">{phoneNumber}</p>
                <button
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TopBar;

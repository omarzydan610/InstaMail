import { FaArrowLeft, FaFilter } from "react-icons/fa";
import { useState } from "react";
import SearchService from "../services/SearchService";
const SearchModal = ({
  isSearchOpen,
  setIsSearchOpen,
  searchTerm,
  setSearchTerm, // Assume this is the list of items to search and filter
}) => {
  const [filterBy, setFilterBy] = useState("all");

  const [searchResults, setSearchResults] = useState([
    { name: "omar", category: "sender" },
    { name: "ahmed", category: "sender" },
    { name: "ali", category: "subject" },
  ]);
  const handleSearch = async (value) => {
    setSearchTerm(value);
    if (value.length === 0) {
      setIsSearchOpen(false);
      setSearchResults([]); // Clear results when search term is empty
      return;
    }
    const results = await SearchService.searchMails(value);
    setSearchResults(results);
  };

  const handleFilterChange = (filter) => {
    setFilterBy(filter);
    handleSearch(searchTerm);
  };

  return (
    <>
      {isSearchOpen && (
        <div className="absolute inset-0 bg-white z-50">
          {/* Header Section */}
          <div className="flex items-center justify-between bg-blue-700 text-white px-4 py-3 relative">
            <div className="cursor-pointer p-1 rounded-full hover:bg-blue-600 mr-2">
              <FaArrowLeft
                onClick={() => setIsSearchOpen(false)}
                className="cursor-pointer"
              />
            </div>
            <div className="flex-grow"></div>
            <input
              type="text"
              placeholder="Search"
              className="w-3/6 px-3 py-1 rounded-full outline-none text-black mr-20 ml-24"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              autoFocus
            />
            <div className="flex-grow"></div>
          </div>

          {/* Filter Section */}
          <div className="flex  items-center justify-center bg-gray-300 text-black px-4 py-3">
            <div className="flex items-center mr-4">
              <FaFilter />
              <span className="ml-2">Filter by:</span>
            </div>
            <div className="flex space-x-4">
              <button
                className={`px-4 py-1 rounded ${
                  filterBy === "all" ? "bg-gray-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => handleFilterChange("all")}
              >
                All
              </button>
              <button
                className={`px-4 py-1 rounded ${
                  filterBy === "sender"
                    ? "bg-gray-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handleFilterChange("sender")}
              >
                Sender
              </button>
              <button
                className={`px-4 py-1 rounded ${
                  filterBy === "subject"
                    ? "bg-gray-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handleFilterChange("subject")}
              >
                Subject
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="p-4">
            {searchResults.length > 0 ? (
              <ul>
                {searchResults.map((result, index) => (
                  <li
                    key={index}
                    className="p-2 border-b border-gray-300 hover:bg-gray-100"
                  >
                    {result.name} -{" "}
                    <span className="text-sm">{result.category}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center text-gray-500">No results found</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchModal;

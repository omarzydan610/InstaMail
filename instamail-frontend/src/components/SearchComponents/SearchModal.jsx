import { FaArrowLeft, FaFilter } from "react-icons/fa";
import { useState, useEffect } from "react";
import SearchService from "../../services/SearchService";
import NormalEmailModal from "../EmailComponents/NormalEmailModal";
import Email from "./Email";
const SearchModal = ({
  isSearchOpen,
  setIsSearchOpen,
  searchTerm,
  setSearchTerm, // Assume this is the list of items to search and filter
}) => {
  const [filterBy, setFilterBy] = useState("all");

  const [senderResults, setSenderResults] = useState([]);
  const [subjectResults, setSubjectResults] = useState([]);
  const [bodyResults, setBodyResults] = useState([]);
  const [receiverResults, setReceiverResults] = useState([]);

  const handleSearch = async (value) => {
    value = value.trim();
    setSearchTerm(value);
  };

  useEffect(() => {
    const fetchResults = async () => {
      if (searchTerm === "") {
        setSenderResults([]);
        setSubjectResults([]);
        setBodyResults([]);
        setReceiverResults([]);
        return;
      }
      const results = await SearchService.searchMails(searchTerm);
      setSenderResults(results.sender);
      setSubjectResults(results.subject);
      setBodyResults(results.body);
      setReceiverResults(results.receiver);
      console.log(results);
    };
    fetchResults();
  }, [searchTerm]);

  const handleFilterChange = (filter) => {
    setFilterBy(filter);
    handleSearch(searchTerm);
  };

  const [selectedEmail, setSelectedEmail] = useState(null);
  const [attachmentsOfMail, setAttachmentsOfMail] = useState([]);

  const handleCloseModal = () => {
    setSelectedEmail(null);
    setAttachmentsOfMail([]);
  };

  let emailModal = null;
  if (selectedEmail) {
    emailModal = (
      <NormalEmailModal
        email={selectedEmail}
        attachmentsOfMail={attachmentsOfMail}
        onClose={handleCloseModal}
      />
    );
  }
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
              defaultValue={searchTerm}
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
                  filterBy === "receiver"
                    ? "bg-gray-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handleFilterChange("receiver")}
              >
                Receiver
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
              <button
                className={`px-4 py-1 rounded ${
                  filterBy === "body" ? "bg-gray-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => handleFilterChange("body")}
              >
                Body
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="p-4">
            {(filterBy === "sender" || filterBy === "all") &&
              searchTerm !== "" && (
                <>
                  {senderResults.length > 0 ? (
                    <>
                      <div className=" font-bold text-lg">
                        Mathching Results With Sender:
                      </div>
                      {senderResults.map((result) => (
                        <Email
                          key={result.id}
                          email={result}
                          setSelectedEmail={setSelectedEmail}
                          setAttachmentsOfMail={setAttachmentsOfMail}
                        />
                      ))}
                    </>
                  ) : (
                    filterBy !== "all" && (
                      <div className="text-center text-gray-500 mt-4">
                        No Matching Results
                      </div>
                    )
                  )}
                </>
              )}
            {(filterBy === "receiver" || filterBy === "all") &&
              searchTerm !== "" && (
                <>
                  {receiverResults.length > 0 ? (
                    <>
                      <div className=" font-bold text-lg">
                        Mathching Results With Receiver:
                      </div>
                      {receiverResults.map((result) => (
                        <Email
                          key={result.id}
                          email={result}
                          setSelectedEmail={setSelectedEmail}
                          setAttachmentsOfMail={setAttachmentsOfMail}
                        />
                      ))}
                    </>
                  ) : (
                    filterBy !== "all" && (
                      <div className="text-center text-gray-500 mt-4">
                        No Matching Results
                      </div>
                    )
                  )}
                </>
              )}
            {(filterBy === "subject" || filterBy === "all") &&
              searchTerm !== "" && (
                <>
                  {subjectResults.length > 0 ? (
                    <>
                      <div className=" font-bold text-lg">
                        Mathching Results With Subject:
                      </div>
                      {subjectResults.map((result) => (
                        <Email
                          key={result.id}
                          email={result}
                          setSelectedEmail={setSelectedEmail}
                          setAttachmentsOfMail={setAttachmentsOfMail}
                        />
                      ))}
                    </>
                  ) : (
                    filterBy !== "all" && (
                      <div className="text-center text-gray-500 mt-4">
                        No Matching Results
                      </div>
                    )
                  )}
                </>
              )}
            {(filterBy === "body" || filterBy === "all") &&
              searchTerm !== "" && (
                <>
                  {bodyResults.length > 0 ? (
                    <>
                      <div className=" font-bold text-lg">
                        Mathching Results With Body:
                      </div>
                      {bodyResults.map((result) => (
                        <Email
                          key={result.id}
                          email={result}
                          setSelectedEmail={setSelectedEmail}
                          setAttachmentsOfMail={setAttachmentsOfMail}
                        />
                      ))}
                    </>
                  ) : (
                    filterBy !== "all" && (
                      <div className="text-center text-gray-500 mt-4">
                        No Matching Results
                      </div>
                    )
                  )}
                </>
              )}
            {filterBy === "all" &&
              searchTerm !== "" &&
              senderResults.length === 0 &&
              receiverResults.length === 0 &&
              subjectResults.length === 0 &&
              bodyResults.length === 0 && (
                <div className="text-center text-gray-500 mt-4">
                  No Matching Results
                </div>
              )}
          </div>
        </div>
      )}
      {emailModal}
    </>
  );
};

export default SearchModal;

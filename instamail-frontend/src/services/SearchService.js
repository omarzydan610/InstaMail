import axios from "axios";

class SearchService {
  static searchMails(searchTerm) {
    const token = localStorage.getItem("authToken");
    const response = axios.get(`/search/${searchTerm}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
}
export default SearchService;

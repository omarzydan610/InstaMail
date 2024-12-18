import api from "./api";

class SearchService {
  static async searchMails(searchTerm) {
    console.log(searchTerm);
    const token = localStorage.getItem("authToken");
    const response = await api.get(`/search/${searchTerm}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
}
export default SearchService;

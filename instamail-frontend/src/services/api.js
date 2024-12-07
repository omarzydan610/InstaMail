import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api", // Replace with your Spring Boot backend URL
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

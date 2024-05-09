import axios from "axios";

export const api_users = axios.create({
  baseURL: "http://localhost:8081/api/users",
});

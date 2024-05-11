import axios from "axios";

export const api_users = axios.create({
  baseURL: "http://localhost:8081/api/users",
});
export const api_albums = axios.create({
  baseURL: "http://localhost:8082/api/albums",
});
export const api_wallet = axios.create({
  baseURL: "http://localhost:8081/api/wallet",
});

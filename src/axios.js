import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "https://epu-social-api.onrender.com/api/",
  withCredentials: true,
});

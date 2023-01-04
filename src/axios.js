import axios from "axios";

const user = localStorage.getItem('user');

axios.interceptors.request.use(function (config) {
  const token = JSON.parse(user)?.token
  config.headers.Authorization = token;

  return config;
});

export const makeRequest = axios.create({
  baseURL: "https://epu-social-api.onrender.com/api/",
  withCredentials: true,
});

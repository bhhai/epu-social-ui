import axios from "axios";

const user = localStorage.getItem('user');

axios.interceptors.request.use(function (config) {
  const token = JSON.parse(user)?.token
  config.headers.Authorization = token;

  return config;
});

export const makeRequest = axios.create({
  baseURL: "http://localhost:8800/api/",
  withCredentials: true,
});

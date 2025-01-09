import axios from "axios";

export const baseURL = "";

const axiosClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Simple interceptor to add authorization header if token exists
axiosClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

// Basic error handling interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can add custom error handling here if needed
    return Promise.reject(error);
  }
);

export default axiosClient;

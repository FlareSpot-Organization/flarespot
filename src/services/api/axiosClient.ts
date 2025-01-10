import axios from "axios";

// Access environment variables using import.meta.env
export const baseURL = import.meta.env.VITE_API_BASE_URL;
export const RAPID_API_KEY = import.meta.env.VITE_RAPID_API_KEY;

// Validate environment variables
if (!RAPID_API_KEY) {
  throw new Error("RAPID_API_KEY is not defined in environment variables");
}

if (!baseURL) {
  throw new Error("API_BASE_URL is not defined in environment variables");
}

const axiosClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "x-rapidapi-key": RAPID_API_KEY,
    "x-rapidapi-host": "real-time-amazon-data.p.rapidapi.com",
  },
});

// Error handling interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("Response Error:", {
        status: error.response.status,
        data: error.response.data,
      });
    } else if (error.request) {
      console.error("Request Error:", error.request);
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;

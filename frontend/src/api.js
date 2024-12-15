// frontend/src/api.js
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Function to refresh the token
const refreshToken = async () => {
  const refresh = localStorage.getItem(REFRESH_TOKEN);
  if (!refresh) throw new Error("No refresh token available");

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/token/refresh/`,
      {
        refresh,
      }
    );
    const { access } = response.data;

    // Save new access token
    localStorage.setItem(ACCESS_TOKEN, access);

    // Update Axios default headers
    api.defaults.headers.common["Authorization"] = `Bearer ${access}`;

    return access;
  } catch (error) {
    console.error("Error refreshing token:", error);
    localStorage.clear();
    // window.location.href = "/login"; // Redirect to login on failure
    throw error;
  }
};

// Axios request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;

      // If the token is about to expire, refresh it
      if (decoded.exp < now + 60) {
        // Refresh 60 seconds before expiration
        return refreshToken().then(() => {
          config.headers.Authorization = `Bearer ${localStorage.getItem(
            ACCESS_TOKEN
          )}`;
          return config;
        });
      }

      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Axios response interceptor for 401 errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors and retry with a refreshed token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refreshToken();
        return api(originalRequest); // Retry the original request
      } catch (refreshError) {
        console.error("Unable to refresh token:", refreshError);
        localStorage.clear();
        window.location.href = "/login"; // Redirect to login
        throw refreshError;
      }
    }

    return Promise.reject(error);
  }
);

// Fetch all reports from /api/reports/
export const getReports = async () => {
  try {
    const response = await api.get("/api/reports/");
    return response.data; // The response should contain the list of reports
  } catch (error) {
    throw error.response?.data || "Fetching reports failed.";
  }
};

// Summarize multiple selected reports from /api/summarize/
export const summarizeReports = async (selected_file_ids, language = "en") => {
  try {
    const response = await api.post("/api/summarize/", {
      selected_file_ids,
      language,
    });
    return response.data; // { summary: "..." }
  } catch (error) {
    throw error.response?.data || "Summarization failed.";
  }
};

// Summarize Markdown content from /api/summarize/
export const summarizeMarkdown = async (text, language) => {
  try {
    const response = await api.post("/api/summarize/", { text, language });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Summarization failed.";
  }
};

export default api;

// frontend/src/api.js
import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
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
// This expects { selected_file_ids: [...], language: "en" or "ar" }
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

// If you still want to keep the existing summarizeMarkdown function,
// make sure your backend is configured to handle it.
// Otherwise, you may remove or modify it to fit the new API requirements.
export const summarizeMarkdown = async (text, language) => {
  try {
    const response = await api.post("/api/summarize/", { text, language });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Summarization failed.";
  }
};

export default api;

import axios from "axios";

const normalizeApiBase = (url) => {
  const raw = String(url || "").trim();
  if (!raw) return "http://localhost:5000/api";

  // Relative path like "/api" — keep as-is for same-origin proxying
  if (raw.startsWith("/")) return raw.replace(/\/+$/, "");

  const trimmed = raw.replace(/\/+$/, "");
  return trimmed.endsWith("/api") ? trimmed : `${trimmed}/api`;
};

const axiosInstance = axios.create({
  baseURL: normalizeApiBase(import.meta.env.VITE_API_URL),
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
        if (user?.token) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      }
    } catch (error) {
      console.error("Error parsing user from localStorage", error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
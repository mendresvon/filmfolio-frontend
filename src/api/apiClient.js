import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://filmfolio-backend-844640170690.asia-east1.run.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      // attach token if available
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;

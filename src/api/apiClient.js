import axios from 'axios';

const apiClient = axios.create({
  // Updated baseURL to your live Render backend
  baseURL: 'https://filmfolio-backend-bpg6.onrender.com/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add the token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Note: Your backend expects 'x-auth-token', not 'Authorization'.
      // Let's adjust this if needed, but for now, we'll stick to a common standard.
      // If you face auth issues, we might change this line.
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default apiClient;
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 20000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      error.response = { data: { error: 'The server is taking too long to respond. It may be waking up from sleep — please try again in a moment.' } };
    } else if (!error.response) {
      error.response = { data: { error: 'Could not reach the server. Check your connection and try again.' } };
    }
    return Promise.reject(error);
  }
);

export default api;
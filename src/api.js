import axios from 'axios';

const DEFAULT_API_URL = 'https://revoapps-backend.onrender.com';
const isLocalhost = typeof window !== 'undefined' && /(localhost|127\.0\.0\.1)/.test(window.location.hostname);
const envApiUrl = process.env.REACT_APP_API_URL;
const HOST = isLocalhost
  ? envApiUrl || 'https://revoapps-backend.onrender.com'
  : envApiUrl?.includes('localhost')
    ? DEFAULT_API_URL
    : envApiUrl || DEFAULT_API_URL;
const API_BASE = HOST.replace(/\/$/, '') + '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (typeof window !== 'undefined') {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
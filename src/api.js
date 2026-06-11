import axios from 'axios';

const isLocalhost = typeof window !== 'undefined' && /(localhost|127\.0\.0\.1)/.test(window.location.hostname);
const envApiUrl = process.env.REACT_APP_API_URL?.trim();
const fallbackApiUrl = isLocalhost ? 'http://localhost:4000' : window.location.origin;
const HOST = envApiUrl || fallbackApiUrl;
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
        window.location.href = '#/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
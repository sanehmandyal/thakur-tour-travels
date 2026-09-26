import axios from 'axios';

const defaultBaseUrl =
  typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1'
    ? 'https://thakur-tour-travels-api.onrender.com/api'
    : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || defaultBaseUrl
});

api.interceptors.request.use((c) => {
  const t = localStorage.getItem('ttt_token');
  if (t && t !== 'thakur_admin_token_2026' && !t.startsWith('demo_')) {
    c.headers.Authorization = `Bearer ${t}`;
  }
  return c;
});

api.interceptors.response.use(
  (r) => r,
  (e) => {
    const msg = e.response?.data?.message || 'Network error';
    e.userMessage = msg;
    // Do NOT aggressively clear user or redirect on background network failures
    return Promise.reject(e);
  }
);

export default api;

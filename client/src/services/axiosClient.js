import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api' });

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
    const s = e.response?.status;
    const msg = e.response?.data?.message || 'Network error';
    e.userMessage = msg;
    // Do NOT aggressively clear user or redirect on background network failures
    return Promise.reject(e);
  }
);

export default api;

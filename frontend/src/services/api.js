import axios from 'axios';

export const SESSION_KEY = 'campusflow_session';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  try {
    const session = JSON.parse(localStorage.getItem(SESSION_KEY));
    if (session?.token) config.headers.Authorization = `Bearer ${session.token}`;
  } catch {
    /* ignore corrupted session */
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginCall = error.config?.url?.includes('/auth/login');
    if (error.response?.status === 401 && !isLoginCall) {
      localStorage.removeItem(SESSION_KEY);
      window.location.assign('/login?expired=1');
    }
    return Promise.reject(error);
  }
);

export default api;

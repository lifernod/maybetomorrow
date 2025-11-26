export const API_CONFIG = {
  baseURL: import.meta.env.DEV
    ? "http://localhost:4000"
    : "https://your-production-url.com",
  timeout: 10000,
};

export const createApiUrl = (path: string): string => {
  return import.meta.env.DEV
    ? `http://localhost:4000${path}`
    : `${API_CONFIG.baseURL}${path}`;
};

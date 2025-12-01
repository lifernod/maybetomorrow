export type Fetcher = typeof fetch;

export const API_CONFIG = {
	baseURL: import.meta.env.DEV
		? "http://localhost:4000"
		: "https://your-production-url.com",
	timeout: 10000,
};

// Should have /.../ like /user/hello
export const createApiUrl = (path: string): string => {
	return import.meta.env.DEV
		? `http://localhost:4000/api${path}`
		: `${API_CONFIG.baseURL}/api${path}`;
};

export const formatDate = (date: Date | undefined) => date?.toISOString().replace('T', ' ').split('.')[0];

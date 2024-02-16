import axios from "axios";

export default function useAxios() {
	const axiosInstance = axios.create({
		baseURL: import.meta.env.VITE_BACKEND_URL,
	});

	axiosInstance.interceptors.request.use(
		(config) => {
			const token = document.cookie
				.split("; ")
				.find((row) => row.startsWith("access_token"))
				?.split("=")[1];

			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}

			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	return { axiosInstance };
}

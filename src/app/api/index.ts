import axios from "axios";
import { getItem, removeItem } from "../../helpers/localstorage";

const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
	const access_token = getItem("access_token");
	if (access_token) {
		config.headers["Authorization"] = `Bearer ${access_token}`;
	}
	return config;
});

axiosInstance.interceptors.response.use(
	(res) => res,
	async (err) => {
		if (err.response && err.response.status === 401) {
			removeItem("access_token");
			removeItem("role");
			window.location.href = "/";
		}
		return Promise.reject(err);
	}
);

export default axiosInstance;

import axios from "axios";
import { getItem, removeItem } from "../../helpers/localstorage";

const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
});
console.log(process.env.NEXT_PUBLIC_API_URL, "API URL");

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
			removeItem("user_id");

			document.cookie =
				"access_token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
			document.cookie = "role=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
			document.cookie =
				"user_id=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";

			if (
				!window.location.pathname.includes("/sign-in") &&
				!window.location.pathname.includes("/sign-up") &&
				!window.location.pathname.includes("/choose-role")
			) {
				window.location.href = "/sign-in";
			}
		}
		return Promise.reject(err);
	}
);

export default axiosInstance;

import { ApiUrls } from "../app/api/api-urls";
import { apiConfig } from "../app/api/config";
import { removeItem, setItem } from "../helpers/localstorage";
import { Notification } from "../helpers/notification";

const setCookie = (name: string, value: string, days: number = 7) => {
	const expires = new Date();
	expires.setTime(expires.getTime() + days * 15 * 60 * 60 * 1000);
	document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

const removeCookie = (name: string) => {
	document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

export const authService = {
	signIn: async (email: string, password: string) => {
		const response: any = await apiConfig().postRequest(ApiUrls.SIGN_IN, {
			email,
			password,
		});
		if (response.data.success) {
			Notification("success", response.data.message);

			setItem("access_token", response.data.accessToken);
			setItem("role", response.data.role);
			setItem("user_id", response.data.userId);

			setCookie("access_token", response.data.accessToken);
			setCookie("role", response.data.role);
			setCookie("user_id", response.data.userId);
		}
		return response;
	},
	signUp: async (email: string, password: string) => {
		const response = await apiConfig().postRequest(ApiUrls.SIGN_UP, {
			email,
			password,
		});
		return response.data;
	},

	signOut: async () => {
		try {
			const response = await apiConfig().postRequest(ApiUrls.SIGN_OUT);
			removeCookie("access_token");
			removeCookie("role");
			removeCookie("user_id");
			removeItem("access_token");
			removeItem("role");
			removeItem("user_id");
			window.location.href = "/";
			return response.data;
		} catch (error) {
			removeCookie("access_token");
			removeCookie("role");
			removeCookie("user_id");
			removeItem("access_token");
			removeItem("role");
			removeItem("user_id");
			window.location.href = "/";
			throw error;
		}
	},

	refreshToken: async (id: string) => {
		const response = await apiConfig().postRequest(ApiUrls.REFRESH_TOKEN(id));
		return response.data;
	},
	verifyOtp: async (email: string, otp: string) => {
		const response = await apiConfig().postRequest(ApiUrls.VERIFY_OTP, {
			email,
			otp,
		});
		return response.data;
	},

	resetPassword: async (email: string, password: string) => {
		const response = await apiConfig().postRequest(ApiUrls.RESET_PASSWORD, {
			email,
			password,
		});
		return response.data;
	},
	changePassword: async (email: string, password: string) => {
		const response = await apiConfig().postRequest(ApiUrls.CHANGE_PASSWORD, {
			email,
			password,
		});
		return response.data;
	},
};

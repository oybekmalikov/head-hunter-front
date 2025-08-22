import { ApiUrls } from "../app/api/api-urls";
import { apiConfig } from "../app/api/config";
import { setItem } from "../helpers/localstorage";
import { Notification } from "../helpers/notification";

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
		const response = await apiConfig().postRequest(ApiUrls.SIGN_OUT);
		return response.data;
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

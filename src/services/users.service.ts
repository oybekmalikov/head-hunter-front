import { ApiUrls } from "../app/api/api-urls";
import { apiConfig } from "../app/api/config";

export const usersService = {
	uploadAvatar: async (data: any) => {
		const response = await apiConfig().postRequest(ApiUrls.UPLOAD_AVATAR, data);
		return response.data;
	},
};

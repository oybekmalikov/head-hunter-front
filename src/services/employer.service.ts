import { ApiUrls } from "../app/api/api-urls"
import { apiConfig } from "../app/api/config"

export const employerService = {
	createEmployer: async (employer: any) => {
		const response = await apiConfig().postRequest(ApiUrls.CREATE_EMPLOYER, employer);
		return response.data;
	},
};

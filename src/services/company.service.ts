import { ApiUrls } from "../app/api/api-urls"
import { apiConfig } from "../app/api/config"

export const companyService = {
	createCompany: async (company: any) => {
		const response = await apiConfig().postRequest(ApiUrls.CREATE_COMPANY, company);
		return response.data;
	},
};

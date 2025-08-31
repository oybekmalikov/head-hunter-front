import { ApiUrls } from "../app/api/api-urls";
import { apiConfig } from "../app/api/config";

export const skillsService = {
	getAllSkills: async () => {
		const response = await apiConfig().getRequest(ApiUrls.GET_ALL_SKILLS);
		return response.data;
	},
	getSkillsByName: async (name: string) => {
		const response = await apiConfig().getRequest(ApiUrls.GET_ALL_SKILLS_BY_NAME(name));
		return response.data;
	},
};

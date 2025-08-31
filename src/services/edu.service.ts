import { ApiUrls } from "../app/api/api-urls";
import { apiConfig } from "../app/api/config";

export const eduService = {
	createEdu: async (edu: any) => {
		const response = await apiConfig().postRequest(ApiUrls.CREATE_JOB_SEEKER_EDUCATION, edu);
		return response.data;
	},
	getEduByJobSeekerId: async (jobSeekerId: string) => {
		const response = await apiConfig().getRequest(ApiUrls.GET_JOB_SEEKER_EDUCATIONS_BY_JOB_SEEKER_ID(jobSeekerId));
		return response.data;
	},
	updateEdu: async (edu: any) => {
		const response = await apiConfig().updateRequest(ApiUrls.UPDATE_JOB_SEEKER_EDUCATION(edu.id), edu);
		return response.data;
	},
	deleteEdu: async (id: string) => {
		const response = await apiConfig().deleteRequest(ApiUrls.DELETE_JOB_SEEKER_EDUCATION(id));
		return response.data;
	},
};

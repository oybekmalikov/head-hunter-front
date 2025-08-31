import { ApiUrls } from "../app/api/api-urls";
import { apiConfig } from "../app/api/config";

export const workExperienceService = {
	getWorkExperienceByJobSeekerId: async (jobSeekerId: string) => {
		const response = await apiConfig().getRequest(ApiUrls.GET_JOB_SEEKER_WORK_EXPERIENCES_BY_JOB_SEEKER_ID(jobSeekerId));
		return response.data;
	},
	createWorkExperience: async (workExperience: any) => {
		const response = await apiConfig().postRequest(ApiUrls.CREATE_JOB_SEEKER_WORK_EXPERIENCE, workExperience);
		return response.data;
	},
	updateWorkExperience: async (workExperience: any) => {
		const response = await apiConfig().updateRequest(ApiUrls.UPDATE_JOB_SEEKER_WORK_EXPERIENCE(workExperience.id), workExperience);
		return response.data;
	},
	deleteWorkExperience: async (id: string) => {
		const response = await apiConfig().deleteRequest(ApiUrls.DELETE_JOB_SEEKER_WORK_EXPERIENCE(id));
		return response.data;
	},
};

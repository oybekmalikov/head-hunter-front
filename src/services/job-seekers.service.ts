import { ApiUrls } from "../app/api/api-urls";
import { apiConfig } from "../app/api/config";

export const jobSeekersService = {
	uploadResume: async (resume: File) => {
		const formData = new FormData();	
		formData.append("file", resume);
		const response = await apiConfig().postRequest(ApiUrls.UPLOAD_RESUME, formData);
		return response.data;
	},
	deleteResume: async () => {
		const response = await apiConfig().deleteRequest(ApiUrls.DELETE_RESUME);
		return response.data;
	},
	getProfile: async () => {
		const response = await apiConfig().getRequest(ApiUrls.GET_PROFILE);
		return response.data;
	},
	updateJobSeeker: async (jobSeeker: any) => {
		const response = await apiConfig().updateRequest(ApiUrls.UPDATE_JOB_SEEKER(jobSeeker.id), jobSeeker);
		return response.data;
	},
};

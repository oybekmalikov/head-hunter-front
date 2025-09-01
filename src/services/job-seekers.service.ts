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
	getJobSeekerPostings: async (jobSeekerId: string) => {
		const response = await apiConfig().getRequest(
			ApiUrls.GET_JOB_SEEKER_POSTINGS_BY_JOB_SEEKER_ID(jobSeekerId)
		);
		return response.data;
	},
	createJobSeekerPosting: async (jobSeekerPosting: any) => {
		const response = await apiConfig().postRequest(ApiUrls.CREATE_JOB_SEEKER_POSTING, jobSeekerPosting);
		return response.data;
	},
	getJobSeekerProfile: async () => {
		const response = await apiConfig().getRequest(
			ApiUrls.GET_JOB_SEEKER_PROFILE
		);
		return response.data;
	},
	getJobSeekers: async () => {
		const response = await apiConfig().getRequest(
			ApiUrls.GET_ALL_JOB_SEEKERS
		);
		return response.data;
	}
};

import { ApiUrls } from "../app/api/api-urls";
import { apiConfig } from "../app/api/config";

export class JobApplicationsService {
	async getJobApplicationById(id: string) {
		const response = await apiConfig().getRequest(
			ApiUrls.GET_JOB_APPLICATION_BY_ID(id)
		);
		return response.data;
	}

		async getAllJobApplications() {
		const response = await apiConfig().getRequest(
			ApiUrls.GET_ALL_JOB_APPLICATION
		);
		return response.data;
	}
	async getJobApplicationsByJobSeekerId(jobSeekerId: string) {
		const response = await apiConfig().getRequest(
			ApiUrls.GET_JOB_APPLICATIONS_BY_JOB_SEEKER_ID(jobSeekerId)
		);
		return response.data;
	}

	async getJobApplicationsByJobSeekerIdAndStatus(
		jobSeekerId: string,
		status: string
	) {
		const response = await apiConfig().getRequest(
			ApiUrls.GET_JOB_APPLICATIONS_JOB_SEEKER_BY_STATUS(jobSeekerId, status)
		);
		return response.data;
	}

	async getJobApplicationsByJobPostingId(jobPostingId: string) {
		const response = await apiConfig().getRequest(
			ApiUrls.GET_JOB_APPLICATIONS_BY_JOB_POSTING_ID(jobPostingId)
		);
		return response.data;
	}

	async getJobApplicationsByJobPostingIdAndJobSeekerId(
		jobPostingId: string,
		jobSeekerId: string
	) {
		const response = await apiConfig().getRequest(
			ApiUrls.GET_JOB_APPLICATIONS_BY_JOB_POSTING_ID_AND_JOB_SEEKER_ID(
				jobPostingId,
				jobSeekerId
			)
		);
		return response.data;
	}

	async createJobApplication(data: any) {
		const response = await apiConfig().postRequest(
			ApiUrls.CREATE_JOB_APPLICATION,
			data
		);
		return response.data;
	}

	async updateJobApplication(id: string, data: any) {
		const response = await apiConfig().updateRequest(
			ApiUrls.UPDATE_JOB_APPLICATION(id),
			data
		);
		return response.data;
	}

	async deleteJobApplication(id: string) {
		const response = await apiConfig().deleteRequest(
			ApiUrls.DELETE_JOB_APPLICATION(id)
		);
		return response.data;
	}
}

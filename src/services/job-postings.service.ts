import { ApiUrls } from "../app/api/api-urls";
import { apiConfig } from "../app/api/config";

export class JobPostingsService {
	async createJobPosting(data: any) {
		const response = await apiConfig().postRequest(
			ApiUrls.CREATE_JOB_POSTING,
			data
		);
		return response.data;
	}

	async getAllJobPostings() {
		const response = await apiConfig().getRequest(ApiUrls.GET_ALL_JOB_POSTINGS);
		return response.data;
	}

	async getJobPostingById(id: string) {
		const response = await apiConfig().getRequest(
			ApiUrls.GET_JOB_POSTING_BY_ID(id)
		);
		return response.data;
	}

		async getJobPostingByEmployerId(id: string) {
		const response = await apiConfig().getRequest(
			ApiUrls.GET_JOB_POSTINGS_BY_EMPLOYER(id)
		);
		return response.data;
	}

	async updateJobPosting(id: string, data: any) {
		const response = await apiConfig().updateRequest(
			ApiUrls.UPDATE_JOB_POSTING(id),
			data
		);
		return response.data;
	}

	async deleteJobPosting(id: string) {
		const response = await apiConfig().deleteRequest(
			ApiUrls.DELETE_JOB_POSTING(id)
		);
		return response.data;
	}

	async searchJobPostings(search: string) {
		const response = await apiConfig().getRequest(
			ApiUrls.GET_JOB_POSTINGS_SEARCH(search)
		);
		return response.data;
	}

	async getPopularJobPostings(params: object = {}) {
		const response = await apiConfig().getRequest(
			ApiUrls.GET_POPULAR_JOB_POSTINGS(params)
		);
		return response.data;
	}

	async applyForJobPosting(id: string, data: any) {
		const response = await apiConfig().postRequest(
			ApiUrls.APPLY_FOR_JOB_POSTING(id),
			data
		);
		return response.data;
	}

	async updateUserMarkForJobPosting(id: string, data: any) {
		const response = await apiConfig().postRequest(
			ApiUrls.UPDATE_USER_MARK_FOR_JOB_POSTING(id),
			data
		);
		return response.data;
	}

	async updateViewCountForJobPosting(id: string) {
		const response = await apiConfig().postRequest(
			ApiUrls.UPDATE_VIEW_COUNT_FOR_JOB_POSTING(id)
		);
		return response.data;
	}

	async findJobByRequiredSkills(skills: string[]) {
		const response = await apiConfig().getRequest(
			ApiUrls.GET_JOB_POSTINGS_FIND_BY_REQUIRED_SKILLS,
			{ skills }
		);
		return response.data;
	}

	async getAllJobPostingsByPagination(params: object = {}) {
		const response = await apiConfig().getRequest(
			ApiUrls.GET_ALL_JOB_POSTINGS_PAGINATED(params)
		);
		return response.data;
	}
}

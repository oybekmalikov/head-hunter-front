import { apiClient } from "@/lib/api";
import { PaginatedResponse, SearchParams } from "@/types/api";
import { Job, JobApplication } from "@/types/job";

export class JobService {
	async getJobs(params?: SearchParams): Promise<PaginatedResponse<Job>> {
		const queryParams = new URLSearchParams();
		if (params?.query) queryParams.append("query", params.query);
		if (params?.page) queryParams.append("page", params.page.toString());
		if (params?.limit) queryParams.append("limit", params.limit.toString());

		const response = await apiClient.get<PaginatedResponse<Job>>(
			`/jobs?${queryParams.toString()}`
		);
		return response;
	}

	async getJobById(id: string): Promise<Job> {
		const response = await apiClient.get<Job>(`/jobs/${id}`);
		return response;
	}

	async createJob(jobData: Partial<Job>): Promise<Job> {
		const response = await apiClient.post<Job>("/jobs", jobData);
		return response;
	}

	async updateJob(id: string, jobData: Partial<Job>): Promise<Job> {
		const response = await apiClient.put<Job>(`/jobs/${id}`, jobData);
		return response;
	}

	async deleteJob(id: string): Promise<void> {
		await apiClient.delete(`/jobs/${id}`);
	}

	async searchJobs(query: string, filters?: any): Promise<Job[]> {
		const response = await apiClient.get<Job[]>("/jobs/search", {
			query,
			filters,
		});
		return response;
	}

	async getApplications(): Promise<JobApplication[]> {
		const response = await apiClient.get<JobApplication[]>(
			"/jobs/applications"
		);
		return response;
	}

	async getApplicationById(id: string): Promise<JobApplication> {
		const response = await apiClient.get<JobApplication>(
			`/jobs/applications/${id}`
		);
		return response;
	}

	async createApplication(
		applicationData: Partial<JobApplication>
	): Promise<JobApplication> {
		const response = await apiClient.post<JobApplication>(
			"/jobs/applications",
			applicationData
		);
		return response;
	}

	async updateApplication(
		id: string,
		applicationData: Partial<JobApplication>
	): Promise<JobApplication> {
		const response = await apiClient.put<JobApplication>(
			`/jobs/applications/${id}`,
			applicationData
		);
		return response;
	}

	async deleteApplication(id: string): Promise<void> {
		await apiClient.delete(`/jobs/applications/${id}`);
	}
}

export const jobService = new JobService();

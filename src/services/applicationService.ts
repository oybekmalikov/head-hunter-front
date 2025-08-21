import { apiClient } from "@/lib/api";
import { PaginatedResponse, SearchParams } from "@/types/api";
import { JobApplication } from "@/types/job";

export class ApplicationService {
	async getApplications(
		params?: SearchParams
	): Promise<PaginatedResponse<JobApplication>> {
		const queryParams = new URLSearchParams();
		if (params?.query) queryParams.append("query", params.query);
		if (params?.page) queryParams.append("page", params.page.toString());
		if (params?.limit) queryParams.append("limit", params.limit.toString());

		const response = await apiClient.get<PaginatedResponse<JobApplication>>(
			`/jobs/applications?${queryParams.toString()}`
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

	async getMyApplications(): Promise<JobApplication[]> {
		const response = await apiClient.get<JobApplication[]>(
			"/jobs/applications/my"
		);
		return response;
	}

	async getJobApplications(jobId: string): Promise<JobApplication[]> {
		const response = await apiClient.get<JobApplication[]>(
			`/jobs/${jobId}/applications`
		);
		return response;
	}
}

export const applicationService = new ApplicationService();

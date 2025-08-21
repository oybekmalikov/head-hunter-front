import { apiClient } from "@/lib/api";
import { PaginatedResponse, SearchParams } from "@/types/api";
import { Resume } from "@/types/resume";

export class ResumeService {
	async getResumes(params?: SearchParams): Promise<PaginatedResponse<Resume>> {
		const queryParams = new URLSearchParams();
		if (params?.query) queryParams.append("query", params.query);
		if (params?.page) queryParams.append("page", params.page.toString());
		if (params?.limit) queryParams.append("limit", params.limit.toString());

		const response = await apiClient.get<PaginatedResponse<Resume>>(
			`/resumes?${queryParams.toString()}`
		);
		return response;
	}

	async getResumeById(id: string): Promise<Resume> {
		const response = await apiClient.get<Resume>(`/resumes/${id}`);
		return response;
	}

	async createResume(resumeData: Partial<Resume>): Promise<Resume> {
		const response = await apiClient.post<Resume>("/resumes", resumeData);
		return response;
	}

	async updateResume(id: string, resumeData: Partial<Resume>): Promise<Resume> {
		const response = await apiClient.put<Resume>(`/resumes/${id}`, resumeData);
		return response;
	}

	async deleteResume(id: string): Promise<void> {
		await apiClient.delete(`/resumes/${id}`);
	}

	async searchResumes(query: string, filters?: any): Promise<Resume[]> {
		const response = await apiClient.get<Resume[]>("/resumes/search", {
			query,
			filters,
		});
		return response;
	}

	async getMyResume(): Promise<Resume> {
		const response = await apiClient.get<Resume>("/resumes/my");
		return response;
	}
}

export const resumeService = new ResumeService();

import { apiClient } from "@/lib/api";
import { UserProfile } from "@/types/user";

export class UserService {
	async getUsers(): Promise<UserProfile[]> {
		const response = await apiClient.get<UserProfile[]>("/users");
		return response;
	}

	async getUserById(id: string): Promise<UserProfile> {
		const response = await apiClient.get<UserProfile>(`/users/${id}`);
		return response;
	}

	async updateUser(
		id: string,
		userData: Partial<UserProfile>
	): Promise<UserProfile> {
		const response = await apiClient.put<UserProfile>(`/users/${id}`, userData);
		return response;
	}

	async deleteUser(id: string): Promise<void> {
		await apiClient.delete(`/users/${id}`);
	}

	async updateProfile(userData: Partial<UserProfile>): Promise<UserProfile> {
		const response = await apiClient.put<UserProfile>(
			"/users/profile",
			userData
		);
		return response;
	}

	async getProfile(): Promise<UserProfile> {
		const response = await apiClient.get<UserProfile>("/users/profile");
		return response;
	}
}

export const userService = new UserService();

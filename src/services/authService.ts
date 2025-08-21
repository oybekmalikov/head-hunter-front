import { apiClient } from "../lib/api";
import { User } from "../types/auth";

export class AuthService {
	async signIn(
		email: string,
		password: string
	): Promise<{ user: User; token: string }> {
		const response = await apiClient.post<{ user: User; token: string }>(
			"/auth/signin",
			{
				email,
				password,
			}
		);
		return response;
	}

	async signUp(userData: {
		email: string;
		password: string;
		role: "employer" | "jobseeker";
	}): Promise<{ user: User; token: string }> {
		const response = await apiClient.post<{ user: User; token: string }>(
			"/auth/signup",
			userData
		);
		return response;
	}

	async verifyOTP(email: string, otp: string): Promise<{ success: boolean }> {
		const response = await apiClient.post<{ success: boolean }>(
			"/auth/verify-otp",
			{
				email,
				otp,
			}
		);
		return response;
	}

	async refreshToken(): Promise<{ token: string }> {
		const response = await apiClient.post<{ token: string }>("/auth/refresh");
		return response;
	}

	async logout(): Promise<void> {
		await apiClient.post("/auth/logout");
	}

	async getCurrentUser(): Promise<User> {
		const response = await apiClient.get<User>("/users/profile");
		return response;
	}
}

export const authService = new AuthService();

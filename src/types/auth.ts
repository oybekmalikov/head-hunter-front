export interface User {
	id: string;
	email: string;
	role: "admin" | "employer" | "jobseeker";
	isVerified: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
}

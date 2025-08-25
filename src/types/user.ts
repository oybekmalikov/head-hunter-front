export interface UserProfile {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phone?: string;
	avatar?: string;
	role: "admin" | "employer" | "jobseeker";
	isVerified: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface JobseekerProfile extends UserProfile {
	role: "jobseeker";
	skills: string[];
	experience: number;
	education: string;
	location: string;
}

export interface EmployerProfile extends UserProfile {
	role: "employer";
	companyId: string;
	position: string;
	department: string;
}

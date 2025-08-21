export interface Resume {
	id: string;
	jobseekerId: string;
	title: string;
	summary: string;
	skills: string[];
	experience: WorkExperience[];
	education: Education[];
	languages: Language[];
	certifications: Certification[];
	isPublic: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface WorkExperience {
	id: string;
	company: string;
	position: string;
	startDate: Date;
	endDate?: Date;
	description: string;
	achievements: string[];
}

export interface Education {
	id: string;
	institution: string;
	degree: string;
	field: string;
	startDate: Date;
	endDate?: Date;
	gpa?: number;
}

export interface Language {
	name: string;
	proficiency: "basic" | "intermediate" | "fluent" | "native";
}

export interface Certification {
	name: string;
	issuer: string;
	issueDate: Date;
	expiryDate?: Date;
	credentialId?: string;
}

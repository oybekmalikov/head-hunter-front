export interface Job {
	id: string;
	title: string;
	company: string;
	location: string;
	salary: {
		min: number;
		max: number;
		currency: string;
	};
	type: "full-time" | "part-time" | "contract" | "internship";
	description: string;
	requirements: string[];
	benefits: string[];
	isActive: boolean;
	employerId: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface JobApplication {
	id: string;
	jobId: string;
	jobseekerId: string;
	status: "pending" | "reviewed" | "accepted" | "rejected";
	coverLetter?: string;
	resumeId: string;
	appliedAt: Date;
	updatedAt: Date;
}

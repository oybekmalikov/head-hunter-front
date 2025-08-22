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



export type JobStatus = "active" | "inactive" | "draft";
export type JobType = "full-time" | "part-time" | "contract" | "internship";
export type WorkLocation = "remote" | "onsite" | "hybrid";
export type ExperienceLevel = "junior" | "mid" | "senior";
export type EducationLevel = "bachelor" | "master" | "phd" | "other";
export type SalaryPeriod = "monthly" | "yearly" | "hourly";

export interface JobPostings {
  employerId: number;
  categoryId: number;
  companyId: number;
  title: string;
  description: string;
  requirements: string;
  requiredSkills: string;
  jobType: JobType;
  workLocation: WorkLocation;
  location: string;
  salaryMin: number;
  salaryMax: number;
  requiredExperience: number;
  salaryPeriod: SalaryPeriod;
  experienceLevel: ExperienceLevel;
  educationLevel: EducationLevel;
  applicationDeadline: string; // ISO date string
  status: JobStatus;
}

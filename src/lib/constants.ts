export const APP_NAME = "HeadHunter";
export const APP_VERSION = "1.0.0";

export const ROLES = {
	SUPERADMIN: "superadmin",
	ADMIN: "admin",
	EMPLOYER: "employer",
	JOBSEEKER: "jobseeker",
} as const;

export const JOB_TYPES = {
	FULL_TIME: "full-time",
	PART_TIME: "part-time",
	CONTRACT: "contract",
	INTERNSHIP: "internship",
} as const;

export const APPLICATION_STATUS = {
	PENDING: "pending",
	REVIEWED: "reviewed",
	ACCEPTED: "accepted",
	REJECTED: "rejected",
} as const;

export const COMPANY_SIZES = {
	STARTUP: "startup",
	SMALL: "small",
	MEDIUM: "medium",
	LARGE: "large",
	ENTERPRISE: "enterprise",
} as const;

export class ApiUrls {
	//AUTH
	public static SIGN_IN = "/auth/user/sign-in";
	public static SIGN_UP = "/auth/user/sign-up";
	public static SIGN_OUT = "/auth/user/sign-out";
	public static REFRESH_TOKEN = (id: string) => `/auth/user/${id}/refresh`;
	public static VERIFY_OTP = `/auth/user/verify-otp`;
	public static FORGOT_PASSWORD = "/auth/user/forget-password";
	public static RESET_PASSWORD = "/auth/user/reset-password";
	public static CHANGE_PASSWORD = "/auth/user/update-password";

	//JOBS NOTIFICATIONS
	public static CREATE_JOB_NOTIFICATION = "/jobs-notifications";
	public static GET_ALL_JOB_NOTIFICATIONS = "/jobs-notifications";
	public static GET_JOB_NOTIFICATION_BY_ID = (id: string) =>
		`/jobs-notifications/${id}`;
	public static UPDATE_JOB_NOTIFICATION = (id: string) =>
		`/jobs-notifications/${id}`;
	public static GET_JOB_NOTIFICATIONS_BY_JOB_SEEKER_ID = (
		jobSeekerId: string
	) => `/jobs-notifications/job-seeker/${jobSeekerId}`;

	//JOB POSTINGS
	public static CREATE_JOB_POSTING = "/job-postings";
	public static GET_ALL_JOB_POSTINGS = "/job-postings";
	public static GET_ALL_JOB_POSTINGS_PAGINATED = (params: object) =>
		`/job-postings/pagination?${params}`;
	public static GET_JOB_POSTINGS_BY_EMPLOYER = (id: string) =>
		`/job-postings/get/employer/${id}`;
	public static GET_JOB_POSTING_BY_ID = (id: string) => `/job-postings/${id}`;
	public static UPDATE_JOB_POSTING = (id: string) => `/job-postings/${id}`;
	public static DELETE_JOB_POSTING = (id: string) => `/job-postings/${id}`;
	public static GET_JOB_POSTINGS_SEARCH = (search: string) =>
		`/job-postings/search?${search}`;
	public static GET_POPULAR_JOB_POSTINGS = (params: object) =>
		`/job-postings/popular?${params}`;
	public static APPLY_FOR_JOB_POSTING = (id: string) =>
		`/job-postings/${id}/apply`;
	public static UPDATE_USER_MARK_FOR_JOB_POSTING = (id: string) =>
		`/job-postings/${id}/mark`;
	public static UPDATE_VIEW_COUNT_FOR_JOB_POSTING = (id: string) =>
		`/job-postings/${id}/view`;
	public static GET_JOB_POSTINGS_FIND_BY_REQUIRED_SKILLS = `/job-postings/find-by-required-skills`;

	//JOB APPLICATIONS
	public static GET_JOB_APPLICATIONS_BY_JOB_SEEKER_ID = (jobSeekerId: string) =>
		`/job-applications/job-seeker/${jobSeekerId}`;

	public static GET_JOB_APPLICATIONS_JOB_SEEKER_BY_STATUS = (
		jobSeekerId: string,
		status: string
	) => `/job-applications/job-seeker/${jobSeekerId}/status/${status}`;
	public static GET_JOB_APPLICATIONS_BY_JOB_POSTING_ID = (
		jobPostingId: string
	) => `/job-applications/job-posting/${jobPostingId}`;
	public static GET_JOB_APPLICATIONS_BY_JOB_POSTING_ID_AND_JOB_SEEKER_ID = (
		jobPostingId: string,
		jobSeekerId: string
	) =>
		`/job-applications/job-seeker/${jobSeekerId}/job-posting/${jobPostingId}`;
	public static GET_JOB_APPLICATION_BY_ID = (id: string) =>
		`/job-applications/${id}`;
	public static CREATE_JOB_APPLICATION = "/job-applications";
	public static GET_ALL_JOB_APPLICATION = "/job-applications";
	public static UPDATE_JOB_APPLICATION = (id: string) =>
		`/job-applications/${id}`;
	public static DELETE_JOB_APPLICATION = (id: string) =>
		`/job-applications/${id}`;

	//JOB SEEKER WORK EXPERIENCE
	public static CREATE_JOB_SEEKER_WORK_EXPERIENCE = "/work-experience";
	public static GET_JOB_SEEKER_WORK_EXPERIENCES_BY_JOB_SEEKER_ID = (
		jobSeekerId: string
	) => `/work-experience/job-seeker/${jobSeekerId}`;
	public static UPDATE_JOB_SEEKER_WORK_EXPERIENCE = (id: string) =>
		`/work-experience/${id}`;
	public static DELETE_JOB_SEEKER_WORK_EXPERIENCE = (id: string) =>
		`/work-experience/${id}`;

	//SKILLS
	public static GET_ALL_SKILLS = "/skills";
	public static GET_ALL_SKILLS_BY_NAME = (name: string) =>
		`/skills/search/${name}`;

	//JOB SEEKER SKILLS
	public static GET_ALL_JOB_SEEKER_SKILLS_BY_JOB_SEEKER_ID = (
		jobSeekerId: string
	) => `/job-seeker-skills/job-seeker/${jobSeekerId}`;
	public static CREATE_JOB_SEEKER_SKILL = "/job-seeker-skills";
	public static GET_ALL_JOB_SEEKER_SKILLS = "/job-seeker-skills";
	public static GET_JOB_SEEKER_SKILL_BY_ID = (id: string) =>
		`/job-seeker-skills/${id}`;
	public static UPDATE_JOB_SEEKER_SKILL = (id: string) =>
		`/job-seeker-skills/${id}`;
	public static DELETE_JOB_SEEKER_SKILL = (id: string) =>
		`/job-seeker-skills/${id}`;

	//JOB SEEKER EDUCATION
	public static CREATE_JOB_SEEKER_EDUCATION = "/edu";
	public static GET_JOB_SEEKER_EDUCATIONS_BY_JOB_SEEKER_ID = (
		jobSeekerId: string
	) => `/edu/job-seeker/${jobSeekerId}`;
	public static UPDATE_JOB_SEEKER_EDUCATION = (id: string) => `/edu/${id}`;
	public static DELETE_JOB_SEEKER_EDUCATION = (id: string) => `/edu/${id}`;

	//JOB SEEKER
	public static UPLOAD_RESUME = "/job-seekers/upload-resume";
	public static DELETE_RESUME = "/job-seekers/delete-resume";
	public static GET_PROFILE = "/job-seekers/profile";
	public static UPDATE_JOB_SEEKER = (id: string) => `/job-seekers/${id}`;
	public static GET_JOB_SEEKER_POSTINGS_BY_JOB_SEEKER_ID = (
		jobSeekerId: string
	) => `/job-seeker-posting/job-seeker/${jobSeekerId}`;
	public static CREATE_JOB_SEEKER_POSTING = "/job-seeker-posting";
	public static CREATE_JOB_SEEKER = "/job-seekers";
	//EMPLOYER
	public static CREATE_EMPLOYER = "/employers";
	public static GET_EMPLOYER_BY_ID = (id: string) => `/employers/${id}`;
	public static UPDATE_EMPLOYER = (id: string) => `/employers/${id}`;

	//COMPANY
	public static CREATE_COMPANY = "/company";
	public static GET_COMPANY_BY_ID = (id: string) => `/company/${id}`;
	public static UPDATE_COMPANY = (id: string) => `/company/${id}`;
	public static DELETE_COMPANY = (id: string) => `/company/${id}`;
	public static GET_COMPANY_BY_USER_ID = (userId: string) =>
		`/company/user/${userId}`;
	public static GET_ALL_COMPANIES = "/company";

	//USER
	public static UPLOAD_AVATAR = "/users/upload-avatar";

}

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
	public static GET_JOB_POSTING_BY_ID = (id: string) => `/job-postings/${id}`;
	public static UPDATE_JOB_POSTING = (id: string) => `/job-postings/${id}`;
	public static DELETE_JOB_POSTING = (id: string) => `/job-postings/${id}`;
	public static GET_JOB_POSTINGS_SEARCH = (search: string) =>
		`/job-postings/search?search=${search}`;
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
	public static UPDATE_JOB_APPLICATION = (id: string) =>
		`/job-applications/${id}`;
	public static DELETE_JOB_APPLICATION = (id: string) =>
		`/job-applications/${id}`;
	//USERS
	public static GET_USERS = "/users";

	// JOB SEEKER
	public static GET_JOB_SEEKER_PROFILE = "/job-seekers/profile";
	public static GET_JOB_SEEKERS = "/job-seekers";
	public static GET_JOB_SEEKERS_BY_PAGINATION = "/job-seekers";
	public static CREATE_JOB_SEEKER = "/job-seekers";
	public static GET_JOB_SEEKER_BY_ID = (id: number) => `/job-seekers/${id}`;
	public static UPDATE_JOB_SEEKER = (id: number) => `/job-seekers/${id}`;
	public static DELETE_JOB_SEEKER = (id: number) => `/job-seekers/${id}`;	
	public static UPLOAD_JOBSEEKERS_RESUME = "/job-seekers/upload-resume";
	public static DELETE_JOBSEEKERS_RESUME = (id: number) => `/job-seekers/delete-resume`;
}

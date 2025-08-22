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
	public static GET_JOB_NOTIFICATION_BY_ID = (id: string) => `/jobs-notifications/${id}`;
	public static UPDATE_JOB_NOTIFICATION = (id: string) => `/jobs-notifications/${id}`;
	public static GET_JOB_NOTIFICATIONS_BY_JOB_SEEKER_ID = (jobSeekerId: string) => `/jobs-notifications/job-seeker/${jobSeekerId}`;

	//JOB POSTINGS
	public static CREATE_JOB_POSTING = "/job-postings";
	public static GET_ALL_JOB_POSTINGS = "/job-postings";
	public static GET_ALL_JOB_POSTINGS_PAGINATED = (params: object) => `/job-postings/pagination?${params}`;
	public static GET_JOB_POSTING_BY_ID = (id: string) => `/job-postings/${id}`;
	public static UPDATE_JOB_POSTING = (id: string) => `/job-postings/${id}`;
	public static DELETE_JOB_POSTING = (id: string) => `/job-postings/${id}`;	
  public static GET_JOB_POSTINGS_SEARCH = (search: string) => `/job-postings/search?search=${search}`;
	public static GET_POPULAR_JOB_POSTINGS = (params: object) => `/job-postings/popular?${params}`;
	public static APPLY_FOR_JOB_POSTING = (id: string) => `/job-postings/${id}/apply`;
	public static UPDATE_USER_MARK_FOR_JOB_POSTING = (id: string) => `/job-postings/${id}/mark`;
	public static UPDATE_VIEW_COUNT_FOR_JOB_POSTING = (id: string) => `/job-postings/${id}/view`;
	public static GET_JOB_POSTINGS_FIND_BY_REQUIRED_SKILLS = `/job-postings/find-by-required-skills`;


}

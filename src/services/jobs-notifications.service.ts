import { ApiUrls } from "../app/api/api-urls"
import { apiConfig } from "../app/api/config";

export class JobsNotificationsService {
	async getJobNotificationById(id: string) {
		const response = await apiConfig().getRequest(
			ApiUrls.GET_JOB_NOTIFICATION_BY_ID(id)
		);
		return response.data;
	}

	async getJobNotificationsByJobSeekerId(jobSeekerId: string) {
		const response = await apiConfig().getRequest(
			ApiUrls.GET_JOB_NOTIFICATIONS_BY_JOB_SEEKER_ID(jobSeekerId)
		);
		return response.data;
	}

	async updateJobNotification(id: string, data: any) {
		const response = await apiConfig().updateRequest(
			ApiUrls.UPDATE_JOB_NOTIFICATION(id),
			data
		);
		return response.data;
	}
}
import { useMutation, useQuery } from "@tanstack/react-query";
import { JobsNotificationsService } from "../services/jobs-notifications.service"

export const useGetJobNotificationById = (id: string) => {
	return useQuery({
		queryKey: ["job-notification", id],
		queryFn: () => new JobsNotificationsService().getJobNotificationById(id),
	});
};

export const useGetJobNotificationsByJobSeekerId = (jobSeekerId: string) => {
	return useQuery({
		queryKey: ["job-notifications", jobSeekerId],
		queryFn: () => new JobsNotificationsService().getJobNotificationsByJobSeekerId(jobSeekerId),
	});
}

export const useUpdateJobNotification = (id: string) => {
	return useMutation({
		mutationFn: (data: any) => new JobsNotificationsService().updateJobNotification(id, data),
	});
};
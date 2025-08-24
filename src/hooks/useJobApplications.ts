import { useMutation, useQuery } from "@tanstack/react-query";
import { JobApplicationsService } from "../services/job-applications.service";

export const useGetJobApplicationById = (id: string) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["job-application", id],
		queryFn: () => {
			if (!id) {
				throw new Error("Application ID is required");
			}
			return new JobApplicationsService().getJobApplicationById(id);
		},
		select: (data) => data.data,
		enabled: !!id,
		staleTime: 0,
		retry: 1,
		retryDelay: 1000,
	});

	return { data, isLoading, error };
};

export const useGetJobApplicationsByJobSeekerId = (jobSeekerId: string) => {
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ["job-applications", jobSeekerId],
		queryFn: () => {
			if (!jobSeekerId) {
				throw new Error("jobSeekerId is required");
			}
			return new JobApplicationsService().getJobApplicationsByJobSeekerId(
				jobSeekerId
			);
		},
		select: (data) => data.data,
		enabled: !!jobSeekerId,
		staleTime: 0,
		retry: 1,
		retryDelay: 1000,
	});

	return { data, isLoading, error, refetch };
};

export const useGetJobApplicationsByJobSeekerIdAndStatus = (
	jobSeekerId: string,
	status: string
) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["job-applications", jobSeekerId, status],
		queryFn: () =>
			new JobApplicationsService().getJobApplicationsByJobSeekerIdAndStatus(
				jobSeekerId,
				status
			),
		select: (data) => data.data,
	});
	return { data, isLoading, error };
};

export const useGetJobApplicationsByJobPostingId = (jobPostingId: string) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["job-applications", jobPostingId],
		queryFn: () =>
			new JobApplicationsService().getJobApplicationsByJobPostingId(
				jobPostingId
			),
		select: (data) => data.data,
	});
	return { data, isLoading, error };
};

export const useGetJobApplicationsByJobPostingIdAndJobSeekerId = (
	jobPostingId: string,
	jobSeekerId: string
) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["job-applications", jobPostingId, jobSeekerId],
		queryFn: () =>
			new JobApplicationsService().getJobApplicationsByJobPostingIdAndJobSeekerId(
				jobPostingId,
				jobSeekerId
			),
		select: (data) => data.data,
	});
	return { data, isLoading, error };
};

export const useCreateJobApplication = () => {
	const { mutate, isPending } = useMutation({
		mutationFn: (data: any) =>
			new JobApplicationsService().createJobApplication(data),
	});
	return { mutate, isPending };
};

export const useUpdateJobApplication = () => {
	const { mutate, isPending } = useMutation({
		mutationFn: ({ id, data }: { id: string; data: any }) =>
			new JobApplicationsService().updateJobApplication(id, data),
	});
	return { mutate, isPending };
};

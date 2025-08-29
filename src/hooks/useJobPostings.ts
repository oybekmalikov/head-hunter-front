import { useMutation, useQuery } from "@tanstack/react-query";
import { JobPostingsService } from "../services/job-postings.service";

export const useCreateJobPosting = () => {
	const { mutate, isPending } = useMutation({
		mutationFn: (data: any) => new JobPostingsService().createJobPosting(data),
	});
	return { mutate, isPending };
};

export const useGetAllJobPostings = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["job-postings"],
		queryFn: () => new JobPostingsService().getAllJobPostings(),
		select: (data) => data.data,
	});
	return { data, isLoading, error };
};

export const useGetJobPostingById = (id: string) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["job-posting", id],
		queryFn: () => new JobPostingsService().getJobPostingById(id),
		select: (data) => data.data,
	});
	return { data, isLoading, error };
};

export const useGetJobPostingsByEmployerId = (id: string) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["job-posting-employer", id],
		queryFn: () => new JobPostingsService().getJobPostingByEmployerId(id),
		select: (data) => data.data,
	});
	return { data, isLoading, error };
};

export const useUpdateJobPosting = () => {
	const { mutate, isPending } = useMutation({
		mutationFn: ({ id, data }: { id: string; data: any }) =>
			new JobPostingsService().updateJobPosting(id, data),
	});
	return { mutate, isPending };
};

export const useDeleteJobPosting = () => {
	const { mutate, isPending } = useMutation({
		mutationFn: (id: string) => new JobPostingsService().deleteJobPosting(id),
	});
	return { mutate, isPending };
};

export const useSearchJobPostings = (search: string) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["job-postings", search],
		queryFn: () => new JobPostingsService().searchJobPostings(search),
		select: (data) => data.data,
		enabled: !!search,
	});
	return { data, isLoading, error };
};

export const useGetPopularJobPostings = (params: object) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["job-postings", "popular", params],
		queryFn: () => new JobPostingsService().getPopularJobPostings(params),
		select: (data) => data.data,
	});
	return { data, isLoading, error };
};

export const useApplyForJobPosting = () => {
	const { mutate, isPending } = useMutation({
		mutationFn: ({ id, data }: { id: string; data: any }) =>
			new JobPostingsService().applyForJobPosting(id, data),
	});
	return { mutate, isPending };
};

export const useUpdateUserMarkForJobPosting = () => {
	const { mutate, isPending } = useMutation({
		mutationFn: ({ id, data }: { id: string; data: any }) =>
			new JobPostingsService().updateUserMarkForJobPosting(id, data),
	});
	return { mutate, isPending };
};

export const useUpdateViewCountForJobPosting = () => {
	const { mutate, isPending } = useMutation({
		mutationFn: (id: string) =>
			new JobPostingsService().updateViewCountForJobPosting(id),
	});
	return { mutate, isPending };
};

export const useFindJobByRequiredSkills = (skills: string[]) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["job-postings", "find-by-required-skills", skills],
		queryFn: () => new JobPostingsService().findJobByRequiredSkills(skills),
		select: (data) => data.data,
	});
	return { data, isLoading, error };
};

export const useGetAllJobPostingsByPagination = (params: object) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["job-postings", "pagination", params],
		queryFn: () =>
			new JobPostingsService().getAllJobPostingsByPagination(params),
		select: (data) => data.data,
	});
	return { data, isLoading, error };
};

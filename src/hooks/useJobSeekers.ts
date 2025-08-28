import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { jobSeekersService } from "../services/job-seekers.service";

export const useJobSeekersUploadResume = () => {
	return useMutation({
		mutationFn: async (resume: File) => await jobSeekersService.uploadResume(resume),
	});
};

export const useJobSeekersDeleteResume = () => {
	return useMutation({
		mutationFn: async () => await jobSeekersService.deleteResume(),
	});
};

export const useJobSeekersGetJobSeekerPostings = (jobSeekerId: string) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["job-seekers-get-job-seeker-postings", jobSeekerId],
		queryFn: () => jobSeekersService.getJobSeekerPostings(jobSeekerId),
	});
	return { data, isLoading, error };
};

export const useJobSeekersGetProfile = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["job-seekers-get-profile"],
		queryFn: () => jobSeekersService.getProfile(),
	});
	return { data, isLoading, error };
};

export const useJobSeeker = () => {
	const queryClient = useQueryClient();
	const useJobSeekersCreateJobSeekerPosting = () => {
		return useMutation({
			mutationFn: async (jobSeekerPosting: any) => jobSeekersService.createJobSeekerPosting(jobSeekerPosting),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["job-seekers-get-job-seeker-postings"] });
			},
		});
	};
	const useJobSeekersUpdateJobSeeker = () => {
		return useMutation({
			mutationFn:async (jobSeeker:any) => jobSeekersService.updateJobSeeker(jobSeeker),
			onSuccess:()=>{
				queryClient.invalidateQueries({ queryKey: ["job-seekers-get-profile"] });
			}
		});
	};
	return { useJobSeekersUpdateJobSeeker, useJobSeekersCreateJobSeekerPosting };
};

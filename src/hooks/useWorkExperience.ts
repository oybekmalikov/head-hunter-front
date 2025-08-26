import { useMutation, useQuery } from "@tanstack/react-query";
import { workExperienceService } from "../services/work-experience.service";

export const useGetWorkExperienceByJobSeekerId = (jobSeekerId: string) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["work-experience-get-work-experience-by-job-seeker-id"],
		queryFn: () =>
			workExperienceService.getWorkExperienceByJobSeekerId(jobSeekerId),
	});
	return { data, isLoading, error };
};


export const useWorkExperience = () => {
	const useCreateWorkExperience = () => {
		return useMutation({
			mutationFn: (workExperience: any) =>
				workExperienceService.createWorkExperience(workExperience),
			// onSuccess: () => {
			// 	queryClient.invalidateQueries({ queryKey: ["] });
			// }
		});
	};
	const useUpdateWorkExperience = () => {
		return useMutation({
			mutationFn: (workExperience: any) =>
				workExperienceService.updateWorkExperience(workExperience),
		});
	};

	const useDeleteWorkExperience = () => {
		return useMutation({
			mutationFn: (id: string) =>
				workExperienceService.deleteWorkExperience(id),
		});
	};
	return {
		useCreateWorkExperience,
		useUpdateWorkExperience,
		useDeleteWorkExperience,
	};
};

import { useMutation, useQuery } from "@tanstack/react-query";
import { jobSeekerSkillsService } from "../services/job-seeker-skills.service";


export const useJobSeekerSkills = () => {
	const createJobSeekerSkill = () => {
		return useMutation({
			mutationFn: async (jobSeekerSkill: any) => await jobSeekerSkillsService.createJobSeekerSkill(jobSeekerSkill),
		});
	};	

	const deleteJobSeekerSkill = () => {
		return useMutation({
			mutationFn: async (id: any) => await jobSeekerSkillsService.deleteJobSeekerSkill(id),
		});
	};
	return {
		createJobSeekerSkill,
		deleteJobSeekerSkill,
	};
};

export const useGetAllJobSeekerSkills = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["job-seeker-skills-get-all-job-seeker-skills"],
		queryFn: () => jobSeekerSkillsService.getAllJobSeekerSkills(),
	});
	return { data, isLoading, error };
};

export const useGetJobSeekerSkillById = (id: string) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["job-seeker-skills-get-job-seeker-skill-by-id"],
		queryFn: () => jobSeekerSkillsService.getJobSeekerSkillById(id),
	});
	return { data, isLoading, error };
};

export const useGetAllJobSeekerSkillsByJobSeekerId = (jobSeekerId: string) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["job-seeker-skills-get-all-job-seeker-skills-by-job-seeker-id"],
		queryFn: () => jobSeekerSkillsService.getAllJobSeekerSkillsByJobSeekerId(jobSeekerId),
	});
	return { data, isLoading, error };
};
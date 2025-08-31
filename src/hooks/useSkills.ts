import { useQuery } from "@tanstack/react-query";
import { skillsService } from "../services/skills.service";

export const useGetAllSkills = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["skills-get-all-skills"],
		queryFn: () => skillsService.getAllSkills(),
	});
	return { data, isLoading, error };
};

export const useGetSkillsByName = (name: string) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["skills-get-skills-by-name"],
		queryFn: () => skillsService.getSkillsByName(name),
	});
	return { data, isLoading, error };
};

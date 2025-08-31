import { useMutation, useQuery } from "@tanstack/react-query";
import { eduService } from "../services/edu.service";

export const useEduCreateEdu = () => {
	return useMutation({
		mutationFn: async (edu: any) => await eduService.createEdu(edu),
	});
};

export const useEduGetEduByJobSeekerId = (jobSeekerId: string) => {
	return useQuery({
		queryKey: ["edu-get-edu-by-job-seeker-id"],
		queryFn: async () => await eduService.getEduByJobSeekerId(jobSeekerId),
	});
};

export const useEduUpdateEdu = () => {
	return useMutation({
		mutationFn: async (edu: any) => await eduService.updateEdu(edu),
	});
};

export const useEduDeleteEdu = () => {
	return useMutation({
		mutationFn: async (id: any) => await eduService.deleteEdu(id),
	});
};

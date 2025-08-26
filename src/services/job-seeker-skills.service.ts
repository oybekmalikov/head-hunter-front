import { ApiUrls } from "../app/api/api-urls";
import { apiConfig } from "../app/api/config";

export const jobSeekerSkillsService = {
	createJobSeekerSkill: async (jobSeekerSkill: any) => {
		const response = await apiConfig().postRequest(ApiUrls.CREATE_JOB_SEEKER_SKILL, jobSeekerSkill);
		return response.data;
	},
	getAllJobSeekerSkills: async () => {
		const response = await apiConfig().getRequest(ApiUrls.GET_ALL_JOB_SEEKER_SKILLS);
		return response.data;
	},
	getJobSeekerSkillById: async (id: string) => {
		const response = await apiConfig().getRequest(ApiUrls.GET_JOB_SEEKER_SKILL_BY_ID(id));
		return response.data;
	},
	updateJobSeekerSkill: async (jobSeekerSkill: any) => {
		const response = await apiConfig().updateRequest(ApiUrls.UPDATE_JOB_SEEKER_SKILL(jobSeekerSkill.id), jobSeekerSkill);
		return response.data;
	},
	deleteJobSeekerSkill: async (id: string) => {
		const response = await apiConfig().deleteRequest(ApiUrls.DELETE_JOB_SEEKER_SKILL(id));
		return response.data;
	},
	getAllJobSeekerSkillsByJobSeekerId: async (jobSeekerId: string) => {
		const response = await apiConfig().getRequest(ApiUrls.GET_ALL_JOB_SEEKER_SKILLS_BY_JOB_SEEKER_ID(jobSeekerId));
		return response.data;
	},
};

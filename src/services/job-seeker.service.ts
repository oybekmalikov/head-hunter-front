
import { ApiUrls } from "../app/api/api-urls";
import { apiConfig } from "../app/api/config";

export const jobSeekerService = {
    async getJobSeekers() {
        const res = await apiConfig().getRequest(ApiUrls.GET_USERS);
        return res;
    },
    async getJobSeekerProfile() {
        const res = await apiConfig().getRequest(ApiUrls.GET_JOB_SEEKER_PROFILE);
        return res;
    }
}

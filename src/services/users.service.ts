
import { ApiUrls } from "../app/api/api-urls";
import { apiConfig } from "../app/api/config";
import { getItem } from "../helpers/localstorage";

export const usersService = {
    async getUsers() {
        const res = await apiConfig().getRequest(ApiUrls.GET_USERS);
        return res;
    },
    async getUserProfile() {
        const res = await apiConfig().getRequest(ApiUrls.GET_USER_PROFILE);
        return res;
    }
}

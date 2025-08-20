import { ApiUrls } from "@/api/api-urls"
import { apiConfig } from "@/api/config"
import { SignInType, SignUpType } from "@/types/auth";


export const authService = {
    async signIn({ email, password }: SignInType) {
        const res = await apiConfig().postRequest(ApiUrls.SIGNIN, { email, password });
        return res
    },
    async signUp(data: SignUpType) {
        const res = await apiConfig().postRequest(ApiUrls.SIGNUP, data);
        return res
    },
}
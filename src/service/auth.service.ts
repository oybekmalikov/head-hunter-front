import { ApiUrls } from "@/api/api-urls"
import { apiConfig } from "@/api/config"
import { ResetPasswordType, SignInType, SignUpType, VerifyOtpType } from "@/types/auth";
import { setItem } from "@/helpers/storage";


export const authService = {
    async signIn({ email, password }: SignInType) {
        const res = await apiConfig().postRequest(ApiUrls.SIGNIN, { email, password });
        setItem("accessToken", res.data.accessToken);
        setItem("role", res.data.role);
        setItem("user_id", res.data.userId);
        return res
    },
    async signUp(data: SignUpType) {
        const res = await apiConfig().postRequest(ApiUrls.SIGNUP, data);
        return res
    },
    async forgotPassword(email: string) {
        const res = await apiConfig().postRequest(ApiUrls.FORGOT_PASSWORD, { email });
        return res
    },
    async verifyOtp(data: VerifyOtpType) {
        const res = await apiConfig().postRequest(ApiUrls.VERIFY_OTP, data);
        return res
    },
    async resetPassword(data: ResetPasswordType) {
        const res = await apiConfig().postRequest(ApiUrls.RESET_PASSWORD, data);
        return res
    }
}
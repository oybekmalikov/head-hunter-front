import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ResetPasswordType, SignInType, SignUpType, VerifyOtpType } from "@/types/auth"
import { authService } from "../services/auth.service";


export const useAuth = () => {
    const queryClient = useQueryClient();
    const SignInUser = () => {
        return useMutation({
            mutationFn: async ({ email, password }: SignInType) => authService.signIn(email, password),
            onSuccess: () => {
                return queryClient.invalidateQueries({ queryKey: ['auth'] })
            },
        })
    }
    const SignUpUser = () => {
        return useMutation({
            mutationFn: async (data: SignUpType) => authService.signUp(data),
            onSuccess: () => {
                return queryClient.invalidateQueries({ queryKey: ['auth'] })
            },
        })
    }
    const SignOutUser = () => {
        return useMutation({
            mutationFn: async () => authService.signOut(),
            onSuccess: () => {
                return queryClient.invalidateQueries({ queryKey: ['auth'] })
            },
        })
    }

    const ForgotPassword = () => {
        return useMutation({
            mutationFn: async (email: string) => authService.forgotPassword(email),
            onSuccess: () => {
                return queryClient.invalidateQueries({ queryKey: ['auth'] })
            },
        })
    }

    const VerifyOtp = () => {
        return useMutation({
            mutationFn: async (data: VerifyOtpType) => authService.verifyOtp(data),
            onSuccess: () => {
                return queryClient.invalidateQueries({ queryKey: ['auth'] })
            },
        })
    }

    const ResetPassword = () => {
        return useMutation({
            mutationFn: async (data: ResetPasswordType) => authService.resetPassword(data),
            onSuccess: () => {
                return queryClient.invalidateQueries({ queryKey: ['auth'] })
            },
        })
    }

    return {
        SignInUser,
        SignUpUser,
        ForgotPassword,
        VerifyOtp,
        ResetPassword
    }
}
import { useMutation } from "@tanstack/react-query"
import { SignInType } from "@/types/auth"
import { authService } from "@/service/auth.service"

export const useAuth = () => {
    return useMutation({
        mutationFn: async ({ email, password }: SignInType) => authService.signIn({ email, password })
    })
}
import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/auth.service";

export const useSignIn = () => {
	const { mutate, isPending } = useMutation({
		mutationFn: (data: { email: string; password: string }) =>
			authService.signIn(data.email, data.password),
	});
	return { mutate, isPending };
};

export const useSignUp = () => {
	const { mutate, isPending } = useMutation({
		mutationFn: (data: { email: string; password: string }) =>
			authService.signUp(data),
	});
	return { mutate, isPending };
};

export const useVerifyOtp = () => {
	const { mutate, isPending } = useMutation({
		mutationFn: (data: { email: string; otp: string; type: string }) =>
			authService.verifyOtp(data.email, data.otp, data.type),
	});
	return { mutate, isPending };
};

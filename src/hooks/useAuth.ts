import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/auth.service";

export const useSignIn = () => {
	const { mutate, isPending } = useMutation({
		mutationFn: (data: { email: string; password: string }) =>
			authService.signIn(data.email, data.password),
	});
	return { mutate, isPending };
};

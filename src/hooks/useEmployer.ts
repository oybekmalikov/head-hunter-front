import { useMutation } from "@tanstack/react-query"
import { employerService } from "../services/employer.service"

export const useCreateEmployer = () => {
	const { mutate, isPending } = useMutation({
		mutationFn: (data: any) => employerService.createEmployer(data),
	});
	return { mutate, isPending };
};
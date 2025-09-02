import { useMutation } from "@tanstack/react-query";
import { companyService } from "../services/company.service";

export const useCreateCompany = () => {
	const { mutate, isPending } = useMutation({
		mutationFn: (data: any) => companyService.createCompany(data),
	});
	return { mutate, isPending };
};

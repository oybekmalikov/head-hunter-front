import { useQuery, useQueryClient } from "@tanstack/react-query";
import { usersService } from "../services/users.service";

export const useUser = () => {
    const queryClient = useQueryClient();
    const { data } = useQuery({
        queryKey: ['users'],
        queryFn: async () => usersService.getUsers(),
    });

    const getUserProfile = useQuery({
        queryKey: ['userProfile'],
        queryFn: async () => usersService.getUserProfile(),
    });
    const userProfile = getUserProfile.data;

    return { data, userProfile };
}
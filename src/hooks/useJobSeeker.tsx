import { useQuery, useQueryClient } from "@tanstack/react-query";
import { usersService } from "../services/users.service";
import { jobSeekerService } from "../services/job-seeker.service";

const useJobSeeker = () => {
    const queryClient = useQueryClient();
    const { data } = useQuery({
        queryKey: ['jobSeekers'],
        queryFn: async () => jobSeekerService.getJobSeekers(),
    });

    const getJobSeekersProfile = useQuery({
        queryKey: ['jobSeekerProfile'],
        queryFn: async () => jobSeekerService.getJobSeekerProfile(),
    });
    const JobSeekersProfile = getJobSeekersProfile.data;

    return { data, JobSeekersProfile };
}

export {
    useJobSeeker
}
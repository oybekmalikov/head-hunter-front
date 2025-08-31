"use client";
import {
	ArrowRight,
	Bookmark,
	Eye as EyeIcon,
	Filter,
	MessageCircle,
	RefreshCw,
	Search,
	Zap,
} from "lucide-react";
import { useState } from "react";
import {
	JobFilterModal,
	JobFilters,
} from "../../../../components/shared/job-filter-modal";
import { JobPostingCard } from "../../../../components/shared/job-posting";
import {
	useGetAllJobPostings,
	useSearchJobPostings,
} from "../../../../hooks/useJobPostings";
import { useRouter } from "next/navigation";
const JobsPage = () => {
	const router = useRouter();
	const [selectedTab, setSelectedTab] = useState("For you");
	const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
	const [activeFilters, setActiveFilters] = useState<JobFilters>({
		search: "",
		category: 0,
		jobType: "",
		location: "",
		salaryMin: 0,
		salaryMax: 0,
		experienceLevel: "",
		educationLevel: "",
		status: "",
		publishedFrom: "",
		publishedTo: "",
		skills: [],
	});

	const tabs = [
		"For you",
		"Backend",
		"Part-time",
		"Frontend",
		"Remote work",
		"Internship",
		"FullStack",
		"Data Science",
	];

	const { data: allJobs, isLoading: allJobsLoading } = useGetAllJobPostings();

	const hasActiveFilters = Object.values(activeFilters).some((value) =>
		Array.isArray(value) ? value.length > 0 : value !== "" && value !== 0
	);

	const createSearchQuery = (filters: JobFilters) => {
		const queryParts = [];
		if (filters.search) {
			queryParts.push(`search=${filters.search}`);
		}
		if (filters.category && filters.category !== 0) {
			queryParts.push(`category=${filters.category}`);
		}
		if (filters.jobType) {
			queryParts.push(`type=${filters.jobType}`);
		}
		if (filters.location) {
			queryParts.push(`location=${filters.location}`);
		}
		if (filters.experienceLevel) {
			queryParts.push(`experience=${filters.experienceLevel}`);
		}
		if (filters.educationLevel) {
			queryParts.push(`education=${filters.educationLevel}`);
		}
		if (filters.skills.length > 0) {
			queryParts.push(`skills=${filters.skills.join(",")}`);
		}
		return queryParts.join(" ");
	};

	const { data: jobPostings, isLoading: isSearching } = useSearchJobPostings(
		hasActiveFilters ? createSearchQuery(activeFilters) : ""
	);

	const displayJobs = hasActiveFilters ? jobPostings?.results : allJobs;
	const isLoading = hasActiveFilters ? isSearching : allJobsLoading;

	const handleApplyFilters = (filters: JobFilters) => {
		setActiveFilters(filters);
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<header className="bg-white shadow-sm sticky top-0 z-40">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
					<div className="flex items-center gap-4">
						<div className="relative flex-1 max-w-2xl">
							<Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
							<input
								onChange={(e) =>
									setTimeout(() => {
										setActiveFilters({
											...activeFilters,
											search: e.target.value,
										});
									}, 500)
								}
								type="text"
								placeholder="Profession, position or company"
								className="w-full pl-12 pr-4 py-3 text-gray-900 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
						</div>
						<button
							onClick={() => setIsFilterModalOpen(true)}
							className={`p-3 rounded-lg transition-all duration-200 flex items-center gap-2 ${
								hasActiveFilters
									? "bg-blue-100 text-blue-600 hover:bg-blue-200 shadow-sm"
									: "text-gray-600 hover:bg-gray-100 hover:shadow-sm"
							}`}
						>
							<Filter className="w-5 h-5" />
							{hasActiveFilters && (
								<span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
							)}
						</button>
						<button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
							Search
						</button>
					</div>
				</div>
			</header>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
				<div className="flex gap-6">
					<div className="w-80 space-y-4 sticky top-30 z-30 h-fit">
						<div className="bg-white rounded-xl p-4 shadow-sm">
							<div className="flex items-center justify-between mb-3">
								<div className="flex items-center gap-2">
									<Zap className="w-5 h-5 text-yellow-500" />
									<span className="font-semibold text-gray-900">
										Your activity
									</span>
								</div>
								<span className="text-sm text-gray-500">0%</span>
							</div>
							<div className="w-full bg-gray-200 rounded-full h-2 mb-3">
								<div className="bg-blue-600 h-2 rounded-full w-0"></div>
							</div>
							<button className="flex items-center gap-2 text-blue-600 text-sm hover:text-blue-700 transition-colors">
								<span>View details</span>
								<ArrowRight className="w-4 h-4" />
							</button>
						</div>

						<div className="bg-white rounded-xl p-4 shadow-sm">
							<div className="space-y-3">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<MessageCircle className="w-4 h-4 text-gray-600" />
										<span className="text-sm text-gray-700">
											Applications and invitations
										</span>
									</div>
									<span className="font-semibold text-gray-900">52</span>
								</div>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<EyeIcon className="w-4 h-4 text-gray-600" />
										<span className="text-sm text-gray-700">CV views</span>
									</div>
									<span className="font-semibold text-gray-900">9</span>
								</div>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<Bookmark className="w-4 h-4 text-gray-600" />
										<span className="text-sm text-gray-700">
											Selected vacancies
										</span>
									</div>
									</div>
							</div>
						</div>

						<div className="bg-white rounded-xl p-4 shadow-sm">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-gray-700 mb-2">
										Uplift your resume in the search results
									</p>
									<button className="text-blue-600 text-sm hover:text-blue-700 transition-colors"
									onClick={() => {
										router.push("/jobseeker/resume");
									}}
									>
										Uplift
									</button>
								</div>
								<div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
									<Zap className="w-4 h-4 text-green-600" />
								</div>
							</div>
						</div>
					</div>

					<div className="flex-1">
						<div className="bg-white rounded-xl p-4 shadow-sm mb-6">
							<div className="flex gap-2 overflow-x-auto">
								{tabs.map((tab) => (
									<button
										key={tab}
										onClick={() => setSelectedTab(tab)}
										className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
											selectedTab === tab
												? "bg-blue-600 text-white"
												: "bg-gray-100 text-gray-600 hover:bg-gray-200"
										}`}
									>
										{tab}
									</button>
								))}
							</div>
						</div>

						<div className="space-y-4">
							{hasActiveFilters && (
								<div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
									<div className="flex items-center justify-between mb-3">
										<h3 className="text-sm font-medium text-blue-900">
											Active Filters
										</h3>
										<button
											onClick={() =>
												setActiveFilters({
													search: "",
													category: 0,
													jobType: "",
													location: "",
													salaryMin: 0,
													salaryMax: 0,
													experienceLevel: "",
													educationLevel: "",
													status: "",
													publishedFrom: "",
													publishedTo: "",
													skills: [],
												})
											}
											className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
										>
											Clear all
										</button>
									</div>
									<div className="flex flex-wrap gap-2">
										{activeFilters.category && (
											<span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-lg">
												Category: {activeFilters.category}
											</span>
										)}
										{activeFilters.jobType && (
											<span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-lg">
												Type: {activeFilters.jobType}
											</span>
										)}
										{activeFilters.location && (
											<span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-lg">
												Location: {activeFilters.location}
											</span>
										)}
										{(activeFilters.salaryMin > 0 ||
											activeFilters.salaryMax > 0) && (
											<span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-lg">
												Salary:{" "}
												{activeFilters.salaryMin > 0
													? activeFilters.salaryMin
													: "0"}{" "}
												-{" "}
												{activeFilters.salaryMax > 0
													? activeFilters.salaryMax
													: "∞"}{" "}
												so'm
											</span>
										)}
										{activeFilters.experienceLevel && (
											<span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-lg">
												Experience: {activeFilters.experienceLevel}
											</span>
										)}
										{activeFilters.educationLevel && (
											<span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-lg">
												Education: {activeFilters.educationLevel}
											</span>
										)}
										{activeFilters.status && (
											<span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-lg">
												Status: {activeFilters.status}
											</span>
										)}
										{activeFilters.skills.length > 0 && (
											<span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-lg">
												Skills: {activeFilters.skills.join(", ")}
											</span>
										)}
									</div>
								</div>
							)}

							{isLoading ? (
								<div className="text-center py-8">
									<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
									<p className="text-gray-600">Loading jobs...</p>
								</div>
							) : displayJobs && displayJobs.length > 0 ? (
								<div className="space-y-4">
									<div className="text-sm text-gray-600">
										Showing {displayJobs?.length}{" "}
										{hasActiveFilters ? "filtered" : "total"} jobs
									</div>
									{displayJobs.map((job: any) => (
										<JobPostingCard key={job.id} job={job} />
									))}
								</div>
							) : (
								<div className="text-center py-8">
									<p className="text-gray-600">
										{hasActiveFilters
											? "No jobs found matching your filters"
											: "No jobs available"}
									</p>
									{hasActiveFilters && (
										<button
											onClick={() =>
												setActiveFilters({
													search: "",
													category: 0,
													jobType: "",
													location: "",
													salaryMin: 0,
													salaryMax: 0,
													experienceLevel: "",
													educationLevel: "",
													status: "",
													publishedFrom: "",
													publishedTo: "",
													skills: [],
												})
											}
											className="mt-4 text-blue-600 hover:text-blue-800 transition-colors"
										>
											Clear all filters
										</button>
									)}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			<button className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-xl shadow-lg hover:bg-blue-800 transition-colors">
				<MessageCircle className="w-6 h-6" />
			</button>

			<JobFilterModal
				isOpen={isFilterModalOpen}
				onClose={() => setIsFilterModalOpen(false)}
				onApplyFilters={handleApplyFilters}
				currentFilters={activeFilters}
			/>
		</div>
	);
};

export default JobsPage;

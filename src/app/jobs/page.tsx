"use client";
import {
	ArrowRight,
	CheckCircle,
	Eye,
	Heart,
	MapPin,
	MessageCircle,
	RefreshCw,
	Search,
	Filter,
	Zap,
	X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { JobPostingCard } from "../../components/shared/job-posting";
import Modal from "./modal"; 
const JobsPage = () => {
	const router = useRouter();
	const [selectedTab, setSelectedTab] = useState("For you");
	const [searchInput, setSearchInput] = useState("");
	const [activeSearchQuery, setActiveSearchQuery] = useState("");
	const [isSearchActive, setIsSearchActive] = useState(false);

	// 🔥 Modal state
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [filters, setFilters] = useState({
		salary: "",
		experience: "",
		payment: "",
		company: "",
		location: "",
	});

	const tabs = [
		"For you",
		"Part-time", 
		"Rotation",
		"Available 16+",
		"Remote work",
		"Internship",
	];

	const mockJobs = [
		{
			id: 1,
			title: "Frontend-разработчик",
			salary: "300 – 700 $ per month, after taxes",
			experience: "Experience 1-3 years",
			payment: "Payments: once a month",
			company: "LLC NOVA RENESSANS",
			verified: true,
			location: "Ташкент, улица Чигил, 32А",
			category: "For you",
		},
		{
			id: 2,
			title: "Fullstack-разработчик",
			salary: "500 – 1000 $ per month, after taxes",
			experience: "Experience 1-3 years",
			payment: "Payments: twice a month",
			company: "LLC MIGRATION",
			verified: true,
			location: "Ташкент, улица Навои, 15",
			category: "For you",
		},
		{
			id: 3,
			title: "Backend Developer",
			salary: "800 – 1500 $ per month, after taxes",
			experience: "Experience 3-5 years",
			payment: "Payments: once a month",
			company: "Tech Solutions UZ",
			verified: true,
			location: "Ташкент, улица Амира Темура, 45",
			category: "For you",
		},
		{
			id: 4,
			title: "UI/UX Designer",
			salary: "400 – 800 $ per month, after taxes",
			experience: "Experience 1-3 years",
			payment: "Payments: once a month",
			company: "Creative Studio",
			verified: false,
			location: "Ташкент, улица Рашидова, 78",
			category: "For you",
		},
		{
			id: 5,
			title: "Part-time React Developer",
			salary: "200 – 400 $ per month, after taxes",
			experience: "Experience 1-2 years",
			payment: "Payments: twice a month",
			company: "StartupLab UZ",
			verified: true,
			location: "Ташкент, улица Мустакиллик, 12",
			category: "Part-time",
		},
		{
			id: 6,
			title: "Remote Python Developer",
			salary: "600 – 1200 $ per month, after taxes",
			experience: "Experience 2-4 years",
			payment: "Payments: once a month",
			company: "GlobalTech Remote",
			verified: true,
			location: "Remote",
			category: "Remote work",
		},
		{
			id: 7,
			title: "Marketing Intern",
			salary: "150 – 300 $ per month, after taxes",
			experience: "No experience required",
			payment: "Payments: once a month",
			company: "Digital Agency UZ",
			verified: true,
			location: "Ташкент, улица Бунёдкор, 25",
			category: "Internship",
		},
		{
			id: 8,
			title: "Rotation Software Engineer",
			salary: "400 – 800 $ per month, after taxes",
			experience: "Experience 1-3 years",
			payment: "Payments: once a month",
			company: "TechRotate UZ",
			verified: true,
			location: "Ташкент, улица Шахрисабз, 67",
			category: "Rotation",
		},
		{
			id: 9,
			title: "Junior Developer (16+)",
			salary: "250 – 500 $ per month, after taxes",
			experience: "No experience required",
			payment: "Payments: twice a month",
			company: "YouthTech UZ",
			verified: true,
			location: "Ташкент, улица Алишера Навои, 89",
			category: "Available 16+",
		}
	];

	// 🔥 Filter jobs by tab, search, and modal filters
	const getFilteredJobs = () => {
		let filtered = mockJobs;

		if (selectedTab !== "For you") {
			filtered = filtered.filter(job => job.category === selectedTab);
		}

		if (isSearchActive && activeSearchQuery.trim()) {
			const query = activeSearchQuery.toLowerCase().trim();
			filtered = filtered.filter(job => 
				job.title.toLowerCase().includes(query) ||
				job.company.toLowerCase().includes(query) ||
				job.location.toLowerCase().includes(query)
			);
		}

		// Modal filters
		if (filters.salary) {
			filtered = filtered.filter(job => job.salary.toLowerCase().includes(filters.salary.toLowerCase()));
		}
		if (filters.experience) {
			filtered = filtered.filter(job => job.experience.toLowerCase().includes(filters.experience.toLowerCase()));
		}
		if (filters.payment) {
			filtered = filtered.filter(job => job.payment.toLowerCase().includes(filters.payment.toLowerCase()));
		}
		if (filters.company) {
			filtered = filtered.filter(job => job.company.toLowerCase().includes(filters.company.toLowerCase()));
		}
		if (filters.location) {
			filtered = filtered.filter(job => job.location.toLowerCase().includes(filters.location.toLowerCase()));
		}

		return filtered;
	};

	const filteredJobs = getFilteredJobs();

	const handleSearch = () => {
		if (searchInput.trim()) {
			setActiveSearchQuery(searchInput.trim());
			setIsSearchActive(true);
		} else {
			setActiveSearchQuery("");
			setIsSearchActive(false);
		}
	};

	const clearSearch = () => {
		setSearchInput("");
		setActiveSearchQuery("");
		setIsSearchActive(false);
	};

	const handleTabChange = (tab: string) => {
		setSelectedTab(tab);
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSearch();
		}
	};

	const handleFilterSubmit = (data: typeof filters) => {
		setFilters(data);
		setIsModalOpen(false);
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<header className="bg-white shadow-sm sticky top-0 z-40">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
					<div className="flex items-center gap-4">
						<div className="relative flex-1 max-w-2xl">
							<Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
							<input
								type="text"
								placeholder="Profession, position or company"
								value={searchInput}
								onChange={(e) => setSearchInput(e.target.value)}
								onKeyPress={handleKeyPress}
								className="w-full pl-12 pr-20 py-3 text-gray-900 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
							{(searchInput || isSearchActive) && (
								<button
									onClick={clearSearch}
									className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors text-sm font-medium"
								>
									Clear
								</button>
							)}
						</div>
						<button 
							onClick={() => setIsModalOpen(true)}
							className="p-3 text-gray-600 hover:bg-black/10 rounded-lg transition-colors bg-blue-100"
						>
							<Filter className="w-5 h-5" />
						</button>
						<button 
							onClick={handleSearch}
							className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
						>
							Search
						</button>
					</div>
				</div>
			</header>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
				<div className="flex gap-6">
					{/* Left Sidebar */}
					<div className="w-80 space-y-4">
						{/* Your Activity Card */}
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

						{/* Statistics Card */}
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
										<Eye className="w-4 h-4 text-gray-600" />
										<span className="text-sm text-gray-700">CV views</span>
									</div>
									<span className="font-semibold text-gray-900">9</span>
								</div>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<Heart className="w-4 h-4 text-gray-600" />
										<span className="text-sm text-gray-700">
											Selected vacancies
										</span>
									</div>
									<span className="font-semibold text-gray-900">0</span>
								</div>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<RefreshCw className="w-4 h-4 text-gray-600" />
										<span className="text-sm text-gray-700">Autosearches</span>
									</div>
									<span className="font-semibold text-gray-900">0</span>
								</div>
							</div>
						</div>

						{/* Uplift Resume Card */}
						<div className="bg-white rounded-xl p-4 shadow-sm">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-gray-700 mb-2">
										Uplift your resume in the search results
									</p>
									<button className="text-blue-600 text-sm hover:text-blue-700 transition-colors">
										Uplift
									</button>
								</div>
								<div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
									<Zap className="w-4 h-4 text-green-600" />
								</div>
							</div>
						</div>
					</div>

					{/* Main Content */}
					<div className="flex-1">
						{/* Filter Tabs */}
						<div className="bg-white rounded-xl p-4 shadow-sm mb-6">
							<div className="flex gap-2 overflow-x-auto">
								{tabs.map((tab) => (
									<button
										key={tab}
										onClick={() => handleTabChange(tab)}
										className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
											selectedTab === tab
												? "bg-black text-white"
												: "bg-gray-100 text-gray-600 hover:bg-gray-200"
										}`}
									>
										{tab}
									</button>
								))}
							</div>
						</div>

						{/* Search Results Info */}
						{(isSearchActive || Object.values(filters).some(v => v)) && (
							<div className="bg-blue-50 rounded-xl p-4 mb-4">
								<p className="text-blue-600 text-sm">
									{filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""} found in {selectedTab}
								</p>
								{isSearchActive && (
									<p className="text-blue-800 font-medium">
										Search results for: "{activeSearchQuery}"
									</p>
								)}
								{Object.values(filters).some(v => v) && (
									<div className="mt-2 text-sm text-gray-700">
										Active filters: {JSON.stringify(filters)}
									</div>
								)}
							</div>
						)}

						{/* Job Listings */}
						<div className="space-y-4">
							{filteredJobs.length > 0 ? (
								filteredJobs.map((job) => (
									<JobPostingCard key={job.id} job={job} />
								))
							) : (
								<div className="bg-white rounded-xl p-8 text-center shadow-sm">
									<Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
									<h3 className="text-lg font-semibold text-gray-900 mb-2">
										{isSearchActive ? "No jobs found" : "No jobs available"}
									</h3>
									<p className="text-gray-500 mb-4">
										{isSearchActive 
											? `We couldn't find any jobs matching "${activeSearchQuery}" in ${selectedTab} category.`
											: `No jobs are currently available in the ${selectedTab} category.`}
									</p>
									<div className="flex gap-3 justify-center">
										<button
											onClick={() => handleTabChange("For you")}
											className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
										>
											View all jobs
										</button>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Floating Chats Button */}
			<button className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-xl shadow-lg hover:bg-gray-800 transition-colors">
				<MessageCircle className="w-6 h-6" />
			</button>

			{/* 🔥 Modal */}
			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSubmit={handleFilterSubmit}
			/>
		</div>
	);
};

export default JobsPage;

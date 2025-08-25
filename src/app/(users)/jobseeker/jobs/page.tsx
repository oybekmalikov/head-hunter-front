"use client";
import {
	ArrowRight,
	Eye as EyeIcon,
	Heart as HeartIcon,
	MessageCircle,
	RefreshCw,
	Search,
	Settings,
	Zap,
} from "lucide-react";
// import { useRouter } from "next/navigation";
import { useState } from "react";
import { JobPostingCard } from "../../../../components/shared/job-posting";

const JobsPage = () => {
	// const router = useRouter();
	const [selectedTab, setSelectedTab] = useState("For you");

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
		},
	];

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
								className="w-full pl-12 pr-4 py-3 text-gray-900 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
						</div>
						<button className="p-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
							<Settings className="w-5 h-5" />
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
										<HeartIcon className="w-4 h-4 text-gray-600" />
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
							{mockJobs.map((job) => (
								<JobPostingCard key={job.id} job={job} />
							))}
						</div>
					</div>
				</div>
			</div>

			<button className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-xl shadow-lg hover:bg-blue-800 transition-colors">
				<MessageCircle className="w-6 h-6" />
			</button>
		</div>
	);
};

export default JobsPage;

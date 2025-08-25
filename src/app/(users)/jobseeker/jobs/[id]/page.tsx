"use client";
import {
	ArrowLeft,
	Bookmark,
	Briefcase,
	Building,
	Calendar,
	CheckCircle,
	Clock,
	DollarSign,
	Eye,
	Globe,
	Heart,
	Mail,
	MapPin,
	MessageCircle,
	Phone,
	Share2,
	Star,
	Users,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const SingleJobPage = () => {
	const params = useParams();
	const router = useRouter();
	const jobId = params.id;

	// Mock job data - in real app this would come from API
	const job = {
		id: jobId,
		title: "Frontend-разработчик",
		salary: "300 – 700 $ per month, after taxes",
		experience: "1-3 years",
		employmentType: "Full-time",
		workSchedule: "Monday - Friday, 9:00 - 18:00",
		location: "Ташкент, улица Чигил, 32А",
		remote: "Hybrid (2 days office, 3 days remote)",
		company: {
			name: "LLC NOVA RENESSANS",
			verified: true,
			logo: "N",
			description:
				"Leading technology company specializing in web development and digital solutions.",
			website: "www.novaren.com",
			employees: "50-100",
			industry: "Information Technology",
			established: "2018",
		},
		description: `
			We are looking for a skilled Frontend Developer to join our dynamic team. You will be responsible for building user-friendly web applications and ensuring the best user experience.

			Key Responsibilities:
			• Develop responsive web applications using modern JavaScript frameworks
			• Collaborate with designers and backend developers
			• Optimize applications for maximum speed and scalability
			• Ensure cross-browser compatibility
			• Write clean, maintainable code

			Requirements:
			• Strong knowledge of HTML, CSS, and JavaScript
			• Experience with React.js or Vue.js
			• Understanding of responsive design principles
			• Knowledge of version control systems (Git)
			• Good communication skills and team player attitude

			Nice to have:
			• Experience with TypeScript
			• Knowledge of modern CSS frameworks
			• Understanding of SEO principles
			• Experience with testing frameworks
		`,
		benefits: [
			"Competitive salary",
			"Health insurance",
			"Professional development",
			"Flexible working hours",
			"Modern office in city center",
			"Team building events",
		],
		skills: [
			"React.js",
			"JavaScript",
			"HTML/CSS",
			"Git",
			"Responsive Design",
			"TypeScript",
		],
		postedDate: "2 days ago",
		views: 124,
		applications: 18,
	};

	const recommendedJobs = [
		{
			id: 2,
			title: "Fullstack-разработчик",
			company: "LLC MIGRATION",
			verified: true,
			salary: "500 – 1000 $ per month",
			location: "Ташкент",
			experience: "1-3 years",
		},
		{
			id: 3,
			title: "Backend Developer",
			company: "Tech Solutions UZ",
			verified: true,
			salary: "800 – 1500 $ per month",
			location: "Ташкент",
			experience: "3-5 years",
		},
		{
			id: 4,
			title: "UI/UX Designer",
			company: "Creative Studio",
			verified: false,
			salary: "400 – 800 $ per month",
			location: "Ташкент",
			experience: "1-3 years",
		},
	];

	const [isBookmarked, setIsBookmarked] = useState(false);
	const [isLiked, setIsLiked] = useState(false);

	const handleApply = () => {
		// Handle job application
		console.log("Applying for job:", jobId);
	};

	const handleContact = () => {
		// Handle contact
		console.log("Contacting company");
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<header className="bg-white shadow-sm sticky top-0 z-40">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
					<div className="flex items-center justify-between">
						<button
							onClick={() => router.back()}
							className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
						>
							<ArrowLeft className="w-5 h-5" />
							<span>Back to jobs</span>
						</button>
						<div className="flex items-center gap-3">
							<button
								onClick={() => setIsBookmarked(!isBookmarked)}
								className={`p-2 rounded-lg transition-colors ${
									isBookmarked
										? "text-blue-600 bg-blue-50"
										: "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
								}`}
							>
								<Bookmark className="w-5 h-5" />
							</button>
							<button
								onClick={() => setIsLiked(!isLiked)}
								className={`p-2 rounded-lg transition-colors ${
									isLiked
										? "text-red-500 bg-red-50"
										: "text-gray-400 hover:text-red-500 hover:bg-red-50"
								}`}
							>
								<Heart className="w-5 h-5" />
							</button>
							<button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
								<Share2 className="w-5 h-5" />
							</button>
						</div>
					</div>
				</div>
			</header>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Main Content */}
					<div className="lg:col-span-2 space-y-6">
						{/* Job Header */}
						<div className="bg-white rounded-xl p-6 shadow-sm">
							<div className="flex items-start justify-between mb-4">
								<div className="flex-1">
									<h1 className="text-3xl font-bold text-gray-900 mb-3">
										{job.title}
									</h1>
									<div className="flex items-center gap-2 mb-3">
										<span className="text-2xl font-semibold text-gray-800">
											{job.salary}
										</span>
									</div>
									<div className="flex flex-wrap gap-2 mb-4">
										<span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-lg">
											{job.employmentType}
										</span>
										<span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg">
											Experience {job.experience}
										</span>
										<span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-lg">
											{job.remote}
										</span>
									</div>
								</div>
								<div className="flex flex-col items-end gap-2">
									<div className="text-sm text-gray-500">
										Posted {job.postedDate}
									</div>
									<div className="flex items-center gap-4 text-sm text-gray-500">
										<div className="flex items-center gap-1">
											<Eye className="w-4 h-4" />
											{job.views}
										</div>
										<div className="flex items-center gap-1">
											<Users className="w-4 h-4" />
											{job.applications} applied
										</div>
									</div>
								</div>
							</div>

							<div className="flex gap-3">
								<button
									onClick={handleApply}
									className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
								>
									Apply for this position
								</button>
								<button
									onClick={handleContact}
									className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
								>
									Contact company
								</button>
							</div>
						</div>

						{/* Company Information */}
						<div className="bg-white rounded-xl p-6 shadow-sm">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">
								About the company
							</h2>
							<div className="flex items-start gap-4 mb-4">
								<div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center text-2xl font-bold text-blue-600">
									{job.company.logo}
								</div>
								<div className="flex-1">
									<div className="flex items-center gap-2 mb-2">
										<h3 className="text-lg font-semibold text-gray-900">
											{job.company.name}
										</h3>
										{job.company.verified && (
											<CheckCircle className="w-5 h-5 text-blue-600" />
										)}
									</div>
									<p className="text-gray-600 mb-3">
										{job.company.description}
									</p>
									<div className="grid grid-cols-2 gap-4 text-sm">
										<div className="flex items-center gap-2">
											<Building className="w-4 h-4 text-gray-400" />
											<span className="text-gray-600">
												{job.company.industry}
											</span>
										</div>
										<div className="flex items-center gap-2">
											<Users className="w-4 h-4 text-gray-400" />
											<span className="text-gray-600">
												{job.company.employees} employees
											</span>
										</div>
										<div className="flex items-center gap-2">
											<Calendar className="w-4 h-4 text-gray-400" />
											<span className="text-gray-600">
												Est. {job.company.established}
											</span>
										</div>
										<div className="flex items-center gap-2">
											<Globe className="w-4 h-4 text-gray-400" />
											<span className="text-gray-600">
												{job.company.website}
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Job Description */}
						<div className="bg-white rounded-xl p-6 shadow-sm">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">
								Job description
							</h2>
							<div className="prose prose-gray max-w-none">
								<p className="text-gray-700 whitespace-pre-line leading-relaxed">
									{job.description}
								</p>
							</div>
						</div>

						{/* Benefits */}
						<div className="bg-white rounded-xl p-6 shadow-sm">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">
								Benefits
							</h2>
							<div className="grid grid-cols-2 gap-3">
								{job.benefits.map((benefit, index) => (
									<div key={index} className="flex items-center gap-2">
										<Star className="w-4 h-4 text-yellow-500" />
										<span className="text-gray-700">{benefit}</span>
									</div>
								))}
							</div>
						</div>

						{/* Required Skills */}
						<div className="bg-white rounded-xl p-6 shadow-sm">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">
								Required skills
							</h2>
							<div className="flex flex-wrap gap-2">
								{job.skills.map((skill, index) => (
									<span
										key={index}
										className="px-3 py-2 bg-blue-50 text-blue-700 text-sm rounded-lg font-medium"
									>
										{skill}
									</span>
								))}
							</div>
						</div>
					</div>

					{/* Right Sidebar */}
					<div className="space-y-6">
						{/* Job Details */}
						<div className="bg-white rounded-xl p-6 shadow-sm">
							<h3 className="text-lg font-semibold text-gray-900 mb-4">
								Job details
							</h3>
							<div className="space-y-4">
								<div className="flex items-center gap-3">
									<MapPin className="w-5 h-5 text-gray-400" />
									<div>
										<div className="font-medium text-gray-900">Location</div>
										<div className="text-sm text-gray-600">{job.location}</div>
									</div>
								</div>
								<div className="flex items-center gap-3">
									<Briefcase className="w-5 h-5 text-gray-400" />
									<div>
										<div className="font-medium text-gray-900">
											Employment type
										</div>
										<div className="text-sm text-gray-600">
											{job.employmentType}
										</div>
									</div>
								</div>
								<div className="flex items-center gap-3">
									<Clock className="w-5 h-5 text-gray-400" />
									<div>
										<div className="font-medium text-gray-900">
											Work schedule
										</div>
										<div className="text-sm text-gray-600">
											{job.workSchedule}
										</div>
									</div>
								</div>
								<div className="flex items-center gap-3">
									<DollarSign className="w-5 h-5 text-gray-400" />
									<div>
										<div className="font-medium text-gray-900">Salary</div>
										<div className="text-sm text-gray-600">{job.salary}</div>
									</div>
								</div>
							</div>
						</div>

						{/* Company Contact */}
						<div className="bg-white rounded-xl p-6 shadow-sm">
							<h3 className="text-lg font-semibold text-gray-900 mb-4">
								Contact company
							</h3>
							<div className="space-y-3">
								<button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
									<Phone className="w-4 h-4" />
									Call company
								</button>
								<button className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors">
									<Mail className="w-4 h-4" />
									Send message
								</button>
								<button className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors">
									<Globe className="w-4 h-4" />
									Visit website
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* Recommended Jobs */}
				<div className="mt-12">
					<h2 className="text-2xl font-bold text-gray-900 mb-6">
						Similar jobs
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{recommendedJobs.map((recJob) => (
							<div
								key={recJob.id}
								className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
								onClick={() => router.push(`/jobs/${recJob.id}`)}
							>
								<div className="flex items-start justify-between mb-3">
									<h3 className="text-lg font-semibold text-gray-900">
										{recJob.title}
									</h3>
									<button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
										<Heart className="w-5 h-5" />
									</button>
								</div>
								<div className="flex items-center gap-2 mb-2">
									<span className="font-medium text-gray-700">
										{recJob.company}
									</span>
									{recJob.verified && (
										<CheckCircle className="w-4 h-4 text-blue-600" />
									)}
								</div>
								<div className="text-gray-600 mb-3">{recJob.salary}</div>
								<div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
									<MapPin className="w-4 h-4" />
									{recJob.location}
								</div>
								<div className="flex items-center justify-between">
									<span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg">
										{recJob.experience}
									</span>
									<button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
										View job
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Floating Chats Button */}
			<button className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-xl shadow-lg hover:bg-gray-800 transition-colors">
				<MessageCircle className="w-6 h-6" />
			</button>
		</div>
	);
};

export default SingleJobPage;

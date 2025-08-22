"use client";
import {
	Bell,
	Bookmark,
	ChevronDown,
	Clock,
	DollarSign,
	Eye,
	FileText,
	Heart,
	LogOut,
	MapPin,
	MessageSquare,
	Search,
	Send,
	Settings,
	Star,
	User,
} from "lucide-react";
import { Varela_Round } from "next/font/google";
import Image from "next/image";
import { useState } from "react";

const varelaRound = Varela_Round({
	weight: ["400"],
	subsets: ["latin"],
});

const JobSeekerDashboard = () => {
	const [activeTab, setActiveTab] = useState("jobs");
	const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

	const recentJobs = [
		{
			id: 1,
			title: "Junior Backend Developer",
			company: "NexGen Robotics",
			location: "Tashkent",
			salaryMin: 10000000,
			salaryMax: 200000000,
			salaryPeriod: "monthly",
			jobType: "full-time",
			workLocation: "onsite",
			publishedAt: "2025-08-18T10:01:36.710Z",
			applicationCount: 50,
			viewCount: 418,
			userMark: 4.7,
			userMarkCount: 69,
			requiredExperience: 1,
			requiredSkills: "Node, React",
			educationLevel: "bachelor",
			experienceLevel: "junior",
			companySize: "50-100",
			industry: "Robotics",
			isVerified: false,
		},
		{
			id: 2,
			title: "Senior Frontend Developer",
			company: "TechCorp Solutions",
			location: "Samarqand",
			salaryMin: 15000000,
			salaryMax: 250000000,
			salaryPeriod: "monthly",
			jobType: "full-time",
			workLocation: "remote",
			publishedAt: "2025-08-17T10:01:36.710Z",
			applicationCount: 35,
			viewCount: 289,
			userMark: 4.8,
			userMarkCount: 42,
			requiredExperience: 3,
			requiredSkills: "React, TypeScript, Next.js",
			educationLevel: "bachelor",
			experienceLevel: "senior",
			companySize: "100-500",
			industry: "Technology",
			isVerified: true,
		},
		{
			id: 3,
			title: "UI/UX Designer",
			company: "Creative Studio",
			location: "Tashkent",
			salaryMin: 8000000,
			salaryMax: 150000000,
			salaryPeriod: "monthly",
			jobType: "part-time",
			workLocation: "hybrid",
			publishedAt: "2025-08-16T10:01:36.710Z",
			applicationCount: 28,
			viewCount: 156,
			userMark: 4.6,
			userMarkCount: 23,
			requiredExperience: 2,
			requiredSkills: "Figma, Adobe Creative Suite",
			educationLevel: "bachelor",
			experienceLevel: "middle",
			companySize: "10-50",
			industry: "Design",
			isVerified: true,
		},
	];

	const myApplications = [
		{
			id: 1,
			job: "Senior React Developer",
			company: "TechHub",
			status: "Jarayonda",
			appliedDate: "15 Avg",
			statusColor: "bg-yellow-100 text-yellow-800",
		},
		{
			id: 2,
			job: "Product Manager",
			company: "InnovateLab",
			status: "Qabul qilindi",
			appliedDate: "12 Avg",
			statusColor: "bg-green-100 text-green-800",
		},
		{
			id: 3,
			job: "Full Stack Developer",
			company: "DevCompany",
			status: "Rad etildi",
			appliedDate: "8 Avg",
			statusColor: "bg-red-100 text-red-800",
		},
	];

	const notifications = [
		{
			id: 1,
			message: "TechHub kompaniyasidan javob keldi",
			time: "10 daqiqa oldin",
			type: "application",
		},
		{
			id: 2,
			message: "Yangi ish e'loni: Python Developer",
			time: "2 soat oldin",
			type: "job",
		},
		{
			id: 3,
			message: "Profil ko'rishlar soni oshdi",
			time: "1 kun oldin",
			type: "profile",
		},
	];

	const stats = [
		{
			label: "Yuborilgan arizalar",
			value: "12",
			icon: Send,
			color: "text-blue-600",
			bgColor: "bg-blue-50",
		},
		{
			label: "Profil ko'rishlar",
			value: "48",
			icon: Eye,
			color: "text-green-600",
			bgColor: "bg-green-50",
		},
		{
			label: "Saqlanganlar",
			value: "7",
			icon: Bookmark,
			color: "text-purple-600",
			bgColor: "bg-purple-50",
		},
		{
			label: "Reyting",
			value: "4.8",
			icon: Star,
			color: "text-yellow-600",
			bgColor: "bg-yellow-50",
		},
	];

	const renderJobsContent = () => (
		<div className="space-y-8">
			{/* Header Section */}
			<div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-800 rounded-3xl p-8 text-white">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-4xl font-bold mb-3">Ish qidirish</h1>
						<p className="text-blue-100 text-lg">
							Eng yaxshi imkoniyatlarni toping
						</p>
					</div>
					<div className="hidden md:block">
						<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
							<Search className="w-12 h-12" />
						</div>
					</div>
				</div>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{stats.map((stat, index) => (
					<div
						key={index}
						className="bg-white rounded-2xl p-6 shadow-lg border hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
					>
						<div className="flex items-center justify-between">
							<div>
								<p className="text-gray-600 text-sm font-medium">
									{stat.label}
								</p>
								<p className="text-3xl font-bold text-gray-900 mt-2">
									{stat.value}
								</p>
							</div>
							<div className={`p-4 rounded-2xl ${stat.bgColor} ${stat.color}`}>
								<stat.icon className="w-8 h-8" />
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Search and Filter Section */}
			<div className="bg-white rounded-3xl shadow-lg border p-8">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<div className="relative">
						<Search className="w-6 h-6 absolute left-4 top-4 text-gray-400" />
						<input
							type="text"
							placeholder="Kasb nomi yoki kompaniya..."
							className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg transition-all"
						/>
					</div>
					<div className="relative">
						<MapPin className="w-6 h-6 absolute left-4 top-4 text-gray-400" />
						<input
							type="text"
							placeholder="Joylashuv..."
							className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg transition-all"
						/>
					</div>
					<button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg">
						Qidirish
					</button>
				</div>
			</div>

			{/* Jobs List */}
			<div className="space-y-4">
				{recentJobs.map((job) => {
					const formatSalary = (min: number, max: number) => {
						const formatUZS = (amount: number) => {
							if (amount >= 1000000) return `${(amount / 1000000).toFixed(0)}M`;
							if (amount >= 1000) return `${(amount / 1000).toFixed(0)}K`;
							return amount.toString();
						};
						return `${formatUZS(min)} - ${formatUZS(max)} UZS`;
					};

					const formatDate = (dateString: string) => {
						const date = new Date(dateString);
						const now = new Date();
						const diffTime = Math.abs(now.getTime() - date.getTime());
						const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

						if (diffDays === 1) return "Bugun";
						if (diffDays <= 7) return `${diffDays} kun oldin`;
						if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} hafta oldin`;
						return `${Math.ceil(diffDays / 30)} oy oldin`;
					};

					const getWorkLocationIcon = (location: string) => {
						switch (location) {
							case "remote":
								return "🏠";
							case "onsite":
								return "🏢";
							case "hybrid":
								return "🔄";
							default:
								return "📍";
						}
					};

					return (
						<div
							key={job.id}
							className="bg-white rounded-2xl shadow-lg border p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
						>
							<div className="flex items-start gap-4">
								{/* Company Logo */}
								<div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
										{job.logo ? (
										<Image
											src={job.logo}
											alt={job.company}
											width={48}
											height={48}
											className="rounded-xl object-cover"
										/>
									) : (
										<span className="text-2xl">🏢</span>
									)}
								</div>

								{/* Job Details */}
								<div className="flex-1 min-w-0">
									<div className="flex items-start justify-between mb-3">
										<div className="flex-1 min-w-0">
											<h3 className="text-xl font-bold text-gray-900 mb-1 truncate">
												{job.title}
											</h3>
											<div className="flex items-center gap-3 mb-2">
												<p className="text-gray-700 font-semibold">
													{job.company}
												</p>
												{job.isVerified && (
													<span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
														✓ Tekshirilgan
													</span>
												)}
											</div>
										</div>

										{/* Rating */}
										<div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
											<Star className="w-4 h-4 text-yellow-500 fill-current" />
											<span className="text-sm font-semibold text-gray-700">
												{job.userMark}
											</span>
											<span className="text-xs text-gray-500">
												({job.userMarkCount})
											</span>
										</div>
									</div>

									{/* Job Info Grid */}
									<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
										<div className="flex items-center gap-2 text-sm text-gray-600">
											<MapPin className="w-4 h-4 text-blue-500" />
											<span>{job.location}</span>
										</div>
										<div className="flex items-center gap-2 text-sm text-gray-600">
											<DollarSign className="w-4 h-4 text-green-500" />
											<span className="font-medium">
												{formatSalary(job.salaryMin, job.salaryMax)}
											</span>
										</div>
										<div className="flex items-center gap-2 text-sm text-gray-600">
											<Clock className="w-4 h-4 text-purple-500" />
											<span className="capitalize">
												{job.jobType.replace("-", " ")}
											</span>
										</div>
										<div className="flex items-center gap-2 text-sm text-gray-600">
											<span className="text-lg">
												{getWorkLocationIcon(job.workLocation)}
											</span>
											<span className="capitalize">{job.workLocation}</span>
										</div>
									</div>

									{/* Skills and Experience */}
									<div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
										<div className="flex items-center gap-2">
											<span className="font-medium">Tajriba:</span>
											<span>{job.requiredExperience} yil</span>
										</div>
										<div className="flex items-center gap-2">
											<span className="font-medium">Ma'lumot:</span>
											<span className="capitalize">{job.educationLevel}</span>
										</div>
									</div>

									{/* Skills */}
									<div className="mb-4">
										<div className="text-sm text-gray-600 mb-2">
											<span className="font-medium">Kerakli ko'nikmalar:</span>
										</div>
										<div className="flex flex-wrap gap-2">
											{job.requiredSkills.split(", ").map((skill, index) => (
												<span
													key={index}
													className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-medium"
												>
													{skill}
												</span>
											))}
										</div>
									</div>

									{/* Company Info */}
									<div className="flex items-center justify-between text-sm text-gray-500 mb-4">
										<div className="flex items-center gap-4">
											<span>{job.industry}</span>
											<span>•</span>
											<span>{job.companySize} xodim</span>
										</div>
										<span>{formatDate(job.publishedAt)}</span>
									</div>

									{/* Stats */}
									<div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
										<div className="flex items-center gap-2">
											<Eye className="w-4 h-4" />
											<span>{job.viewCount} ko'rish</span>
										</div>
										<div className="flex items-center gap-2">
											<FileText className="w-4 h-4" />
											<span>{job.applicationCount} ariza</span>
										</div>
									</div>
								</div>

								{/* Action Buttons */}
								<div className="flex flex-col gap-3 flex-shrink-0">
									<button className="text-gray-400 hover:text-red-500 p-2 rounded-xl hover:bg-red-50 transition-all">
										<Heart className="w-5 h-5" />
									</button>
									<button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg text-sm">
										Ariza berish
									</button>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);

	const renderApplicationsContent = () => (
		<div className="space-y-8">
			<div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-8 text-white">
				<h1 className="text-4xl font-bold mb-3">Mening arizalarim</h1>
				<p className="text-green-100 text-lg">
					Barcha arizalaringizni ko'ring va kuzatib boring
				</p>
			</div>

			<div className="grid gap-6">
				{myApplications.map((app) => (
					<div
						key={app.id}
						className="bg-white rounded-3xl shadow-lg border p-8 hover:shadow-xl transition-all duration-300"
					>
						<div className="flex items-center justify-between">
							<div>
								<h3 className="text-2xl font-bold text-gray-900 mb-2">
									{app.job}
								</h3>
								<p className="text-gray-600 text-lg mb-4">{app.company}</p>
								<p className="text-sm text-gray-500">
									Yuborilgan: {app.appliedDate}
								</p>
							</div>
							<div className="text-right">
								<span
									className={`px-6 py-3 rounded-full text-lg font-semibold ${app.statusColor}`}
								>
									{app.status}
								</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);

	const renderProfileContent = () => (
		<div className="space-y-8">
			<div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white">
				<h1 className="text-4xl font-bold mb-3">Profil</h1>
				<p className="text-purple-100 text-lg">
					Shaxsiy ma'lumotlaringizni boshqaring
				</p>
			</div>

			<div className="bg-white rounded-3xl shadow-lg border p-8">
				<div className="text-center">
					<div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-4xl font-bold shadow-2xl">
						K
					</div>
					<h2 className="text-3xl font-bold text-gray-900 mb-3">Kirish</h2>
					<p className="text-gray-600 text-xl mb-8">Frontend Developer</p>

					<div className="grid grid-cols-3 gap-8 mb-8">
						<div className="text-center">
							<div className="text-3xl font-bold text-gray-900">48</div>
							<div className="text-gray-600">Ko'rishlar</div>
						</div>
						<div className="text-center">
							<div className="text-3xl font-bold text-gray-900">12</div>
							<div className="text-gray-600">Arizalar</div>
						</div>
						<div className="text-center">
							<div className="text-3xl font-bold text-gray-900">4.8</div>
							<div className="text-gray-600">Reyting</div>
						</div>
					</div>

					<button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg">
						Profilni tahrirlash
					</button>
				</div>
			</div>
		</div>
	);

	const renderContent = () => {
		switch (activeTab) {
			case "jobs":
				return renderJobsContent();
			case "applications":
				return renderApplicationsContent();
			case "profile":
				return renderProfileContent();
			case "chats":
				return (
					<div className="text-center py-20">
						<div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center">
							<MessageSquare className="w-16 h-16 text-blue-600" />
						</div>
						<h3 className="text-3xl font-bold text-gray-900 mb-4">Chatlar</h3>
						<p className="text-gray-600 text-lg">
							Employer bilan chatlaringiz bu yerda ko'rinadi
						</p>
					</div>
				);
			default:
				return renderJobsContent();
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
			<header className="bg-white shadow-lg sticky top-0 z-50 border-b">
				<div className="max-w-7xl mx-auto px-6 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<Image
								src="/logo.jpg"
								alt="logo"
								width={90}
								height={90}
								className="rounded-2xl"
							/>
							<div className="flex items-center mr-2">
								<span
									className={`text-3xl font-bold text-blue-700 ${varelaRound.className}`}
								>
									head
								</span>
								<span
									className={`text-3xl font-bold text-blue-700 ${varelaRound.className}`}
								>
									hunter
								</span>
							</div>
						</div>

						<div className="flex items-center gap-6">
							<div className="hidden md:flex items-center gap-1 bg-gray-100 rounded-2xl p-2">
								<button
									onClick={() => setActiveTab("jobs")}
									className={`px-6 py-3 rounded-xl font-semibold transition-all ${
										activeTab === "jobs"
											? "bg-white text-blue-600 shadow-lg"
											: "text-gray-600 hover:text-gray-900"
									}`}
								>
									Ishlar
								</button>
								<button
									onClick={() => setActiveTab("applications")}
									className={`px-6 py-3 rounded-xl font-semibold transition-all ${
										activeTab === "applications"
											? "bg-white text-blue-600 shadow-lg"
											: "text-gray-600 hover:text-gray-900"
									}`}
								>
									Arizalar
								</button>
								<button
									onClick={() => setActiveTab("chats")}
									className={`px-6 py-3 rounded-xl font-semibold transition-all ${
										activeTab === "chats"
											? "bg-white text-blue-600 shadow-lg"
											: "text-gray-600 hover:text-gray-900"
									}`}
								>
									Chatlar
								</button>
							</div>

							<button className="relative p-3 text-gray-400 hover:text-gray-600 transition-colors">
								<Bell className="w-7 h-7" />
								<span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full"></span>
							</button>

							<div className="relative">
								<button
									onClick={() =>
										setIsProfileDropdownOpen(!isProfileDropdownOpen)
									}
									className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-2xl transition-all"
								>
									<div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-lg font-semibold">
										K
									</div>
									<ChevronDown
										className={`w-5 h-5 text-gray-400 transition-transform ${
											isProfileDropdownOpen ? "rotate-180" : ""
										}`}
									/>
								</button>

								{isProfileDropdownOpen && (
									<div className="absolute right-0 top-full mt-3 w-56 bg-white rounded-2xl shadow-2xl border py-3 z-50">
										<button
											onClick={() => {
												setActiveTab("profile");
												setIsProfileDropdownOpen(false);
											}}
											className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-gray-50 text-gray-700 transition-colors"
										>
											<User className="w-5 h-5" />
											<span className="font-medium">Profil</span>
										</button>
										<button
											onClick={() => setIsProfileDropdownOpen(false)}
											className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-gray-50 text-gray-700 transition-colors"
										>
											<Settings className="w-5 h-5" />
											<span className="font-medium">Sozlamalar</span>
										</button>

										<hr className="my-3" />
										<button
											onClick={() => setIsProfileDropdownOpen(false)}
											className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-red-50 text-red-600 transition-colors"
										>
											<LogOut className="w-5 h-5" />
											<span className="font-medium">Chiqish</span>
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</header>

			<main className="max-w-7xl mx-auto px-6 py-8">{renderContent()}</main>
		</div>
	);
};

export default JobSeekerDashboard;

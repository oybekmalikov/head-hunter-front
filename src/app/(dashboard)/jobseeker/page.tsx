"use client";
import {
	AlignJustify,
	Bell,
	Bookmark,
	Briefcase,
	Calendar,
	ChevronDown,
	ChevronRight,
	Clock,
	DollarSign,
	Eye,
	FileText,
	Filter,
	Home,
	LogOut,
	MapPin,
	MessageSquare,
	Search,
	Send,
	Settings,
	Star,
	TrendingUp,
	User,
} from "lucide-react";
import { Varela_Round } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getItem, setItem } from "../../../helpers/localstorage";

const varelaRound = Varela_Round({
	weight: ["400"],
	subsets: ["latin"],
});

const JobSeekerDashboard = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const [activeTab, setActiveTab] = useState("dashboard");
	const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

	useEffect(() => {
		const savedTab = getItem("activeTab");
		if (savedTab) {
			setActiveTab(savedTab);
		}
	}, []);

	const recentJobs = [
		{
			id: 1,
			title: "Frontend Developer",
			company: "TechCorp",
			location: "Toshkent",
			salary: "$800-1200",
			type: "To'liq vaqt",
			posted: "2 kun oldin",
			logo: "🏢",
			featured: true,
		},
		{
			id: 2,
			title: "UI/UX Designer",
			company: "DesignStudio",
			location: "Samarqand",
			salary: "$600-900",
			type: "Masofaviy",
			posted: "3 kun oldin",
			logo: "🎨",
		},
		{
			id: 3,
			title: "Backend Developer",
			company: "StartupUz",
			location: "Toshkent",
			salary: "$1000-1500",
			type: "Gibrid",
			posted: "5 kun oldin",
			logo: "💻",
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
		},
		{
			label: "Profil ko'rishlar",
			value: "48",
			icon: Eye,
			color: "text-green-600",
		},
		{
			label: "Saqlanganlar",
			value: "7",
			icon: Bookmark,
			color: "text-purple-600",
		},
		{ label: "Yulduzcha", value: "4.8", icon: Star, color: "text-yellow-600" },
	];

	const sidebarItems = [
		{ id: "dashboard", label: "Dashboard", icon: Home },
		{ id: "jobs", label: "Ishlar", icon: Briefcase },
		{ id: "chats", label: "Chatlar", icon: MessageSquare },
		{ id: "applications", label: "Mening arizalarim", icon: FileText },
		{ id: "profile", label: "Profil", icon: User },
	];

	const renderDashboardContent = () => (
		<div className="space-y-6">
			<div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 text-white">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold mb-2">Welcome!</h1>
						<p className="text-blue-100 text-lg">Today's new opportunities</p>
					</div>
					<div className="hidden md:block">
						<div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
							<TrendingUp className="w-12 h-12" />
						</div>
					</div>
				</div>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{stats.map((stat, index) => (
					<div
						key={index}
						className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow"
					>
						<div className="flex items-center justify-between">
							<div>
								<p className="text-gray-600 text-sm font-medium">
									{stat.label}
								</p>
								<p className="text-2xl font-bold text-gray-900 mt-2">
									{stat.value}
								</p>
							</div>
							<div className={`p-3 rounded-xl bg-gray-50 ${stat.color}`}>
								<stat.icon className="w-6 h-6" />
							</div>
						</div>
					</div>
				))}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Recent Jobs */}
				<div className="lg:col-span-2">
					<div className="bg-white rounded-xl shadow-sm border">
						<div className="p-6 border-b">
							<div className="flex items-center justify-between">
								<h2 className="text-xl font-semibold text-gray-900">
									Yangi ishlar
								</h2>
								<button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
									Barchasini ko'rish
									<ChevronRight className="w-4 h-4" />
								</button>
							</div>
						</div>
						<div className="p-6 space-y-4">
							{recentJobs.map((job) => (
								<div
									key={job.id}
									className="border rounded-xl p-4 hover:bg-gray-50 transition-colors relative"
								>
									{job.featured && (
										<span className="absolute top-3 right-3 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
											Tavsiya etilgan
										</span>
									)}
									<div className="flex items-start gap-4">
										<div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
											{job.logo}
										</div>
										<div className="flex-1">
											<h3 className="font-semibold text-gray-900 mb-1">
												{job.title}
											</h3>
											<p className="text-gray-600 mb-2">{job.company}</p>
											<div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
												<div className="flex items-center gap-1">
													<MapPin className="w-4 h-4" />
													{job.location}
												</div>
												<div className="flex items-center gap-1">
													<DollarSign className="w-4 h-4" />
													{job.salary}
												</div>
												<div className="flex items-center gap-1">
													<Clock className="w-4 h-4" />
													{job.type}
												</div>
											</div>
											<div className="flex items-center justify-between">
												<span className="text-xs text-gray-400">
													{job.posted}
												</span>
												<div className="flex gap-2">
													<button className="text-gray-400 hover:text-red-500">
														<Bookmark className="w-5 h-5" />
													</button>
													<button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
														Ariza berish
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Right Sidebar */}
				<div className="space-y-6">
					{/* My Applications */}
					<div className="bg-white rounded-xl shadow-sm border">
						<div className="p-4 border-b">
							<h3 className="font-semibold text-gray-900">Mening arizalarim</h3>
						</div>
						<div className="p-4 space-y-3">
							{myApplications.slice(0, 3).map((app) => (
								<div key={app.id} className="border rounded-lg p-3">
									<h4 className="font-medium text-gray-900 text-sm mb-1">
										{app.job}
									</h4>
									<p className="text-gray-600 text-xs mb-2">{app.company}</p>
									<div className="flex items-center justify-between">
										<span
											className={`px-2 py-1 rounded-full text-xs font-medium ${app.statusColor}`}
										>
											{app.status}
										</span>
										<span className="text-xs text-gray-400">
											{app.appliedDate}
										</span>
									</div>
								</div>
							))}
							<button className="w-full text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center justify-center gap-1 p-2">
								Barchasini ko'rish
								<ChevronRight className="w-4 h-4" />
							</button>
						</div>
					</div>

					{/* Notifications */}
					<div className="bg-white rounded-xl shadow-sm border">
						<div className="p-4 border-b">
							<h3 className="font-semibold text-gray-900">Bildirishnomalar</h3>
						</div>
						<div className="p-4 space-y-3">
							{notifications.map((notif) => (
								<div
									key={notif.id}
									className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
								>
									<div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
									<div>
										<p className="text-sm text-gray-900 mb-1">
											{notif.message}
										</p>
										<p className="text-xs text-gray-500">{notif.time}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	const renderJobsContent = () => (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold text-gray-900">Ishlar</h1>
				<div className="flex gap-3">
					<button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
						<Filter className="w-4 h-4" />
						Filter
					</button>
				</div>
			</div>

			<div className="bg-white rounded-xl shadow-sm border p-6">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div className="relative">
						<Search className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
						<input
							type="text"
							placeholder="Kasb nomi yoki kompaniya..."
							className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					</div>
					<div className="relative">
						<MapPin className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
						<input
							type="text"
							placeholder="Joylashuv..."
							className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					</div>
					<button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
						Qidirish
					</button>
				</div>
			</div>

			{/* Jobs List */}
			<div className="space-y-4">
				{recentJobs.map((job) => (
					<div
						key={job.id}
						className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow"
					>
						<div className="flex items-start justify-between">
							<div className="flex items-start gap-4">
								<div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center text-3xl">
									{job.logo}
								</div>
								<div>
									<h3 className="text-xl font-semibold text-gray-900 mb-2">
										{job.title}
									</h3>
									<p className="text-gray-600 font-medium mb-3">
										{job.company}
									</p>
									<div className="flex items-center gap-6 text-gray-500 mb-4">
										<div className="flex items-center gap-2">
											<MapPin className="w-4 h-4" />
											{job.location}
										</div>
										<div className="flex items-center gap-2">
											<DollarSign className="w-4 h-4" />
											{job.salary}
										</div>
										<div className="flex items-center gap-2">
											<Clock className="w-4 h-4" />
											{job.type}
										</div>
										<div className="flex items-center gap-2">
											<Calendar className="w-4 h-4" />
											{job.posted}
										</div>
									</div>
								</div>
							</div>
							<div className="flex gap-3">
								<button className="text-gray-400 hover:text-red-500 p-2">
									<Bookmark className="w-5 h-5" />
								</button>
								<button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
									Ariza berish
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);

	const renderContent = () => {
		switch (activeTab) {
			case "dashboard":
				return renderDashboardContent();
			case "jobs":
				return renderJobsContent();
			case "chats":
				return (
					<div className="text-center py-20">
						<MessageSquare className="w-16 h-16 mx-auto text-gray-300 mb-4" />
						<h3 className="text-xl font-semibold text-gray-900 mb-2">
							Chatlar
						</h3>
						<p className="text-gray-600">
							Employer bilan chatlaringiz bu yerda ko'rinadi
						</p>
					</div>
				);
			case "applications":
				return (
					<div className="space-y-6">
						<h1 className="text-2xl font-bold text-gray-900">
							Mening arizalarim
						</h1>
						<div className="grid gap-4">
							{myApplications.map((app) => (
								<div
									key={app.id}
									className="bg-white rounded-xl shadow-sm border p-6"
								>
									<div className="flex items-center justify-between">
										<div>
											<h3 className="text-lg font-semibold text-gray-900 mb-1">
												{app.job}
											</h3>
											<p className="text-gray-600 mb-3">{app.company}</p>
											<p className="text-sm text-gray-500">
												Yuborilgan: {app.appliedDate}
											</p>
										</div>
										<div className="text-right">
											<span
												className={`px-3 py-1 rounded-full text-sm font-medium ${app.statusColor}`}
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
			case "profile":
				return (
					<div className="space-y-6">
						<h1 className="text-2xl font-bold text-gray-900">Profil</h1>
						<div className="bg-white rounded-xl shadow-sm border p-6">
							<div className="text-center">
								<div className="w-24 h-24 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
									K
								</div>
								<h2 className="text-xl font-semibold text-gray-900 mb-2">
									Kirish
								</h2>
								<p className="text-gray-600 mb-4">Frontend Developer</p>
								<div className="flex justify-center gap-4">
									<div className="text-center">
										<div className="text-2xl font-bold text-gray-900">48</div>
										<div className="text-sm text-gray-600">Ko'rishlar</div>
									</div>
									<div className="text-center">
										<div className="text-2xl font-bold text-gray-900">12</div>
										<div className="text-sm text-gray-600">Arizalar</div>
									</div>
									<div className="text-center">
										<div className="text-2xl font-bold text-gray-900">4.8</div>
										<div className="text-sm text-gray-600">Reyting</div>
									</div>
								</div>
								<button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
									Profilni tahrirlash
								</button>
							</div>
						</div>
					</div>
				);
			default:
				return renderDashboardContent();
		}
	};

	return (
		<div
			className="min-h-screen bg-gray-50"
			onClick={() => setIsProfileDropdownOpen(false)}
		>
			<header className="bg-white border-b sticky top-0 z-50">
				<div
					className="flex items-center justify-between px-6 py-4"
					onClick={(e) => e.stopPropagation()}
				>
					<div className="flex items-center gap-8">
						<div className="flex items-center gap-3">
							<button
								className="bg-blue-600 text-white p-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
								onClick={() => setIsSidebarOpen(!isSidebarOpen)}
								title={
									isSidebarOpen
										? "Sidebar ni yashirish"
										: "Sidebar ni ko'rsatish"
								}
							>
								<AlignJustify
									className={`w-5 h-5 transition-transform duration-300 ${
										isSidebarOpen ? "rotate-0" : "rotate-180"
									}`}
								/>
							</button>
						</div>
						<div className="flex items-center ">
							<Image src="/logo.jpg" alt="logo" width={96} height={96} />
							<div className="flex items-center mr-2 md:flex">
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
					</div>

					<div className="flex items-center gap-4">
						<button className="relative p-2 text-gray-400 hover:text-gray-600">
							<Bell className="w-6 h-6" />
							<span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
						</button>

						<div className="relative">
							<button
								onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
								className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg transition-colors"
							>
								<div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
									K
								</div>
								<ChevronDown
									className={`w-4 h-4 text-gray-400 transition-transform ${
										isProfileDropdownOpen ? "rotate-180" : ""
									}`}
								/>
							</button>

							{isProfileDropdownOpen && (
								<div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border py-2 z-50">
									<button
										onClick={() => {
											setActiveTab("profile");
											setIsProfileDropdownOpen(false);
										}}
										className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 text-gray-700"
									>
										<User className="w-4 h-4" />
										Profil
									</button>
									<button
										onClick={() => setIsProfileDropdownOpen(false)}
										className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 text-gray-700"
									>
										<Settings className="w-4 h-4" />
										Sozlamalar
									</button>
									<hr className="my-2" />
									<button
										onClick={() => setIsProfileDropdownOpen(false)}
										className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 text-red-600"
									>
										<LogOut className="w-4 h-4" />
										Chiqish
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</header>

			<div className="flex">
				<aside
					className={`bg-white border-r min-h-screen sticky top-16 transition-all duration-300 ${
						isSidebarOpen ? "w-64" : "w-22"
					}`}
				>
					<nav className="p-4">
						<ul className="space-y-2">
							{sidebarItems.map((item) => (
								<li key={item.id}>
									<button
										onClick={() => {
											setActiveTab(item.id);
											setItem("activeTab", item.id);
										}}
										className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
											activeTab === item.id
												? "bg-blue-50 text-blue-600 font-medium"
												: "text-gray-700 hover:bg-gray-50"
										}`}
									>
										<item.icon className="w-5 h-5 flex-shrink-0" />
										{isSidebarOpen && (
											<span className="whitespace-nowrap overflow-hidden">
												{item.label}
											</span>
										)}
									</button>
								</li>
							))}
						</ul>
					</nav>
				</aside>

				<main className="flex-1 p-8">{renderContent()}</main>
			</div>
		</div>
	);
};

export default JobSeekerDashboard;

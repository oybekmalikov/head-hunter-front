"use client";
import {
	ArrowRight,
	Book,
	Briefcase,
	Calendar,
	Clock,
	Code,
	DollarSign,
	Globe,
	HeartPulse,
	MapPin,
	Megaphone,
	Palette,
	Search,
	Shield,
	Target,
	TrendingUp,
	Users,
} from "lucide-react";
import { Varela_Round } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";

const varelaRound = Varela_Round({
	weight: ["400"],
	subsets: ["latin"],
});

const HomePage = () => {
	const router = useRouter();
	const recentJobs = [
		{
			id: 1,
			title: "Frontend Developer",
			company: "TechCorp UZ",
			location: "Toshkent",
			salary: "$800 - $1500",
			type: "Full-time",
			posted: "5 days in a week",
			views: "584 days ago",
			featured: true,
			logo: <Briefcase className="w-5 h-5 text-black" />,
			description:
				"We are looking for a skilled Frontend Developer to join our dynamic team...",
		},
		{
			id: 2,
			title: "Marketing Manager",
			company: "Digital Agency",
			location: "Samarqand",
			salary: "$600 - $1000",
			type: "Full-time",
			posted: "6 days in a week",
			views: "581 days ago",
			featured: true,
			logo: <Briefcase className="w-5 h-5 text-black" />,
			description:
				"Join our marketing team as a Marketing Manager to drive growth and engagement...",
		},
		{
			id: 3,
			title: "UX/UI Designer",
			company: "Creative Studio",
			location: "Bukhara",
			salary: "$400 - $800",
			type: "Part-time",
			posted: "3 days in a week",
			views: "579 days ago",
			featured: true,
			logo: <Briefcase className="w-5 h-5 text-black" />,
			description:
				"We need a creative UX/UI Designer to craft beautiful user experiences...",
		},
	];

	const categories = [
		{
			name: "IT & Programming",
			count: 1250,
			icon: <Code className="w-10 h-10 text-black" />,
		},
		{
			name: "Marketing",
			count: 890,
			icon: <Megaphone className="w-10 h-10 text-black" />,
		},
		{
			name: "Design",
			count: 650,
			icon: <Palette className="w-10 h-10 text-black" />,
		},
		{
			name: "Business",
			count: 420,
			icon: <Briefcase className="w-10 h-10 text-black" />,
		},
		{
			name: "Education",
			count: 380,
			icon: <Book className="w-10 h-10 text-black" />,
		},
		{
			name: "Health",
			count: 290,
			icon: <HeartPulse className="w-10 h-10 text-black" />,
		},
	];

	const stats = [
		{ value: "10,000+", label: "Active jobs" },
		{ value: "5,000+", label: "Registered companies" },
		{ value: "50,000+", label: "Job seekers" },
		{ value: "85%", label: "Success rate" },
	];

	const features = [
		{
			icon: Target,
			title: "Accurate job search",
			description:
				"Find the job that suits you with the help of expanded filters",
		},
		{
			icon: Shield,
			title: "Secure platform",
			description: "All your information is protected and stored securely",
		},
		{
			icon: Globe,
			title: "Wide network",
			description: "Connect with thousands of companies across Uzbekistan",
		},
	];

	const handleApplyJob = () => {
		router.push("/sign-in");
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<header className="bg-white shadow-sm sticky top-0 z-40">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
						<div className="flex items-center gap-3">
							<div className="w-8 h-8 rounded-lg flex items-center justify-center">
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
						</div>
						<div className="flex items-center gap-4">
							<button
								onClick={() => {
									router.push("/sign-in");
								}}
								className="bg-white text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-colors"
							>
								SignIn
							</button>
							<button
								onClick={() => {
									router.push("/sign-up");
								}}
								className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
							>
								SignUp
							</button>
						</div>
					</div>
				</div>
			</header>

			<section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white py-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h1 className="text-4xl md:text-6xl font-bold mb-6">
						The best jobs in
						<br />
						<span className="text-yellow-400">Uzbekistan</span>
					</h1>
					<p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto">
						A trusted platform for thousands of companies and professional
						workers. Find your dream job or hire the ideal employee.
					</p>

					<div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
						<button
							onClick={() => {
								router.push("/sign-up");
							}}
							className="bg-yellow-500 text-black px-8 py-4 rounded-xl font-semibold text-lg hover:bg-yellow-400 transition-colors"
						>
							Search for a Job
						</button>
						<button
							onClick={() => {
								router.push("/sign-up");
							}}
							className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors"
						>
							Search for a JobSeeker
						</button>
					</div>

					<div className="bg-white rounded-2xl p-6 max-w-4xl mx-auto shadow-xl">
						<div className="flex flex-row gap-4">
							<div className="relative w-full">
								<Search className="w-5 h-5 absolute left-3 top-4 text-gray-400" />
								<input
									type="text"
									placeholder="Job title or company..."
									className="w-full pl-12 pr-4 py-4 text-gray-900 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>
							<button className="bg-blue-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
								Search
							</button>
						</div>
					</div>

					<div className="flex justify-center gap-12 mt-16">
						<div className="w-16 h-16 bg-blue-500/20 backdrop-blur-sm rounded-full flex items-center justify-center">
							<Briefcase className="w-8 h-8" />
						</div>
						<div className="w-16 h-16 bg-blue-500/20 backdrop-blur-sm rounded-full flex items-center justify-center">
							<Users className="w-8 h-8" />
						</div>
						<div className="w-16 h-16 bg-blue-500/20 backdrop-blur-sm rounded-full flex items-center justify-center">
							<TrendingUp className="w-8 h-8" />
						</div>
					</div>
				</div>
			</section>

			<section className="py-16 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
						{stats.map((stat, index) => (
							<div key={index} className="space-y-2">
								<div className="text-3xl md:text-4xl font-bold text-blue-600">
									{stat.value}
								</div>
								<div className="text-gray-600 font-medium">{stat.label}</div>
							</div>
						))}
					</div>
				</div>
			</section>
			<section className="py-16 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
							Latest jobs
						</h2>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto">
							Find the job that suits you or hire the ideal employee.
						</p>
					</div>
					<div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
						<div className="flex items-center gap-4 mb-4">
							<span className="font-semibold text-gray-700">Filters:</span>
							<div className="flex gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-600 mb-1">
										Category
									</label>
									<select className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-600">
										<option>All categories</option>
										<option>IT & Programming</option>
										<option>Marketing</option>
										<option>Design</option>
									</select>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-600 mb-1">
										Ish turi
									</label>
									<select className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-600">
										<option>All types</option>
										<option>Full-time</option>
										<option>Part-time</option>
										<option>Remote</option>
									</select>
								</div>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{recentJobs.map((job) => (
							<div
								key={job.id}
								className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative"
							>
								{job.featured && (
									<span className="absolute top-4 right-4 bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">
										Full-time
									</span>
								)}

								<div className="flex items-start gap-4 mb-4">
									<div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl">
										{job.logo}
									</div>
									<div className="flex-1">
										<h3 className="font-semibold text-gray-900 text-lg mb-1">
											{job.title}
										</h3>
										<p className="text-gray-600 font-medium">{job.company}</p>
									</div>
								</div>

								<p className="text-gray-600 mb-4 text-sm leading-relaxed">
									{job.description}
								</p>

								<div className="space-y-2 mb-6">
									<div className="flex items-center gap-2 text-sm text-gray-500">
										<MapPin className="w-4 h-4" />
										{job.location}
									</div>
									<div className="flex items-center gap-2 text-sm text-gray-500">
										<DollarSign className="w-4 h-4" />
										{job.salary}
									</div>
									<div className="flex items-center gap-2 text-sm text-gray-500">
										<Calendar className="w-4 h-4" />
										{job.posted}
									</div>
									<div className="flex items-center gap-2 text-sm text-gray-500">
										<Clock className="w-4 h-4" />
										{job.views}
									</div>
								</div>

								<div className="flex gap-3">
									<button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
										Details
									</button>
									<button
										onClick={handleApplyJob}
										className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
									>
										Apply
									</button>
								</div>
							</div>
						))}
					</div>

					<div className="text-center mt-12">
						<button
							onClick={handleApplyJob}
							className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
						>
							View all jobs
							<ArrowRight className="w-5 h-5" />
						</button>
					</div>
				</div>
			</section>

			<section className="py-16 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-gray-900 mb-4">
							Top Categories
						</h2>
						<p className="text-lg text-gray-600">
							Most searched jobs in the most popular categories
						</p>
					</div>

					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
						{categories.map((category, index) => (
							<div
								key={index}
								className="text-center p-6 border border-gray-200 rounded-2xl hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer"
							>
								<div className="text-4xl mb-4 flex items-center justify-center">
									{category.icon}
								</div>
								<h3 className="font-semibold text-gray-900 mb-2">
									{category.name}
								</h3>
								<p className="text-sm text-gray-500">{category.count} jobs</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="py-16 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-gray-900 mb-4">
							Why HeadHunter?
						</h2>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto">
							Our platform helps you find the best job opportunities and
							professionals
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{features.map((feature, index) => (
							<div
								key={index}
								className="text-center bg-white p-8 rounded-2xl shadow-sm"
							>
								<div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
									<feature.icon className="w-8 h-8 text-blue-600" />
								</div>
								<h3 className="text-xl font-semibold text-gray-900 mb-4">
									{feature.title}
								</h3>
								<p className="text-gray-600 leading-relaxed">
									{feature.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="py-16 bg-blue-600 text-white">
				<div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl md:text-4xl font-bold mb-6">
						Start your job search today!
					</h2>
					<p className="text-xl text-blue-100 mb-8">
						Millions of job opportunities and professionals are waiting for you
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<button
							onClick={() => {
								router.push("/jobs");
							}}
							className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
						>
							Find Job
						</button>
						<button
							onClick={() => {
								router.push("/sign-up");
							}}
							className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors"
						>
							Find JobSeeker
						</button>
					</div>
				</div>
			</section>

			<footer className="bg-gray-900 text-white py-12">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid md:grid-cols-4 gap-8">
						<div>
							<div className="flex items-center ">
								<Image
									src="/logo.jpg"
									alt="logo"
									width={96}
									height={96}
									className="p-[10px] w-[35%] rounded-[50px]"
								/>
								<div className="flex items-center mr-2 sm:flex">
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
							<p className="text-gray-400 mb-4">
								HeadHunter is the largest job search platform in Uzbekistan
							</p>
						</div>

						<div>
							<h3 className="font-semibold mb-4">Job Seekers</h3>
							<ul className="space-y-2 text-gray-400">
								<li>
									<a href="#" className="hover:text-white">
										Job search
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-white">
										Create resume
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-white">
										Company list
									</a>
								</li>
							</ul>
						</div>

						<div>
							<h3 className="font-semibold mb-4">Employers</h3>
							<ul className="space-y-2 text-gray-400">
								<li>
									<a href="#" className="hover:text-white">
										Job posting
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-white">
										Resume search
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-white">
										Prices
									</a>
								</li>
							</ul>
						</div>

						<div>
							<h3 className="font-semibold mb-4">Company</h3>
							<ul className="space-y-2 text-gray-400">
								<li>
									<a href="#" className="hover:text-white">
										About us
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-white">
										Contact
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-white">
										Privac
									</a>
								</li>
							</ul>
						</div>
					</div>

					<div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
						<p>&copy; 2025 HeadHunter. All rights reserved.</p>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default HomePage;

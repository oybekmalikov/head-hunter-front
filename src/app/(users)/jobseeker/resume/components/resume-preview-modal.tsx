"use client";

import { MoneyCollectFilled } from "@ant-design/icons";
import {
	AlarmClock,
	BadgeDollarSign,
	Briefcase,
	Calendar,
	Download,
	Github,
	GraduationCap,
	Linkedin,
	Mail,
	MapPin,
	Phone,
	Star,
	X,
} from "lucide-react";

interface JobSeekerData {
	id: number;
	userId: number;
	dateOdBirth: string;
	gender: string;
	address: string;
	city: string;
	githubUrl: string;
	linkedIn: string;
	resumeUrl: string;
	resumeFilename: string;
	summary: string;
	avgSalary: number;
	isOpenToWork: boolean;
	experience: number;
	user: {
		id: number;
		firstName: string;
		lastName: string;
		email: string;
		phone: string;
		role: string;
		avatarUrl: string;
	};
	skills: Array<{
		id: number;
		degree: string;
		experience: number;
		skill: {
			id: number;
			name: string;
			category: {
				id: number;
				name: string;
			};
		};
	}>;
	workExperience: Array<{
		id: number;
		companyName: string;
		position: string;
		startDate: string;
		endDate: string;
		isCurrent: boolean;
		description: string;
	}>;
	education: Array<{
		id: number;
		universityName: string;
		faculty: string;
		dagree: string;
		startDate: string;
		endDate: string;
		isCurrent: boolean;
		description: string;
	}>;
	postings: Array<{
		id: number;
		city: string;
		salary: number;
		timeForApply: string;
		target: string;
		jobSeekerId: number;
	}>;
}

interface ResumePreviewModalProps {
	isOpen: boolean;
	onClose: () => void;
	jobSeekerData: JobSeekerData;
}

export const ResumePreviewModal = ({
	isOpen,
	onClose,
	jobSeekerData,
}: ResumePreviewModalProps) => {
	if (!isOpen) return null;

	const formatDate = (dateString: string) => {
		try {
			const date = new Date(dateString);
			const month = date.toLocaleDateString("en-US", { month: "short" });
			const year = date.getFullYear();
			return `${month} ${year}`;
		} catch {
			return dateString;
		}
	};

	const formatSalary = (salary: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "UZS",
			minimumFractionDigits: 0,
		}).format(salary);
	};

	const getSkillLevelColor = (degree: string) => {
		switch (degree.toLowerCase()) {
			case "senior":
				return "bg-green-100 text-green-800";
			case "middle":
				return "bg-blue-100 text-blue-800";
			case "junior":
				return "bg-yellow-100 text-yellow-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-start pt-8 pb-8 z-[9999] overflow-y-auto">
			<div className="bg-white rounded-2xl shadow-2xl border max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
					<div className="flex items-center gap-3">
						<div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
							<Briefcase className="w-6 h-6 text-white" />
						</div>
						<div>
							<h2 className="text-2xl font-bold text-gray-900">
								Resume Preview
							</h2>
							<p className="text-gray-600">
								{jobSeekerData.user.firstName} {jobSeekerData.user.lastName}
							</p>
						</div>
					</div>
					<div className="flex items-center gap-3">
						<button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2">
							<Download className="w-4 h-4" />
							Download PDF
						</button>
						<button
							onClick={onClose}
							className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
						>
							<X className="w-5 h-5" />
						</button>
					</div>
				</div>

				<div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
					<div className="mb-8">
						<div className="flex items-start gap-6 mb-6">
							<div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold">
								{jobSeekerData.user.avatarUrl.length > 0
									? jobSeekerData.user.avatarUrl
									: `${jobSeekerData.user.firstName.charAt(
											0
									  )}${jobSeekerData.user.lastName.charAt(0)}`.toUpperCase()}
							</div>
							<div className="flex-1">
								<h1 className="text-3xl font-bold text-gray-900 mb-2">
									{jobSeekerData.user.firstName} {jobSeekerData.user.lastName}
								</h1>
								<p className="text-xl text-gray-600 mb-4">
									{jobSeekerData.summary}
								</p>

								{/* Contact Information */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="flex items-center gap-3 text-gray-600">
										<Mail className="w-4 h-4" />
										<span>{jobSeekerData.user.email}</span>
									</div>
									<div className="flex items-center gap-3 text-gray-600">
										<Phone className="w-4 h-4" />
										<span>{jobSeekerData.user.phone}</span>
									</div>
									<div className="flex items-center gap-3 text-gray-600">
										<MapPin className="w-4 h-4" />
										<span>
											{jobSeekerData.city}, {jobSeekerData.address}
										</span>
									</div>
									<div className="flex items-center gap-3 text-gray-600">
										<Calendar className="w-4 h-4" />
										<span>
											{formatDate(jobSeekerData.dateOdBirth)} •{" "}
											{jobSeekerData.gender}
										</span>
									</div>
								</div>

								{/* Social Links */}
								<div className="flex items-center gap-4 mt-4">
									{jobSeekerData.githubUrl && (
										<a
											href={jobSeekerData.githubUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
										>
											<Github className="w-4 h-4" />
											<span>GitHub</span>
										</a>
									)}
									{jobSeekerData.linkedIn && (
										<a
											href={jobSeekerData.linkedIn}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
										>
											<Linkedin className="w-4 h-4" />
											<span>LinkedIn</span>
										</a>
									)}
								</div>
							</div>
						</div>

						{/* Key Information */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
							<div className="bg-blue-50 rounded-xl p-4 text-center">
								<div className="text-2xl font-bold text-blue-600">
									{jobSeekerData.experience}
								</div>
								<div className="text-sm text-blue-600">Years Experience</div>
							</div>
							<div className="bg-green-50 rounded-xl p-4 text-center">
								<div className="text-2xl font-bold text-green-600">
									{formatSalary(jobSeekerData.avgSalary)}
								</div>
								<div className="text-sm text-green-600">Expected Salary</div>
							</div>
							<div className="bg-purple-50 rounded-xl p-4 text-center">
								<div className="text-2xl font-bold text-purple-600">
									{jobSeekerData.skills.length}
								</div>
								<div className="text-sm text-purple-600">Skills</div>
							</div>
						</div>
					</div>

					{/* Skills */}
					<div className="mb-8">
						<h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
							<Star className="w-6 h-6 text-yellow-500" />
							Skills & Expertise
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{jobSeekerData.skills.map((skill) => (
								<div key={skill.id} className="bg-gray-50 rounded-xl p-4">
									<div className="flex items-center justify-between mb-2">
										<h3 className="font-semibold text-gray-900">
											{skill.skill.name}
										</h3>
										<span
											className={`px-3 py-1 rounded-full text-xs font-medium ${getSkillLevelColor(
												skill.degree
											)}`}
										>
											{skill.degree}
										</span>
									</div>
									<div className="text-sm text-gray-600 mb-2">
										{skill.skill.category.name}
									</div>
									<div className="text-sm text-gray-500">
										{skill.experience} year{skill.experience > 1 ? "s" : ""}{" "}
										experience
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Work Experience */}
					<div className="mb-8">
						<h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
							<Briefcase className="w-6 h-6 text-blue-500" />
							Work Experience
						</h2>
						<div className="space-y-6">
							{jobSeekerData.workExperience.map((exp) => (
								<div key={exp.id} className="border-l-4 border-blue-500 pl-6">
									<div className="flex items-start justify-between mb-2">
										<div>
											<h3 className="text-lg font-semibold text-gray-900">
												{exp.position}
											</h3>
											<p className="text-blue-600 font-medium">
												{exp.companyName}
											</p>
										</div>
										<div className="text-right">
											<div className="text-sm text-gray-600">
												{formatDate(exp.startDate)} -{" "}
												{exp.isCurrent ? "Present" : formatDate(exp.endDate)}
											</div>
											{exp.isCurrent && (
												<span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-1">
													Current
												</span>
											)}
										</div>
									</div>
									<p className="text-gray-600">{exp.description}</p>
								</div>
							))}
						</div>
					</div>

					{/* Education */}
					<div className="mb-8">
						<h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
							<GraduationCap className="w-6 h-6 text-green-500" />
							Education
						</h2>
						<div className="space-y-6">
							{jobSeekerData.education.map((edu) => (
								<div key={edu.id} className="border-l-4 border-green-500 pl-6">
									<div className="flex items-start justify-between mb-2">
										<div>
											<h3 className="text-lg font-semibold text-gray-900">
												{edu.dagree}
											</h3>
											<p className="text-green-600 font-medium">
												{edu.universityName}
											</p>
											<p className="text-gray-600">{edu.faculty}</p>
										</div>
										<div className="text-right">
											<div className="text-sm text-gray-600">
												{formatDate(edu.startDate)} -{" "}
												{edu.isCurrent ? "Present" : formatDate(edu.endDate)}
											</div>
											{edu.isCurrent && (
												<span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-1">
													Current
												</span>
											)}
										</div>
									</div>
									{edu.description && (
										<p className="text-gray-600">{edu.description}</p>
									)}
								</div>
							))}
						</div>
					</div>

					{jobSeekerData.postings && jobSeekerData.postings.length > 0 && (
						<div className="mb-8">
							<h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
								<Briefcase className="w-6 h-6 text-purple-500" />
								Job Preferences
							</h2>
							<div className="space-y-4">
								{jobSeekerData.postings.map((posting) => (
									<div key={posting.id} className="bg-purple-50 rounded-xl p-4">
										<p className="text-gray-900 mb-2">{posting.target}</p>
										<div className="flex flex-row gap-4 text-sm text-gray-600">
											<span className="flex flex-row items-center gap-2">
												<MapPin /> {posting.city}
											</span>
											<span className="flex flex-row items-center gap-2">
												<BadgeDollarSign /> {formatSalary(posting.salary)}
											</span>
											<span className="flex flex-row items-center gap-2">
												<AlarmClock /> {posting.timeForApply}
											</span>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

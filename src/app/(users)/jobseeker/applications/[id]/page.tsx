"use client";
import {
	ArrowLeft,
	Briefcase,
	Building,
	CheckCircle,
	Clock,
	DollarSign,
	ExternalLink,
	Eye,
	Globe,
	GraduationCap,
	Mail,
	MapPin,
	MessageCircle,
	Phone,
	User,
	XCircle,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getItem } from "../../../../../helpers/localstorage";
import { useGetJobApplicationsByJobPostingIdAndJobSeekerId } from "../../../../../hooks/useJobApplications";

export default function JobSeekerApplicationDetails() {
	const params = useParams();
	const router = useRouter();
	const applicationId = params.id as string;
	const [userId, setUserId] = useState<string | null>(null);

	const {
		data: applications,
		isLoading,
		error,
	} = useGetJobApplicationsByJobPostingIdAndJobSeekerId(applicationId, userId);

	useEffect(() => {
		const storedUserId = getItem("user_id");
		setUserId(storedUserId);
	}, []);

	// Get the first application from the array
	const application = applications?.[0];

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "pending":
				return <Clock className="w-5 h-5 text-yellow-500" />;
			case "reviewed":
				return <Eye className="w-5 h-5 text-blue-500" />;
			case "accepted":
				return <CheckCircle className="w-5 h-5 text-green-500" />;
			case "rejected":
				return <XCircle className="w-5 h-5 text-red-500" />;
			default:
				return <Clock className="w-5 h-5 text-gray-500" />;
		}
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "pending":
				return "bg-yellow-100 text-yellow-800";
			case "reviewed":
				return "bg-blue-100 text-blue-800";
			case "accepted":
				return "bg-green-100 text-green-800";
			case "rejected":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	if (!userId) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
					<p className="text-gray-600">Loading...</p>
				</div>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
					<p className="text-gray-600">Loading application details...</p>
				</div>
			</div>
		);
	}

	if (error || !application) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
					<h3 className="text-xl font-semibold text-gray-900 mb-2">
						Error Loading Application
					</h3>
					<p className="text-gray-600 mb-4">
						Unable to load application details. Please try again.
					</p>
					<button
						onClick={() => router.back()}
						className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
					>
						Go Back
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-6xl mx-auto p-8">
				{/* Header */}
				<div className="mb-8">
					<button
						onClick={() => router.back()}
						className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
					>
						<ArrowLeft className="w-5 h-5" />
						Back to Applications
					</button>
					<div className="flex items-center gap-3 mb-4">
						{getStatusIcon(application.status)}
						<h1 className="text-3xl font-bold text-gray-900">
							{application.jobPosting?.title || "Job Application"}
						</h1>
					</div>
					<div className="flex items-center gap-4 text-gray-600">
						<div className="flex items-center gap-2">
							<Building className="w-4 h-4" />
							<span className="font-medium">
								{application.jobPosting?.company?.name || "Company Name"}
							</span>
						</div>
						<div className="flex items-center gap-2">
							<MapPin className="w-4 h-4" />
							<span>{application.jobPosting?.location || "Location"}</span>
						</div>
					</div>
				</div>

				{/* Status Card */}
				<div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
					<div className="flex items-center justify-between">
						<div>
							<h3 className="text-lg font-semibold text-gray-900 mb-2">
								Application Status
							</h3>
							<div className="flex items-center gap-3">
								{getStatusIcon(application.status)}
								<span
									className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
										application.status
									)}`}
								>
									{application.status.charAt(0).toUpperCase() +
										application.status.slice(1)}
								</span>
							</div>
						</div>
						<div className="text-right">
							<p className="text-sm text-gray-500">Applied on</p>
							<p className="text-gray-900 font-medium">
								{application.createdAt
									? new Date(application.createdAt).toLocaleDateString()
									: "N/A"}
							</p>
						</div>
					</div>
				</div>

				{/* Job Details */}
				<div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">
						Job Details
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						<div className="flex items-center gap-3">
							<Briefcase className="w-5 h-5 text-blue-600" />
							<div>
								<p className="text-sm text-gray-500">Job Type</p>
								<p className="font-medium text-gray-900">
									{application.jobPosting?.jobType || "N/A"}
								</p>
							</div>
						</div>
						<div className="flex items-center gap-3">
							<MapPin className="w-5 h-5 text-blue-600" />
							<div>
								<p className="text-sm text-gray-500">Location</p>
								<p className="font-medium text-gray-900">
									{application.jobPosting?.location || "N/A"}
								</p>
							</div>
						</div>
						<div className="flex items-center gap-3">
							<DollarSign className="w-5 h-5 text-blue-600" />
							<div>
								<p className="text-sm text-gray-500">Salary Range</p>
								<p className="font-medium text-gray-900">
									{application.jobPosting?.salaryMin &&
									application.jobPosting?.salaryMax
										? `${application.jobPosting.salaryMin.toLocaleString()} - ${application.jobPosting.salaryMax.toLocaleString()} UZS`
										: "N/A"}
								</p>
							</div>
						</div>
						<div className="flex items-center gap-3">
							<User className="w-5 h-5 text-blue-600" />
							<div>
								<p className="text-sm text-gray-500">Experience Level</p>
								<p className="font-medium text-gray-900">
									{application.jobPosting?.experienceLevel || "N/A"}
								</p>
							</div>
						</div>
						<div className="flex items-center gap-3">
							<GraduationCap className="w-5 h-5 text-blue-600" />
							<div>
								<p className="text-sm text-gray-500">Education</p>
								<p className="font-medium text-gray-900">
									{application.jobPosting?.educationLevel || "N/A"}
								</p>
							</div>
						</div>
						<div className="flex items-center gap-3">
							<Globe className="w-5 h-5 text-blue-600" />
							<div>
								<p className="text-sm text-gray-500">Work Location</p>
								<p className="font-medium text-gray-900">
									{application.jobPosting?.workLocation || "N/A"}
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Job Description */}
				{application.jobPosting?.description && (
					<div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
						<h3 className="text-lg font-semibold text-gray-900 mb-4">
							Job Description
						</h3>
						<div className="prose max-w-none text-gray-600">
							{application.jobPosting.description}
						</div>
					</div>
				)}

				{/* Requirements */}
				{application.jobPosting?.requirements && (
					<div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
						<h3 className="text-lg font-semibold text-gray-900 mb-4">
							Requirements
						</h3>
						<p className="text-gray-600">
							{application.jobPosting.requirements}
						</p>
					</div>
				)}

				{/* Required Skills */}
				{application.jobPosting?.requiredSkills && (
					<div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
						<h3 className="text-lg font-semibold text-gray-900 mb-4">
							Required Skills
						</h3>
						<div className="flex flex-wrap gap-2">
							{application.jobPosting.requiredSkills
								.split(",")
								.map((skill: string, index: number) => (
									<span
										key={index}
										className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
									>
										{skill.trim()}
									</span>
								))}
						</div>
					</div>
				)}

				{/* Company Information */}
				<div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">
						Company Information
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<h4 className="font-medium text-gray-900 mb-2">
								{application.jobPosting?.company?.name}
							</h4>
							<p className="text-gray-600 mb-3">
								{application.jobPosting?.company?.description}
							</p>
							<div className="space-y-2 text-sm text-gray-600">
								<p>
									<span className="font-medium">Industry:</span>{" "}
									{application.jobPosting?.company?.industry}
								</p>
								<p>
									<span className="font-medium">Company Size:</span>{" "}
									{application.jobPosting?.company?.companySize}
								</p>
								<p>
									<span className="font-medium">Established:</span>{" "}
									{application.jobPosting?.company?.establishedYear}
								</p>
								<p>
									<span className="font-medium">Address:</span>{" "}
									{application.jobPosting?.company?.address}
								</p>
							</div>
						</div>
						<div className="space-y-3">
							<div className="flex items-center gap-2">
								<Phone className="w-4 h-4 text-gray-500" />
								<span className="text-gray-600">
									{application.jobPosting?.company?.callNumber}
								</span>
							</div>
							<div className="flex items-center gap-2">
								<Mail className="w-4 h-4 text-gray-500" />
								<span className="text-gray-600">
									{application.jobPosting?.company?.email}
								</span>
							</div>
							{application.jobPosting?.company?.webSiteUrl && (
								<div className="flex items-center gap-2">
									<ExternalLink className="w-4 h-4 text-gray-500" />
									<a
										href={application.jobPosting.company.webSiteUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="text-blue-600 hover:text-blue-800 transition-colors"
									>
										Visit Website
									</a>
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Application Details */}
				<div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">
						Application Details
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<h4 className="font-medium text-gray-900 mb-2">Cover Letter</h4>
							<p className="text-gray-600">
								{application.coverLetter || "No cover letter provided"}
							</p>
						</div>
						<div>
							<h4 className="font-medium text-gray-900 mb-2">Resume</h4>
							{application.resumeUrl && application.resumeUrl !== "/" ? (
								<a
									href={application.resumeUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2"
								>
									<ExternalLink className="w-4 h-4" />
									View Resume
								</a>
							) : (
								<p className="text-gray-500">No resume uploaded</p>
							)}
						</div>
					</div>
				</div>

				{/* Actions */}
				<div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
					<div className="flex gap-3">
						<button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
							<MessageCircle className="w-4 h-4" />
							Contact Employer
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

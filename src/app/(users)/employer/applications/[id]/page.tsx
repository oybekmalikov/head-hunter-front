
"use client";
import {
	ArrowLeft,
	Award,
	Briefcase,
	Calendar,
	Check,
	CheckCircle,
	Clock,
	DollarSign,
	Download,
	ExternalLink,
	Eye,
	FileText,
	Globe,
	GraduationCap,
	Mail,
	MapPin,
	MessageCircle,
	Phone,
	User,
	X,
	XCircle,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getItem } from "../../../../../helpers/localstorage";
import {
	useGetJobApplicationById,
	useUpdateJobApplication,
} from "../../../../../hooks/useJobApplications";

export default function EmployerApplicationDetails() {
	const params = useParams();
	const router = useRouter();
	const applicationId = params.id as string;
	const [userId, setUserId] = useState<string | null>(null);
	const [isUpdating, setIsUpdating] = useState(false);

	const {
		data: application,
		isLoading,
		error,
	} = useGetJobApplicationById(applicationId);

	const { mutate: updateStatus } = useUpdateJobApplication();

	useEffect(() => {
		const storedUserId = getItem("user_id");
		setUserId(storedUserId);
	}, []);

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

	const handleStatusUpdate = async (newStatus: string) => {
		setIsUpdating(true);
		try {
			await updateStatus({
				id: applicationId,
				data: {
					status: newStatus,
				},
			});
		} catch (error) {
			console.error("Failed to update status:", error);
		}
		setIsUpdating(false);
	};

	const handleContactCandidate = () => {
		// Navigate to chat or contact page
		router.push(`/employer/chat/${application?.jobSeeker?.id}`);
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
				<div className="mb-8">
					<button
						onClick={() => router.back()}
						className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
					>
						<ArrowLeft className="w-5 h-5" />
						Back to Applications
					</button>
					<div className="flex items-center justify-between">
						<div>
							<div className="flex items-center gap-3 mb-4">
								{getStatusIcon(application.status)}
								<h1 className="text-3xl font-bold text-gray-900">
									{application.jobSeeker?.user.firstName}{" "}
									{application.jobSeeker?.user.lastName}
								</h1>
							</div>
							<div className="flex items-center gap-4 text-gray-600">
								<div className="flex items-center gap-2">
									<Briefcase className="w-4 h-4" />
									<span className="font-medium">
										{application.jobPosting?.title}
									</span>
								</div>
								<div className="flex items-center gap-2">
									<MapPin className="w-4 h-4" />
									<span>
										{application.jobPosting?.location ||
											"Location not specified"}
									</span>
								</div>
							</div>
						</div>
						<div className="flex items-center gap-3">
							{application.status === "pending" && (
								<>
									<button
										onClick={() => handleStatusUpdate("accepted")}
										disabled={isUpdating || application.status === "accepted"}
										className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium disabled:opacity-50"
									>
										<Check className="w-4 h-4" />
										Accept
									</button>
									<button
										onClick={() => handleStatusUpdate("rejected")}
										disabled={isUpdating || application.status === "rejected"}
										className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium disabled:opacity-50"
									>
										<X className="w-4 h-4" />
										Reject
									</button>
								</>
							)}
						</div>
					</div>
				</div>

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

				<div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">
						Candidate Information
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-4">
							<div className="flex items-center gap-3">
								<User className="w-5 h-5 text-blue-600" />
								<div>
									<p className="text-sm text-gray-500">Full Name</p>
									<p className="font-medium text-gray-900">
										{application.jobSeeker?.user.firstName}{" "}
										{application.jobSeeker?.user.lastName}
									</p>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<Mail className="w-5 h-5 text-blue-600" />
								<div>
									<p className="text-sm text-gray-500">Email</p>
									<p className="font-medium text-gray-900">
										{application.jobSeeker?.user.email || "N/A"}
									</p>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<Phone className="w-5 h-5 text-blue-600" />
								<div>
									<p className="text-sm text-gray-500">Phone</p>
									<p className="font-medium text-gray-900">
										{application.jobSeeker?.user.phone || "N/A"}
									</p>
								</div>
							</div>
						</div>
						<div className="space-y-4">
							<div className="flex items-center gap-3">
								<MapPin className="w-5 h-5 text-blue-600" />
								<div>
									<p className="text-sm text-gray-500">Location</p>
									<p className="font-medium text-gray-900">
										{application.jobSeeker?.city +
											", " +
											application.jobSeeker?.address || "N/A"}
									</p>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<Calendar className="w-5 h-5 text-blue-600" />
								<div>
									<p className="text-sm text-gray-500">Date of Birth</p>
									<p className="font-medium text-gray-900">
										{application.jobSeeker?.dateOdBirth?.split("T")[0] || "N/A"}
									</p>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<Award className="w-5 h-5 text-blue-600" />
								<div>
									<p className="text-sm text-gray-500">Experience Level</p>
									<p className="font-medium text-gray-900">
										{application.jobSeeker?.experience + " year" || "N/A"}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{application.jobSeeker?.skills && (
					<div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
						<h3 className="text-lg font-semibold text-gray-900 mb-4">
							Candidate Skills
						</h3>
						<div className="flex flex-wrap gap-2">
							{application.jobSeeker.skills
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

				<div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">
						Job Details
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						<div className="flex items-center gap-3">
							<Briefcase className="w-5 h-5 text-blue-600" />
							<div>
								<p className="text-sm text-gray-500">Job Title</p>
								<p className="font-medium text-gray-900">
									{application.jobPosting?.title || "N/A"}
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
								<p className="text-sm text-gray-500">Job Type</p>
								<p className="font-medium text-gray-900">
									{application.jobPosting?.jobType || "N/A"}
								</p>
							</div>
						</div>
						<div className="flex items-center gap-3">
							<GraduationCap className="w-5 h-5 text-blue-600" />
							<div>
								<p className="text-sm text-gray-500">Education Level</p>
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

				<div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">
						Application Details
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<h4 className="font-medium text-gray-900 mb-2">Cover Letter</h4>
							<div className="bg-gray-50 rounded-lg p-4">
								<p className="text-gray-600 text-sm leading-relaxed">
									{application.coverLetter || "No cover letter provided"}
								</p>
							</div>
						</div>
						<div>
							<h4 className="font-medium text-gray-900 mb-2">Resume</h4>
							{application.resumeUrl && application.resumeUrl !== "/" ? (
								<div className="flex items-center gap-3">
									<div className="flex items-center gap-2 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg flex-1">
										<FileText className="w-5 h-5" />
										<span className="font-medium">Resume.pdf</span>
									</div>
									<a
										href={application.resumeUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
									>
										<Download className="w-4 h-4" />
										Download
									</a>
								</div>
							) : (
								<div className="flex items-center gap-2 px-4 py-3 bg-gray-50 text-gray-500 rounded-lg">
									<FileText className="w-5 h-5" />
									<span>No resume uploaded</span>
								</div>
							)}
						</div>
					</div>
				</div>

				<div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">
						Your Job Posting
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<h4 className="font-medium text-gray-900 mb-2">
								Job Description
							</h4>
							<div className="bg-gray-50 rounded-lg p-4">
								<p className="text-gray-600 text-sm leading-relaxed">
									{application.jobPosting?.description ||
										"No description provided"}
								</p>
							</div>
						</div>
						<div>
							<h4 className="font-medium text-gray-900 mb-2">Requirements</h4>
							<div className="bg-gray-50 rounded-lg p-4">
								<p className="text-gray-600 text-sm leading-relaxed">
									{application.jobPosting?.requirements ||
										"No requirements specified"}
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
					<div className="flex gap-3">
						<button
							onClick={handleContactCandidate}
							className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
						>
							<MessageCircle className="w-4 h-4" />
							Contact Candidate
						</button>

						{application.resumeUrl && application.resumeUrl !== "/" && (
							<a
								href={application.resumeUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium"
							>
								<ExternalLink className="w-4 h-4" />
								View Resume
							</a>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

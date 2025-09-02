"use client";
import { Button, Card, message } from "antd";
import { ArrowRight, Building2, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setItem } from "../../../helpers/localstorage";

const CompleteProfilePage = () => {
	const router = useRouter();
	const [selectedRole, setSelectedRole] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const handleRoleSelection = async (role: string) => {
		try {
			setLoading(true);
			setSelectedRole(role);
			setItem("selected_role", role);
			await new Promise((resolve) => setTimeout(resolve, 500));
			if (role === "jobseeker") {
				router.push("/complete-profile/jobseeker");
			} else if (role === "employer") {
				router.push("/complete-profile/employer");
			}
		} catch (error) {
			console.error("Role selection error:", error);
			message.error("Failed to select role. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="w-[100vw] h-[100vh] flex items-center justify-center bg-gray-50">
			<Card className="w-[600px] shadow-xl border-0">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">
						Complete Your Profile
					</h1>
					<p className="text-gray-600">
						Choose your role to continue setting up your account
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Card
						hoverable
						className={`cursor-pointer transition-all duration-300 ${
							selectedRole === "jobseeker"
								? "ring-2 ring-blue-500 bg-blue-50"
								: "hover:shadow-lg"
						}`}
						onClick={() => handleRoleSelection("jobseeker")}
					>
						<div className="text-center p-6">
							<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<User className="w-8 h-8 text-blue-600" />
							</div>
							<h3 className="text-xl font-semibold text-gray-900 mb-2">
								Job Seeker
							</h3>
							<p className="text-gray-600 mb-4">
								I'm looking for job opportunities and want to showcase my skills
							</p>
							<div className="space-y-2 text-sm text-gray-500">
								<p>• Create professional resume</p>
								<p>• Apply to job postings</p>
								<p>• Connect with employers</p>
								<p>• Get job recommendations</p>
							</div>
							<Button
								type={selectedRole === "jobseeker" ? "primary" : "default"}
								className="mt-4 w-full"
								loading={loading && selectedRole === "jobseeker"}
								icon={<ArrowRight className="w-4 h-4" />}
							>
								Continue as Job Seeker
							</Button>
						</div>
					</Card>

					<Card
						hoverable
						className={`cursor-pointer transition-all duration-300 ${
							selectedRole === "employer"
								? "ring-2 ring-green-500 bg-green-50"
								: "hover:shadow-lg"
						}`}
						onClick={() => handleRoleSelection("employer")}
					>
						<div className="text-center p-6">
							<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<Building2 className="w-8 h-8 text-green-600" />
							</div>
							<h3 className="text-xl font-semibold text-gray-900 mb-2">
								Employer
							</h3>
							<p className="text-gray-600 mb-4">
								I'm hiring and want to post jobs and find talented candidates
							</p>
							<div className="space-y-2 text-sm text-gray-500">
								<p>• Post job opportunities</p>
								<p>• Review applications</p>
								<p>• Find qualified candidates</p>
								<p>• Manage hiring process</p>
							</div>
							<Button
								type={selectedRole === "employer" ? "primary" : "default"}
								className="mt-4 w-full"
								loading={loading && selectedRole === "employer"}
								icon={<ArrowRight className="w-4 h-4" />}
							>
								Continue as Employer
							</Button>
						</div>
					</Card>
				</div>
			</Card>
		</div>
	);
};

export default CompleteProfilePage;

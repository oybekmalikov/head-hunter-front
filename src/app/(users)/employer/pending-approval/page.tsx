"use client";
import { Button, Card } from "antd";
import { Clock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

const PendingApprovalPage = () => {
	const router = useRouter();

	const handleGoToSignIn = () => {
		router.push("/sign-in");
	};

	return (
		<div className="w-[100vw] h-[100vh] flex items-center justify-center bg-gray-50">
			<Card className="w-[500px] shadow-xl border-0 text-center">
				<div className="py-8">
					<div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
						<Clock className="w-10 h-10 text-yellow-600" />
					</div>

					<h1 className="text-2xl font-bold text-gray-900 mb-4">
						Profile Under Review
					</h1>

					<p className="text-gray-600 mb-6 leading-relaxed">
						Thank you for submitting your employer profile! Our admin team is
						currently reviewing your application. You'll receive an email
						notification once your profile has been approved.
					</p>

					<div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
						<div className="flex items-start gap-3">
							<Mail className="w-5 h-5 text-blue-600 mt-0.5" />
							<div className="text-left">
								<h3 className="font-semibold text-blue-900 mb-1">
									What happens next?
								</h3>
								<ul className="text-sm text-blue-800 space-y-1">
									<li>• Admin will review your company information</li>
									<li>• You'll receive an approval email within 24-48 hours</li>
									<li>• Once approved, you can start posting jobs</li>
								</ul>
							</div>
						</div>
					</div>

					<div className="space-y-3">
						<Button
							type="primary"
							size="large"
							onClick={handleGoToSignIn}
							className="w-full"
						>
							Go to Sign In
						</Button>

						<p className="text-sm text-gray-500">
							You can sign in to check your approval status anytime
						</p>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default PendingApprovalPage;



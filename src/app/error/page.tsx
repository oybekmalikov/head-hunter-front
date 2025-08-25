"use client";

import { AlertTriangle, ArrowLeft, Home } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

function ErrorPage(): React.JSX.Element {
	const searchParams = useSearchParams();
	const router = useRouter();
	const message = searchParams.get("message");

	const getErrorContent = (message: string | null) => {
		switch (message) {
			case "access_denied":
				return {
					title: "Access Denied",
					description:
						"You don't have permission to access this page. Please contact your administrator if you believe this is an error.",
					icon: <AlertTriangle className="w-16 h-16 text-red-500" />,
					color: "text-red-600",
					bgColor: "bg-red-50",
					borderColor: "border-red-200",
				};
			case "unauthorized":
				return {
					title: "Unauthorized",
					description: "Please sign in to access this page.",
					icon: <AlertTriangle className="w-16 h-16 text-orange-500" />,
					color: "text-orange-600",
					bgColor: "bg-orange-50",
					borderColor: "border-orange-200",
				};
			default:
				return {
					title: "Something went wrong",
					description: "An unexpected error occurred. Please try again later.",
					icon: <AlertTriangle className="w-16 h-16 text-gray-500" />,
					color: "text-gray-600",
					bgColor: "bg-gray-50",
					borderColor: "border-gray-200",
				};
		}
	};

	const errorContent = getErrorContent(message);

	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
			<div className="max-w-md w-full">
				<div
					className={`${errorContent.bgColor} ${errorContent.borderColor} border rounded-2xl p-8 text-center`}
				>
					<div className="flex justify-center mb-6">{errorContent.icon}</div>

					<h1 className={`text-2xl font-bold ${errorContent.color} mb-4`}>
						{errorContent.title}
					</h1>

					<p className="text-gray-600 mb-8 leading-relaxed">
						{errorContent.description}
					</p>

					<div className="space-y-3">
						<button
							onClick={() => router.back()}
							className="w-full flex items-center justify-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-700 transition-colors"
						>
							<ArrowLeft className="w-5 h-5" />
							Go Back
						</button>

						<button
							onClick={() => router.push("/")}
							className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
						>
							<Home className="w-5 h-5" />
							Go Home
						</button>
					</div>
				</div>

				{message === "access_denied" && (
					<div className="mt-6 text-center">
						<p className="text-sm text-gray-500 mb-2">
							Need help? Contact support:
						</p>
						<a
							href="mailto:support@headhunter.com"
							className="text-blue-600 hover:text-blue-700 text-sm font-medium"
						>
							support@headhunter.com
						</a>
					</div>
				)}
			</div>
		</div>
	);
}

export default ErrorPage;

"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ChooseRolePage() {
	const router = useRouter();

	useEffect(() => {
		// Redirect to complete-profile page where users can choose their role
		router.push("/complete-profile");
	}, [router]);

	return (
		<div className="w-[100vw] h-[100vh] flex items-center justify-center">
			<div className="text-center">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
				<p className="text-gray-600">Redirecting...</p>
			</div>
		</div>
	);
}

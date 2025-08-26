"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "../../../components/shared/header";
import ApplicationsPage from "./applications/page";
import JobsPage from "./jobs/page";
import ResumePage from "./resume/page"

export default function JobseekerLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [activeTab, setActiveTab] = useState("jobs");
	const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		if (pathname.includes("/applications")) {
			setActiveTab("applications");
		} else if (pathname.includes("/jobs")) {
			setActiveTab("jobs");
		} else if (pathname.includes("/chats")) {
			setActiveTab("chats");
		} else if (pathname.includes("/profile")) {
			setActiveTab("profile");
		} else if (pathname.includes("/resume")) {
			setActiveTab("resume");
		}
	}, [pathname]);

	const renderContent = () => {
		const isDynamicRoute =
			pathname.includes("/applications/") &&
			pathname !== "/jobseeker/applications" &&
			pathname !== "/jobseeker/applications/";
		if (isDynamicRoute) {
			return children;
		}
		const isJobsRoute = pathname.includes("/jobs/") && pathname !== "/jobseeker/jobs" && pathname !== "/jobseeker/jobs/";
		if (isJobsRoute) {
			return children;
		}

		switch (activeTab) {
			case "jobs":
				return <JobsPage />;
			case "applications":
				return <ApplicationsPage />;
			case "chats":
				return (
					<div className="min-h-screen bg-gray-50 p-8">
						<h1 className="text-2xl font-bold text-gray-900 mb-6">Chats</h1>
						<p className="text-gray-600">
							Chat functionality will be implemented here
						</p>
					</div>
				);
			case "profile":
				return (
					<div className="min-h-screen bg-gray-50 p-8">
						<h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>
						<p className="text-gray-600">
							Profile management will be implemented here
						</p>
					</div>
				);
			case "resume":
				return <ResumePage />;
			default:
				return <JobsPage />;
		}
	};

	return (
		<div>
			<Header
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				isProfileDropdownOpen={isProfileDropdownOpen}
				setIsProfileDropdownOpen={setIsProfileDropdownOpen}
			/>
			{renderContent()}
		</div>
	);
}

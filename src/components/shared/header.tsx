"use client";
import { Bell, ChevronDown, FileText, LogOut, Settings, User } from "lucide-react";
import { Varela_Round } from "next/font/google";
import Image from "next/image";
import { useState } from "react";
import { authService } from "../../services/auth.service";
import { NotificationModal } from "./notification";
import { PopConfirm } from "./pop-confirm";

const varelaRound = Varela_Round({
	weight: ["400"],
	subsets: ["latin"],
	variable: "--font-varela-round",
});

const Header = ({
	activeTab,
	setActiveTab,
	isProfileDropdownOpen,
	setIsProfileDropdownOpen,
}: {
	activeTab: string;
	setActiveTab: (tab: string) => void;
	isProfileDropdownOpen: boolean;
	setIsProfileDropdownOpen: (open: boolean) => void;
}) => {
	const [isPopConfirmOpen, setIsPopConfirmOpen] = useState(false);
	const [isSigningOut, setIsSigningOut] = useState(false);
	const [isNotificationOpen, setIsNotificationOpen] = useState(false);

	const handleSignOut = async () => {
		try {
			setIsSigningOut(true);
			await authService.signOut();
		} catch (error) {
			console.error("Sign out error:", error);
		} finally {
			setIsSigningOut(false);
			setIsPopConfirmOpen(false);
		}
	};

	return (
		<header className="bg-white shadow-lg sticky top-0 z-50 border-b">
			<div className="max-w-7xl mx-auto px-6 py-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-4">
						<Image
							src="/logo.jpg"
							alt="logo"
							width={90}
							height={90}
							className="rounded-2xl"
						/>
						<div className="flex items-center mr-2">
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

					<div className="flex items-center gap-6">
						<div className="hidden md:flex items-center gap-1 bg-gray-100 rounded-2xl p-2">
							<button
								onClick={() => setActiveTab("jobs")}
								className={`px-6 py-3 rounded-xl font-semibold transition-all ${
									activeTab === "jobs"
										? "bg-white text-blue-600 shadow-lg"
										: "text-gray-600 hover:text-gray-900"
								}`}
							>
								Jobs
							</button>
							<button
								onClick={() => setActiveTab("applications")}
								className={`px-6 py-3 rounded-xl font-semibold transition-all ${
									activeTab === "applications"
										? "bg-white text-blue-600 shadow-lg"
										: "text-gray-600 hover:text-gray-900"
								}`}
							>
								Applications
							</button>
							<button
								onClick={() => setActiveTab("chats")}
								className={`px-6 py-3 rounded-xl font-semibold transition-all ${
									activeTab === "chats"
										? "bg-white text-blue-600 shadow-lg"
										: "text-gray-600 hover:text-gray-900"
								}`}
							>
								Chats
							</button>
						</div>

						<button
							onClick={() => setIsNotificationOpen(true)}
							className="relative p-3 text-gray-400 hover:text-gray-600 transition-colors hover:bg-gray-50 rounded-xl"
						>
							<Bell className="w-7 h-7" />
							<span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full"></span>
						</button>

						<div className="relative">
							<button
								onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
								className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-2xl transition-all"
							>
								<div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-lg font-semibold">
									K
								</div>
								<ChevronDown
									className={`w-5 h-5 text-gray-400 transition-transform ${
										isProfileDropdownOpen ? "rotate-180" : ""
									}`}
								/>
							</button>

							{isProfileDropdownOpen && (
								<div className="absolute right-0 top-full mt-3 w-56 bg-white rounded-2xl shadow-2xl border py-3 z-50">
									<button
										onClick={() => {
											setActiveTab("profile");
											setIsProfileDropdownOpen(false);
										}}
										className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-gray-50 text-gray-700 transition-colors"
									>
										<User className="w-5 h-5" />
										<span className="font-medium">Profile</span>
									</button>
									<button
										onClick={() => {
											setActiveTab("resume");
											setIsProfileDropdownOpen(false);
										}}
										className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-gray-50 text-gray-700 transition-colors"
									>
										<FileText className="w-5 h-5" />
										<span className="font-medium">Resume</span>
									</button>

									<hr className="my-3" />
									<button
										onClick={() => {
											setIsProfileDropdownOpen(false);
											setIsPopConfirmOpen(true);
										}}
										className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-red-50 text-red-600 transition-colors"
									>
										<LogOut className="w-5 h-5" />
										<span className="font-medium">Sign Out</span>
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Notification Modal */}
			<NotificationModal
				isOpen={isNotificationOpen}
				onClose={() => setIsNotificationOpen(false)}
			/>

			{/* Sign Out Confirmation */}
			<PopConfirm
				message="Are you sure you want to sign out?"
				onCancel={() => setIsPopConfirmOpen(false)}
				onConfirm={handleSignOut}
				PopConfirmOpen={isPopConfirmOpen}
				isLoading={isSigningOut}
			/>
		</header>
	);
};

export default Header;

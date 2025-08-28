"use client";
import { Save, User, X } from "lucide-react";
import { useState } from "react";

export default function ProfilePage() {
	const [isEditing, setIsEditing] = useState(false);
	const [profileData, setProfileData] = useState({
		firstName: "John",
		lastName: "Doe",
		email: "john.doe@example.com",
		phone: "+998 90 123 45 67",
		location: "Tashkent, Uzbekistan",
		bio: "Experienced software developer with 5+ years in web development. Passionate about creating user-friendly applications and solving complex problems.",
		skills: ["JavaScript", "React", "Node.js", "TypeScript", "Python"],
		experience: "5+ years",
		education: "Bachelor's in Computer Science",
	});

	const handleSave = () => {
		// Here you would typically save to the backend
		setIsEditing(false);
	};

	const handleCancel = () => {
		setIsEditing(false);
		// Reset to original data if needed
	};

	return (
		<div className="min-h-screen bg-gray-50 p-8">
			<div className="max-w-4xl mx-auto">
				<div className="bg-white rounded-2xl shadow-sm p-8">
					<div className="flex items-center justify-between mb-8">
						<div className="flex items-center gap-4">
							<div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
								{profileData.firstName[0]}
								{profileData.lastName[0]}
							</div>
							<div>
								<h1 className="text-3xl font-bold text-gray-900">Profile</h1>
								<p className="text-gray-600">
									Manage your professional information
								</p>
							</div>
						</div>
						<div className="flex gap-3">
							{isEditing ? (
								<>
									<button
										onClick={handleSave}
										className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
									>
										<Save className="w-4 h-4" />
										Save
									</button>
									<button
										onClick={handleCancel}
										className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
									>
										<X className="w-4 h-4" />
										Cancel
									</button>
								</>
							) : (
								<button
									onClick={() => setIsEditing(true)}
									className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
								>
									<User className="w-4 h-4" />
									Edit Profile
								</button>
							)}
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{/* Personal Information */}
						<div className="space-y-6">
							<h2 className="text-xl font-semibold text-gray-900">
								Personal Information
							</h2>

							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										First Name
									</label>
									{isEditing ? (
										<input
											type="text"
											value={profileData.firstName}
											onChange={(e) =>
												setProfileData({
													...profileData,
													firstName: e.target.value,
												})
											}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										/>
									) : (
										<p className="text-gray-900">{profileData.firstName}</p>
									)}
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Last Name
									</label>
									{isEditing ? (
										<input
											type="text"
											value={profileData.lastName}
											onChange={(e) =>
												setProfileData({
													...profileData,
													lastName: e.target.value,
												})
											}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										/>
									) : (
										<p className="text-gray-900">{profileData.lastName}</p>
									)}
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Email
									</label>
									<p className="text-gray-900">{profileData.email}</p>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Phone
									</label>
									{isEditing ? (
										<input
											type="tel"
											value={profileData.phone}
											onChange={(e) =>
												setProfileData({
													...profileData,
													phone: e.target.value,
												})
											}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										/>
									) : (
										<p className="text-gray-900">{profileData.phone}</p>
									)}
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Location
									</label>
									{isEditing ? (
										<input
											type="text"
											value={profileData.location}
											onChange={(e) =>
												setProfileData({
													...profileData,
													location: e.target.value,
												})
											}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										/>
									) : (
										<p className="text-gray-900">{profileData.location}</p>
									)}
								</div>
							</div>
						</div>

						{/* Professional Information */}
						<div className="space-y-6">
							<h2 className="text-xl font-semibold text-gray-900">
								Professional Information
							</h2>

							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Experience
									</label>
									<p className="text-gray-900">{profileData.experience}</p>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Education
									</label>
									<p className="text-gray-900">{profileData.education}</p>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Skills
									</label>
									<div className="flex flex-wrap gap-2">
										{profileData.skills.map((skill, index) => (
											<span
												key={index}
												className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-lg"
											>
												{skill}
											</span>
										))}
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Bio
									</label>
									{isEditing ? (
										<textarea
											value={profileData.bio}
											onChange={(e) =>
												setProfileData({ ...profileData, bio: e.target.value })
											}
											rows={4}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										/>
									) : (
										<p className="text-gray-900">{profileData.bio}</p>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

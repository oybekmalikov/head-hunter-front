"use client";
import { Button, DatePicker, Input, message, Select, Tabs, Upload } from "antd";
import dayjs from "dayjs";
import {
	Briefcase,
	Calendar,
	Camera,
	FileText,
	Globe,
	Lock,
	Mail,
	MapPin,
	Phone,
	Save,
	User,
	X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useJobSeekersGetProfile } from "../../../../hooks/useJobSeekers";
import { authService } from "../../../../services/auth.service";
import { jobSeekersService } from "../../../../services/job-seekers.service";
import { usersService } from "../../../../services/users.service";

const { Option } = Select;

interface ProfileData {
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
		isActive: boolean;
	};
}

export default function ProfilePage() {
	const [activeTab, setActiveTab] = useState("profile");
	const [isEditing, setIsEditing] = useState(false);
	const [isChangingPassword, setIsChangingPassword] = useState(false);
	const { data: profileDat } = useJobSeekersGetProfile();
	const [showPasswords, setShowPasswords] = useState({
		old: false,
		new: false,
		confirm: false,
	});
	const profileDatas = profileDat?.data || {};
	const [profileData, setProfileData] = useState<ProfileData>({
		id: profileDatas?.id || 0,
		userId: profileDatas?.userId || 0,
		dateOdBirth: profileDatas?.dateOdBirth || "",
		gender: profileDatas?.gender || "",
		address: profileDatas?.address || "",
		city: profileDatas?.city || "",
		githubUrl: profileDatas?.githubUrl || "",
		linkedIn: profileDatas?.linkedIn || "",
		resumeUrl: profileDatas?.resumeUrl || "",
		resumeFilename: profileDatas?.resumeFilename || "",
		summary: profileDatas?.summary || "",
		avgSalary: profileDatas?.avgSalary || 0,
		isOpenToWork: profileDatas?.isOpenToWork || false,
		experience: profileDatas?.experience || 0,
		user: {
			id: profileDatas?.user?.id || 0,
			firstName: profileDatas?.user?.firstName || "",
			lastName: profileDatas?.user?.lastName || "",
			email: profileDatas?.user?.email || "",
			phone: profileDatas?.user?.phone || "",
			role: profileDatas?.user?.role || "",
			avatarUrl: profileDatas?.user?.avatarUrl || "",
			isActive: profileDatas?.user?.isActive || false,
		},
	});

	const [passwordData, setPasswordData] = useState({
		oldPassword: "",
		newPassword: "",
		confirmPassword: "",
	});

	useEffect(() => {
		setProfileData(profileDatas);
	}, [profileDatas]);

	const handleUpdateProfile = async () => {
		try {
			jobSeekersService.updateJobSeeker(profileData);
			setIsEditing(false);
		} catch (error) {
			console.error("Profile update error:", error);
		}
	};

	const handleChangePassword = async () => {
		try {
			if (passwordData.newPassword !== passwordData.confirmPassword) {
				message.error("New passwords do not match!");
				return;
			}
			await authService.changePassword({
				oldPassword: passwordData.oldPassword,
				newPassword: passwordData.newPassword,
				confirmPassword: passwordData.confirmPassword,
			});

			setPasswordData({
				oldPassword: "",
				newPassword: "",
				confirmPassword: "",
			});
			setIsChangingPassword(false);
		} catch (error) {
			console.error("Password change error:", error);
		}
	};

	const handleAvatarUpload = async (file: any) => {
		try {
			const formData = new FormData();
			formData.append("avatar", file);
			const response = await usersService.uploadAvatar(formData);
			setProfileData({
				...profileData,
				user: {
					...profileData.user,
					avatarUrl: response.data?.avatarUrl,
				},
			});
			message.success("Avatar uploaded successfully!");
		} catch (error) {
			console.error("Avatar upload error:", error);
			message.error("Failed to upload avatar. Please try again.");
		}
		return false;
	};

	const formatSalary = (salary: number) => {
		return new Intl.NumberFormat("en-US").format(salary) + " UZS";
	};

	const formatDate = (dateString: string) => {
		return dayjs(dateString).format("MMMM DD, YYYY");
	};
	const profileTabItems = [
		{
			key: "profile",
			label: "Profile Information",
			children: (
				<div className="space-y-8">
					<div className="flex items-center gap-6">
						<div className="relative">
							<div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
								<img
									src={profileData.user?.avatarUrl}
									alt="avatar"
									className="w-full h-full object-cover"
								/>
							</div>
							<Upload
								beforeUpload={handleAvatarUpload}
								showUploadList={false}
								accept="image/*"
							>
								<Button
									icon={<Camera className="w-4 h-4" />}
									className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 flex items-center justify-center"
									size="small"
								></Button>
							</Upload>
						</div>
						<div>
							<h2 className="text-2xl font-bold text-gray-900">
								{profileData.user?.firstName} {profileData.user?.lastName}
							</h2>
							<p className="text-gray-600">{profileData.user?.email}</p>
							<div className="flex items-center gap-2 mt-2">
								<span
									className={`px-2 py-1 rounded-full text-xs font-medium ${
										profileData?.isOpenToWork
											? "bg-green-100 text-green-800"
											: "bg-gray-100 text-gray-800"
									}`}
								>
									{profileData?.isOpenToWork ? "Open to Work" : "Not Available"}
								</span>
							</div>
						</div>
					</div>

					<div className="flex gap-3">
						{isEditing ? (
							<>
								<Button
									type="primary"
									icon={<Save className="w-4 h-4" />}
									onClick={handleUpdateProfile}
								>
									Save Changes
								</Button>
								<Button
									icon={<X className="w-4 h-4" />}
									onClick={() => setIsEditing(false)}
								>
									Cancel
								</Button>
							</>
						) : (
							<Button
								type="primary"
								icon={<User className="w-4 h-4" />}
								onClick={() => setIsEditing(true)}
							>
								Edit Profile
							</Button>
						)}
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="space-y-6">
							<h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
								<User className="w-5 h-5 text-blue-600" />
								Personal Information
							</h3>

							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										First Name
									</label>

									<p className="text-gray-900 py-2">
										{profileData.user?.firstName}
									</p>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Last Name
									</label>

									<p className="text-gray-900 py-2">
										{profileData.user?.lastName}
									</p>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Email
									</label>
									<div className="flex items-center gap-2 text-gray-900 py-2">
										<Mail className="w-4 h-4 text-gray-400" />
										{profileData.user?.email}
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Phone
									</label>

									<div className="flex items-center gap-2 text-gray-900 py-2">
										<Phone className="w-4 h-4 text-gray-400" />
										{profileData.user?.phone}
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Date of Birth
									</label>
									{isEditing ? (
										<DatePicker
											value={dayjs(profileData.dateOdBirth)}
											onChange={(date) =>
												setProfileData({
													...profileData,
													dateOdBirth: date
														? date.toISOString()
														: profileData?.dateOdBirth,
												})
											}
											className="w-full"
											format="YYYY-MM-DD"
										/>
									) : (
										<div className="flex items-center gap-2 text-gray-900 py-2">
											<Calendar className="w-4 h-4 text-gray-400" />
											{formatDate(profileData?.dateOdBirth)}
										</div>
									)}
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Gender
									</label>
									<div className="flex items-center gap-2 text-gray-900 py-2">
										<User className="w-4 h-4 text-gray-400" />
										{profileData?.gender?.charAt(0).toUpperCase() +
											profileData?.gender?.slice(1)}
									</div>
								</div>
							</div>
						</div>

						{/* Location & Professional Information */}
						<div className="space-y-6">
							<h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
								<MapPin className="w-5 h-5 text-blue-600" />
								Location & Professional
							</h3>

							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Address
									</label>
									{isEditing ? (
										<Input
											value={profileData?.address}
											onChange={(e) =>
												setProfileData({
													...profileData,
													address: e.target.value,
												})
											}
											placeholder="Enter address"
											prefix={<MapPin className="w-4 h-4 text-gray-400" />}
										/>
									) : (
										<div className="flex items-center gap-2 text-gray-900 py-2">
											<MapPin className="w-4 h-4 text-gray-400" />
											{profileData?.address}
										</div>
									)}
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										City
									</label>
									{isEditing ? (
										<Input
											value={profileData?.city}
											onChange={(e) =>
												setProfileData({
													...profileData,
													city: e.target.value,
												})
											}
											placeholder="Enter city"
										/>
									) : (
										<p className="text-gray-900 py-2">{profileData?.city}</p>
									)}
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Experience
									</label>
									{isEditing ? (
										<Input
											type="number"
											value={profileData?.experience}
											onChange={(e) =>
												setProfileData({
													...profileData,
													experience: parseInt(e.target.value) || 0,
												})
											}
											placeholder="Years of experience"
											suffix="years"
										/>
									) : (
										<div className="flex items-center gap-2 text-gray-900 py-2">
											<Briefcase className="w-4 h-4 text-gray-400" />
											{profileData?.experience} years
										</div>
									)}
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Expected Salary
									</label>
									{isEditing ? (
										<Input
											type="number"
											value={profileData?.avgSalary}
											onChange={(e) =>
												setProfileData({
													...profileData,
													avgSalary: parseInt(e.target.value) || 0,
												})
											}
											placeholder="Expected salary"
											suffix="UZS"
										/>
									) : (
										<p className="text-gray-900 py-2">
											{formatSalary(profileData?.avgSalary)}
										</p>
									)}
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Open to Work
									</label>
									{isEditing ? (
										<Select
											value={profileData?.isOpenToWork}
											onChange={(value) =>
												setProfileData({
													...profileData,
													isOpenToWork: value,
												})
											}
											className="w-full"
										>
											<Option value={true}>Yes, I'm open to work</Option>
											<Option value={false}>No, I'm not available</Option>
										</Select>
									) : (
										<p className="text-gray-900 py-2">
											{profileData?.isOpenToWork
												? "Yes, open to work"
												: "Not available"}
										</p>
									)}
								</div>
							</div>
						</div>
					</div>

					{/* Social Links & Summary */}
					<div className="space-y-6">
						<h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
							<Globe className="w-5 h-5 text-blue-600" />
							Social Links & Summary
						</h3>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									GitHub URL
								</label>
								{isEditing ? (
									<Input
										value={profileData?.githubUrl}
										onChange={(e) =>
											setProfileData({
												...profileData,
												githubUrl: e.target.value,
											})
										}
										placeholder="https://github.com/username"
									/>
								) : (
									<a
										href={profileData?.githubUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="text-blue-600 hover:text-blue-800 py-2 block"
									>
										{profileData?.githubUrl}
									</a>
								)}
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									LinkedIn URL
								</label>
								{isEditing ? (
									<Input
										value={profileData.linkedIn}
										onChange={(e) =>
											setProfileData({
												...profileData,
												linkedIn: e.target.value,
											})
										}
										placeholder="https://linkedin.com/in/username"
									/>
								) : (
									<a
										href={profileData?.linkedIn}
										target="_blank"
										rel="noopener noreferrer"
										className="text-blue-600 hover:text-blue-800 py-2 block"
									>
										{profileData?.linkedIn}
									</a>
								)}
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Professional Summary
							</label>
							{isEditing ? (
								<Input.TextArea
									value={profileData?.summary}
									onChange={(e) =>
										setProfileData({
											...profileData,
											summary: e.target.value,
										})
									}
									placeholder="Tell us about yourself, your experience, and what you're looking for..."
									rows={4}
								/>
							) : (
								<p className="text-gray-900 py-2">{profileData?.summary}</p>
							)}
						</div>

						{/* Resume Section */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Resume
							</label>
							<div className="flex items-center gap-3">
								<FileText className="w-5 h-5 text-gray-400" />
								<a
									href={profileData.resumeUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-600 hover:text-blue-800"
								>
									{profileData?.resumeFilename}
								</a>
							</div>
						</div>
					</div>
				</div>
			),
		},
		{
			key: "security",
			label: "Security",
			children: (
				<div className="space-y-8">
					<div className="flex items-center gap-2 mb-6">
						<Lock className="w-5 h-5 text-blue-600" />
						<h3 className="text-lg font-semibold text-gray-900">
							Change Password
						</h3>
					</div>

					{isChangingPassword ? (
						<div className="space-y-6">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Current Password
								</label>
								<Input.Password
									value={passwordData.oldPassword}
									onChange={(e) =>
										setPasswordData({
											...passwordData,
											oldPassword: e.target.value,
										})
									}
									placeholder="Enter current password"
									visibilityToggle={{
										visible: showPasswords.old,
										onVisibleChange: (visible) =>
											setShowPasswords({
												...showPasswords,
												old: visible,
											}),
									}}
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									New Password
								</label>
								<Input.Password
									value={passwordData.newPassword}
									onChange={(e) =>
										setPasswordData({
											...passwordData,
											newPassword: e.target.value,
										})
									}
									placeholder="Enter new password"
									visibilityToggle={{
										visible: showPasswords.new,
										onVisibleChange: (visible) =>
											setShowPasswords({
												...showPasswords,
												new: visible,
											}),
									}}
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Confirm New Password
								</label>
								<Input.Password
									value={passwordData.confirmPassword}
									onChange={(e) =>
										setPasswordData({
											...passwordData,
											confirmPassword: e.target.value,
										})
									}
									placeholder="Confirm new password"
									visibilityToggle={{
										visible: showPasswords.confirm,
										onVisibleChange: (visible) =>
											setShowPasswords({
												...showPasswords,
												confirm: visible,
											}),
									}}
								/>
							</div>

							<div className="flex gap-3">
								<Button type="primary" onClick={handleChangePassword}>
									Change Password
								</Button>
								<Button
									onClick={() => {
										setIsChangingPassword(false);
										setPasswordData({
											oldPassword: "",
											newPassword: "",
											confirmPassword: "",
										});
									}}
								>
									Cancel
								</Button>
							</div>
						</div>
					) : (
						<div className="text-center py-8">
							<Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
							<h4 className="text-lg font-medium text-gray-900 mb-2">
								Change Your Password
							</h4>
							<p className="text-gray-600 mb-6">
								Keep your account secure by updating your password regularly
							</p>
							<Button
								type="primary"
								onClick={() => setIsChangingPassword(true)}
							>
								Change Password
							</Button>
						</div>
					)}
				</div>
			),
		},
	];

	return (
		<div className="min-h-screen bg-gray-50 p-8">
			<div className="max-w-6xl mx-auto">
				<div className="bg-white rounded-2xl shadow-sm">
					<div className="p-8">
						<div className="mb-8">
							<h1 className="text-3xl font-bold text-gray-900 mb-2">
								Profile Settings
							</h1>
							<p className="text-gray-600">
								Manage your personal information and account security
							</p>
						</div>

						<Tabs
							activeKey={activeTab}
							onChange={setActiveTab}
							items={profileTabItems}
							className="profile-tabs"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

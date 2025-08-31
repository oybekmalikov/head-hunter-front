"use client";

import { Edit, Save, X } from "lucide-react";
import { useState } from "react";
import { useJobSeeker } from "../../../../../hooks/useJobSeekers";

interface PersonalInfo {
	id: number;
	userId: number;
	dateOfBirth: string;
	gender: string;
	address: string;
	city: string;
	githubUrl: string;
	linkedIn: string;
	resumeUrl: string;
	resumeFilename: string | null;
	summary: string;
	avgSalary: number;
	isOpenToWork: boolean;
	experience: number;
}

export const PersonalInfoSection = ({ jobSeeker }: { jobSeeker: any }) => {
	const jobSeekerData = jobSeeker?.data||{};
	const { useJobSeekersUpdateJobSeeker } = useJobSeeker();
	const {mutate: updateJobSeeker,isPending:isLoading} = useJobSeekersUpdateJobSeeker();
	const [isEditing, setIsEditing] = useState(false);
	const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
		id: jobSeekerData.id||0,
		userId: jobSeekerData.userId||0,
		dateOfBirth: jobSeekerData.dateOfBirth?.split("T")[0]||"",
		gender: jobSeekerData.gender||"",
		address: jobSeekerData.address||"",
		city: jobSeekerData.city||"",
		githubUrl: jobSeekerData.githubUrl||"",
		linkedIn: jobSeekerData.linkedIn||"",
		resumeUrl: jobSeekerData.resumeUrl||"",
		resumeFilename: jobSeekerData.resumeFilename||null,
		summary: jobSeekerData.summary||"",
		avgSalary: jobSeekerData.avgSalary||0,
		isOpenToWork: jobSeekerData.isOpenToWork||false,
		experience: jobSeekerData.experience||0,
	});
	const [formData, setFormData] = useState<PersonalInfo>(personalInfo);


	const handleSave = () => {
		setPersonalInfo(formData);
		setIsEditing(false);
		updateJobSeeker(formData);
	};

	const handleCancel = () => {
		setFormData(personalInfo);
		setIsEditing(false);
	};
	return (
		<>
		{jobSeeker==undefined && <div>Loading...</div>}
		<div>
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-2xl font-bold text-gray-900">
					Personal Information
				</h2>
				{!isEditing ? (
					<button
						onClick={() => setIsEditing(true)}
						className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2"
					>
						<Edit className="w-4 h-4" />
						Edit
					</button>
				) : (
					<div className="flex gap-2">
						<button
						disabled={isLoading}
							onClick={handleSave}
							className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2"
						>
							<Save className="w-4 h-4" />
							Save
						</button>
						<button
							onClick={handleCancel}
							className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2"
						>
							<X className="w-4 h-4" />
							Cancel
						</button>
					</div>
				)}
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Date of Birth
					</label>
					{isEditing ? (
						<input
							type="date"
							value={formData.dateOfBirth}
							onChange={(e) =>
								setFormData({ ...formData, dateOfBirth: e.target.value })
							}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					) : (
						<p className="text-gray-900">
							{new Date(personalInfo.dateOfBirth).toLocaleDateString()}
						</p>
					)}
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Gender
					</label>
					{isEditing ? (
						<select
							value={formData.gender}
							onChange={(e) =>
								setFormData({ ...formData, gender: e.target.value })
							}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						>
							<option value="male">Male</option>
							<option value="female">Female</option>
							<option value="other">Other</option>
						</select>
					) : (
						<p className="text-gray-900 capitalize">{personalInfo.gender}</p>
					)}
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Address
					</label>
					{isEditing ? (
						<input
							type="text"
							value={formData.address}
							onChange={(e) =>
								setFormData({ ...formData, address: e.target.value })
							}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					) : (
						<p className="text-gray-900">{personalInfo.address}</p>
					)}
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						City
					</label>
					{isEditing ? (
						<input
							type="text"
							value={formData.city}
							onChange={(e) =>
								setFormData({ ...formData, city: e.target.value })
							}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					) : (
						<p className="text-gray-900">{personalInfo.city}</p>
					)}
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						GitHub URL
					</label>
					{isEditing ? (
						<input
							type="url"
							value={formData.githubUrl}
							onChange={(e) =>
								setFormData({ ...formData, githubUrl: e.target.value })
							}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					) : (
						<a
							href={personalInfo.githubUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-600 hover:underline"
						>
							{personalInfo.githubUrl}
						</a>
					)}
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						LinkedIn URL
					</label>
					{isEditing ? (
						<input
							type="url"
							value={formData.linkedIn}
							onChange={(e) =>
								setFormData({ ...formData, linkedIn: e.target.value })
							}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					) : (
						<a
							href={personalInfo.linkedIn}
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-600 hover:underline"
						>
							{personalInfo.linkedIn}
						</a>
					)}
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Average Salary (UZS)
					</label>
					{isEditing ? (
						<input
							type="number"
							value={formData.avgSalary}
							onChange={(e) =>
								setFormData({
									...formData,
									avgSalary: parseInt(e.target.value),
								})
							}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					) : (
						<p className="text-gray-900">
							{personalInfo.avgSalary.toLocaleString()} UZS
						</p>
					)}
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Years of Experience
					</label>
					{isEditing ? (
						<input
							type="number"
							value={formData.experience}
							onChange={(e) =>
								setFormData({
									...formData,
									experience: parseInt(e.target.value),
								})
							}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					) : (
						<p className="text-gray-900">{personalInfo.experience} years</p>
					)}
				</div>

				<div className="md:col-span-2">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Professional Summary
					</label>
					{isEditing ? (
						<textarea
							value={formData.summary}
							onChange={(e) =>
								setFormData({ ...formData, summary: e.target.value })
							}
							rows={4}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					) : (
						<p className="text-gray-900">{personalInfo.summary}</p>
					)}
				</div>

				<div className="md:col-span-2">
					<label className="flex items-center gap-2">
						<input
							type="checkbox"
							checked={formData.isOpenToWork}
							onChange={(e) =>
								setFormData({ ...formData, isOpenToWork: e.target.checked })
							}
							disabled={!isEditing}
							className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
						/>
						<span className="text-sm font-medium text-gray-700">
							Open to work opportunities
						</span>
					</label>
				</div>
			</div>
		</div>
		</>
	);
};

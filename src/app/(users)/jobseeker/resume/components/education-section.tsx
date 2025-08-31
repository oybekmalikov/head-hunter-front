"use client";

import {
	Calendar,
	Edit,
	GraduationCap,
	MapPin,
	Plus,
	Save,
	Trash2,
	X,
} from "lucide-react";
import { useState } from "react";
import { useEduCreateEdu, useEduDeleteEdu } from "../../../../../hooks/useEdu"

interface Education {
	id: number;
	universityName: string;
	faculty: string;
	dagree: string;
	startDate: string;
	endDate: string;
	isCurrent: boolean;
	description: string;
	jobSeekerId: number;
}

export const EducationSection = ({ jobSeeker }: { jobSeeker: any }) => {
	const jobSeekerData = jobSeeker?.data?.education || [];
	const { mutate: createEduMutation } = useEduCreateEdu();
	const { mutate: deleteEduMutation } = useEduDeleteEdu();
	const [educations, setEducations] = useState<Education[]>([
		...jobSeekerData.map((item: any) => ({
			id: item?.id,
			universityName: item?.universityName,
			faculty: item?.faculty,
			dagree: item?.dagree,
			startDate: item?.startDate,
			endDate: item?.endDate,
			isCurrent: item?.isCurrent,
			description: item?.description,
			jobSeekerId: item?.jobSeekerId,
		})),
	]);

	const [isAdding, setIsAdding] = useState(false);
	const [formData, setFormData] = useState<Omit<Education, "id">>({
		jobSeekerId: jobSeeker?.data?.id,
		universityName: "",
		faculty: "",
		dagree: "",
		startDate: "",
		endDate: "",
		isCurrent: false,
		description: "",
	});

	const degreeTypes = [
		"Bakalavr",
		"Magistr",
		"Doktorantura",
		"PhD",
		"Bachelor",
		"Master",
		"Doctorate",
		"Associate",
		"High School",
		"Other",
	];

	const handleAdd = () => {
		setIsAdding(true);
		setFormData({
			jobSeekerId: jobSeeker?.data?.id,
			universityName: "",
			faculty: "",
			dagree: "",
			startDate: "",
			endDate: "",
			isCurrent: false,
			description: "",
		});
	};

	const handleSave = () => {
		if (isAdding) {
			const newEducation: any = {
				jobSeekerId: jobSeeker?.data?.id,
				...formData,
			};
			createEduMutation(newEducation);
			console.log(newEducation);setEducations([...educations, newEducation]);
			setIsAdding(false);
		}
		};

	const handleCancel = () => {
		setIsAdding(false);
	};

	const handleDelete = (id: number) => {
		setEducations(educations.filter((edu) => edu.id !== id));
		deleteEduMutation(id);
	};

	const isFormValid =
		formData.universityName &&
		formData.faculty &&
		formData.dagree &&
		formData.startDate &&
		(formData.isCurrent || formData.endDate);

	return (
		<div>
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-2xl font-bold text-gray-900">Education</h2>
				<button
					onClick={handleAdd}
					className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2"
				>
					<Plus className="w-4 h-4" />
					Add Education
				</button>
			</div>
			{isAdding && (
				<div className="bg-gray-50 rounded-lg p-6 mb-6 border">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">
						{isAdding ? "Add New Education" : "Edit Education"}
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								University/Institution Name *
							</label>
							<input
								type="text"
								value={formData.universityName}
								onChange={(e) =>
									setFormData({ ...formData, universityName: e.target.value })
								}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								placeholder="e.g., TATU, MIT, Stanford"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Faculty/Field of Study *
							</label>
							<input
								type="text"
								value={formData.faculty}
								onChange={(e) =>
									setFormData({ ...formData, faculty: e.target.value })
								}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								placeholder="e.g., Information Safety, Computer Science"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Degree Type *
							</label>
							<select
								value={formData.dagree}
								onChange={(e) =>
									setFormData({ ...formData, dagree: e.target.value })
								}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							>
								<option value="">Select degree type</option>
								{degreeTypes.map((degree) => (
									<option key={degree} value={degree}>
										{degree}
									</option>
								))}
							</select>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Start Date *
							</label>
							<input
								type="date"
								value={formData.startDate}
								onChange={(e) =>
									setFormData({ ...formData, startDate: e.target.value })
								}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								End Date
							</label>
							<input
								type="date"
								value={formData.endDate}
								onChange={(e) =>
									setFormData({ ...formData, endDate: e.target.value })
								}
								disabled={formData.isCurrent}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
							/>
						</div>

						<div className="md:col-span-2">
							<label className="flex items-center gap-2 mb-4">
								<input
									type="checkbox"
									checked={formData.isCurrent}
									onChange={(e) =>
										setFormData({
											...formData,
											isCurrent: e.target.checked,
											endDate: "",
										})
									}
									className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
								/>
								<span className="text-sm font-medium text-gray-700">
									I am currently studying here
								</span>
							</label>
						</div>

						<div className="md:col-span-2">
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Additional Notes
							</label>
							<textarea
								value={formData.description}
								onChange={(e) =>
									setFormData({ ...formData, description: e.target.value })
								}
								rows={3}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								placeholder="Any additional information about your education..."
							/>
						</div>
					</div>

					<div className="flex gap-2 mt-4">
						<button
							onClick={handleSave}
							disabled={!isFormValid}
							className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2"
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
				</div>
			)}

			{/* Education List */}
			<div className="space-y-4">
				{educations.map((education) => (
					<div
						key={education.id}
						className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
					>
						<div className="flex items-start justify-between">
							<div className="flex-1">
								<div className="flex items-center gap-3 mb-2">
									<GraduationCap className="w-5 h-5 text-blue-600" />
									<h3 className="text-lg font-semibold text-gray-900">
										{education.universityName}
									</h3>
									{education.isCurrent && (
										<span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
											Current
										</span>
									)}
								</div>

								<div className="flex items-center gap-3 mb-3">
									<MapPin className="w-4 h-4 text-gray-500" />
									<p className="text-gray-700 font-medium">
										{education.faculty}
									</p>
								</div>

								<div className="flex items-center gap-3 mb-3">
									<GraduationCap className="w-4 h-4 text-gray-500" />
									<p className="text-gray-700 font-medium">
										{education.dagree}
									</p>
								</div>

								<div className="flex items-center gap-3 mb-4">
									<Calendar className="w-4 h-4 text-gray-500" />
									<p className="text-gray-600 text-sm">
										{new Date(education.startDate).toLocaleDateString()} -
										{education.isCurrent
											? " Present"
											: new Date(education.endDate).toLocaleDateString()}
									</p>
								</div>

								{education.description && (
									<p className="text-gray-700 text-sm leading-relaxed">
										{education.description}
									</p>
								)}
							</div>

							<div className="flex gap-2 ml-4">
								<button
									onClick={() => handleDelete(education.id)}
									className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-all"
								>
									<Trash2 className="w-4 h-4" />
								</button>
							</div>
						</div>
					</div>
				))}

				{educations.length === 0 && (
					<div className="text-center py-12 text-gray-500">
						<GraduationCap className="w-16 h-16 mx-auto mb-4 text-gray-300" />
						<p className="text-lg font-medium">No education added yet</p>
						<p className="text-sm">Click "Add Education" to get started</p>
					</div>
				)}
			</div>
		</div>
	);
};

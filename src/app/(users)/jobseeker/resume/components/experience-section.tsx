"use client";

import {
	Briefcase,
	Building,
	Calendar,
	Edit,
	Plus,
	Save,
	Trash2,
	X,
} from "lucide-react";
import { useState } from "react";
import { useWorkExperience } from "../../../../../hooks/useWorkExperience"

interface WorkExperience {
	id: number;
	jobSeekerId: number;
	companyName: string;
	position: string;
	startDate: string;
	endDate: string;
	isCurrent: boolean;
	description: string;
}

export const ExperienceSection = ({ jobSeeker }: { jobSeeker: any }) => {
	const jobSeekerData = jobSeeker?.data?.workExperience||[];
	const {useCreateWorkExperience,useUpdateWorkExperience,useDeleteWorkExperience} = useWorkExperience();
	const {mutate: createWorkExperience,isPending:isLoadingCreate} = useCreateWorkExperience();
	const {mutate: updateWorkExperience,isPending:isLoadingUpdate} = useUpdateWorkExperience();
	const {mutate: deleteWorkExperience,isPending:isLoadingDelete} = useDeleteWorkExperience();
	const [experiences, setExperiences] = useState<WorkExperience[]>([
		...jobSeekerData.map((item: any) => ({
			id: item.id,
			jobSeekerId: item.jobSeekerId,
			companyName: item.companyName,
			position: item.position,
			startDate: item.startDate,
			endDate: item.endDate,
			isCurrent: item.isCurrent,
			description: item.description,
		})),
	]);

	const [isAdding, setIsAdding] = useState(false);
	const [editingId, setEditingId] = useState<number | null>(null);
	const [formData, setFormData] = useState<
		Omit<WorkExperience, "jobSeekerId">
	>({
		id: 0,
		companyName: "",
		position: "",
		startDate: "",
		endDate: "",
		isCurrent: false,
		description: "",
	});

	const handleAdd = () => {
		setIsAdding(true);
		setFormData({
			id: 0,
			companyName: "",
			position: "",
			startDate: "",
			endDate: "",
			isCurrent: false,
			description: "",
		});
	};

	const handleEdit = (experience: WorkExperience) => {
		setEditingId(experience.id);
		setFormData({
			id: experience.id,
			companyName: experience.companyName,
			position: experience.position,
			startDate: experience.startDate,
			endDate: experience.endDate,
			isCurrent: experience.isCurrent,
			description: experience.description,
		});
	};

	const handleSave = () => {
		if (isAdding) {
			const newExperience: WorkExperience = {
				id: Date.now(),
				jobSeekerId: 1,
				...formData,
			};
			setExperiences([...experiences, newExperience]);
			setIsAdding(false);
			createWorkExperience(newExperience);
		} else if (editingId) {
			setEditingId(null);
			updateWorkExperience(formData);
		}
	};

	const handleCancel = () => {
		setIsAdding(false);
		setEditingId(null);
	};

	const handleDelete = (id: number) => {
		setExperiences(experiences.filter((exp) => exp.id !== id));
		deleteWorkExperience(id.toString());
	};

	const isFormValid =
		formData.companyName &&
		formData.position &&
		formData.startDate &&
		(formData.isCurrent || formData.endDate);

	return (
		<div>
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-2xl font-bold text-gray-900">Work Experience</h2>
				<button
					onClick={handleAdd}
					className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2"
				>
					<Plus className="w-4 h-4" />
					Add Experience
				</button>
			</div>

			{/* Add/Edit Form */}
			{(isAdding || editingId) && (
				<div className="bg-gray-50 rounded-lg p-6 mb-6 border">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">
						{isAdding ? "Add New Experience" : "Edit Experience"}
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Company Name *
							</label>
							<input
								type="text"
								value={formData.companyName}
								onChange={(e) =>
									setFormData({ ...formData, companyName: e.target.value })
								}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								placeholder="e.g., OpenAI"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Position *
							</label>
							<input
								type="text"
								value={formData.position}
								onChange={(e) =>
									setFormData({ ...formData, position: e.target.value })
								}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								placeholder="e.g., Software Engineer"
							/>
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
									I currently work here
								</span>
							</label>
						</div>

						<div className="md:col-span-2">
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Description
							</label>
							<textarea
								value={formData.description}
								onChange={(e) =>
									setFormData({ ...formData, description: e.target.value })
								}
								rows={3}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								placeholder="Describe your role and achievements..."
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

			{/* Experience List */}
			<div className="space-y-4">
				{experiences.map((experience) => (
					<div
						key={experience.id}
						className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
					>
						<div className="flex items-start justify-between">
							<div className="flex-1">
								<div className="flex items-center gap-3 mb-2">
									<Building className="w-5 h-5 text-blue-600" />
									<h3 className="text-lg font-semibold text-gray-900">
										{experience.companyName}
									</h3>
									{experience.isCurrent && (
										<span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
											Current
										</span>
									)}
								</div>

								<div className="flex items-center gap-3 mb-3">
									<Briefcase className="w-4 h-4 text-gray-500" />
									<p className="text-gray-700 font-medium">
										{experience.position}
									</p>
								</div>

								<div className="flex items-center gap-3 mb-4">
									<Calendar className="w-4 h-4 text-gray-500" />
									<p className="text-gray-600 text-sm">
										{new Date(experience.startDate).toLocaleDateString()} -
										{experience.isCurrent
											? " Present"
											: new Date(experience.endDate).toLocaleDateString()}
									</p>
								</div>

								{experience.description && (
									<p className="text-gray-700 text-sm leading-relaxed">
										{experience.description}
									</p>
								)}
							</div>

							<div className="flex gap-2 ml-4">
								<button
									onClick={() => handleEdit(experience)}
									className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-all"
								>
									<Edit className="w-4 h-4" />
								</button>
								<button
									onClick={() => handleDelete(experience.id)}
									className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-all"
								>
									<Trash2 className="w-4 h-4" />
								</button>
							</div>
						</div>
					</div>
				))}

				{experiences.length === 0 && (
					<div className="text-center py-12 text-gray-500">
						<Building className="w-16 h-16 mx-auto mb-4 text-gray-300" />
						<p className="text-lg font-medium">No work experience added yet</p>
						<p className="text-sm">Click "Add Experience" to get started</p>
					</div>
				)}
			</div>
		</div>
	);
};

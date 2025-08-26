"use client";

import { Code, Plus, Save, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useGetAllSkills } from "../../../../../hooks/useSkills";
import { useJobSeekerSkills } from "../../../../../hooks/useJobSeekerSkills"

interface Skill {
	id: number;
	degree: string;
	experience: number;
	jobSeekerId: number;
	skillId: number;
	skill: {
		id: number;
		name: string;
		description: string;
		categoryId: number;
	};
}

export const SkillsSection = ({ jobSeeker }: { jobSeeker: any }) => {
	const jobSeekerData = jobSeeker?.data?.skills || [];
	const { createJobSeekerSkill, deleteJobSeekerSkill } = useJobSeekerSkills();
	const { mutate: createJobSeekerSkillMutation } = createJobSeekerSkill();
	const { mutate: deleteJobSeekerSkillMutation } = deleteJobSeekerSkill();
	const { data: skillsData } = useGetAllSkills();
	const skillsDataList = skillsData?.data || [];
	const [skills, setSkills] = useState<Skill[]>([
		...jobSeekerData.map((item: any) => ({
			id: item?.id,
			degree: item?.degree,
			experience: item?.experience,
			jobSeekerId: item?.jobSeekerId,
			skillId: item?.skillId,
			skill: {
				id: item?.skill?.id,
				name: item?.skill?.name,
				description: item?.skill?.description,
			},
		})),
	]);
	const [isAdding, setIsAdding] = useState(false);
	const [formData, setFormData] = useState<
		Omit<Skill, "id" | "jobSeekerId" | "skillId" | "skill">
	>({
		degree: "junior",
		experience: 1,
	});

	const [skillName, setSkillName] = useState("");

	const skillLevels = [
		{
			value: "beginner",
			label: "Beginner",
			color: "bg-gray-100 text-gray-800",
		},
		{ value: "junior", label: "Junior", color: "bg-blue-100 text-blue-800" },
		{
			value: "middle",
			label: "Middle",
			color: "bg-yellow-100 text-yellow-800",
		},
		{ value: "senior", label: "Senior", color: "bg-green-100 text-green-800" },
	
	];

	const handleAdd = () => {
		setIsAdding(true);
		setFormData({
			degree: "junior",
			experience: 1,
		});
		setSkillName("");
	};

	const handleSave = () => {
		if (isAdding) {
			const newSkill: any = {
				jobSeekerId: jobSeeker?.data?.id,
				skillId: +skillName,
				degree: formData.degree,
				experience: formData.experience,
			};
			createJobSeekerSkillMutation(newSkill);
			setSkills([...skills, newSkill]);
			setIsAdding(false);
		}
	};

	const handleCancel = () => {
		setIsAdding(false);
	};

	const handleDelete = (id: number) => {
		setSkills(skills.filter((skill) => skill.id !== id));
		deleteJobSeekerSkillMutation(id);
	};
	const getSkillLevelColor = (degree: string) => {
		return (
			skillLevels.find((level) => level.value === degree)?.color ||
			"bg-gray-100 text-gray-800"
		);
	};
	const getSkillLevelLabel = (degree: string) => {
		return (
			skillLevels.find((level) => level.value === degree)?.label || "Unknown"
		);
	};
	return (
		<div>
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-2xl font-bold text-gray-900">Skills & Expertise</h2>
				<button
					onClick={handleAdd}
					className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2"
				>
					<Plus className="w-4 h-4" />
					Add Skill
				</button>
			</div>

			{isAdding && (
				<div className="bg-gray-50 rounded-lg p-6 mb-6 border">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">
						{isAdding ? "Add New Skill" : "Edit Skill"}
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Skill Name *
							</label>
							<select	
								value={skillName}
								onChange={(e) => setSkillName(e.target.value)}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							>
							{skillsDataList?.map((skill: any) => (
								<option key={skill.id} value={skill.id}>
									{skill.name}
								</option>
							))}
							</select>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Proficiency Level *
							</label>
							<select
								value={formData.degree}
								onChange={(e) =>
									setFormData({ ...formData, degree: e.target.value })
								}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							>
								{skillLevels.map((level) => (
									<option key={level.value} value={level.value}>
										{level.label}
									</option>
								))}
							</select>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Years of Experience *
							</label>
							<input
								type="number"
								min="0"
								max="50"
								value={formData.experience}
								onChange={(e) =>
									setFormData({
										...formData,
										experience: parseInt(e.target.value) || 0,
									})
								}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
						</div>
					</div>

					<div className="flex gap-2 mt-4">
						<button
							onClick={handleSave}
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

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{skills.map((skill) => (
					<div
						key={skill.id}
						className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
					>
						<div className="flex items-start justify-between mb-4">
							<div className="flex items-center gap-3">
								<Code className="w-6 h-6 text-blue-600" />
								<h3 className="text-lg font-semibold text-gray-900">
									{skill.skill?.name}
								</h3>
							</div>
							<div className="flex gap-2">
								<button
									onClick={() => handleDelete(skill.id)}
									className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-all"
								>
									<Trash2 className="w-4 h-4" />
								</button>
							</div>
						</div>

						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<span className="text-sm text-gray-600">Level:</span>
								<span
									className={`px-3 py-1 rounded-full text-xs font-medium ${getSkillLevelColor(
										skill.degree
									)}`}
								>
									{getSkillLevelLabel(skill.degree)}
								</span>
							</div>

							<div className="flex items-center justify-between">
								<span className="text-sm text-gray-600">Experience:</span>
								<span className="text-sm font-medium text-gray-900">
									{skill.experience} {skill.experience === 1 ? "year" : "years"}
								</span>
							</div>

							{skill.skill?.description && (
								<div>
									<span className="text-sm text-gray-600">Description:</span>
									<p className="text-sm text-gray-700 mt-1 leading-relaxed">
										{skill.skill?.description}
									</p>
								</div>
							)}
						</div>
					</div>
				))}

				{skills.length === 0 && (
					<div className="md:col-span-2 lg:col-span-3 text-center py-12 text-gray-500">
						<Code className="w-16 h-16 mx-auto mb-4 text-gray-300" />
						<p className="text-lg font-medium">No skills added yet</p>
						<p className="text-sm">Click "Add Skill" to get started</p>
					</div>
				)}
			</div>
		</div>
	);
};

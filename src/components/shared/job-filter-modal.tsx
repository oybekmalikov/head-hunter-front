"use client";
import {
	Briefcase,
	Calendar,
	Clock,
	DollarSign,
	Filter,
	GraduationCap,
	MapPin,
	Star,
	X,
} from "lucide-react";
import { useState } from "react";

export interface JobFilters {
	search: string;
	category: number;
	jobType: string;
	location: string;
	salaryMin: number;
	salaryMax: number;
	experienceLevel: string;
	educationLevel: string;
	status: string;
	publishedFrom: string;
	publishedTo: string;
	skills: string[];
}

interface JobFilterModalProps {
	isOpen: boolean;
	onClose: () => void;
	onApplyFilters: (filters: JobFilters) => void;
	currentFilters: JobFilters;
}

const categories = [
	{
		id: 0,
		name: "All Categories",
	},
	{
		id: 1,
		name: "Backend Development",
	},
	{
		id: 2,
		name: "DevOps",
	},
	{
		id: 3,
		name: "Cybersecurity",
	},
	{
		id: 4,
		name: "Data Science",
	},
	{
		id: 5,
		name: "UI/UX Design",
	},
	{
		id: 6,
		name: "Mobile App Development",
	},
	{
		id: 7,
		name: "Frontend Developmenmt",
	},
	{
		id: 8,
		name: "FullStack Developmenmt",
	},
	{
		id: 9,
		name: "Node.js Developmenmt",
	},
	{
		id: 10,
		name: "React.js Developmenmt",
	},
];

const jobTypes = [
	"All Types",
	"Full-time",
	"Part-time",
	"Contract",
	"Internship",
];

const experienceLevels = ["All Levels", "Junior", "Middle", "Senior"];

const educationLevels = [
	"All Education",
	"Bachelor's Degree",
	"Magister's Degree",
	"Master's Degree",
	"PhD",
];

const statuses = ["All Status", "Active", "Inactive"];

const commonSkills = [
	"JavaScript",
	"TypeScript",
	"Node.js",
	"Express",
	"Nest.js",
	"Python",
	"Django",
	"Larevel",
	"Java",
	"Spring",
	"React",
	"Angular",
	"Vue",
	"Node",
	"Nest",
	"Php",
	"Golang",
	".NET",
	"KOtlin",
	"Swift",
	"Numpy",
	"Tanserflow",
];

export const JobFilterModal = ({
	isOpen,
	onClose,
	onApplyFilters,
	currentFilters,
}: JobFilterModalProps) => {
	const [filters, setFilters] = useState<JobFilters>(currentFilters);
	const [selectedSkills, setSelectedSkills] = useState<string[]>(
		currentFilters.skills || []
	);

	const handleInputChange = (
		field: keyof JobFilters,
		value: string | number
	) => {
		setFilters((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleSkillToggle = (skill: string) => {
		setSelectedSkills((prev) =>
			prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
		);
	};

	const handleApplyFilters = () => {
		onApplyFilters({
			...filters,
			skills: selectedSkills,
		});
		onClose();
	};

	const handleResetFilters = () => {
		const resetFilters: JobFilters = {
			search: "",
			category: 0,
			jobType: "",
			location: "",
			salaryMin: 0,
			salaryMax: 0,
			experienceLevel: "",
			educationLevel: "",
			status: "",
			publishedFrom: "",
			publishedTo: "",
			skills: [],
		};
		setFilters(resetFilters);
		setSelectedSkills([]);
	};

	const handleClearFilters = () => {
		handleResetFilters();
		onApplyFilters({
			search: "",
			category: 0,
			jobType: "",
			location: "",
			salaryMin: 0,
			salaryMax: 0,
			experienceLevel: "",
			educationLevel: "",
			status: "",
			publishedFrom: "",
			publishedTo: "",
			skills: [],
		});
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 bg-transparent bg-opacity-10 backdrop-blur-[1px] flex items-center justify-center z-50 p-4 transition-all duration-300
		"
		>
			<div
				className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-200 transform transition-all duration-300 scale-100
			[&::-webkit-scrollbar]:hidden
			"
			>
				<div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="p-2 bg-blue-100 rounded-lg">
								<Filter className="w-6 h-6 text-blue-600" />
							</div>
							<div>
								<h2 className="text-xl font-bold text-gray-900">Job Filters</h2>
								<p className="text-sm text-gray-600">Refine your job search</p>
							</div>
						</div>
						<button
							onClick={onClose}
							className="p-2 hover:bg-gray-100 rounded-lg transition-colors hover:scale-105"
						>
							<X className="w-5 h-5 text-gray-500" />
						</button>
					</div>
				</div>
				<div className="p-6 space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-2">
							<label className="flex items-center gap-2 text-sm font-medium text-gray-700">
								<Briefcase className="w-4 h-4" />
								Category
							</label>
							<select
								value={filters.category}
								onChange={(e) => handleInputChange("category", e.target.value)}
								className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							>
								{categories.map((category: any) => (
									<option
										key={category.id}
										value={
											category.name === "All Categories" ? "" : category.id
										}
									>
										{category.name}
									</option>
								))}
							</select>
						</div>

						<div className="space-y-2">
							<label className="flex items-center gap-2 text-sm font-medium text-gray-700">
								<Clock className="w-4 h-4" />
								Job Type
							</label>
							<select
								value={filters.jobType}
								onChange={(e) => handleInputChange("jobType", e.target.value)}
								className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							>
								{jobTypes.map((type) => (
									<option key={type} value={type === "All Types" ? "" : type}>
										{type}
									</option>
								))}
							</select>
						</div>
					</div>

					<div className="space-y-2">
						<label className="flex items-center gap-2 text-sm font-medium text-gray-700">
							<MapPin className="w-4 h-4" />
							Location
						</label>
						<input
							type="text"
							placeholder="Enter city, region, or remote"
							value={filters.location}
							onChange={(e) => handleInputChange("location", e.target.value)}
							className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					</div>

					<div className="space-y-2">
						<label className="flex items-center gap-2 text-sm font-medium text-gray-700">
							<DollarSign className="w-4 h-4" />
							Salary Range (so'm)
						</label>
						<div className="grid grid-cols-2 gap-4">
							<input
								type="number"
								placeholder="Min salary"
								value={filters.salaryMin || ""}
								onChange={(e) =>
									handleInputChange("salaryMin", Number(e.target.value) || 0)
								}
								className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
							<input
								type="number"
								placeholder="Max salary"
								value={filters.salaryMax || ""}
								onChange={(e) =>
									handleInputChange("salaryMax", Number(e.target.value) || 0)
								}
								className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-2">
							<label className="flex items-center gap-2 text-sm font-medium text-gray-700">
								<Star className="w-4 h-4" />
								Experience Level
							</label>
							<select
								value={filters.experienceLevel}
								onChange={(e) =>
									handleInputChange("experienceLevel", e.target.value)
								}
								className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							>
								{experienceLevels.map((level) => (
									<option
										key={level}
										value={level === "All Levels" ? "" : level}
									>
										{level}
									</option>
								))}
							</select>
						</div>

						<div className="space-y-2">
							<label className="flex items-center gap-2 text-sm font-medium text-gray-700">
								<GraduationCap className="w-4 h-4" />
								Education Level
							</label>
							<select
								value={filters.educationLevel}
								onChange={(e) =>
									handleInputChange("educationLevel", e.target.value)
								}
								className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							>
								{educationLevels.map((level) => (
									<option
										key={level}
										value={level === "All Education" ? "" : level}
									>
										{level}
									</option>
								))}
							</select>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-2">
							<label className="flex items-center gap-2 text-sm font-medium text-gray-700">
								<Briefcase className="w-4 h-4" />
								Status
							</label>
							<select
								value={filters.status}
								onChange={(e) => handleInputChange("status", e.target.value)}
								className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							>
								{statuses.map((status) => (
									<option
										key={status}
										value={status === "All Status" ? "" : status}
									>
										{status}
									</option>
								))}
							</select>
						</div>

						<div className="space-y-2">
							<label className="flex items-center gap-2 text-sm font-medium text-gray-700">
								<Calendar className="w-4 h-4" />
								Published Date Range
							</label>
							<div className="grid grid-cols-2 gap-4">
								<input
									type="date"
									value={filters.publishedFrom}
									onChange={(e) =>
										handleInputChange("publishedFrom", e.target.value)
									}
									className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
								<input
									type="date"
									value={filters.publishedTo}
									onChange={(e) =>
										handleInputChange("publishedTo", e.target.value)
									}
									className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>
						</div>
					</div>

					<div className="space-y-3">
						<label className="flex items-center gap-2 text-sm font-medium text-gray-700">
							<Star className="w-4 h-4" />
							Required Skills
						</label>
						<div className="border border-gray-300 rounded-xl p-4 max-h-40 overflow-y-auto">
							<div className="flex flex-wrap gap-2">
								{commonSkills.map((skill) => (
									<button
										key={skill}
										onClick={() => handleSkillToggle(skill)}
										className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
											selectedSkills.includes(skill)
												? "bg-blue-600 text-white"
												: "bg-gray-100 text-gray-700 hover:bg-gray-200"
										}`}
									>
										{skill}
									</button>
								))}
							</div>
						</div>
						{selectedSkills.length > 0 && (
							<div className="text-sm text-gray-600">
								Selected: {selectedSkills.join(", ")}
							</div>
						)}
					</div>
				</div>

				<div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-2xl">
					<div className="flex items-center justify-between">
						<div className="flex gap-3">
							<button
								onClick={handleResetFilters}
								className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
							>
								Reset
							</button>
							<button
								onClick={handleClearFilters}
								className="px-4 py-2 text-red-600 hover:text-red-800 transition-colors"
							>
								Clear All
							</button>
						</div>
						<div className="flex gap-3">
							<button
								onClick={onClose}
								className="px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
							>
								Cancel
							</button>
							<button
								onClick={handleApplyFilters}
								className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
							>
								Apply Filters
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

"use client";

import { useState } from "react";
import { EducationSection } from "./education-section";
import { ExperienceSection } from "./experience-section";
import { PersonalInfoSection } from "./personal-info-section";
import { ResumeUploadSection } from "./resume-upload-section";
import { SkillsSection } from "./skills-section";
import { Building2, File, GraduationCap, User, Wrench } from "lucide-react";
import { useJobSeekersGetProfile } from "../../../../../hooks/useJobSeekers";

export const ResumeManager = () => {
	const [activeTab, setActiveTab] = useState("personal");
	const { data: jobSeeker } = useJobSeekersGetProfile();
	const tabs = [
		{ id: "personal", label: "Personal Info", icon: <User /> },
		{ id: "experience", label: "Experience", icon: <Building2 /> },
		{ id: "skills", label: "Skills", icon: <Wrench /> },
		{ id: "education", label: "Education", icon: <GraduationCap /> },
		{ id: "upload", label: "Resume Upload", icon: <File /> },
	];

	return (
		<div className="bg-white rounded-2xl shadow-lg overflow-hidden">
			<div className="bg-gray-50 border-b">
				<div className="flex overflow-x-auto">
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all whitespace-nowrap ${
								activeTab === tab.id
									? "bg-white text-blue-600 border-b-2 border-blue-600"
									: "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
							}`}
						>
							<span className="text-lg">{tab.icon}</span>
							{tab.label}
						</button>
					))}
				</div>
			</div>
			<div className="p-8">
				{activeTab === "personal" && <PersonalInfoSection jobSeeker={jobSeeker} />}
				{activeTab === "experience" && <ExperienceSection jobSeeker={jobSeeker} />}
				{activeTab === "skills" && <SkillsSection jobSeeker={jobSeeker} />}
				{activeTab === "education" && <EducationSection jobSeeker={jobSeeker} />}
				{activeTab === "upload" && <ResumeUploadSection jobSeeker={jobSeeker} />}
			</div>
		</div>
	);
};

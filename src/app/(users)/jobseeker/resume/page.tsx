"use client";

import { Button } from "antd";
import { Eye, Upload } from "lucide-react";
import { useState } from "react";
import {
	useJobSeeker,
	useJobSeekersGetJobSeekerPostings,
	useJobSeekersGetProfile,
} from "../../../../hooks/useJobSeekers";
import { ResumeManager } from "./components/resume-manager";
import { ResumePreviewModal } from "./components/resume-preview-modal";

export default function ResumePage() {
	const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
	const { data: jobSeeker } = useJobSeekersGetProfile();
	const { data: jobSeekerPostings } = useJobSeekersGetJobSeekerPostings(
		jobSeeker?.data?.id
	);
	const { useJobSeekersCreateJobSeekerPosting } = useJobSeeker();
	const { mutate: createJobSeekerPosting } =
		useJobSeekersCreateJobSeekerPosting();

	const handleUploadResume = (jobSeeker) => {
		createJobSeekerPosting({
			jobSeekerId: jobSeeker.id,
			city: jobSeeker.city,
			salary: jobSeeker.avgSalary,
			timeForApply: `${jobSeeker.experience}`,
			target: jobSeeker.summary,
		});
	};
	return (
		<div className="min-h-screen bg-gray-50 p-8">
			<div className="max-w-6xl mx-auto">
				<div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
					<div className="flex items-center justify-between mb-6">
						<div>
							<h1 className="text-3xl font-bold text-gray-900 mb-2">
								Resume Management
							</h1>
							<p className="text-gray-600">
								Manage your professional experience, skills, and education
							</p>
						</div>
						<div className="flex items-center gap-3">
							<div className="flex flex-col items-center gap-3 mt-9">
								<Button
									type="primary"
									className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all"
									onClick={() => handleUploadResume(jobSeeker?.data)}
									disabled={jobSeekerPostings?.data?.length > 0}
								>
									<Upload className="w-5 h-5" />
									Upload Resume
								</Button>
								{jobSeekerPostings?.data?.length > 0 && (
									<span className="text-sm text-green-600">Resume uploaded</span>
								)}
							</div>

							<Button
								type="primary"
								onClick={() => setIsPreviewModalOpen(true)}
								className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2"
							>
								<Eye className="w-5 h-5" />
								Preview Resume
							</Button>
						</div>
					</div>
				</div>

				<ResumeManager />

				<ResumePreviewModal
					isOpen={isPreviewModalOpen}
					onClose={() => setIsPreviewModalOpen(false)}
					jobSeekerData={jobSeeker?.data}
				/>
			</div>
		</div>
	);
}

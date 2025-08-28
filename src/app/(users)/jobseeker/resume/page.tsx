"use client";

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
	const { mutate: createJobSeekerPosting } = useJobSeekersCreateJobSeekerPosting();
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
							<button
								disabled={jobSeekerPostings?.data?.length > 0}
								type="button"
								className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2"
								onClick={() => createJobSeekerPosting({
									jobSeekerId: jobSeeker?.data?.id,
									postingId: jobSeekerPostings?.data?.id,
								})}
							>
								<Upload className="w-5 h-5" />
								Upload Resume
							</button>
							<button
								onClick={() => setIsPreviewModalOpen(true)}
								className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2"
							>
								<Eye className="w-5 h-5" />
								Preview Resume
							</button>
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

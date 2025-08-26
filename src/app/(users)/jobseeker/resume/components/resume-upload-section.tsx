"use client";

import { Download, Eye, EyeOff, FileText, Trash2, Upload } from "lucide-react";
import { useState } from "react";
import { useJobSeekersDeleteResume, useJobSeekersUploadResume } from "../../../../../hooks/useJobSeekers";

interface ResumeFile {
	id: number;
	filename: string;
	originalName: string;
	fileSize: number;
	uploadDate: string;
	fileType: string;
	url: string;
}

export const ResumeUploadSection = ({ jobSeeker }: { jobSeeker: any }) => {
	const { resumeUrl,resumeFilename,id } = jobSeeker?.data;
	const { mutate: createResumeMutation } = useJobSeekersUploadResume();
	const { mutate: deleteResumeMutation } = useJobSeekersDeleteResume();
	const [resumeFiles, setResumeFiles] = useState<ResumeFile[]>([
		{
			id: id,
			filename: `${resumeFilename}`,
			originalName: `${resumeFilename}`,
			fileSize: 245760,
			uploadDate: "2024-01-15",
			fileType: "pdf",
			url: `${resumeUrl}`,
		},
	]);

	const [isUploading, setIsUploading] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const allowedTypes = [
				"application/pdf",
				"application/msword",
				"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			];
			if (!allowedTypes.includes(file.type)) {
				alert("Please select a PDF or Word document file.");
				return;
			}

			if (file.size > 5 * 1024 * 1024) {
				alert("File size must be less than 5MB.");
				return;
			}

			setSelectedFile(file);
		}
	};

	const handleUpload = async () => {
		if (!selectedFile) return;
		createResumeMutation(selectedFile);
		setIsUploading(true);
		setUploadProgress(0);

		const interval = setInterval(() => {
			setUploadProgress((prev) => {
				if (prev >= 100) {
					clearInterval(interval);
					return 100;
				}
				return prev + 10;
			});
		}, 200);

		setTimeout(() => {
			const newResumeFile: ResumeFile = {
				id: Date.now(),
				filename: `resume_${Date.now()}.${selectedFile.name.split(".").pop()}`,
				originalName: selectedFile.name,
				fileSize: selectedFile.size,
				uploadDate: new Date().toISOString().split("T")[0],
				fileType: selectedFile.name.split(".").pop() || "pdf",
				url: URL.createObjectURL(selectedFile),
			};

			setResumeFiles([...resumeFiles, newResumeFile]);
			setSelectedFile(null);
			setIsUploading(false);
			setUploadProgress(0);
			clearInterval(interval);
		}, 2000);
	};

	const handleDelete = (id: number) => {
		deleteResumeMutation();
		setResumeFiles(resumeFiles.filter((file) => file.id !== id));
	};



	const formatFileSize = (bytes: number) => {
		if (bytes === 0) return "0 Bytes";
		const k = 1024;
		const sizes = ["Bytes", "KB", "MB", "GB"];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
	};

	const getFileIcon = (fileType: string) => {
		switch (fileType.toLowerCase()) {
			case "pdf":
				return "📄";
			case "doc":
			case "docx":
				return "📝";
			default:
				return "📁";
		}
	};

	return (
		<div>
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-2xl font-bold text-gray-900">Resume Files</h2>
			</div>

			<div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
				<h3 className="text-lg font-semibold text-blue-900 mb-4">
					Upload New Resume
				</h3>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<div>
						<label className="block text-sm font-medium text-blue-700 mb-2">
							Select File *
						</label>
						<input
							type="file"
							accept=".pdf,.doc,.docx"
							onChange={handleFileSelect}
							className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
						/>
						<p className="text-xs text-blue-600 mt-1">
							Supported formats: PDF, DOC, DOCX (Max size: 5MB)
						</p>
					</div>
				</div>

				{selectedFile && (
					<div className="bg-white rounded-lg p-4 mb-4 border border-blue-200">
						<div className="flex items-center gap-3">
							<span className="text-2xl">
								{getFileIcon(selectedFile.name.split(".").pop() || "")}
							</span>
							<div className="flex-1">
								<p className="font-medium text-gray-900">{selectedFile.name}</p>
								<p className="text-sm text-gray-600">
									{formatFileSize(selectedFile.size)}
								</p>
							</div>
						</div>
					</div>
				)}

				{isUploading && (
					<div className="mb-4">
						<div className="flex items-center justify-between mb-2">
							<span className="text-sm font-medium text-blue-700">
								Uploading...
							</span>
							<span className="text-sm text-blue-700">{uploadProgress}%</span>
						</div>
						<div className="w-full bg-blue-200 rounded-full h-2">
							<div
								className="bg-blue-600 h-2 rounded-full transition-all duration-300"
								style={{ width: `${uploadProgress}%` }}
							></div>
						</div>
					</div>
				)}

				<button
					onClick={handleUpload}
					disabled={!selectedFile || isUploading}
					className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg transition-all flex items-center gap-2"
				>
					<Upload className="w-4 h-4" />
					{isUploading ? "Uploading..." : "Upload Resume"}
				</button>
			</div>

			<div className="space-y-4">
				{resumeFiles.map((file) => (
					<div
						key={file.id}
						className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
					>
						<div className="flex items-start justify-between">
							<div className="flex-1">
								<div className="flex items-center gap-3 mb-3">
									<span className="text-3xl">{getFileIcon(file.fileType)}</span>
									<div>
										<h3 className="text-lg font-semibold text-gray-900">
											{file.originalName}
										</h3>
										<p className="text-sm text-gray-600">{file.filename}</p>
									</div>
									
								</div>

								<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
									<div>
										<span className="text-gray-600">File Size:</span>
										<p className="font-medium text-gray-900">
											{formatFileSize(file.fileSize)}
										</p>
									</div>
									<div>
										<span className="text-gray-600">Type:</span>
										<p className="font-medium text-gray-900 uppercase">
											{file.fileType}
										</p>
									</div>
									<div>
										<span className="text-gray-600">Uploaded:</span>
										<p className="font-medium text-gray-900">
											{new Date(file.uploadDate).toLocaleDateString()}
										</p>
									</div>
									<div>
										<span className="text-gray-600">Status:</span>
										<p className="font-medium text-gray-900">
											Visible to employers
										</p>
									</div>
								</div>
							</div>

							<div className="flex gap-2 ml-4">
								<button
									className={`p-2 rounded-lg transition-all ${
											"text-green-600 hover:text-green-700 hover:bg-green-50"
									}`}
									title={"Make Public"}
								>
									<Eye className="w-4 h-4" />
								</button>
								<a
									href={file.url}
									download={file.originalName}
									className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-all"
									title="Download"
								>
									<Download className="w-4 h-4" />
								</a>
								<button
									onClick={() => handleDelete(file.id)}
									className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-all"
									title="Delete"
								>
									<Trash2 className="w-4 h-4" />
								</button>
							</div>
						</div>
					</div>
				))}

				{resumeFiles.length === 0 && (
					<div className="text-center py-12 text-gray-500">
						<FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
						<p className="text-lg font-medium">No resume files uploaded yet</p>
						<p className="text-sm">Upload your resume to get started</p>
					</div>
				)}
			</div>

			<div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
				<h3 className="text-lg font-semibold text-yellow-900 mb-3">
					💡 Resume Tips
				</h3>
				<ul className="space-y-2 text-sm text-yellow-800">
					<li>
						• Keep your resume updated with your latest experience and skills
					</li>
					<li>• Use clear, professional language and avoid typos</li>
					<li>• Include quantifiable achievements when possible</li>
					<li>• Make sure your contact information is current</li>
					<li>• Consider having both a detailed and a concise version</li>
				</ul>
			</div>
		</div>
	);
};

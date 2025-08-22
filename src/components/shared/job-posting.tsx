import { getItem } from "../../helpers/localstorage";
import { useRouter } from "next/navigation"
import { CheckCircle, Eye, FileText, Heart, MapPin } from "lucide-react"

export const JobPostingCard = ({ job }: { job: any }) => {
	const router = useRouter();
	return (
		<div
		key={job.id}
		className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
		onClick={() => router.push(`${getItem("role")}/jobs/${job.id}`)}
	>
		<div className="flex items-start justify-between mb-4">
			<div className="flex-1">
				<h3 className="text-xl font-semibold text-gray-900 mb-2">
					{job.title}
				</h3>
				<p className="text-lg font-medium text-gray-800 mb-2">
					{job.salary}
				</p>
				<div className="flex gap-2 mb-3">
					{/* <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg">
						{job.experience}
					</span> */}
					{job.experience.split(",").map((exp: string) => (
						<span key={exp} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg">
							{exp}
						</span>
					))}
					<span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg">
						{job.payment}
					</span>
				</div>
				<div className="flex items-center gap-2 mb-2">
					<span className="font-medium text-gray-700">
						{job.company}
					</span>
					{job.verified && (
						<CheckCircle className="w-5 h-5 text-blue-600" />
					)}
				</div>
				<div className="flex items-center gap-2 text-gray-600">
					<MapPin className="w-4 h-4" />
					<span className="text-sm">{job.location}</span>
				</div>
			</div>
			<div className="flex gap-2">
				<button className="p-2 text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-2">
					<Eye className="w-5 h-5" />
					<span className="text-sm">{job.viewCount}</span>
				</button>
				<button className="p-2 text-gray-400 hover:text-red-500 transition-colors flex items-center gap-2">
					<FileText className="w-5 h-5" />
					<span className="text-sm">{job.applicationCount}</span>
				</button>
			</div>
		</div>
		<div className="flex gap-3">
			<button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
				Apply
			</button>
			<button className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors">
				Details
			</button>
		</div>
	</div>
	);
}

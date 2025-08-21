export default function DashboardPage() {
	return (
		<div className="min-h-screen bg-gray-50 p-8">
			<h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<div className="bg-white p-6 rounded-lg shadow">
					<h2 className="text-lg font-semibold text-gray-900 mb-2">
						Job Seeker
					</h2>
					<p className="text-gray-600 mb-4">
						Ish qidiruvchilar uchun dashboard
					</p>
					<a
						href="/dashboard/job-seeker"
						className="text-blue-600 hover:text-blue-800"
					>
						O'tish →
					</a>
				</div>
				<div className="bg-white p-6 rounded-lg shadow">
					<h2 className="text-lg font-semibold text-gray-900 mb-2">Employer</h2>
					<p className="text-gray-600 mb-4">Ish beruvchilar uchun dashboard</p>
					<a
						href="/dashboard/employer"
						className="text-blue-600 hover:text-blue-800"
					>
						O'tish →
					</a>
				</div>
			</div>
		</div>
	);
}

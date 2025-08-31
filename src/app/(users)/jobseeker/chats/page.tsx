"use client";
import { MessageCircle } from "lucide-react";

export default function ChatsPage() {
	return (
		<div className="min-h-screen bg-gray-50 p-8">
			<div className="max-w-7xl mx-auto">
				<div className="bg-white rounded-2xl shadow-sm p-8">
					<div className="text-center">
						<div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
							<MessageCircle className="w-10 h-10 text-blue-600" />
						</div>
						<h1 className="text-3xl font-bold text-gray-900 mb-4">Chats</h1>
						<p className="text-gray-600 text-lg max-w-2xl mx-auto">
							Connect with employers and discuss job opportunities through our
							secure messaging system.
						</p>
						<div className="mt-8 p-6 bg-gray-50 rounded-xl">
							<p className="text-gray-500">
								Chat functionality will be implemented here. You'll be able to:
							</p>
							<ul className="mt-4 space-y-2 text-left max-w-md mx-auto">
								<li className="flex items-center gap-2 text-gray-600">
									<span className="w-2 h-2 bg-blue-500 rounded-full"></span>
									Message employers about job applications
								</li>
								<li className="flex items-center gap-2 text-gray-600">
									<span className="w-2 h-2 bg-blue-500 rounded-full"></span>
									Schedule interviews and meetings
								</li>
								<li className="flex items-center gap-2 text-gray-600">
									<span className="w-2 h-2 bg-blue-500 rounded-full"></span>
									Discuss job requirements and details
								</li>
								<li className="flex items-center gap-2 text-gray-600">
									<span className="w-2 h-2 bg-blue-500 rounded-full"></span>
									Receive real-time notifications
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

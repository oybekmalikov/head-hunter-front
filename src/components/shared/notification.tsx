"use client";
import {
	AlertCircle,
	Bell,
	Calendar,
	CheckCircle,
	Clock,
	FileText,
	Info,
	MessageSquare,
	X,
} from "lucide-react";
import { useEffect, useState } from "react";
// import { getItem } from "../../helpers/localstorage"
// import { useGetJobNotificationsByJobSeekerId } from "../../hooks/useJobsNotifications"

interface Notification {
	id: string;
	type: "success" | "error" | "info" | "warning";
	title: string;
	message: string;
	timestamp: string;
	isRead: boolean;
	category: "application" | "message" | "system" | "reminder";
}

const mockNotifications: Notification[] = [
	{
		id: "1",
		type: "success",
		title: "Application Accepted!",
		message:
		"Your application for Senior Full Stack Developer at TechTrend Innovations has been accepted. The employer will contact you soon.",
		timestamp: "2 hours ago",
		isRead: false,
		category: "application",
	},
	{
		id: "2",
		type: "info",
		title: "New Message Received",
		message:
		"You have a new message from HR Manager at TechTrend Innovations regarding your application.",
		timestamp: "4 hours ago",
		isRead: false,
		category: "message",
	},
	{
		id: "3",
		type: "warning",
		title: "Application Deadline Reminder",
		message:
		"Don't forget! The application deadline for Data Scientist position at AI Solutions is tomorrow.",
		timestamp: "1 day ago",
		isRead: true,
		category: "reminder",
	},
	{
		id: "4",
		type: "info",
		title: "Profile Update Required",
		message:
		"Please update your profile information to increase your chances of getting hired.",
		timestamp: "2 days ago",
		isRead: true,
		category: "system",
	},
	{
		id: "5",
		type: "success",
		title: "Resume Downloaded",
		message: "Your resume was downloaded by 3 employers this week. Great job!",
		timestamp: "3 days ago",
		isRead: true,
		category: "system",
	},
	{
		id: "6",
		type: "error",
		title: "Application Rejected",
		message:
		"Unfortunately, your application for Frontend Developer position was not selected. Don't give up!",
		timestamp: "1 week ago",
		isRead: true,
		category: "application",
	},
];

interface NotificationModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const NotificationModal = ({
	isOpen,
	onClose,
}: NotificationModalProps) => {
	const [notifications, setNotifications] =
	useState<Notification[]>(mockNotifications);
	const [selectedCategory, setSelectedCategory] = useState<string>("all");
	const [unreadCount, setUnreadCount] = useState(0);
	// const userId=getItem("user_id")
	// const {data:notificationsData}=useGetJobNotificationsByJobSeekerId(userId)
	// console.log(notificationsData)
	
	useEffect(() => {
		const count = notifications.filter((n) => !n.isRead).length;
		setUnreadCount(count);
	}, [notifications]);

	const getTypeIcon = (type: string) => {
		switch (type) {
			case "success":
				return <CheckCircle className="w-5 h-5 text-green-500" />;
			case "error":
				return <AlertCircle className="w-5 h-5 text-red-500" />;
			case "warning":
				return <AlertCircle className="w-5 h-5 text-yellow-500" />;
			case "info":
				return <Info className="w-5 h-5 text-blue-500" />;
			default:
				return <Info className="w-5 h-5 text-gray-500" />;
		}
	};

	const getCategoryIcon = (category: string) => {
		switch (category) {
			case "application":
				return <FileText className="w-4 h-4" />;
			case "message":
				return <MessageSquare className="w-4 h-4" />;
			case "system":
				return <Info className="w-4 h-4" />;
			case "reminder":
				return <Calendar className="w-4 h-4" />;
			default:
				return <Info className="w-4 h-4" />;
		}
	};

	const getCategoryColor = (category: string) => {
		switch (category) {
			case "application":
				return "bg-blue-100 text-blue-800";
			case "message":
				return "bg-green-100 text-green-800";
			case "system":
				return "bg-purple-100 text-purple-800";
			case "reminder":
				return "bg-orange-100 text-orange-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const markAsRead = (id: string) => {
		setNotifications((prev) =>
			prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
		);
	};

	const markAllAsRead = () => {
		setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
	};

	const deleteNotification = (id: string) => {
		setNotifications((prev) => prev.filter((n) => n.id !== id));
	};

	const filteredNotifications =
		selectedCategory === "all"
			? notifications
			: notifications.filter((n) => n.category === selectedCategory);

	const categories = [
		{ id: "all", label: "All", count: notifications.length },
		{
			id: "application",
			label: "Applications",
			count: notifications.filter((n) => n.category === "application").length,
		},
		{
			id: "message",
			label: "Messages",
			count: notifications.filter((n) => n.category === "message").length,
		},
		{
			id: "system",
			label: "System",
			count: notifications.filter((n) => n.category === "system").length,
		},
		{
			id: "reminder",
			label: "Reminders",
			count: notifications.filter((n) => n.category === "reminder").length,
		},
	];

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-start pt-20 z-[9999]">
			<div className="bg-white rounded-2xl shadow-2xl border max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden">
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b border-gray-100">
					<div className="flex items-center gap-3">
						<Bell className="w-6 h-6 text-blue-600" />
						<h2 className="text-xl font-semibold text-gray-900">
							Notifications
						</h2>
						{unreadCount > 0 && (
							<span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
								{unreadCount}
							</span>
						)}
					</div>
					<div className="flex items-center gap-3">
						{unreadCount > 0 && (
							<button
								onClick={markAllAsRead}
								className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
							>
								Mark all as read
							</button>
						)}
						<button
							onClick={onClose}
							className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
						>
							<X className="w-5 h-5" />
						</button>
					</div>
				</div>

				{/* Category Tabs */}
				<div className="px-6 py-4 border-b border-gray-100">
					<div className="flex gap-2 overflow-x-auto">
						{categories.map((category) => (
							<button
								key={category.id}
								onClick={() => setSelectedCategory(category.id)}
								className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${
									selectedCategory === category.id
										? "bg-blue-600 text-white"
										: "bg-gray-100 text-gray-600 hover:bg-gray-200"
								}`}
							>
								{category.label}
								<span className="bg-white/20 px-2 py-1 rounded-full text-xs">
									{category.count}
								</span>
							</button>
						))}
					</div>
				</div>

				{/* Notifications List */}
				<div className="overflow-y-auto max-h-[60vh]">
					{filteredNotifications.length === 0 ? (
						<div className="text-center py-12">
							<Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
							<h3 className="text-lg font-semibold text-gray-600 mb-2">
								No notifications
							</h3>
							<p className="text-gray-500">You're all caught up!</p>
						</div>
					) : (
						<div className="divide-y divide-gray-100">
							{filteredNotifications.map((notification) => (
								<div
									key={notification.id}
									className={`p-6 hover:bg-gray-50 transition-colors ${
										!notification.isRead ? "bg-blue-50/50" : ""
									}`}
								>
									<div className="flex items-start gap-4">
										<div className="flex-shrink-0 mt-1">
											{getTypeIcon(notification.type)}
										</div>
										<div className="flex-1 min-w-0">
											<div className="flex items-center gap-3 mb-2">
												<h4 className="text-sm font-semibold text-gray-900">
													{notification.title}
												</h4>
												<span
													className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
														notification.category
													)}`}
												>
													{getCategoryIcon(notification.category)}
													<span className="ml-1">{notification.category}</span>
												</span>
												{!notification.isRead && (
													<span className="w-2 h-2 bg-blue-500 rounded-full"></span>
												)}
											</div>
											<p className="text-sm text-gray-600 mb-3">
												{notification.message}
											</p>
											<div className="flex items-center justify-between">
												<div className="flex items-center gap-2 text-xs text-gray-500">
													<Clock className="w-3 h-3" />
													{notification.timestamp}
												</div>
												<div className="flex items-center gap-2">
													{!notification.isRead && (
														<button
															onClick={() => markAsRead(notification.id)}
															className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
														>
															Mark as read
														</button>
													)}
													<button
														onClick={() => deleteNotification(notification.id)}
														className="text-xs text-red-600 hover:text-red-800 transition-colors"
													>
														Delete
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

"use client";

import {
	AlertTriangle,
	Home,
	RefreshCw,
	Server,
	Shield,
	Wifi,
} from "lucide-react";
import Link from "next/link";
import { Component, ComponentType, ReactNode, useEffect } from "react";

interface ErrorProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
	useEffect(() => {
		console.error("Error occurred:", error);
	}, [error]);

	const getErrorType = () => {
		if (error.message.includes("fetch") || error.message.includes("network")) {
			return "network";
		}
		if (error.message.includes("timeout")) {
			return "timeout";
		}
		if (
			error.message.includes("unauthorized") ||
			error.message.includes("403")
		) {
			return "unauthorized";
		}
		if (error.message.includes("server") || error.message.includes("500")) {
			return "server";
		}
		if (error.message.includes("access_denied")) {
			return "access_denied";
		}
		return "generic";
	};

	const errorType = getErrorType();

	const errorContent = {
		network: {
			icon: Wifi,
			title: "No internet connection",
			subtitle: "Check your internet connection and try again",
			color: "text-red-500",
		},
		timeout: {
			icon: RefreshCw,
			title: "Timeout",
			subtitle: "Server did not respond. Please try again later",
			color: "text-orange-500",
		},
		unauthorized: {
			icon: Shield,
			title: "Access denied",
			subtitle: "You need to login to access this page",
			color: "text-yellow-500",
		},
		server: {
			icon: Server,
			title: "Server error",
			subtitle: "There is a problem on our side. We will fix it soon",
			color: "text-purple-500",
		},
		generic: {
			icon: AlertTriangle,
			title: "Unexpected error",
			subtitle: "Something went wrong. Please try again",
			color: "text-red-500",
		},
		access_denied: {
			icon: Shield,
			title: "Access denied",
			subtitle: "You do not have permission to access this page",
			color: "text-red-500",
		},
	};

	const currentError = errorContent[errorType];
	const IconComponent = currentError.icon;

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-purple-700 flex flex-col">
			<header className="flex justify-between items-center p-5 md:px-10 bg-white/10 backdrop-blur-md">
				<Link
					href="/"
					className="flex items-center text-white text-xl font-semibold hover:opacity-80 transition-opacity"
				>
					<div className="bg-white text-blue-500 px-3 py-2 rounded-lg font-bold mr-3">
						hh
					</div>
					headhunter
				</Link>

				<div className="flex gap-4">
					<Link
						href="/signin"
						className="text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
					>
						SignIn
					</Link>
					<Link
						href="/signup"
						className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
					>
						SignUp
					</Link>
				</div>
			</header>

			<main className="flex-1 flex flex-col items-center justify-center text-center px-5">
				<div className={`mb-8 ${currentError.color}`}>
					<IconComponent size={120} className="animate-pulse" />
				</div>

				<h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
					{currentError.title}
				</h1>

				<p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl leading-relaxed">
					{currentError.subtitle}
				</p>

				{process.env.NODE_ENV === "development" && (
					<details className="mb-8 bg-black/20 rounded-lg p-4 text-left max-w-2xl w-full">
						<summary className="text-white cursor-pointer mb-2">
							Technical information (only in development)
						</summary>
						<pre className="text-red-300 text-sm overflow-auto">
							{error.message}
							{error.stack && "\n\n" + error.stack}
						</pre>
					</details>
				)}

				<div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mb-8 justify-center">
					<button
						onClick={reset}
						className="flex items-center justify-center gap-2 bg-yellow-400 text-gray-900 px-6 py-4 rounded-xl font-semibold hover:bg-yellow-300 hover:-translate-y-1 transition-all shadow-lg"
					>
						<RefreshCw size={20} />
						Retry
					</button>

					<Link
						href="/"
						className="flex items-center justify-center gap-2 border-2 border-white text-white px-6 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all"
					>
						<Home size={20} />
						Home
					</Link>
				</div>

				<div className="text-white/60 text-sm max-w-md">
					<p className="mb-2">If you need help, contact our support team:</p>
					<Link
						href="/support"
						className="text-yellow-400 hover:text-yellow-300 underline"
					>
						support@headhunter.com
					</Link>
				</div>
			</main>
		</div>
	);
}

// Specific Error Components

// 500 Internal Server Error
export function ServerError() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-red-500 via-red-600 to-red-700 flex flex-col items-center justify-center text-center px-5">
			<div className="text-white mb-8">
				<Server size={120} className="mx-auto mb-6 animate-pulse" />
				<h1 className="text-6xl font-bold mb-4">500</h1>
				<h2 className="text-3xl font-semibold mb-4">Server error</h2>
				<p className="text-lg opacity-80 max-w-md">Error occurred</p>
			</div>

			<div className="flex gap-4">
				<button
					onClick={() => window.location.reload()}
					className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
				>
					Refresh
				</button>
				<Link
					href="/"
					className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors"
				>
					Home
				</Link>
			</div>
		</div>
	);
}

// 403 Forbidden
export function ForbiddenError() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 flex flex-col items-center justify-center text-center px-5">
			<div className="text-white mb-8">
				<Shield size={120} className="mx-auto mb-6 animate-pulse" />
				<h1 className="text-6xl font-bold mb-4">403</h1>
				<h2 className="text-3xl font-semibold mb-4">Access denied</h2>
				<p className="text-lg opacity-80 max-w-md">
					You do not have permission to access this page. You need to login to
					access this page.
				</p>
			</div>

			<div className="flex gap-4">
				<Link
					href="/signin"
					className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
				>
					Login
				</Link>
				<Link
					href="/"
					className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors"
				>
					Home
				</Link>
			</div>
		</div>
	);
}

// Network Error Component
export function NetworkError({ onRetry }: { onRetry?: () => void }) {
	return (
		<div className="flex flex-col items-center justify-center py-12 text-center">
			<Wifi size={64} className="text-red-500 mb-4 animate-pulse" />
			<h3 className="text-xl font-semibold text-gray-800 mb-2">
				No internet connection
			</h3>
			<p className="text-gray-600 mb-6 max-w-md">
				Check your internet connection and try again
			</p>

			{onRetry && (
				<button
					onClick={onRetry}
					className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
				>
					<RefreshCw size={18} />
					Retry
				</button>
			)}
		</div>
	);
}

// Generic Error Boundary Component
export class ErrorBoundary extends Component<
	{
		children: ReactNode;
		fallback?: ComponentType<{ error: Error; reset: () => void }>;
	},
	{ hasError: boolean; error: Error | null }
> {
	constructor(props: any) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error) {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: any) {
		console.error("Error Boundary caught an error:", error, errorInfo);
	}

	render() {
		if (this.state.hasError && this.state.error) {
			const FallbackComponent = this.props.fallback || Error;
			return (
				<FallbackComponent
					error={this.state.error}
					reset={() => this.setState({ hasError: false, error: null })}
				/>
			);
		}

		return this.props.children;
	}
}

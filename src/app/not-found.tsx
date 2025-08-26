import { Briefcase, Home } from "lucide-react";
import { Varela_Round } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import LogOut from "../components/shared/log-out";

const varelaRound = Varela_Round({
	weight: ["400"],
	subsets: ["latin"],
});

export default function NotFound() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-purple-700 flex flex-col">
			<header className="flex justify-between items-center p-5 md:px-10 bg-white/10 backdrop-blur-md">
				<Link
					href="/"
					className="flex items-center text-white text-xl font-semibold hover:opacity-80 transition-opacity"
				>
					<div className="flex items-center">
						<Image
							src="/logo.jpg"
							alt="logo"
							width={96}
							height={96}
							className="p-[10px] w-[35%] rounded-[50px]"
						/>
						<div className="flex items-center mr-2 sm:flex">
							<span
								className={`text-3xl font-bold text-blue-100 ${varelaRound.className}`}
							>
								head
							</span>
							<span
								className={`text-3xl font-bold text-blue-100 ${varelaRound.className}`}
							>
								hunter
							</span>
						</div>
					</div>
				</Link>
				{/* <LogOut /> */}
			</header>
			<main className="flex-1 flex flex-col items-center justify-center text-center px-5">
				<div className="text-8xl md:text-9xl font-black text-yellow-400 mb-6 animate-bounce">
					404
				</div>

				<h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
					Page not found
				</h1>

				<p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl leading-relaxed">
					Sorry, the page you are looking for does not exist.
				</p>

				<div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
					<Link
						href="/"
						className="flex items-center justify-center gap-2 bg-yellow-400 text-gray-900 px-6 py-4 rounded-xl font-semibold hover:bg-yellow-300 hover:-translate-y-1 transition-all shadow-lg"
					>
						<Home size={20} />
						Go to home
					</Link>

					<Link
						href="/jobs"
						className="flex items-center justify-center gap-2 border-2 border-white text-white px-6 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all"
					>
						<Briefcase size={20} />
						View jobs
					</Link>
				</div>
			</main>

			<footer className="text-center py-6 text-white/60 text-sm">
				<p>&copy; 2025 HeadHunter. All rights reserved.</p>
			</footer>
		</div>
	);
}

"use client";
import HeaderEmployer from "../../../components/shared/header-employer";

export default function EmployerLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			<HeaderEmployer />
			{children}
		</div>
	);
}

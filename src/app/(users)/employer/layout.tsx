'use client';
import HeaderEmployer from '../../../components/shared/header-employer';

export default function JobseekerLayout({
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

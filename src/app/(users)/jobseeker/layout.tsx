import Header from "../../../components/shared/header";

export default function JobseekerLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			<Header />
			{children}
		</div>
	);
}

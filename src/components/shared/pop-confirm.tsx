import React from "react";

export const PopConfirm = ({
	message,
	onCancel,
	onConfirm,
	PopConfirmOpen,
	isLoading = false,
}: {
	message: string;
	onCancel: () => void;
	onConfirm: () => void;
	PopConfirmOpen: boolean;
	isLoading?: boolean;
}) => {
	if (!PopConfirmOpen) return null;

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget && !isLoading) {
			onCancel();
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Escape" && !isLoading) {
			onCancel();
		}
	};

	React.useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape" && !isLoading) {
				onCancel();
			}
		};

		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, [onCancel, isLoading]);

	return (
		<div
			className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-[9999]"
			onClick={handleBackdropClick}
			onKeyDown={handleKeyDown}
		>
			<div className="bg-white rounded-2xl shadow-2xl border max-w-md w-full mx-4 transform transition-all duration-200 scale-100">
				<div className="p-6">
					<div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
						<svg
							className="w-6 h-6 text-red-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
							/>
						</svg>
					</div>
					<p className="text-gray-600 text-center mb-6">{message}</p>

					<div className="flex gap-3">
						<button
							onClick={onCancel}
							disabled={isLoading}
							className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isLoading ? "Please wait..." : "Cancel"}
						</button>
						<button
							onClick={onConfirm}
							disabled={isLoading}
							className="flex-1 px-4 py-3 text-white bg-red-500 hover:bg-red-600 rounded-xl font-medium transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
						>
							{isLoading ? (
								<>
									<svg
										className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
										></circle>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										></path>
									</svg>
									Signing out...
								</>
							) : (
								"Confirm"
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

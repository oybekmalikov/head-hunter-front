export async function uploadImage(file: File): Promise<string> {
	// Image upload logic
	return "image-url";
}

export async function uploadDocument(file: File): Promise<string> {
	// Document upload logic
	return "document-url";
}

export function validateFile(
	file: File,
	maxSize: number = 5 * 1024 * 1024
): boolean {
	if (file.size > maxSize) {
		return false;
	}
	return true;
}

export function getFileExtension(filename: string): string {
	return filename.split(".").pop()?.toLowerCase() || "";
}

export const ALLOWED_IMAGE_TYPES = [
	"image/jpeg",
	"image/png",
	"image/gif",
	"image/webp",
];
export const ALLOWED_DOCUMENT_TYPES = [
	"application/pdf",
	"application/msword",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

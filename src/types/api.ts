export interface ApiResponse<T = any> {
	success: boolean;
	data?: T;
	message?: string;
	error?: string;
}

export interface PaginatedResponse<T> {
	data: T[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};
}

export interface SearchParams {
	query?: string;
	page?: number;
	limit?: number;
	filters?: Record<string, any>;
	sortBy?: string;
	sortOrder?: "asc" | "desc";
}

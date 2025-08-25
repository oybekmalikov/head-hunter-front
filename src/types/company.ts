export interface Company {
	id: string;
	name: string;
	description: string;
	industry: string;
	size: "startup" | "small" | "medium" | "large" | "enterprise";
	founded: number;
	website?: string;
	logo?: string;
	location: {
		city: string;
		country: string;
		address?: string;
	};
	contact: {
		email: string;
		phone?: string;
	};
	isVerified: boolean;
	employerId: string;
	createdAt: Date;
	updatedAt: Date;
}

import { ROLES } from "./constants";

export interface Permission {
	action: string;
	resource: string;
	roles: string[];
}

export const PERMISSIONS: Permission[] = [
	// Job permissions
	{
		action: "create",
		resource: "job",
		roles: [ROLES.EMPLOYER, ROLES.ADMIN, ROLES.SUPERADMIN],
	},
	{
		action: "read",
		resource: "job",
		roles: [ROLES.EMPLOYER, ROLES.JOBSEEKER, ROLES.ADMIN, ROLES.SUPERADMIN],
	},
	{
		action: "update",
		resource: "job",
		roles: [ROLES.EMPLOYER, ROLES.ADMIN, ROLES.SUPERADMIN],
	},
	{
		action: "delete",
		resource: "job",
		roles: [ROLES.EMPLOYER, ROLES.ADMIN, ROLES.SUPERADMIN],
	},

	// User permissions
	{ action: "read", resource: "user", roles: [ROLES.ADMIN, ROLES.SUPERADMIN] },
	{
		action: "update",
		resource: "user",
		roles: [ROLES.ADMIN, ROLES.SUPERADMIN],
	},
	{ action: "delete", resource: "user", roles: [ROLES.SUPERADMIN] },

	// Company permissions
	{
		action: "create",
		resource: "company",
		roles: [ROLES.EMPLOYER, ROLES.ADMIN, ROLES.SUPERADMIN],
	},
	{
		action: "read",
		resource: "company",
		roles: [ROLES.EMPLOYER, ROLES.JOBSEEKER, ROLES.ADMIN, ROLES.SUPERADMIN],
	},
	{
		action: "update",
		resource: "company",
		roles: [ROLES.EMPLOYER, ROLES.ADMIN, ROLES.SUPERADMIN],
	},
	{ action: "delete", resource: "company", roles: [ROLES.SUPERADMIN] },
];

export function hasPermission(
	userRole: string,
	action: string,
	resource: string
): boolean {
	const permission = PERMISSIONS.find(
		(p) => p.action === action && p.resource === resource
	);

	return permission ? permission.roles.includes(userRole) : false;
}

export function canAccessRoute(userRole: string, route: string): boolean {
	// Route access logic based on user role
	if (route.startsWith("/dashboard/superadmin")) {
		return userRole === ROLES.SUPERADMIN;
	}

	if (route.startsWith("/dashboard/admin")) {
		return [ROLES.ADMIN, ROLES.SUPERADMIN].includes(userRole as any);
	}

	if (route.startsWith("/dashboard/employer")) {
		return [ROLES.EMPLOYER, ROLES.ADMIN, ROLES.SUPERADMIN].includes(
			userRole as any
		);
	}

	if (route.startsWith("/dashboard/jobseeker")) {
		return [ROLES.JOBSEEKER, ROLES.ADMIN, ROLES.SUPERADMIN].includes(
			userRole as any
		);
	}

	return true;
}

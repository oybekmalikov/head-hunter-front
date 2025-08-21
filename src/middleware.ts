import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
	// Authentication middleware logic
	const token = request.cookies.get("token")?.value;
	const { pathname } = request.nextUrl;

	if (pathname.startsWith("/dashboard")) {
		// if (!token) {
		// 	return NextResponse.redirect(new URL("/sign-in", request.url));
		// }
	}

	if (
		pathname.startsWith("/dashboard/admin") ||
		pathname.startsWith("/dashboard/superadmin")
	) {
		// Check admin role
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard/:path*", "/api/:path*"],
};

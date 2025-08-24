import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const accessToken = request.cookies.get("access_token")?.value;
	const role = request.cookies.get("role")?.value;

	if (pathname === "/") {
		if (accessToken && role) {
			return NextResponse.redirect(new URL(`/${role}`, request.url));
		}
	}
	if (
		pathname.startsWith("/jobseeker") ||
		pathname.startsWith("/employer") ||
		pathname.startsWith("/admin")
	) {
		if (!accessToken) {
			return NextResponse.redirect(new URL("/sign-in", request.url));
		}

		if (pathname.startsWith("/jobseeker") && role !== "jobseeker") {
			return NextResponse.redirect(
				new URL("/error?message=access_denied", request.url)
			);
		}

		if (pathname.startsWith("/employer") && role !== "employer") {
			return NextResponse.redirect(
				new URL("/error?message=access_denied", request.url)
			);
		}

		if (pathname.startsWith("/admin") && role !== "admin") {
			return NextResponse.redirect(
				new URL("/error?message=access_denied", request.url)
			);
		}
	}

	if (pathname.startsWith("/dashboard")) {
		if (!accessToken) {
			return NextResponse.redirect(new URL("/sign-in", request.url));
		}

		// Super admin routes
		if (pathname.startsWith("/dashboard/superadmin") && role !== "superadmin") {
			return NextResponse.redirect(
				new URL("/error?message=access_denied", request.url)
			);
		}

		// Admin routes
		if (pathname.startsWith("/dashboard/admin") && role !== "admin") {
			return NextResponse.redirect(
				new URL("/error?message=access_denied", request.url)
			);
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/",
		"/jobseeker/:path*",
		"/employer/:path*",
		"/admin/:path*",
		"/dashboard/:path*",
		"/api/:path*",
	],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public access to login page and any non-admin routes
  if (!pathname.startsWith("/admin") || pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Check for your admin auth token
  const token = req.cookies.get("finwise_admin_token")?.value;

  // Redirect to login if no token is present
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = ""; // remove any query parameters
    return NextResponse.redirect(url);
  }

  // Token exists, allow access
  return NextResponse.next();
}

// Apply this middleware only to /admin routes
export const config = {
  matcher: ["/admin/:path*"],
};

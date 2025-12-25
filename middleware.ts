import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const protectedRoutes = ["/", "/plan", "/profile", "/schools", "/discover", "/advisor", "/chances", "/settings"];
const authRoutes = ["/login", "/auth"];

export async function middleware(request: NextRequest) {
  // Development bypass - set BYPASS_AUTH=true in .env.local for easy local dev
  if (process.env.BYPASS_AUTH === "true") {
    return NextResponse.next();
  }

  const { supabaseResponse, user } = await updateSession(request);
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  const isAuthRoute = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  // Redirect to login if accessing protected route without auth
  if (isProtectedRoute && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // Redirect to home if accessing auth routes while logged in
  if (isAuthRoute && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder assets
     * - api routes (they handle their own auth)
     */
    "/((?!_next/static|_next/image|favicon.ico|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

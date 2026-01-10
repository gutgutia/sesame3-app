/**
 * POST /api/auth/logout
 *
 * Clears authentication cookies and logs the user out.
 */

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();

  // Clear auth cookies - must specify same path used when setting
  cookieStore.delete({
    name: "sesame_session",
    path: "/",
  });
  cookieStore.delete({
    name: "sesame_user_id",
    path: "/",
  });

  return NextResponse.json({ success: true });
}

// Also support GET for easy navigation-based logout
export async function GET() {
  const cookieStore = await cookies();

  // Clear auth cookies - must specify same path used when setting
  cookieStore.delete({
    name: "sesame_session",
    path: "/",
  });
  cookieStore.delete({
    name: "sesame_user_id",
    path: "/",
  });

  // Redirect to login page
  return NextResponse.redirect(new URL("/auth", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"));
}

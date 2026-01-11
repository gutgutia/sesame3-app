/**
 * POST /api/auth/logout
 *
 * Clears authentication cookies and logs the user out.
 *
 * Mobile Support:
 * - For mobile clients, also revokes all refresh tokens for the user
 * - Include Authorization: Bearer <token> header for mobile logout
 */

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  extractBearerToken,
  verifyToken,
  revokeAllTokens,
} from "@/lib/mobile-auth";

// Cookie options must match those used when setting the cookies
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export async function POST(request: NextRequest) {
  // Check for bearer token (mobile logout)
  const authHeader = request.headers.get("authorization");
  const bearerToken = extractBearerToken(authHeader);

  if (bearerToken) {
    const payload = verifyToken(bearerToken);
    if (payload) {
      // Revoke all refresh tokens for this user
      await revokeAllTokens(payload.userId);
    }
  }

  const cookieStore = await cookies();

  // Clear ALL auth cookies by setting them to empty with immediate expiry
  // This is more reliable than delete() across different browsers
  cookieStore.set("sesame_session", "", {
    ...cookieOptions,
    maxAge: 0,
  });
  cookieStore.set("sesame_user_id", "", {
    ...cookieOptions,
    maxAge: 0,
  });
  // IMPORTANT: Also clear cached profile ID to prevent stale data on re-login
  cookieStore.set("sesame_profile_id", "", {
    ...cookieOptions,
    maxAge: 0,
  });

  return NextResponse.json({ success: true });
}

// Also support GET for easy navigation-based logout
export async function GET() {
  const cookieStore = await cookies();

  // Clear ALL auth cookies by setting them to empty with immediate expiry
  cookieStore.set("sesame_session", "", {
    ...cookieOptions,
    maxAge: 0,
  });
  cookieStore.set("sesame_user_id", "", {
    ...cookieOptions,
    maxAge: 0,
  });
  cookieStore.set("sesame_profile_id", "", {
    ...cookieOptions,
    maxAge: 0,
  });

  // Redirect to login page
  return NextResponse.redirect(new URL("/auth", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"));
}

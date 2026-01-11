/**
 * POST /api/auth/refresh-token
 *
 * Refreshes an access token using a refresh token.
 * Mobile apps should call this endpoint before the access token expires.
 *
 * Request:
 *   { refreshToken: string }
 *
 * Response:
 *   Success: { success: true, accessToken, refreshToken, expiresIn, refreshExpiresIn }
 *   Error: { error: string }
 */

import { NextRequest, NextResponse } from "next/server";
import { refreshAccessToken } from "@/lib/mobile-auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { refreshToken } = body;

    if (!refreshToken || typeof refreshToken !== "string") {
      return NextResponse.json(
        { error: "Refresh token is required" },
        { status: 400 }
      );
    }

    const tokenPair = await refreshAccessToken(refreshToken);

    if (!tokenPair) {
      return NextResponse.json(
        { error: "Invalid or expired refresh token" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      accessToken: tokenPair.accessToken,
      refreshToken: tokenPair.refreshToken,
      expiresIn: tokenPair.expiresIn,
      refreshExpiresIn: tokenPair.refreshExpiresIn,
    });
  } catch (error) {
    console.error("[Auth] Error refreshing token:", error);
    return NextResponse.json(
      { error: "Failed to refresh token" },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}

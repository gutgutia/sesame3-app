/**
 * POST /api/test/create-user
 *
 * Test-only endpoint to create or retrieve test users for E2E testing.
 * Only available in development/test environments.
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  // Only allow in test/development environments
  if (process.env.NODE_ENV === "production" && !process.env.ALLOW_TEST_ENDPOINTS) {
    return NextResponse.json(
      { error: "Test endpoints are disabled in production" },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Find or create the test user
    let user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: normalizedEmail,
          authProvider: "email",
          emailVerified: true,
          lastLoginAt: new Date(),
        },
      });
    }

    // Check if user has a student profile
    const profile = await prisma.studentProfile.findUnique({
      where: { userId: user.id },
    });

    return NextResponse.json({
      id: user.id,
      email: user.email,
      hasProfile: !!profile,
      profileId: profile?.id,
    });
  } catch (error) {
    console.error("[Test] Error creating test user:", error);
    return NextResponse.json(
      { error: "Failed to create test user" },
      { status: 500 }
    );
  }
}

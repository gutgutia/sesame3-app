/**
 * GET /auth/callback
 *
 * Handles the OAuth callback from Supabase (Google auth).
 * Exchanges the auth code for a session, creates/updates the user,
 * and sets session cookies.
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/email/resend";
import { WelcomeEmail } from "@/lib/email/templates";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const redirectParam = requestUrl.searchParams.get("redirect") || "/";
  const origin = requestUrl.origin;

  if (!code) {
    console.error("[Auth Callback] No code provided");
    return NextResponse.redirect(`${origin}/auth?error=no_code`);
  }

  try {
    const supabase = await createClient();

    // Exchange the code for a session
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("[Auth Callback] Error exchanging code:", error);
      return NextResponse.redirect(`${origin}/auth?error=auth_failed`);
    }

    const { user: supabaseUser, session } = data;

    if (!supabaseUser || !supabaseUser.email) {
      console.error("[Auth Callback] No user or email in session");
      return NextResponse.redirect(`${origin}/auth?error=no_user`);
    }

    const normalizedEmail = supabaseUser.email.toLowerCase().trim();

    // Check if user exists in our database
    let user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    const isNewUser = !user;

    if (!user) {
      // Create new user
      user = await prisma.user.create({
        data: {
          email: normalizedEmail,
          name: supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name || null,
          avatarUrl: supabaseUser.user_metadata?.avatar_url || supabaseUser.user_metadata?.picture || null,
          authProvider: "google",
          emailVerified: true,
          lastLoginAt: new Date(),
        },
      });

      // Send welcome email (async, don't block)
      sendEmail({
        to: normalizedEmail,
        subject: "Welcome to Sesame3!",
        react: WelcomeEmail({}),
        text: "Welcome to Sesame3! We're excited to help you on your college prep journey.",
      }).catch((err) => {
        console.error("[Auth Callback] Failed to send welcome email:", err);
      });
    } else {
      // Update existing user
      await prisma.user.update({
        where: { id: user.id },
        data: {
          lastLoginAt: new Date(),
          // Update name/avatar if they were previously null (migrating from email-only)
          ...(user.name ? {} : { name: supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name }),
          ...(user.avatarUrl ? {} : { avatarUrl: supabaseUser.user_metadata?.avatar_url || supabaseUser.user_metadata?.picture }),
          // Update authProvider if it was email before (user linked account)
          ...(user.authProvider === "email" ? { authProvider: "google" } : {}),
        },
      });
    }

    // Set our custom session cookies (same as email auth)
    const cookieStore = await cookies();

    const sessionToken = Buffer.from(
      JSON.stringify({
        userId: user.id,
        email: user.email,
        createdAt: Date.now(),
        expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
      })
    ).toString("base64");

    cookieStore.set("sesame_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });

    cookieStore.set("sesame_user_id", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    // Check for pending invitations and auto-accept them
    const pendingInvitations = await prisma.invitation.findMany({
      where: {
        inviteeEmail: normalizedEmail,
        status: "pending",
        expiresAt: { gt: new Date() },
      },
    });

    for (const invitation of pendingInvitations) {
      const existingGrant = await prisma.accessGrant.findFirst({
        where: {
          studentProfileId: invitation.studentProfileId,
          grantedToUserId: user.id,
          revokedAt: null,
        },
      });

      if (!existingGrant) {
        await prisma.accessGrant.create({
          data: {
            studentProfileId: invitation.studentProfileId,
            grantedByUserId: invitation.inviterUserId,
            grantedToUserId: user.id,
            permission: "view",
            scope: "full",
          },
        });
      }

      await prisma.invitation.update({
        where: { id: invitation.id },
        data: {
          status: "accepted",
          acceptedAt: new Date(),
        },
      });
    }

    // Determine redirect
    let redirectTo = redirectParam;
    if (isNewUser) {
      // Check if user has any access grants (was invited)
      const hasAccessGrants = await prisma.accessGrant.findFirst({
        where: {
          grantedToUserId: user.id,
          revokedAt: null,
        },
      });

      // If they have access grants but are new, skip onboarding
      if (!hasAccessGrants) {
        redirectTo = "/onboarding";
      }
    }

    return NextResponse.redirect(`${origin}${redirectTo}`);
  } catch (error) {
    console.error("[Auth Callback] Unexpected error:", error);
    return NextResponse.redirect(`${origin}/auth?error=unexpected`);
  }
}

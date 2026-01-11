/**
 * Authentication Helpers
 *
 * Handles session verification and user retrieval.
 * Supports both:
 * - Cookie-based auth (web): sesame_session cookie
 * - Token-based auth (mobile): Authorization: Bearer <token>
 *
 * PERFORMANCE: Uses cached profileId cookie to avoid DB lookups on every request.
 */

import { cookies, headers } from "next/headers";
import { prisma } from "./db";
import { verifyToken, extractBearerToken } from "./mobile-auth";

const SESSION_COOKIE = "sesame_session";
const USER_ID_COOKIE = "sesame_user_id";
const PROFILE_ID_COOKIE = "sesame_profile_id";

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
}

interface SessionData {
  userId: string;
  email: string;
  createdAt: number;
  expiresAt: number;
}

/**
 * Parse and validate session token
 */
function parseSession(token: string): SessionData | null {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const session = JSON.parse(decoded) as SessionData;

    // Check expiry
    if (session.expiresAt < Date.now()) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

/**
 * Get session data without DB verification (fast path)
 * Returns userId from session if valid, null otherwise
 */
function getSessionUserId(cookieStore: Awaited<ReturnType<typeof cookies>>): string | null {
  const sessionToken = cookieStore.get(SESSION_COOKIE)?.value;
  if (sessionToken) {
    const session = parseSession(sessionToken);
    if (session) {
      return session.userId;
    }
  }

  // Fallback to user ID cookie
  return cookieStore.get(USER_ID_COOKIE)?.value || null;
}

/**
 * Get the current authenticated user
 *
 * Checks in order:
 * 1. Bearer token (mobile apps)
 * 2. Session cookie (web)
 * 3. User ID cookie (fallback)
 *
 * PERFORMANCE NOTE: This does a DB lookup. For most API routes,
 * use getCurrentProfileId() instead which uses cached profileId.
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  // Check for bearer token first (mobile apps)
  const headerStore = await headers();
  const authHeader = headerStore.get("authorization");
  const bearerToken = extractBearerToken(authHeader);

  if (bearerToken) {
    const payload = verifyToken(bearerToken);
    if (payload && payload.type === "access") {
      // Verify user still exists in database
      const user = await prisma.user.findUnique({
        where: { id: payload.userId },
        select: { id: true, email: true, name: true },
      });

      if (user) {
        return {
          id: user.id,
          email: user.email,
          name: user.name || undefined,
        };
      }
    }
  }

  // Fall back to cookie-based auth (web)
  const cookieStore = await cookies();

  // Check for session token
  const sessionToken = cookieStore.get(SESSION_COOKIE)?.value;
  if (sessionToken) {
    const session = parseSession(sessionToken);
    if (session) {
      // First try to find user by ID (fast path)
      let user = await prisma.user.findUnique({
        where: { id: session.userId },
        select: { id: true, email: true, name: true },
      });

      // If not found by ID, try by email (handles re-seeded users)
      if (!user && session.email) {
        user = await prisma.user.findUnique({
          where: { email: session.email },
          select: { id: true, email: true, name: true },
        });
      }

      if (user) {
        return {
          id: user.id,
          email: user.email,
          name: user.name || undefined,
        };
      }
    }
  }

  // Check for user ID cookie (fallback)
  const userId = cookieStore.get(USER_ID_COOKIE)?.value;
  if (userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true },
    });

    if (user) {
      return {
        id: user.id,
        email: user.email,
        name: user.name || undefined,
      };
    }
  }

  return null;
}

/**
 * Get or create the current user's student profile
 *
 * PERFORMANCE: Uses cached profileId from cookie when available.
 * Only does DB lookup on first request, then caches in cookie.
 *
 * Priority:
 * 1. Bearer token auth (mobile apps) - no caching, always verify
 * 2. Cached profileId from cookie (instant, no DB)
 * 3. User's own profile (if exists)
 * 4. First shared profile via AccessGrant (if user has access to others)
 * 5. Create a new profile for the user
 */
export async function getCurrentProfileId(): Promise<string | null> {
  // Check for bearer token first (mobile apps)
  const headerStore = await headers();
  const authHeader = headerStore.get("authorization");
  const bearerToken = extractBearerToken(authHeader);

  let userId: string | null = null;
  let isMobileAuth = false;

  if (bearerToken) {
    const payload = verifyToken(bearerToken);
    if (payload && payload.type === "access") {
      userId = payload.userId;
      isMobileAuth = true;
    }
  }

  // Fall back to cookie-based auth (web)
  const cookieStore = await cookies();
  if (!userId) {
    userId = getSessionUserId(cookieStore);
  }

  if (!userId) return null;

  // Skip cookie cache for mobile auth (they don't use cookies)
  if (!isMobileAuth) {
    const cachedProfileId = cookieStore.get(PROFILE_ID_COOKIE)?.value;
    if (cachedProfileId) {
      // Trust the cached profileId - it was set when we first looked it up
      return cachedProfileId;
    }
  }

  // SLOW PATH: First request - need to look up profileId
  // Run profile lookup and access grant check IN PARALLEL
  const [profile, accessGrant] = await Promise.all([
    prisma.studentProfile.findFirst({
      where: { userId },
      select: { id: true },
    }),
    prisma.accessGrant.findFirst({
      where: {
        grantedToUserId: userId,
        revokedAt: null,
      },
      select: {
        studentProfileId: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  let profileId: string | null = null;

  // Return user's own profile if it exists
  if (profile) {
    profileId = profile.id;
  }
  // Otherwise return shared profile if user has access
  else if (accessGrant) {
    profileId = accessGrant.studentProfileId;
  }
  // No profile and no shared access - create one
  else {
    // Get user info for profile creation
    const user = await getCurrentUser();
    if (!user) return null;

    // First ensure user exists in database
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });

    // Create profile - use try/catch to handle race condition
    try {
      const newProfile = await prisma.studentProfile.create({
        data: {
          userId: user.id,
          firstName: user.name?.split(" ")[0] || "Student",
          lastName: user.name?.split(" ").slice(1).join(" ") || undefined,
        },
        select: { id: true },
      });
      profileId = newProfile.id;
    } catch (error) {
      // If unique constraint error (P2002), another request created the profile first
      if (error && typeof error === "object" && "code" in error && error.code === "P2002") {
        const existingProfile = await prisma.studentProfile.findFirst({
          where: { userId: user.id },
          select: { id: true },
        });
        if (existingProfile) {
          profileId = existingProfile.id;
        }
      } else {
        throw error;
      }
    }
  }

  // Cache the profileId for future requests (skip for mobile auth)
  if (profileId && !isMobileAuth) {
    cookieStore.set(PROFILE_ID_COOKIE, profileId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60, // 30 days (same as session)
      path: "/",
    });
  }

  return profileId;
}

/**
 * Check if the current user is viewing their own profile or a shared one
 */
export async function getProfileOwnership(): Promise<{
  profileId: string;
  isOwner: boolean;
  ownerName?: string;
} | null> {
  const user = await getCurrentUser();
  if (!user) return null;

  // Check for user's own profile
  const ownProfile = await prisma.studentProfile.findFirst({
    where: { userId: user.id },
    select: { id: true, firstName: true, lastName: true },
  });

  if (ownProfile) {
    return {
      profileId: ownProfile.id,
      isOwner: true,
    };
  }

  // Check for shared access
  const accessGrant = await prisma.accessGrant.findFirst({
    where: {
      grantedToUserId: user.id,
      revokedAt: null,
    },
    select: {
      studentProfile: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (accessGrant) {
    const ownerName = [
      accessGrant.studentProfile.firstName,
      accessGrant.studentProfile.lastName,
    ]
      .filter(Boolean)
      .join(" ");

    return {
      profileId: accessGrant.studentProfile.id,
      isOwner: false,
      ownerName,
    };
  }

  return null;
}

/**
 * Require authentication - throws if not authenticated
 */
export async function requireAuth(): Promise<AuthUser> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}

/**
 * Require profile - throws if not authenticated or no profile
 */
export async function requireProfile(): Promise<string> {
  const profileId = await getCurrentProfileId();
  if (!profileId) {
    throw new Error("Profile not found");
  }
  return profileId;
}

/**
 * Clear authentication cookies (for logout)
 */
export async function clearAuthCookies(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  cookieStore.delete(USER_ID_COOKIE);
  cookieStore.delete(PROFILE_ID_COOKIE);
}

/**
 * Invalidate cached profileId (call when profile changes, e.g., access grants)
 */
export async function invalidateProfileCache(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(PROFILE_ID_COOKIE);
}

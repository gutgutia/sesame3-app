/**
 * Mobile Authentication Helpers
 *
 * Provides JWT-based authentication for mobile apps.
 * Works alongside cookie-based auth for web.
 *
 * Token Flow:
 * 1. Mobile app calls /api/auth/verify-code with X-Client-Type: mobile
 * 2. Server returns { token, refreshToken, expiresIn } in response body
 * 3. Mobile app stores tokens securely (Keychain/Keystore)
 * 4. Mobile app sends Authorization: Bearer <token> header on requests
 * 5. Token refresh via /api/auth/refresh-token endpoint
 */

import { prisma } from "./db";
import crypto from "crypto";

// Token configuration
const ACCESS_TOKEN_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours
const REFRESH_TOKEN_EXPIRY = 30 * 24 * 60 * 60 * 1000; // 30 days

export interface TokenPayload {
  userId: string;
  email: string;
  type: "access" | "refresh";
  iat: number; // issued at
  exp: number; // expires at
  jti: string; // unique token ID for revocation
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number; // seconds until access token expires
  refreshExpiresIn: number; // seconds until refresh token expires
}

/**
 * Generate a cryptographically secure token ID
 */
function generateTokenId(): string {
  return crypto.randomBytes(32).toString("hex");
}

/**
 * Create a signed token (base64 encoded JSON with HMAC signature)
 * In production, consider using a proper JWT library like jose
 */
function signToken(payload: TokenPayload): string {
  const secret = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET || "development-secret-change-me";
  const payloadString = JSON.stringify(payload);
  const payloadBase64 = Buffer.from(payloadString).toString("base64url");

  const signature = crypto
    .createHmac("sha256", secret)
    .update(payloadBase64)
    .digest("base64url");

  return `${payloadBase64}.${signature}`;
}

/**
 * Verify and decode a token
 */
export function verifyToken(token: string): TokenPayload | null {
  try {
    const secret = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET || "development-secret-change-me";
    const [payloadBase64, signature] = token.split(".");

    if (!payloadBase64 || !signature) {
      return null;
    }

    // Verify signature
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(payloadBase64)
      .digest("base64url");

    if (signature !== expectedSignature) {
      return null;
    }

    // Decode payload
    const payloadString = Buffer.from(payloadBase64, "base64url").toString("utf-8");
    const payload = JSON.parse(payloadString) as TokenPayload;

    // Check expiry
    if (payload.exp < Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Generate access and refresh tokens for a user
 */
export async function generateTokenPair(userId: string, email: string): Promise<TokenPair> {
  const now = Date.now();

  const accessTokenId = generateTokenId();
  const refreshTokenId = generateTokenId();

  const accessPayload: TokenPayload = {
    userId,
    email,
    type: "access",
    iat: now,
    exp: now + ACCESS_TOKEN_EXPIRY,
    jti: accessTokenId,
  };

  const refreshPayload: TokenPayload = {
    userId,
    email,
    type: "refresh",
    iat: now,
    exp: now + REFRESH_TOKEN_EXPIRY,
    jti: refreshTokenId,
  };

  const accessToken = signToken(accessPayload);
  const refreshToken = signToken(refreshPayload);

  // Store refresh token in database for revocation capability
  await prisma.refreshToken.create({
    data: {
      id: refreshTokenId,
      userId,
      expiresAt: new Date(now + REFRESH_TOKEN_EXPIRY),
    },
  });

  return {
    accessToken,
    refreshToken,
    expiresIn: Math.floor(ACCESS_TOKEN_EXPIRY / 1000),
    refreshExpiresIn: Math.floor(REFRESH_TOKEN_EXPIRY / 1000),
  };
}

/**
 * Refresh an access token using a refresh token
 */
export async function refreshAccessToken(refreshToken: string): Promise<TokenPair | null> {
  const payload = verifyToken(refreshToken);

  if (!payload || payload.type !== "refresh") {
    return null;
  }

  // Check if refresh token is still valid in database (not revoked)
  const storedToken = await prisma.refreshToken.findUnique({
    where: { id: payload.jti },
  });

  if (!storedToken || storedToken.revokedAt) {
    return null;
  }

  // Verify user still exists
  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, email: true },
  });

  if (!user) {
    return null;
  }

  // Revoke old refresh token (rotate tokens)
  await prisma.refreshToken.update({
    where: { id: payload.jti },
    data: { revokedAt: new Date() },
  });

  // Generate new token pair
  return generateTokenPair(user.id, user.email);
}

/**
 * Revoke all refresh tokens for a user (logout from all devices)
 */
export async function revokeAllTokens(userId: string): Promise<void> {
  await prisma.refreshToken.updateMany({
    where: {
      userId,
      revokedAt: null,
    },
    data: {
      revokedAt: new Date(),
    },
  });
}

/**
 * Revoke a specific refresh token
 */
export async function revokeToken(tokenId: string): Promise<void> {
  await prisma.refreshToken.update({
    where: { id: tokenId },
    data: { revokedAt: new Date() },
  });
}

/**
 * Extract bearer token from Authorization header
 */
export function extractBearerToken(authHeader: string | null): string | null {
  if (!authHeader) return null;

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0].toLowerCase() !== "bearer") {
    return null;
  }

  return parts[1];
}

/**
 * Check if request is from a mobile client
 */
export function isMobileClient(request: Request): boolean {
  const clientType = request.headers.get("X-Client-Type");
  const userAgent = request.headers.get("User-Agent") || "";

  return (
    clientType === "mobile" ||
    clientType === "ios" ||
    clientType === "android" ||
    userAgent.includes("Sesame3-iOS") ||
    userAgent.includes("Sesame3-Android")
  );
}

/**
 * Get user from Authorization header (for mobile) or session cookie (for web)
 * This is the unified auth function that works for both platforms
 */
export async function getUserFromRequest(request: Request): Promise<{
  userId: string;
  email: string;
} | null> {
  // Try bearer token first (mobile)
  const authHeader = request.headers.get("Authorization");
  const bearerToken = extractBearerToken(authHeader);

  if (bearerToken) {
    const payload = verifyToken(bearerToken);
    if (payload && payload.type === "access") {
      return {
        userId: payload.userId,
        email: payload.email,
      };
    }
  }

  // Fall back to cookie auth (web) - handled by existing auth.ts
  return null;
}

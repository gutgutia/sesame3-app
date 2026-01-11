/**
 * API Response Utilities
 *
 * Standardized response format for mobile and web API consumers.
 * Provides consistent error codes, status codes, and response structure.
 */

import { NextResponse } from "next/server";

/**
 * Standard API response format
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string; // Machine-readable error code
  message?: string; // Human-readable message
}

/**
 * Error codes for consistent client handling
 */
export const ErrorCodes = {
  // Authentication errors (401)
  UNAUTHORIZED: "UNAUTHORIZED",
  TOKEN_EXPIRED: "TOKEN_EXPIRED",
  TOKEN_INVALID: "TOKEN_INVALID",

  // Authorization errors (403)
  FORBIDDEN: "FORBIDDEN",
  INSUFFICIENT_PERMISSIONS: "INSUFFICIENT_PERMISSIONS",

  // Resource errors (404)
  NOT_FOUND: "NOT_FOUND",
  PROFILE_NOT_FOUND: "PROFILE_NOT_FOUND",
  USER_NOT_FOUND: "USER_NOT_FOUND",

  // Validation errors (400)
  BAD_REQUEST: "BAD_REQUEST",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  MISSING_FIELD: "MISSING_FIELD",
  INVALID_FORMAT: "INVALID_FORMAT",

  // Rate limiting (429)
  RATE_LIMITED: "RATE_LIMITED",
  USAGE_LIMIT_EXCEEDED: "USAGE_LIMIT_EXCEEDED",

  // Server errors (500)
  INTERNAL_ERROR: "INTERNAL_ERROR",
  DATABASE_ERROR: "DATABASE_ERROR",
  EXTERNAL_SERVICE_ERROR: "EXTERNAL_SERVICE_ERROR",
} as const;

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];

/**
 * Create a successful JSON response
 */
export function success<T>(data: T, status = 200): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status }
  );
}

/**
 * Create an error JSON response
 */
export function error(
  message: string,
  code: ErrorCode = ErrorCodes.INTERNAL_ERROR,
  status = 500
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: message,
      code,
    },
    { status }
  );
}

/**
 * Common error responses
 */
export const Errors = {
  unauthorized: (message = "Authentication required") =>
    error(message, ErrorCodes.UNAUTHORIZED, 401),

  tokenExpired: (message = "Token has expired") =>
    error(message, ErrorCodes.TOKEN_EXPIRED, 401),

  forbidden: (message = "Access denied") =>
    error(message, ErrorCodes.FORBIDDEN, 403),

  notFound: (resource = "Resource") =>
    error(`${resource} not found`, ErrorCodes.NOT_FOUND, 404),

  profileNotFound: () =>
    error("Profile not found", ErrorCodes.PROFILE_NOT_FOUND, 404),

  badRequest: (message = "Invalid request") =>
    error(message, ErrorCodes.BAD_REQUEST, 400),

  validationError: (message: string) =>
    error(message, ErrorCodes.VALIDATION_ERROR, 400),

  missingField: (field: string) =>
    error(`${field} is required`, ErrorCodes.MISSING_FIELD, 400),

  rateLimited: (message = "Too many requests") =>
    error(message, ErrorCodes.RATE_LIMITED, 429),

  usageLimitExceeded: (message = "Usage limit exceeded") =>
    error(message, ErrorCodes.USAGE_LIMIT_EXCEEDED, 429),

  internalError: (message = "An unexpected error occurred") =>
    error(message, ErrorCodes.INTERNAL_ERROR, 500),
};

/**
 * Wrap an async handler with error handling
 */
export async function withErrorHandling<T>(
  handler: () => Promise<NextResponse<ApiResponse<T>>>
): Promise<NextResponse<ApiResponse<T> | ApiResponse>> {
  try {
    return await handler();
  } catch (err) {
    console.error("[API Error]", err);

    // Check for known error types
    if (err instanceof Error) {
      if (err.message === "Unauthorized" || err.message === "Profile not found") {
        return Errors.unauthorized();
      }
    }

    return Errors.internalError();
  }
}

/**
 * Helper to parse and validate request body
 */
export async function parseBody<T>(
  request: Request,
  validate: (body: unknown) => body is T
): Promise<T | null> {
  try {
    const body = await request.json();
    if (validate(body)) {
      return body;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Type guard helpers for common validations
 */
export const Validators = {
  isString: (value: unknown): value is string =>
    typeof value === "string" && value.length > 0,

  isNumber: (value: unknown): value is number =>
    typeof value === "number" && !isNaN(value),

  isEmail: (value: unknown): value is string =>
    typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),

  isUUID: (value: unknown): value is string =>
    typeof value === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value),
};

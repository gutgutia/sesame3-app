/**
 * Authentication utilities for E2E testing
 *
 * Creates valid session tokens for test users without going through the email flow.
 * Uses the same session format as the app's verify-code endpoint.
 */

import { Page, BrowserContext } from '@playwright/test';

interface TestUser {
  id: string;
  email: string;
}

interface SessionPayload {
  userId: string;
  email: string;
  createdAt: number;
  expiresAt: number;
}

/**
 * Create a session token in the same format as the app
 */
function createSessionToken(user: TestUser): string {
  const payload: SessionPayload = {
    userId: user.id,
    email: user.email,
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
  };
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

/**
 * Login as a test user by setting session cookies directly
 *
 * @param context - Playwright browser context
 * @param user - Test user credentials
 * @param baseURL - Base URL of the application
 */
export async function loginAsTestUser(
  context: BrowserContext,
  user: TestUser,
  baseURL: string
): Promise<void> {
  const sessionToken = createSessionToken(user);

  // Parse the base URL to get domain info
  const url = new URL(baseURL);

  await context.addCookies([
    {
      name: 'sesame_session',
      value: sessionToken,
      domain: url.hostname,
      path: '/',
      httpOnly: true,
      secure: url.protocol === 'https:',
      sameSite: 'Lax',
    },
    {
      name: 'sesame_user_id',
      value: user.id,
      domain: url.hostname,
      path: '/',
      httpOnly: true,
      secure: url.protocol === 'https:',
      sameSite: 'Lax',
    },
  ]);
}

/**
 * Logout by clearing session cookies
 */
export async function logout(context: BrowserContext): Promise<void> {
  await context.clearCookies();
}

/**
 * Check if the page is on the login/auth page
 */
export async function isOnAuthPage(page: Page): Promise<boolean> {
  const url = page.url();
  return url.includes('/auth') || url.includes('/login');
}

/**
 * Check if the page is on the onboarding page
 */
export async function isOnOnboardingPage(page: Page): Promise<boolean> {
  return page.url().includes('/onboarding');
}

/**
 * Wait for successful authentication redirect
 */
export async function waitForAuthRedirect(page: Page): Promise<void> {
  await page.waitForURL((url) => {
    const path = url.pathname;
    return path === '/' || path === '/onboarding';
  });
}

/**
 * Create a test user via API
 * This calls a special test endpoint that creates or retrieves a test user
 */
export async function createTestUser(
  baseURL: string,
  email: string = 'e2e-test@sesame3.test'
): Promise<TestUser> {
  const response = await fetch(`${baseURL}/api/test/create-user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create test user: ${response.statusText}`);
  }

  return response.json();
}

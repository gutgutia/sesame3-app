/**
 * Playwright Test Fixtures
 *
 * Provides reusable test fixtures for authenticated and unauthenticated states.
 */

import { test as base, Page, BrowserContext } from '@playwright/test';
import { loginAsTestUser, createTestUser } from '../utils/auth';

// Test user configuration
const TEST_USERS = {
  // Existing user with complete profile (for testing main app flows)
  existingUser: {
    email: 'e2e-existing@sesame3.test',
  },
  // New user (for testing onboarding)
  newUser: {
    email: 'e2e-new@sesame3.test',
  },
  // User with specific data for testing features
  profileUser: {
    email: 'e2e-profile@sesame3.test',
  },
};

interface TestUser {
  id: string;
  email: string;
  hasProfile?: boolean;
  profileId?: string;
}

// Extend base test with custom fixtures
type TestFixtures = {
  // Authenticated page with existing user
  authenticatedPage: Page;
  authenticatedContext: BrowserContext;
  testUser: TestUser;

  // Unauthenticated page (for testing login flows)
  unauthenticatedPage: Page;
};

export const test = base.extend<TestFixtures>({
  // Create an authenticated page fixture
  authenticatedContext: async ({ browser }, use) => {
    const context = await browser.newContext();
    await use(context);
    await context.close();
  },

  testUser: async ({ authenticatedContext }, use) => {
    const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';

    // Create or get the test user
    const user = await createTestUser(baseURL, TEST_USERS.existingUser.email);

    // Set up authentication
    await loginAsTestUser(authenticatedContext, user, baseURL);

    await use(user);
  },

  authenticatedPage: async ({ authenticatedContext, testUser }, use) => {
    const page = await authenticatedContext.newPage();
    await use(page);
    await page.close();
  },

  // Unauthenticated page for testing login
  unauthenticatedPage: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await use(page);
    await context.close();
  },
});

export { expect } from '@playwright/test';
export { TEST_USERS };

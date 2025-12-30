/**
 * Authentication E2E Tests
 *
 * Tests the login/signup flow and session management.
 */

import { test, expect } from '../fixtures/test-fixtures';
import { waitForPageLoad, takeScreenshot, captureConsoleErrors } from '../utils/helpers';

test.describe('Authentication', () => {
  test('should show login page for unauthenticated users', async ({ unauthenticatedPage }) => {
    const page = unauthenticatedPage;
    const errors = captureConsoleErrors(page);

    await page.goto('/');
    await waitForPageLoad(page);

    // Should redirect to auth page
    await expect(page).toHaveURL(/\/(auth|login)/);

    // Check for essential elements
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('button:has-text("Continue")')).toBeVisible();

    // Check for branding
    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible();

    // Screenshot for audit
    await takeScreenshot(page, 'auth-login-page');

    // No console errors
    expect(errors.filter((e) => !e.includes('favicon'))).toHaveLength(0);
  });

  test('should validate email format', async ({ unauthenticatedPage }) => {
    const page = unauthenticatedPage;

    await page.goto('/auth');
    await waitForPageLoad(page);

    // Enter invalid email
    await page.fill('input[type="email"]', 'invalid-email');
    await page.click('button:has-text("Continue")');

    // Should show validation or not proceed
    // The form should still be on the same page
    await expect(page).toHaveURL(/\/auth/);
  });

  test('should show code entry step after email submission', async ({ unauthenticatedPage }) => {
    const page = unauthenticatedPage;

    await page.goto('/auth');
    await waitForPageLoad(page);

    // Enter valid email
    await page.fill('input[type="email"]', 'test@example.com');
    await page.click('button:has-text("Continue")');

    // Wait for code entry step
    await page.waitForSelector('text=Check your inbox', { timeout: 10000 });

    // Should show code input
    await expect(page.locator('input[inputmode="numeric"]')).toBeVisible();
    await expect(page.locator('text=Resend')).toBeVisible();

    await takeScreenshot(page, 'auth-code-entry');
  });

  test('authenticated user should access dashboard', async ({ authenticatedPage }) => {
    const page = authenticatedPage;
    const errors = captureConsoleErrors(page);

    await page.goto('/');
    await waitForPageLoad(page);

    // Should be on dashboard, not redirected to auth
    await expect(page).not.toHaveURL(/\/(auth|login)/);

    // Should see main navigation or dashboard content
    const dashboardContent = page.locator('[data-testid="dashboard"], main, .dashboard');
    await expect(dashboardContent.first()).toBeVisible();

    await takeScreenshot(page, 'dashboard-authenticated');

    // Check for console errors
    const realErrors = errors.filter((e) => !e.includes('favicon') && !e.includes('404'));
    expect(realErrors).toHaveLength(0);
  });

  test('should handle logout correctly', async ({ authenticatedPage }) => {
    const page = authenticatedPage;

    await page.goto('/');
    await waitForPageLoad(page);

    // Look for logout or settings
    const settingsLink = page.locator('a[href="/settings"], button:has-text("Settings")').first();
    if (await settingsLink.isVisible()) {
      await settingsLink.click();
      await waitForPageLoad(page);

      // Look for logout button
      const logoutButton = page.locator('button:has-text("Logout"), button:has-text("Sign out")');
      if (await logoutButton.isVisible()) {
        await logoutButton.click();

        // Should redirect to auth
        await expect(page).toHaveURL(/\/(auth|login)/);
      }
    }
  });
});

test.describe('Authentication - Responsive', () => {
  test('login page should be responsive on mobile', async ({ unauthenticatedPage }) => {
    const page = unauthenticatedPage;

    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/auth');
    await waitForPageLoad(page);

    // Email input should be visible and usable
    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toBeVisible();

    // Button should be visible
    const continueButton = page.locator('button:has-text("Continue")');
    await expect(continueButton).toBeVisible();

    await takeScreenshot(page, 'auth-mobile-view');
  });
});

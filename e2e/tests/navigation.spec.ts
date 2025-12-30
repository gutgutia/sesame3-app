/**
 * Navigation E2E Tests
 *
 * Tests the main navigation, sidebar, and page routing.
 */

import { test, expect } from '../fixtures/test-fixtures';
import { waitForPageLoad, takeScreenshot, captureConsoleErrors, VIEWPORTS } from '../utils/helpers';

const MAIN_ROUTES = [
  { path: '/', name: 'Dashboard' },
  { path: '/profile', name: 'Profile' },
  { path: '/schools', name: 'Schools' },
  { path: '/plan', name: 'Plan' },
  { path: '/discover', name: 'Discover' },
  { path: '/advisor', name: 'Advisor' },
  { path: '/settings', name: 'Settings' },
];

test.describe('Navigation - Desktop', () => {
  test('should navigate to all main routes', async ({ authenticatedPage }) => {
    const page = authenticatedPage;

    for (const route of MAIN_ROUTES) {
      await page.goto(route.path);
      await waitForPageLoad(page);

      // Should not redirect to auth
      expect(page.url()).not.toContain('/auth');
      expect(page.url()).not.toContain('/login');

      // Take screenshot
      await takeScreenshot(page, `nav-${route.name.toLowerCase()}-desktop`);
    }
  });

  test('sidebar navigation should work', async ({ authenticatedPage }) => {
    const page = authenticatedPage;
    await page.goto('/');
    await waitForPageLoad(page);

    // Look for sidebar navigation links
    const sidebar = page.locator('nav, aside, [role="navigation"]').first();

    if (await sidebar.isVisible()) {
      // Click on Schools link
      const schoolsLink = sidebar.locator('a[href="/schools"], a:has-text("Schools")');
      if (await schoolsLink.isVisible()) {
        await schoolsLink.click();
        await waitForPageLoad(page);
        expect(page.url()).toContain('/schools');
      }

      // Click on Profile link
      const profileLink = sidebar.locator('a[href="/profile"], a:has-text("Profile")');
      if (await profileLink.isVisible()) {
        await profileLink.click();
        await waitForPageLoad(page);
        expect(page.url()).toContain('/profile');
      }
    }
  });

  test('should have consistent header/sidebar across pages', async ({ authenticatedPage }) => {
    const page = authenticatedPage;

    for (const route of MAIN_ROUTES.slice(0, 3)) {
      await page.goto(route.path);
      await waitForPageLoad(page);

      // Check for navigation element
      const nav = page.locator('nav, aside, [role="navigation"]').first();
      await expect(nav).toBeVisible();
    }
  });
});

test.describe('Navigation - Mobile', () => {
  test('should show bottom navigation on mobile', async ({ authenticatedPage }) => {
    const page = authenticatedPage;
    await page.setViewportSize(VIEWPORTS.mobile);

    await page.goto('/');
    await waitForPageLoad(page);

    // Look for bottom navigation (common on mobile)
    const bottomNav = page.locator('[data-testid="bottom-nav"], nav.fixed.bottom-0, .bottom-nav');

    await takeScreenshot(page, 'nav-mobile-dashboard');

    // Mobile should have some form of navigation
    const hasBottomNav = await bottomNav.isVisible();
    const hasSidebar = await page.locator('aside, [role="navigation"]').first().isVisible();
    const hasHamburger = await page.locator('button[aria-label*="menu"], button:has(svg)').first().isVisible();

    expect(hasBottomNav || hasSidebar || hasHamburger).toBeTruthy();
  });

  test('should navigate between pages on mobile', async ({ authenticatedPage }) => {
    const page = authenticatedPage;
    await page.setViewportSize(VIEWPORTS.mobile);

    await page.goto('/');
    await waitForPageLoad(page);

    // Navigate to profile
    await page.goto('/profile');
    await waitForPageLoad(page);
    expect(page.url()).toContain('/profile');
    await takeScreenshot(page, 'nav-mobile-profile');

    // Navigate to schools
    await page.goto('/schools');
    await waitForPageLoad(page);
    expect(page.url()).toContain('/schools');
    await takeScreenshot(page, 'nav-mobile-schools');
  });
});

test.describe('Navigation - Error Handling', () => {
  test('should handle 404 pages gracefully', async ({ authenticatedPage }) => {
    const page = authenticatedPage;
    const errors = captureConsoleErrors(page);

    await page.goto('/this-page-does-not-exist-12345');
    await waitForPageLoad(page);

    // Should show some kind of error or redirect
    const has404 = await page.locator('text=/404|not found|page.*exist/i').isVisible();
    const redirected = page.url() === '/' || page.url().includes('/auth');

    expect(has404 || redirected).toBeTruthy();
    await takeScreenshot(page, 'nav-404-page');
  });
});

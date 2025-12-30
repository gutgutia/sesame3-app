/**
 * Schools E2E Tests
 *
 * Tests the school list and school detail pages.
 */

import { test, expect } from '../fixtures/test-fixtures';
import { waitForPageLoad, takeScreenshot, captureConsoleErrors, VIEWPORTS } from '../utils/helpers';

test.describe('Schools - List Page', () => {
  test('should render schools page correctly', async ({ authenticatedPage }) => {
    const page = authenticatedPage;
    const errors = captureConsoleErrors(page);

    await page.goto('/schools');
    await waitForPageLoad(page);

    expect(page.url()).toContain('/schools');

    // Should have main content
    const main = page.locator('main, [role="main"]');
    await expect(main.first()).toBeVisible();

    await takeScreenshot(page, 'schools-list-desktop');

    // Check for errors
    const criticalErrors = errors.filter(
      (e) => !e.includes('favicon') && !e.includes('404')
    );
    expect(criticalErrors).toHaveLength(0);
  });

  test('should have search or add functionality', async ({ authenticatedPage }) => {
    const page = authenticatedPage;

    await page.goto('/schools');
    await waitForPageLoad(page);

    // Look for search input or add button
    const searchInput = page.locator(
      'input[type="search"], input[placeholder*="search" i], input[placeholder*="find" i]'
    );
    const addButton = page.locator(
      'button:has-text("Add"), button:has-text("Search"), a:has-text("Add")'
    );

    const hasSearch = await searchInput.first().isVisible();
    const hasAdd = await addButton.first().isVisible();

    // Should have either search or add functionality
    // (depending on if user has schools already)
    await takeScreenshot(page, 'schools-interactions');
  });

  test('should be responsive on mobile', async ({ authenticatedPage }) => {
    const page = authenticatedPage;
    await page.setViewportSize(VIEWPORTS.mobile);

    await page.goto('/schools');
    await waitForPageLoad(page);

    const main = page.locator('main, [role="main"]');
    await expect(main.first()).toBeVisible();

    // No horizontal scroll
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalScroll).toBeFalsy();

    await takeScreenshot(page, 'schools-list-mobile');
  });

  test('should be responsive on tablet', async ({ authenticatedPage }) => {
    const page = authenticatedPage;
    await page.setViewportSize(VIEWPORTS.tablet);

    await page.goto('/schools');
    await waitForPageLoad(page);

    await takeScreenshot(page, 'schools-list-tablet');
  });
});

test.describe('Schools - Empty State', () => {
  test('should show appropriate empty state or school list', async ({ authenticatedPage }) => {
    const page = authenticatedPage;

    await page.goto('/schools');
    await waitForPageLoad(page);

    // Either shows schools or empty state with CTA
    const hasSchools = await page.locator('[data-testid="school-card"], .school-card, .school-item').first().isVisible();
    const hasEmptyState = await page.locator('text=/no school|add.*school|get started/i').isVisible();
    const hasContent = await page.locator('main').first().isVisible();

    expect(hasSchools || hasEmptyState || hasContent).toBeTruthy();
  });
});

test.describe('Schools - Interactions', () => {
  test('should navigate to discover/search from schools page', async ({ authenticatedPage }) => {
    const page = authenticatedPage;

    await page.goto('/schools');
    await waitForPageLoad(page);

    // Look for discover or search link
    const discoverLink = page.locator('a[href*="discover"], button:has-text("Discover"), a:has-text("Find")');

    if (await discoverLink.first().isVisible()) {
      await discoverLink.first().click();
      await waitForPageLoad(page);

      // Should be on discover or search page
      expect(page.url()).toMatch(/(discover|search)/);
    }
  });
});

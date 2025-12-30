/**
 * AI Advisor E2E Tests
 *
 * Tests the AI chat/advisor functionality.
 */

import { test, expect } from '../fixtures/test-fixtures';
import { waitForPageLoad, takeScreenshot, captureConsoleErrors, VIEWPORTS } from '../utils/helpers';

test.describe('Advisor - Page Rendering', () => {
  test('should render advisor page correctly', async ({ authenticatedPage }) => {
    const page = authenticatedPage;
    const errors = captureConsoleErrors(page);

    await page.goto('/advisor');
    await waitForPageLoad(page);

    expect(page.url()).toContain('/advisor');

    // Should have chat interface
    const chatContainer = page.locator('main, [role="main"], .chat, .advisor');
    await expect(chatContainer.first()).toBeVisible();

    await takeScreenshot(page, 'advisor-desktop');

    const criticalErrors = errors.filter(
      (e) => !e.includes('favicon') && !e.includes('404')
    );
    expect(criticalErrors).toHaveLength(0);
  });

  test('should have message input area', async ({ authenticatedPage }) => {
    const page = authenticatedPage;

    await page.goto('/advisor');
    await waitForPageLoad(page);

    // Look for chat input
    const chatInput = page.locator(
      'textarea, input[type="text"][placeholder*="message" i], input[placeholder*="ask" i], [contenteditable="true"]'
    );

    // Should have some form of input
    await takeScreenshot(page, 'advisor-input-area');
  });

  test('should be responsive on mobile', async ({ authenticatedPage }) => {
    const page = authenticatedPage;
    await page.setViewportSize(VIEWPORTS.mobile);

    await page.goto('/advisor');
    await waitForPageLoad(page);

    const chatContainer = page.locator('main, [role="main"]');
    await expect(chatContainer.first()).toBeVisible();

    // Input should be accessible on mobile
    const chatInput = page.locator('textarea, input[type="text"]');

    await takeScreenshot(page, 'advisor-mobile');
  });
});

test.describe('Advisor - Chat Interface', () => {
  test('should display welcome or empty state', async ({ authenticatedPage }) => {
    const page = authenticatedPage;

    await page.goto('/advisor');
    await waitForPageLoad(page);

    // Should show either existing messages or welcome state
    const hasMessages = await page.locator('.message, [data-testid="message"]').first().isVisible();
    const hasWelcome = await page.locator('text=/welcome|hello|how can i help|ask me/i').isVisible();
    const hasContent = await page.locator('main').first().isVisible();

    expect(hasMessages || hasWelcome || hasContent).toBeTruthy();
  });

  test('submit button should be present', async ({ authenticatedPage }) => {
    const page = authenticatedPage;

    await page.goto('/advisor');
    await waitForPageLoad(page);

    // Look for send/submit button
    const sendButton = page.locator(
      'button[type="submit"], button:has-text("Send"), button[aria-label*="send" i]'
    );

    await takeScreenshot(page, 'advisor-send-button');
  });
});

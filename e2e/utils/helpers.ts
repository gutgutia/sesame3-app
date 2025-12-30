/**
 * Test helper utilities for E2E testing
 */

import { Page, expect, Locator } from '@playwright/test';

/**
 * Wait for page to be fully loaded (network idle + DOM ready)
 */
export async function waitForPageLoad(page: Page): Promise<void> {
  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('domcontentloaded');
}

/**
 * Take a screenshot with a descriptive name
 */
export async function takeScreenshot(
  page: Page,
  name: string,
  options?: { fullPage?: boolean }
): Promise<void> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  await page.screenshot({
    path: `e2e/screenshots/${name}-${timestamp}.png`,
    fullPage: options?.fullPage ?? true,
  });
}

/**
 * Wait for an element to be visible and return it
 */
export async function waitForElement(
  page: Page,
  selector: string,
  options?: { timeout?: number }
): Promise<Locator> {
  const element = page.locator(selector);
  await element.waitFor({ state: 'visible', timeout: options?.timeout ?? 10000 });
  return element;
}

/**
 * Fill a form field with validation
 */
export async function fillFormField(
  page: Page,
  selector: string,
  value: string
): Promise<void> {
  const field = page.locator(selector);
  await field.waitFor({ state: 'visible' });
  await field.clear();
  await field.fill(value);
  await expect(field).toHaveValue(value);
}

/**
 * Click a button and wait for navigation or response
 */
export async function clickAndWait(
  page: Page,
  selector: string,
  options?: { waitForNavigation?: boolean; waitForURL?: string | RegExp }
): Promise<void> {
  const button = page.locator(selector);
  await button.waitFor({ state: 'visible' });

  if (options?.waitForNavigation || options?.waitForURL) {
    await Promise.all([
      options.waitForURL
        ? page.waitForURL(options.waitForURL)
        : page.waitForNavigation(),
      button.click(),
    ]);
  } else {
    await button.click();
  }
}

/**
 * Check for accessibility issues on the current page
 * Note: Requires @axe-core/playwright for full a11y testing
 */
export async function checkBasicAccessibility(page: Page): Promise<string[]> {
  const issues: string[] = [];

  // Check for images without alt text
  const imagesWithoutAlt = await page.locator('img:not([alt])').count();
  if (imagesWithoutAlt > 0) {
    issues.push(`Found ${imagesWithoutAlt} image(s) without alt text`);
  }

  // Check for form inputs without labels
  const inputsWithoutLabels = await page.evaluate(() => {
    const inputs = document.querySelectorAll('input:not([type="hidden"])');
    let count = 0;
    inputs.forEach((input) => {
      const id = input.getAttribute('id');
      const ariaLabel = input.getAttribute('aria-label');
      const ariaLabelledBy = input.getAttribute('aria-labelledby');
      const hasLabel = id && document.querySelector(`label[for="${id}"]`);
      if (!hasLabel && !ariaLabel && !ariaLabelledBy) {
        count++;
      }
    });
    return count;
  });
  if (inputsWithoutLabels > 0) {
    issues.push(`Found ${inputsWithoutLabels} input(s) without proper labels`);
  }

  // Check for buttons without accessible names
  const buttonsWithoutNames = await page.evaluate(() => {
    const buttons = document.querySelectorAll('button');
    let count = 0;
    buttons.forEach((button) => {
      const text = button.textContent?.trim();
      const ariaLabel = button.getAttribute('aria-label');
      const title = button.getAttribute('title');
      if (!text && !ariaLabel && !title) {
        count++;
      }
    });
    return count;
  });
  if (buttonsWithoutNames > 0) {
    issues.push(`Found ${buttonsWithoutNames} button(s) without accessible names`);
  }

  // Check for heading hierarchy
  const headingIssues = await page.evaluate(() => {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const levels: number[] = [];
    headings.forEach((h) => {
      levels.push(parseInt(h.tagName[1]));
    });

    const issues: string[] = [];
    for (let i = 1; i < levels.length; i++) {
      if (levels[i] - levels[i - 1] > 1) {
        issues.push(`Heading level skipped: h${levels[i - 1]} to h${levels[i]}`);
      }
    }
    return issues;
  });
  issues.push(...headingIssues);

  return issues;
}

/**
 * Check if an element is visible in the viewport
 */
export async function isInViewport(page: Page, selector: string): Promise<boolean> {
  return page.evaluate((sel) => {
    const element = document.querySelector(sel);
    if (!element) return false;

    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= window.innerHeight &&
      rect.right <= window.innerWidth
    );
  }, selector);
}

/**
 * Get all console errors from the page
 */
export function captureConsoleErrors(page: Page): string[] {
  const errors: string[] = [];

  page.on('console', (message) => {
    if (message.type() === 'error') {
      errors.push(message.text());
    }
  });

  page.on('pageerror', (error) => {
    errors.push(error.message);
  });

  return errors;
}

/**
 * Viewport configurations for responsive testing
 */
export const VIEWPORTS = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1280, height: 720 },
  desktopLarge: { width: 1920, height: 1080 },
};

/**
 * Test the same flow across multiple viewports
 */
export async function testAcrossViewports(
  page: Page,
  testFn: (viewport: { width: number; height: number; name: string }) => Promise<void>
): Promise<void> {
  for (const [name, viewport] of Object.entries(VIEWPORTS)) {
    await page.setViewportSize(viewport);
    await testFn({ ...viewport, name });
  }
}

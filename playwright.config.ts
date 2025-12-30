import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for Sesame3 E2E and UX testing
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Test directory
  testDir: './e2e',

  // Run tests in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,

  // Reporter configuration
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'playwright-report/results.json' }],
    ['list'],
  ],

  // Shared settings for all the projects below
  use: {
    // Base URL - will be set via environment variable for staging
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',

    // Collect trace when retrying the failed test
    trace: 'on-first-retry',

    // Capture screenshot on failure
    screenshot: 'on',

    // Record video on failure
    video: 'on-first-retry',

    // Viewport for consistent testing
    viewport: { width: 1280, height: 720 },
  },

  // Configure projects for major browsers and viewports
  projects: [
    // Desktop browsers
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },

    // Mobile viewports
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 14'] },
    },
    {
      name: 'Mobile Android',
      use: { ...devices['Pixel 7'] },
    },

    // Tablet viewport
    {
      name: 'Tablet',
      use: { ...devices['iPad Pro 11'] },
    },
  ],

  // Output folder for test artifacts
  outputDir: 'test-results',

  // Global timeout
  timeout: 30000,

  // Expect timeout
  expect: {
    timeout: 10000,
  },
});

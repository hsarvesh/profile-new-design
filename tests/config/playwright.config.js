const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: '../specs',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  
  /* Maximum time one test can run */
  timeout: 30 * 1000,
  
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  
  /* Number of times to run each test */
  workers: process.env.CI ? 1 : undefined,
  
  /* Reporter to use */
  reporter: [
    ['html'],
    ['list']
  ],
  
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { 
        browserName: 'chromium',
        viewport: { width: 1280, height: 720 },
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
      },
    }
  ],

  /* Configure webServer */
  webServer: {
    command: 'npx http-server . -p 8080',
    port: 8080,
    reuseExistingServer: !process.env.CI,
  },

  use: {
    /* Base URL to use in actions like `await page.goto('/')` */
    baseURL: 'http://localhost:8080',

    /* Collect trace when retrying the failed test */
    trace: 'on-first-retry',

    /* Configure navigation timeout */
    navigationTimeout: 30000,

    /* Configure actionTimeout */
    actionTimeout: 15000,

    /* Default screenshot options */
    screenshot: {
      mode: 'only-on-failure',
      fullPage: true,
    },

    /* Record video only when retrying a test for the first time */
    video: 'on-first-retry',
  },
});
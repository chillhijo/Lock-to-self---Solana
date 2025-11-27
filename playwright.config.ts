import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";

// Load .env variables
dotenv.config();

/**
 * Playwright Test Configuration
 * Docs: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests",

  timeout: 30_000,
  expect: { timeout: 5_000 },

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: "html",

  use: {
    headless: false,
    viewport: { width: 1920, height: 1080 },
    baseURL: process.env.STREAMFLOW_URL,
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
});

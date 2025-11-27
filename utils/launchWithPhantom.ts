import { chromium, BrowserContext } from "@playwright/test";
import path from "path";

export async function launchWithPhantom(): Promise<BrowserContext> {
  const extensionPath = path.join(__dirname, "..", "extensions", "phantom", "extension");

  const context = await chromium.launchPersistentContext("", {
    headless: false,
    args: [
      "--disable-features=IsolateOrigins,site-per-process",
      "--window-size=1920,1080",
      `--disable-extensions-except=${extensionPath}`,
      `--load-extension=${extensionPath}`,
      "--start-maximized",
    ],
  });

  return context;
}

import { Page, Locator, expect } from "@playwright/test";

export class LockTypePage {
  private page: Page;

  // ==== LOCATORS ====
  private timeBasedRadio: Locator;
  private continueBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.timeBasedRadio = page.locator("#type-time");
    this.continueBtn = page.getByRole("button", { name: "Continue" });
  }

  // ==== ACTIONS ====

  async verifyLockTypePageUrl() {
    await expect(this.page).toHaveURL(process.env.SF_TYPE_URL!);
  }

  async selectTimeBased() {
    await this.timeBasedRadio.click();
    return "Time-based"
  }

  async clickContinue() {
    await expect(this.continueBtn).toBeEnabled();
    await this.continueBtn.click();
  }
}

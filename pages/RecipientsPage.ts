import { Page, Locator, expect } from "@playwright/test";

export class RecipientsPage {
  private page: Page;

  private addManuallyBtn: Locator;
  private amountInput: Locator;
  private walletAddresinput: Locator;
  private confirmBtn: Locator;
  private addedRecipient: Locator;
  private recipientsAmount: Locator;
  private continueBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    //====LOCATORS=======
    this.addManuallyBtn = page.getByRole("button", { name: "Add manually" })
    this.amountInput = page.locator("#amount");
    this.walletAddresinput = page.locator("#addressContact");
    this.confirmBtn = page.getByRole("button", { name: "Confirm" });
    this.addedRecipient = page.locator('[data-slot="accordion-trigger"]', { hasText: "SOL" }).first();
    this.recipientsAmount = page.locator('div:has-text("Amount") span span').first();
    this.continueBtn = page.getByRole("button", { name: "Continue" });
  }


  // =====ACTIONS====

  async verifRecipientsPageUrl() {
    await expect(this.page).toHaveURL(process.env.SF_RECIPIENTS_URL!);
  }

  async addRecipientManually() {
    await this.addManuallyBtn.click();
  }

  async enterAmount(amount: string) {
    await this.amountInput.fill(amount);
    return amount;
  }

  async enterWalletAddress() {
    await this.walletAddresinput.fill(process.env.PHANTOM_ADDRESS!);
  }

  async confirmRecipient() {
    await this.confirmBtn.click();
  }

  async verifyExpandedAmount(amount: string) {
    await this.addedRecipient.click();
    const expandedAmount = await this.recipientsAmount.textContent();

    expect(expandedAmount?.trim()).toBe(amount);
  }

  async clickToContinue() {
    await this.continueBtn.click();
  }
}
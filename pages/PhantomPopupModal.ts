import { Page, Locator, expect } from "@playwright/test";

export class PhantomPopupModal {
  readonly popup: Page;

  readonly alreadyHaveWalletBtn: Locator;
  readonly importRecoveryPhraseBtn: Locator;
  readonly seedInputs: Locator;
  readonly newPasswordInput: Locator;
  readonly newPasswordConfirmInput: Locator;
  readonly tosCheckbox: Locator;
  readonly primaryButton: Locator;
  readonly passwordInput: Locator;
  readonly unlockButton: Locator;
  readonly nextActionButton: Locator;
  readonly viewAccountsButton: Locator;
  readonly readyHeader: Locator;

  constructor(popup: Page) {
    this.popup = popup;

    // ONBOARDING
    this.alreadyHaveWalletBtn = popup.getByRole("button", { name: "I already have a wallet" });
    this.importRecoveryPhraseBtn = popup.getByRole("button", { name: "Import Recovery Phrase" });
    this.seedInputs = popup.getByTestId(/secret-recovery-phrase-word-input-/);
    this.newPasswordInput = popup.getByTestId("onboarding-form-password-input");
    this.newPasswordConfirmInput = popup.getByTestId("onboarding-form-confirm-password-input");
    this.tosCheckbox = popup.getByTestId("onboarding-form-terms-of-service-checkbox");
    this.nextActionButton = popup.getByTestId("onboarding-form-submit-button");
    this.viewAccountsButton = popup.getByTestId("onboarding-form-secondary-button");
    this.readyHeader = popup.getByText("ready");

    // WALLET LOCK/UNLOCK + TRANSACTION SIGNING
    this.primaryButton = popup.getByTestId("primary-button");
    this.passwordInput = popup.getByTestId("unlock-form-password-input");
    this.unlockButton = popup.getByTestId("unlock-form-submit-button");
  }

  async getStarted() {
    await expect(this.alreadyHaveWalletBtn).toBeVisible({ timeout: 20000 });
    await this.alreadyHaveWalletBtn.click();
  }

  async importWalletWithRecoveryPhrase() {
    await expect(this.importRecoveryPhraseBtn).toBeEnabled({ timeout: 10000 });
    await this.importRecoveryPhraseBtn.click();
  }

  async enterPhraseAndImportWallet() {
    const seeds = process.env.PHANTOM_SEED!.split(" ");
    await expect(this.seedInputs).toHaveCount(12);

    for (let i = 0; i < 12; i++) {
      await this.seedInputs.nth(i).fill(seeds[i]);
    }

    await this.nextActionButton.click();
    await expect(this.viewAccountsButton).toBeVisible({ timeout: 15000 });
  }

  async importAccountsContinue() {
    await expect(this.nextActionButton).toBeEnabled({ timeout: 10000 });
    await this.nextActionButton.click();
    await expect(this.newPasswordInput).toBeVisible();
  }

  async createNewPassForWallet() {
    await this.newPasswordInput.fill(process.env.PHANTOM_PASSWORD!);
    await this.newPasswordConfirmInput.fill(process.env.PHANTOM_PASSWORD!);
    await this.tosCheckbox.click();
    await this.nextActionButton.click();
    await expect(this.readyHeader).toBeVisible();

  }
  async finalGeStarted() {
    await expect(this.nextActionButton).toBeEnabled({ timeout: 10000 });
    await this.nextActionButton.click();
  }

  async importWalletUsingSeed() {
    await this.getStarted();

    await this.importWalletWithRecoveryPhrase();

    await this.enterPhraseAndImportWallet();

    await this.importAccountsContinue();

    await this.createNewPassForWallet();

    await this.finalGeStarted();
  }

}

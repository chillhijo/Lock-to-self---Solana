import { Page, Locator, expect } from "@playwright/test";

export class StreamflowHomePage {
  private page: Page;

  // ==== LOCATORS ====
  private connectWalletBtn: Locator;
  private phantomOption: Locator;
  private walletConnectedToast: Locator;
  private walletDropdown: Locator;
  private devNetSwitch: Locator;
  private lockMenuBtn: Locator;
  private createNewLockBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.connectWalletBtn = page.getByRole("button", { name: "Connect" });
    this.phantomOption = page.getByRole("button", { name: "Phantom" });
    this.walletConnectedToast = page.getByRole("alert").getByText("Phantom Wallet Connected.");
    this.walletDropdown = page.locator("button[aria-haspopup='menu']");
    this.devNetSwitch = page.getByRole("switch");
    this.lockMenuBtn = page.getByRole("button", { name: "Locks" });
    this.createNewLockBtn = page.getByRole("button", { name: "Create New" });
  }

  // ==== ACTIONS ====

  async goto() {
    await this.page.goto(process.env.STREAMFLOW_URL!);
    await this.page.waitForLoadState("domcontentloaded");
  }

  async clickConnectWallet() {
    await this.connectWalletBtn.click();
  }

  async selectPhantomWallet() {
    await expect(this.phantomOption).toBeVisible();
    await this.phantomOption.click();
  }

  async expectWalletConnected() {
    await expect(this.walletConnectedToast).toBeVisible({ timeout: 5000 });
  }

  async switchToDevNet() {
    await this.walletDropdown.click();
    await this.checkIsDevNetTurnedOn();
  }

  async checkIsDevNetTurnedOn() {
    if (await this.devNetSwitch.getAttribute("aria-checked") === "false") {
      await this.devNetSwitch.click();
      await expect(this.devNetSwitch).toHaveAttribute("aria-checked", "true");
    }
  }

  async navigateToLocks() {
    await expect(this.page).toHaveURL(process.env.SF_TOKEN_LOCK_URL!);
    await this.lockMenuBtn.click();
  }

  async clickCreateNewLock() {
    await expect(this.page).toHaveURL(process.env.SF_TYPE_URL!);
    await this.createNewLockBtn.click();
  }
}

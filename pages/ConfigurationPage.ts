import { Page, Locator, expect } from "@playwright/test";

export class ConfigurationPage {
  private page: Page;

  // ==== LOCATORS ====

  private unlockDateInput: Locator;
  private datePicker: Locator;
  private nextMonthBtn: Locator;
  private firstOfTheMonth: Locator;
  private calendarSaveBtn: Locator;
  private listForSaleToggle: Locator;
  private continueBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.unlockDateInput = page.locator('input#unlockDate');
    this.nextMonthBtn = this.page.locator("[aria-label='Go to next month']");
    this.firstOfTheMonth = this.page.getByRole("button", { name: "1" });
    this.calendarSaveBtn = page.getByRole("button", { name: "Save" });
    this.datePicker = page.locator("[data-slot='popover-trigger']");
    this.listForSaleToggle = page.locator("button[role='switch']");
    this.continueBtn = page.getByRole("button", { name: "Continue" });
  }

  // ====ACTIONS====

  async verifConfigurationPage() {
    await expect(this.page).toHaveURL(process.env.SF_CONFIGURATION_URL!);
  }

  async openCalendar() {
    await this.datePicker.click();
  }

  async selectFirstOfTheMonth() {
    await this.nextMonthBtn.click();
    await this.firstOfTheMonth.click();
    await this.calendarSaveBtn.click();
  }

  async selectDesiredDate() {
    //Here we can write method to select specified lock date
  }

  async verifyListForSaleExist() {
    //If needed we can later use this option
    await expect(this.listForSaleToggle).toBeVisible();
  }

  async clickContinue() {
    await this.continueBtn.click();
  }
}

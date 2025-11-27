import { Page, Locator, expect } from "@playwright/test";

export class SuccessModalPage {
    private page: Page;

    private successTitle: Locator;
    private successSubtitle: Locator;
    private createAnotherBtn: Locator;
    private lockDetailsBtn: Locator;
    private shareOnXButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.successTitle = page.getByRole("heading", { name: "Contract created successfully" });
        this.successSubtitle = page.getByText("You have successfully locked your tokens");
        this.createAnotherBtn = page.getByRole("button", { name: "Create another" });
        this.lockDetailsBtn = page.getByRole("button", { name: "Lock details" });
        this.shareOnXButton = page.getByRole("button", { name: "Share on X" });
    }

    async verifyModalVisible() {
        await expect(this.successTitle).toBeVisible();
        await expect(this.successSubtitle).toBeVisible();
        await expect(this.lockDetailsBtn).toBeVisible();
        await expect(this.createAnotherBtn).toBeVisible();
    }

    async clickLockDetails() {
        await this.lockDetailsBtn.click();
    }

    async clickCreateAnother() {
        await this.createAnotherBtn.click();
    }

    async clickShareOnX() {
        await this.shareOnXButton.click();
    }
}

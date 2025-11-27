import { Page, Locator, expect } from "@playwright/test";

export class ReviewPage {
    private page: Page;

    // ==== LOCATORS ====

    private createLockBtn: Locator;
    private tokenLockTypeValue: Locator;
    private lockedAmountValue: Locator;
    private feeBreakdownBtn: Locator;

    constructor(page: Page) {
        this.page = page;

        this.createLockBtn = page.getByRole("button", { name: "Create Lock" });
        this.tokenLockTypeValue = page.locator("div", { hasText: "Token lock type" }).locator("xpath=following-sibling::div[1]");
        this.lockedAmountValue = page.locator("div", { hasText: "Locked amount" }).locator("xpath=following-sibling::div[1]");
        this.feeBreakdownBtn = page.getByRole("button", { name: "Fee breakdown" });
    }

    // ==== ACTIONS ====

    async verifyReviewPageUrl() {
        await expect(this.page).toHaveURL(process.env.SF_REVIEW_URL!);
    }

    async verifyTokenLockType(expectedType: string) {
        const text = await this.tokenLockTypeValue.textContent();
        expect(text?.trim()).toBe(expectedType);
    }

    async verifyLockedAmount(expectedAmount: string) {
        const text = await this.lockedAmountValue.textContent();
        expect(text?.trim()).toContain(expectedAmount);
    }

    async verifyFeeBreakdownExists() {
        await expect(this.feeBreakdownBtn).toBeVisible();
    }

    async clickCreateLock() {
        await this.createLockBtn.click();
    }

    async verifyConfirmTransactionAlert() {
        await expect(this.page.getByRole("alert")
        .getByText("Please confirm the transaction in your wallet.")).toBeVisible();
    }
}

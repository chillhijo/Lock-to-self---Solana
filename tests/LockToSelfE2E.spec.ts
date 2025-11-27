import { test, expect } from "@playwright/test";

import { launchWithPhantom } from "../utils/launchWithPhantom";

import { StreamflowHomePage } from "../pages/StreamFlowHomePage";
import { LockTypePage } from "../pages/LockTypePage";
import { RecipientsPage } from "../pages/RecipientsPage";
import { ConfigurationPage } from "../pages/ConfigurationPage";
import { ReviewPage } from "../pages/ReviewPage";
import { PhantomPopupModal } from "../pages/PhantomPopupModal";
import { SuccessModalPage } from "../pages/SuccessModalPage";

test("E2E - Lock tokens to self (Solana Devnet)", async () => {
  // 1. Launch Chrome with Phantom extension
  const context = await launchWithPhantom();
  const page = await context.newPage();

  // 2. Initialize POM classes
  const home = new StreamflowHomePage(page);
  const lockType = new LockTypePage(page);
  const recipients = new RecipientsPage(page);
  const config = new ConfigurationPage(page);
  const review = new ReviewPage(page);
  const success = new SuccessModalPage(page);

  // 3. Open Streamflow
  await home.goto();

  // 4. Connect Phantom wallet

  // Phantom opens in a second tab
  await expect.poll(() => context.pages().length).toBeGreaterThan(1);

  const popup = context.pages().at(-1)!;
  const phantom = new PhantomPopupModal(popup);

  // Go throu onboarding proccess of importing the wallet
  await phantom.importWalletUsingSeed();

  await home.clickConnectWallet();
  await home.selectPhantomWallet();

  // klik na “Connect” (primaryButton)
  // await expect(phantomConnect.primaryButton).toBeVisible({ timeout: 10000 });
  // await phantomConnect.primaryButton.click();

  // sada je wallet povezan
  await home.expectWalletConnected();

  // 5. Switch to Devnet
  await home.switchToDevNet();

  // 6. Create new lock
  await home.navigateToLocks();
  await home.clickCreateNewLock();

  // 7. Select lock type
  await lockType.verifyLockTypePageUrl();
  const selectedLockType = await lockType.selectTimeBased();
  await lockType.clickContinue();

  // 8. Configure schedule
  await config.verifConfigurationPage();
  await config.openCalendar();
  await config.selectFirstOfTheMonth();
  await config.clickContinue();

  // 9. Add recipient
  await recipients.verifRecipientsPageUrl();
  await recipients.addRecipientManually();

  const amountToLock = await recipients.enterAmount("0.0001");
  await recipients.enterWalletAddress();
  await recipients.confirmRecipient();

  await recipients.verifyExpandedAmount(amountToLock);
  await recipients.clickToContinue();

  // 10. Review page
  await review.verifyReviewPageUrl();
  await review.verifyTokenLockType(selectedLockType);
  await review.verifyLockedAmount(amountToLock);

  await review.verifyFeeBreakdownExists();
  await review.clickCreateLock();
  await review.verifyConfirmTransactionAlert();

  // 11. Confirm transaction in Phantom
  const txPopup = await context.waitForEvent("page", { timeout: 15000 });
  const phantomTx = new PhantomPopupModal(txPopup);

  await expect(phantomTx.primaryButton).toBeVisible({ timeout: 15000 });
  await phantomTx.primaryButton.click();

  // 12. Success modal
  await success.verifyModalVisible();
  console.log("🎉 Lock to self created successfully!");

  await context.close();



});
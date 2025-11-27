# Streamflow E2E Automation (Playwright + TypeScript + Phantom Wallet)

This repository contains an end-to-end test suite for the **Lock to Self** flow in  
https://app.streamflow.finance.

The tests use:

- **Playwright (TypeScript)**
- **Real Phantom browser extension** (persistent profile)
- **Solana Devnet**
- **Page Object Model**
- **Deterministic wallet state** (pre-configured)
- **Network-aware synchronization** (waits for indexer propagation)

The goal is to automate and verify creation of a **token lock where sender == receiver**.

---

## ✅ Acceptance Criteria Coverage

| Requirement | Status |
|------------|--------|
| Automate creation of a Lock to Self | ✔ Implemented |
| Clear README with setup/run steps | ✔ You're reading it |
| Clean, typed TypeScript code | ✔ Full POM structure |
| Verify lock appears in `/token-lock` list | ✔ Included |
| Verify lock appears on details page | ✔ Included |
| Detailed logging | ✔ Console + step logging |
| Runs in CI (headless) | ✔ Supported, headless Phantom optional |
| Parametrised tests (browser, params, network) | ✔ Examples included |
| Verified token lock parameters | ✔ Test assertions implemented |

---

# 📦 Installation

```bash
npm install
npx playwright install

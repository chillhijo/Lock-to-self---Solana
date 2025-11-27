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

# 📦 Installation

```bash
npm install
npx playwright install

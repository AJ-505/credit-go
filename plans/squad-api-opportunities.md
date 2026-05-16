# Squad API Opportunity Review

Source reviewed: `~/Downloads/Squad_API_Summary_v2.pptx`, plus `PRD.md`, `REPORT.md`, and the onboarding/core/lender plans.

## Product Context

CreditGo is an AI trust-scoring and financing platform for Nigerian earners and lenders. The strongest Squad story today is already present but underused: Squad should not just be "BVN/VA setup"; it can become the repayment, collections, reconciliation, and disbursement backbone.

## Current Squad Usage

- Static Virtual Account: borrower vault creation during BVN step.
- Transfer API: mentioned for payouts/refunds and settlement account lookup.
- Direct Debit: planned in core repayment flows.
- Payment Gateway: documented in research, not prominent in the actual product flow.

## Missing High-Value Integrations

1. Payment Gateway for lender funding and borrower ad-hoc repayments.
   Use `POST /transaction/initiate` and `GET /transaction/verify/:transaction_ref` for lender wallet funding, loan origination fees, and one-off repayments when vault/direct debit fails.

2. Dynamic Virtual Accounts for invoices and exact repayment intents.
   Use `POST /virtual-account/initiate-dynamic-virtual-account` when a borrower needs to pay a specific amount before a deadline. This gives exact amount control, expiry, and automatic mismatch/late payment handling.

3. Static VA transaction history as scoring data.
   Use `GET /virtual-account/customer/transactions/{identifier}` to turn vault deposits into score features: deposit consistency, recovery speed after missed savings days, average surplus, and repayment readiness.

4. Missed webhook recovery.
   Use `GET /virtual-account/webhook/logs` and `DELETE /virtual-account/webhook/logs/:txn_ref` so vault deposits are not lost when local webhook handling fails.

5. Transfer requery hardening.
   Use `POST /payout/requery` after `424 Timeout` before retrying disbursements. This should be part of the lender payout/borrower refund flow.

6. Account lookup before settlement and payouts.
   Use `POST /payout/account/lookup` before saving lender settlement accounts and before any transfer. Store the returned account name and compare it with lender/director identity.

7. Sandbox simulation in demos.
   Use `POST /virtual-account/simulate/payment` to show judges the full loop: vault payment received, webhook processed, score updated, lender sees improved repayment signal.

## Recommended Demo Flow

1. Borrower verifies NIN with Mono and creates a Squad static VA vault.
2. Sandbox-simulate a vault deposit into the static VA.
3. Recompute trust score using the new deposit signal.
4. Lender funds wallet via Squad Payment Gateway.
5. Loan is approved and disbursed via Squad Transfer API.
6. Repayment is collected through Direct Debit; fallback is Dynamic VA for an exact overdue amount.

## Implementation Priority

- P0: Payment Gateway initiate/verify, VA transaction webhook recovery, Transfer requery.
- P1: Dynamic VA repayment intents and sandbox payment simulation.
- P2: Static VA transaction analytics as scoring features.

# CreditGo Lender Platform Specification

> Document purpose: Granular implementation spec for the lender-side core platform — Dashboard, Lead Management, Loan Approval, Portfolio Monitoring, Shared Default Registry, First Right of Refusal system, and Settings.
> Dependencies: Lender onboarding complete per `plan-onboarding-and-kyc.md`. Lender has an active session and configured lending parameters.
> Audience: Implementation agents building screens, APIs, and lender-facing infrastructure.

---

## 1. Overview

The lender platform is a separate dashboard (not the borrower dashboard), accessible from the "For Lenders" tab on the landing page. After completing lender onboarding, lenders land here.

The platform solves three problems for lenders:
1. **Default reporting** — automatic via infrastructure (not voluntary manual filing)
2. **Good customer poaching** — First Right of Refusal with source-tagging
3. **Collection cost** — behavioral nudges + Save-to-Pay vault do the policing

---

## 2. Lender Dashboard Layout

### 2.1 Layout Structure

```
+------------------------------------------------------------------+
|  HEADER: Logo | Business Name | Notifications | Avatar            |
+------------------------------------------------------------------+
|  +------------------+  +----------------------------------------+ |
|  |  SIDEBAR         |  |  MAIN CONTENT AREA                     | |
|  |                   |  |                                        | |
|  |  o Dashboard      |  |  (changes based on active sidebar      | |
|  |  o Leads          |  |   navigation item)                     | |
|  |  o Approvals      |  |                                        | |
|  |  o My Borrowers   |  |                                        | |
|  |  o Portfolio      |  |                                        | |
|  |  o Reports        |  |                                        | |
|  |  o Settings       |  |                                        | |
|  |                   |  |                                        | |
|  +------------------+  +----------------------------------------+ |
+------------------------------------------------------------------+
```

### 2.2 Navigation Items

| Icon | Label | Route | Description |
|---|---|---|---|
| Home | Dashboard | `/dashboard/lender` | Portfolio snapshot, alerts, recent activity |
| Users | Leads | `/dashboard/lender/leads` | Pre-qualified borrowers matching their filters |
| Check | Approvals | `/dashboard/lender/approvals` | Loan applications needing manual review |
| Users | My Borrowers | `/dashboard/lender/borrowers` | Active borrowers with real-time health |
| BarChart | Portfolio | `/dashboard/lender/portfolio` | Detailed analytics, trends |
| FileText | Reports | `/dashboard/lender/reports` | CSV exports, transaction logs |
| Settings | Settings | `/dashboard/lender/settings` | Config, webhooks, API keys |

---

## 3. Dashboard (Home Screen)

### 3.1 Widget Layout

**Row 1 — 4 KPI Cards**
```
+------------------+  +------------------+  +------------------+  +------------------+
| Active Loans     |  | Total Disbursed  |  | Default Rate     |  | Avg Trust Score  |
| NGN 452,000,000  |  | NGN 482,000,000  |  | 1.3%             |  | 68               |
| 1,247 borrowers  |  | This month: +52M |  | -0.2% vs last    |  | +2 vs last month |
+------------------+  +------------------+  +------------------+  +------------------+
```

**Row 2 — Pending Reviews + Qualified Leads**
```
+--------------------------------------+  +--------------------------------------+
|  PENDING REVIEWS                     |  |  QUALIFIED LEADS                     |
|  12 applications awaiting decision   |  |  43 new this week                    |
|  ┌────────────────────────────────┐  |  |  ┌────────────────────────────────┐ |
|  │ Rent - NGN 800K - James O.     │  |  |  │ Freelancer - Trust 72 - Lagos  │ |
|  │ Device - NGN 520K - Chioma E.  │  |  |  │ Corporate - Trust 81 - Abuja   │ |
|  │ Solar - NGN 3.4M - Yusuf A.    │  |  |  │ Govt - Trust 65 - Rivers       │ |
|  └────────────────────────────────┘  |  |  └────────────────────────────────┘ |
|  [View All ->]                       |  |  [View All ->]                       |
+--------------------------------------+  +--------------------------------------+
```

**Row 3 — Portfolio Health Bar**
```
PORTFOLIO HEALTH
Performing:  NGN 428M (94.7%)  ████████████████████░
At Risk:     NGN 18M  (4.0%)   ██░
Defaulted:   NGN 6M   (1.3%)   █░
```

**Row 4 — Recent Activity Feed**
```
--- Recent Activity -------------------------------------------------
  May 15  02:30pm  Loan approved: James O. - NGN 520,000 (Device)
  May 15  01:15pm  Alert: Chioma E. - score dropped 12pts (vault missed 3 days)
  May 15  10:00am  Default flagged: Yusuf A. - NGN 200,000 (missed 3rd installment)
  May 14  04:00pm  New lead: Freelancer in Lagos, Trust 72, seeking NGN 800K
  May 14  11:00am  Borrower caught up: Funke A. - paid 2 missed installments
```

### 3.2 Scoring & Tiers Display

Each KPI card includes a trend indicator (up/down arrow + % change vs. previous period).

Portfolio health bar uses color coding:
- Performing: green
- At Risk: amber (score dropped >15pts in 7 days OR vault missed >5 days)
- Defaulted: red (3+ consecutive missed installments)

---

## 4. Lead Management

### 4.1 Overview

Pre-qualified borrowers who match the lender's configured filters (min trust score, target niches, asset categories). Borrowers appear here automatically when they complete onboarding and their profile matches the lender's parameters.

**URL:** `/dashboard/lender/leads`

### 4.2 Lead List

```
+------------------------------------------------------------------+
|  LEADS (43 new this week)              [Filters] [Export CSV]    |
|                                                                    |
|  ┌──────┬──────────┬──────┬────────┬──────────┬──────────┬─────┐ |
|  │ Name │ Persona  │Score │ Tier   │ Niche    │ Seeking  │     | |
|  ├──────┼──────────┼──────┼────────┼──────────┼──────────┤     | |
|  │ C. E.│ Corporate│ 81   │ Gold   │ Laptops  │ NGN 1.2M │View→| |
|  │ J. O.│ Freelance│ 72   │ Gold   │ Solar    │ NGN 3.4M │View→| |
|  │ F. A.│ Govt     │ 65   │ Gold   │ Rent     │ NGN 800K │View→| |
|  │ Y. A.│ Corporate│ 58   │ Silver │ Devices  │ NGN 520K │View→| |
|  └──────┴──────────┴──────┴────────┴──────────┴──────────┴─────┘ |
+------------------------------------------------------------------+
```

**Columns:** Name (initials/masked), Persona, Trust Score, Tier, Niche interest, Amount seeking, Action

**Filters:**
- Min trust score (slider)
- Persona (multi-select: Freelancer / Corporate / Government)
- Asset category (multi-select)
- Max amount
- Date range

### 4.3 Lead Detail (Click "View")

```
+------------------------------------------------------------------+
|  Lead: C. E.                                      [Back to Leads]|
|                                                                    |
|  --- Profile (Anonymized) --------------------------------------|
|  Persona: Corporate Worker                                        |
|  Trust Score: 81 (Gold)                                           |
|  Tier: Gold                                                        |
|  Risk Band: Low                                                    |
|  State: Lagos                                                      |
|  Employment: Verified (Flutterwave)                                |
|                                                                   |
|  --- Seeking ---------------------------------------------------|
|  Product: MacBook Pro 14" M4                                      |
|  Amount: NGN 2,700,000                                            |
|  Tenor: 12 months                                                  |
|  Monthly: NGN 225,000                                              |
|                                                                   |
|  --- Behavioral Signals (Anonymized) ---------------------------|
|  Savings Streak: 34 days                                          |
|  Bank History: 8 months                                            |
|  Income Stability: High                                            |
|  Linked Accounts: 1 bank + LinkedIn                                |
|                                                                   |
|  --- Lender Actions --------------------------------------------|
|  [Send Offer]  [Save for Later]  [Not Interested]                  |
+------------------------------------------------------------------+
```

**Important:** The borrower's identity is masked (initials only) until the lender takes action or the borrower's originating lender's First Right of Refusal window expires.

---

## 5. Loan Approval Queue

### 5.1 Overview

Borrowers have applied for specific financing and their application requires manual review (because amount exceeded `auto_approve_threshold` or their score is borderline).

**URL:** `/dashboard/lender/approvals`

### 5.2 Approval List

```
+------------------------------------------------------------------+
|  APPROVALS (12 pending)                                           |
|                                                                    |
|  ┌──────────┬────────┬──────┬────────┬────────┬──────────┬──────┐ |
|  │ Applicant│ Product│Amount│ Score  │ Vault  │ Status   │      | |
|  ├──────────┼────────┼──────┼────────┼────────┼──────────┤      | |
|  │ James O. │ Rent   │800K  │ 72     │ 200K   │ Pending  │Review│ |
|  │ Chioma E.│ Laptop │2.7M  │ 81     │ 500K   │ Pending  │Review│ |
|  │ Yusuf A. │ Solar  │3.4M  │ 58     │ 100K   │ Flagged  │Review│ |
|  └──────────┴────────┴──────┴────────┴────────┴──────────┴──────┘ |
+------------------------------------------------------------------+
```

**Status colors:** Pending (blue), Flagged (amber — score dropped), Under Review (purple)

### 5.3 Review Screen (Click "Review")

```
+------------------------------------------------------------------+
|  Review: James O.                         [Approve] [Reject]     |
|                                                                    |
|  --- Application -----------------------------------------------|
|  Product: Rent financing                                           |
|  Amount: NGN 800,000                                               |
|  Tenor: 12 months                                                  |
|  Monthly: NGN 66,667                                                |
|                                                                   |
|  --- Borrower Profile ------------------------------------------|
|  Persona: Corporate Worker (GTBank)                                |
|  Trust Score: 72 (Gold)                                           |
|  Vault Balance: NGN 200,000                                        |
|  Savings Streak: 34 days                                           |
|  Bank Statement: 8 months                                          |
|  Employment: Verified (work email)                                 |
|  Income: NGN 620,000/month                                         |
|  DTI Ratio: 0.24 (low)                                             |
|  Guardrails: None active                                           |
|                                                                   |
|  --- Risk Assessment -------------------------------------------|
|  Default Probability: 8.2% (Low)                                   |
|  Safe Limit: NGN 1,500,000                                         |
|  Request vs Limit: Within limit ✓                                  |
|  Monthly vs Income: 10.7% (within safe 15%) ✓                     |
|                                                                   |
|  --- Decision --------------------------------------------------|
|  [Approve - Auto-disburse]  [Approve with conditions]  [Reject]   |
|                                                                   |
|  Reason for rejection (if applicable): [___________________]      |
+------------------------------------------------------------------+
```

### 5.4 Auto-Approval Logic

```
if application.amount <= lender.auto_approve_threshold
  AND borrower.trust_score >= lender.min_trust_score
  AND application.amount <= borrower.safe_limit_ngn
  AND application.amount <= lender.max_per_borrower
then AUTO-APPROVE (no human review needed)

Otherwise: route to lender's approval queue
```

Auto-approved loans appear as notifications in the dashboard but skip the approvals queue.

---

## 6. Active Borrower Monitoring

### 6.1 Overview

Real-time view of all borrowers who have active loans funded by this lender. Shows savings health, score trends, and early warning signals.

**URL:** `/dashboard/lender/borrowers`

### 6.2 Borrower List

```
+------------------------------------------------------------------+
|  MY BORROWERS (1,247 active)              [Export] [Alerts Only]  |
|                                                                    |
|  ┌──────┬────────┬──────┬──────────┬──────────┬─────────┬───────┐ |
|  │ Name │ Product│ Score│ Vault    │ Streak   │ Health  │       | |
|  ├──────┼────────┼──────┼──────────┼──────────┼─────────┤       | |
|  │ C. E.│ Laptop │81 →83│ NGN 500K│ 45 days  │ ● Good │ View→ | |
|  │ J. O.│ Rent   │72 →68│ NGN 200K│ 12 days  │ ⚠ Watch │ View→ | |
|  │ F. A.│ Solar  │65 →45│ NGN 100K│  0 days  │ 🔴 Alert│ View→ | |
|  └──────┴────────┴──────┴──────────┴──────────┴─────────┴───────┘ |
+------------------------------------------------------------------+
```

**Health Indicators:**
- ● Good: Score stable or rising, vault on track, streak active
- ⚠ Watch: Score dropped 10-15pts OR vault behind >3 days OR streak broken
- 🔴 Alert: Score dropped >15pts OR vault behind >7 days OR 1+ missed installment

### 6.3 Borrower Detail (Click "View")

Shows full profile of the borrower (non-anonymized since they're an active customer):
- Personal info (name, phone, email)
- Current loan(s) with this lender
- Payment schedule with installment status (paid/pending/missed)
- Vault balance, streak, auto-sweep status
- Score history chart (last 30/60/90 days)
- Activity log (sweeps, top-ups, missed days, LinkedIn changes, etc.)
- **Early warning:** "If streak drops to 0 and vault doesn't recover in 7 days, we'll send an alert"

### 6.4 Early Warning Webhooks

Lender can configure a webhook URL in Settings. We POST to it when:
- Borrower's score drops by 15+ points in 7 days
- Vault hasn't received funds in 5+ consecutive days
- First missed installment
- Third missed installment (default)

---

## 7. Portfolio Analytics

### 7.1 Overview

Detailed analytics on the lender's entire loan book.

**URL:** `/dashboard/lender/portfolio`

### 7.2 Sections

**Summary Cards:**
- Total disbursed (all time + this month)
- Active borrowers
- Avg trust score (current + trend)
- Default rate (current + trend)
- Recovery rate (% of defaulted amount recovered)

**Charts:**
- Disbursements over time (bar chart, monthly)
- Default rate trend (line chart, monthly)
- Portfolio by persona (pie: Freelancer / Corporate / Govt)
- Portfolio by asset category (pie: Laptops / Phones / Solar / Rent / Appliances)

**Borrower Distribution by Score:**
```
Score Distribution
Bronze (0-30):     12 borrowers   ██░
Silver (31-55):   245 borrowers   █████████████░
Gold (56-75):     680 borrowers   ████████████████████████░
Platinum (76-100): 310 borrowers   ████████████░
```

**At-Risk Breakdown:**
- List of borrowers currently flagged as "Watch" or "Alert"
- Each with: name, product, original amount, remaining balance, days since last payment

---

## 8. Shared Default Registry

### 8.1 How It Works

This is automatic — not a manual report. When a borrower defaults (3 consecutive missed installments on ANY loan on CreditGo):

```
1. System marks borrower.status = "defaulted"
2. Borrower's trust_score = 0 (via guardrails)
3. ALL lenders who have this borrower get a webhook notification:
   "Borrower X has defaulted on a loan with Lender Y"
4. Borrower is added to internal shared default registry
5. Any future loan applications from this borrower are auto-rejected
6. Lender can choose to export default report to CRC/FirsCentral
```

### 8.2 Lender View

In the dashboard, lenders see a "Shared Default Registry" section under Reports:

```
SHARED DEFAULT REGISTRY
Borrowers who have defaulted on any CreditGo loan:

  J. A.  Defaulted: NGN 200K (Laptop)  Date: May 2026  Origin: EasyBuy
  K. O.  Defaulted: NGN 1.2M (Rent)    Date: Apr 2026  Origin: Spleet
```

**Note:** Only the fact of default is shared. The originating lender's identity is shown (they defaulted on "EasyBuy", not just "some lender"). This transparency builds trust in the system.

### 8.3 Reciprocal Access

To access the shared default registry, a lender must have funded at least one loan on CreditGo. This prevents non-participating lenders from free-riding on the data.

---

## 9. First Right of Refusal System

### 9.1 Source-Tagging

Every onboarding draft has an `originLenderId` field (nullable):

```
When user signs up:
  - Via lender invite link → origin_lender_id = that lender's ID
  - Via organic signup → origin_lender_id = null
  - First lender to approve a loan for a free agent → origin_lender_id = that lender
```

### 9.2 The Upsell Window

When a borrower's Trust Score hits the next tier threshold (e.g., moves from Silver to Gold):

```
1. System detects: borrower.trust_score crossed into Gold tier
2. System checks: does borrower have an origin_lender_id? YES
3. System notifies origin lender:
   "Your borrower C.E. just hit Gold tier (Score: 76).
    They're eligible for higher-value products.
    You have 48 hours exclusive access to offer them: Solar, Rent, Premium Devices"
4. Origin lender sees borrower in their "Upsell Opportunities" widget
5. If origin lender makes no offer within 48 hours → borrower appears
   in the general lead pool for all lenders
```

### 9.3 The Widget

```
+------------------------------------------------------------------+
|  UPSELL OPPORTUNITIES                    [3 borrowers available]  |
|                                                                    |
|  ┌──────────┬──────────┬─────────┬──────────┬──────────┬────────┐ |
|  │ Borrower │ New Tier │ Product │ Est. Amt │ Window   │ Action │ |
|  ├──────────┼──────────┼─────────┼──────────┼──────────┼────────┤ |
|  │ C. E.    │ Gold 81  │ Solar   │ 3.4M     │ 42h left │Offer→  │ |
|  │ J. O.    │ Gold 72  │ Laptop  │ 1.8M     │ 28h left │Offer→  │ |
|  └──────────┴──────────┴─────────┴──────────┴──────────┴────────┘ |
+------------------------------------------------------------------+
```

### 9.4 Category-Level Ownership

If borrower has multiple loans from different lenders, ownership is per asset category:

```
Borrower has:
  - Rent loan from Lender A → Lender A owns First Right on Housing products
  - Laptop loan from Lender B → Lender B owns First Right on Electronics
  - Both want to offer Solar → longest repayment history wins
```

---

## 10. Reports

**URL:** `/dashboard/lender/reports`

Available exports:
- Transaction log (all payments, disbursements, refunds)
- Commission/ fee statement (CreditGo platform fees)
- Borrower portfolio (active, paid, defaulted)
- Monthly portfolio summary (disbursements, collections, defaults)
- Default registry (for submission to credit bureaus)

Format: CSV, date-range filterable.

---

## 11. Settings

**URL:** `/dashboard/lender/settings`

### 11.1 Lending Parameters

Editable fields from onboarding:
- Minimum Trust Score (slider 0-100)
- Target niches (multi-select)
- Asset categories (multi-select)
- Max per borrower (input)
- Auto-approve threshold (input)

### 11.2 Settlement Account

- View current settlement bank + account number
- Edit (requires re-verification via Squad NUBAN resolve)

### 11.3 Webhook URL

- Input field for webhook URL
- "Test Webhook" button sends a sample payload
- Webhook events: new_lead, pending_approval, approval_result, borrower_alert, default_notification

### 11.4 API Key

- View API key preview (cg_live_...abcd)
- Regenerate (invalidates old key)
- Copy to clipboard

---

## 12. Database Schema Additions

### 12.1 New Columns on `user`

```
origin_lender_id         TEXT REFERENCES lender(id)  -- which lender "owns" this user
defaulted_loans_count    INTEGER DEFAULT 0
last_default_date        DATE
```

### 12.2 New Table: `lender_lead`

```
CREATE TABLE lender_lead (
  id              TEXT PRIMARY KEY,
  lender_id       TEXT NOT NULL REFERENCES lender(id),
  draft_id        TEXT REFERENCES onboardingDraft(id),
  user_id         TEXT REFERENCES user(id),
  status          TEXT DEFAULT 'new',         -- new | contacted | approved | rejected | expired
  matched_at      TIMESTAMP DEFAULT NOW(),
  expires_at      TIMESTAMP,
  actioned_at     TIMESTAMP,
  action          TEXT,                        -- approved | rejected | saved
  created_at      TIMESTAMP DEFAULT NOW()
);
```

### 12.3 New Table: `upsell_window`

```
CREATE TABLE upsell_window (
  id              TEXT PRIMARY KEY,
  lender_id       TEXT NOT NULL REFERENCES lender(id),
  user_id         TEXT NOT NULL REFERENCES user(id),
  product_category TEXT NOT NULL,
  trigger_reason  TEXT NOT NULL,              -- tier_upgrade | threshold_crossed
  window_start    TIMESTAMP NOT NULL,
  window_end      TIMESTAMP NOT NULL,         -- 48 hours after start
  was_acted_on    BOOLEAN DEFAULT false,
  created_at      TIMESTAMP DEFAULT NOW()
);
```

### 12.4 New Table: `default_registry`

```
CREATE TABLE default_registry (
  id              TEXT PRIMARY KEY,
  user_id         TEXT NOT NULL REFERENCES user(id),
  loan_id         TEXT NOT NULL REFERENCES loan(id),
  originating_lender_id TEXT NOT NULL REFERENCES lender(id),
  amount_ngn      REAL NOT NULL,
  default_date    TIMESTAMP NOT NULL,
  reported_to_bureau BOOLEAN DEFAULT false,
  created_at      TIMESTAMP DEFAULT NOW()
);
```

---

## 13. Route Map

```
/dashboard/lender                          Lender dashboard home
/dashboard/lender/leads                    Pre-qualified leads
/dashboard/lender/leads/[id]               Lead detail (anonymized)
/dashboard/lender/approvals                Pending loan approvals
/dashboard/lender/approvals/[id]           Approval review screen
/dashboard/lender/borrowers                Active borrower list
/dashboard/lender/borrowers/[id]           Borrower detail (non-anonymized)
/dashboard/lender/portfolio                Portfolio analytics
/dashboard/lender/reports                  CSV exports
/dashboard/lender/reports/transaction-log  Transaction download
/dashboard/lender/reports/portfolio-summary Portfolio download
/dashboard/lender/reports/default-registry Default registry download  
/dashboard/lender/settings                 Lending params, webhook, API key
```

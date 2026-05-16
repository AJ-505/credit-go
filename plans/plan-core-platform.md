# CreditGo Internal Platform Specification

> Document purpose: Granular implementation spec for the post-onboarding platform — Dashboard, Savings Vault, Marketplace/Lending, Profile, Trust Score mechanics, and ML feedback loop.
> Dependencies: Successful onboarding per `plans/SPEC-onboarding.md`. User has an active session, Trust Score, and Safe Limit.
> Audience: Implementation agents building screens, APIs, and ML integration.

---

## 1. Post-Onboarding Flow Overview

```
ONBOARDING COMPLETE
  │
  ▼
DASHBOARD (Home — main screen after login)
  ├── Trust Score gauge + tier badge
  ├── Safe Limit display
  ├── Savings Vault summary (balance + streak)
  ├── Quick action cards (Apply for financing, Save, View profile)
  └── Score improvement tips
        │
        ├────────────────┬─────────────────┬────────────────┐
        ▼                ▼                 ▼                ▼
   MARKETPLACE      SAVINGS VAULT      PROFILE (full)    LOAN DETAIL
   Browse assets    Manage auto-sweep   Sidebar nav       Active/past
   Filter by tier   View balance/hx     Settings, docs    Track repayment
   Apply for loan   Set save target     Linked accounts   Payment history
```

### 1.1 Layout Structure (Desktop)

```
+----------------------------------------------------------+
|  HEADER: Logo | Trust Score badge | Vault balance | Avatar |
+----------------------------------------------------------+
|  +-------------------+  +------------------------------+ |
|  |   SIDEBAR         |  |   MAIN CONTENT AREA           | |
|  |                   |  |                                | |
|  |  o Dashboard      |  |  (changes based on active      | |
|  |  o Marketplace    |  |   navigation item)             | |
|  |  o Savings Vault  |  |                                | |
|  |  o My Loans       |  |                                | |
|  |  o Profile        |  |                                | |
|  |                   |  |                                | |
|  +-------------------+  +------------------------------+ |
+----------------------------------------------------------+
```

- Desktop: Persistent sidebar (shadcn Sidebar component).
- Mobile: Bottom navigation bar (5 icons) + slide-out drawer for sidebar.
- Sidebar collapses to icons-only on tablet.

### 1.2 Navigation Items

| Icon | Label | Route | Description |
|---|---|---|---|
| Home | Dashboard | /dashboard | Main hub — score, vault, actions |
| Store | Marketplace | /marketplace | Browse financing options |
| Piggy | Savings Vault | /vault | Manage vault, auto-sweep, streak |
| File | My Loans | /loans | Active + past loans |
| User | Profile | /profile | Settings, history, linked accounts |

---

## 2. Dashboard (Home Screen)

### 2.1 Layout (Top to Bottom)

**Row 1 — Score + Safe Limit (side by side)**
```
+------------------+  +--------------------------------+
|  TRUST SCORE      |  |  SAFE LIMIT                    |
|  +------+        |  |  N650,000                      |
|  |  72  |        |  |  Available to borrow            |
|  | GOLD |        |  |                                |
|  +------+        |  |  [View Marketplace ->]         |
|  [+3 this month] |  |                                |
+------------------+  +--------------------------------+
```

- Trust Score: Circular gauge (0-100) with color band matching tier. Shows trend arrow (+3 this month, -2 this week, etc.).
- Safe Limit: Large number. Calculated as: `min(monthly_income * 0.15 * (1 + trust_score/100) * 12, tier_max)`.
- "View Marketplace" button links to `/marketplace`.

**Row 2 — Savings Vault Card**
```
+----------------------------------------------------------------+
|  SAVINGS VAULT                              [Manage ->]         |
|  +-----------------------------------------------------------------+
|  |  Vault Balance: N245,000  |  Streak: 12 days              |    |
|  |  ======================..  24% of this month               |    |
|  |  Auto-sweep: N5,000/day  |  Next: Today 6pm              |    |
|  +-----------------------------------------------------------------+
+----------------------------------------------------------------+
```

**Row 3 — Quick Action Cards (3-column grid)**
```
+--------------+  +--------------+  +--------------+
|  Get a Loan   |  |  Save Faster  |  |  Improve     |
|  Browse what  |  |  Increase     |  |  Take Credit  |
|  you qualify  |  |  your daily   |  |  School for  |
|  for          |  |  auto-sweep   |  |  +5 pts      |
|  [Browse ->]  |  |  [Adjust ->]  |  |  [Start ->]  |
+--------------+  +--------------+  +--------------+
```

**Row 4 — Score Improvement Tips (if applicable)**
- If bank not linked: "Link your bank to strengthen your income profile"
- If vault empty: "Start saving to build your streak"
- If LinkedIn not connected: "Connect LinkedIn for a score boost"

### 2.2 Empty States

| Condition | Widget Shows |
|---|---|
| No vault created yet | "Set up your repayment vault" prompt with CTA |
| No loan history | "You haven't taken any loans yet" with Marketplace link |
| Brand new (score just calculated) | Standard widgets, no history yet |

---

## 3. Marketplace / Lending Catalog

### 3.1 Overview

A catalog of real products with prices, filtered by the user's Trust Score tier and Safe Limit. The catalog is hardcoded with data researched from Nigerian retailers (Slot, Pointek, Jumia, iStore, etc.)

### 3.2 Product Catalog Data

All prices in Nigerian Naira (NGN). Sourced from live Nigerian retail listings as of May 2026.

**Category: Laptops**

| Product | Specs | Price (NGN) | Min Tier | Source Reference |
|---|---|---|---|---|
| MacBook Air 13" M2 (2022) | 8GB/256GB | 1,500,000 | Silver | Pointek/Slot |
| MacBook Air 13" M3 (2024) | 8GB/256GB | 1,800,000 | Silver | Jumia/Slot |
| MacBook Pro 14" M4 (2024) | 18GB/512GB | 2,700,000 | Gold | iStore/Pointek |
| MacBook Pro 16" M4 Max | 36GB/1TB | 3,700,000 | Platinum | iStore Nigeria |
| Dell XPS 14 (2026) | Core Ultra 7/16GB | 598,000 | Bronze | Laptop6 Nigeria |
| Dell XPS 15 OLED (2026) | Core Ultra 7/32GB | 874,000 | Silver | Laptop6 Nigeria |
| Dell XPS 16 (2026) | Core Ultra 9/32GB | 1,012,000 | Gold | Laptop6 Nigeria |
| HP EliteBook 840 G10 | i7/16GB/512GB | 850,000 | Silver | Slot Nigeria |
| Lenovo ThinkPad X1 Carbon | i7/16GB/512GB | 950,000 | Silver | Slot Nigeria |

**Category: Phones**

| Product | Specs | Price (NGN) | Min Tier | Source Reference |
|---|---|---|---|---|
| iPhone 16 Pro Max 256GB | A18 Pro/8GB | 2,100,000 | Gold | iStore Nigeria |
| iPhone 16 Pro Max 512GB | A18 Pro/8GB | 2,400,000 | Gold | Slot/Jumia |
| iPhone 16 Pro Max 1TB | A18 Pro/8GB | 2,900,000 | Platinum | Authorised Resellers |
| Samsung Galaxy S25 Ultra 256GB | Snapdragon/16GB | 1,000,000 | Silver | GSMarena Nigeria |
| Samsung Galaxy S25 Ultra 512GB | Snapdragon/16GB | 1,200,000 | Silver | Juma Mobile |
| Samsung Galaxy S25 Ultra 1TB | Snapdragon/16GB | 1,300,000 | Gold | GSMarena Nigeria |
| iPhone 16 256GB | A18/8GB | 1,200,000 | Silver | Slot |
| Tecno Camon 40 Pro | 8GB/256GB | 350,000 | Bronze | Konga |

**Category: Solar Power**

| Product | Specs | Price (NGN) | Min Tier | Source Reference |
|---|---|---|---|---|
| Mercury 3.5kVA Solar Kit | 5kWh LiFePO4 + 8 panels | 3,400,000 | Gold | Mercury Direct |
| Mercury 5kVA Solar Kit | 10kWh LiFePO4 + 16 panels | 5,538,000 | Platinum | Mercury Direct |
| 5kVA Hybrid System (Deye) | 10kWh battery + 4kWp panels | 4,800,000 | Gold | SolarInverter.ng |
| 3kVA Entry Solar System | Lights + fans + TV | 2,300,000 | Silver | PVPro Nigeria |
| 200Ah GEL Battery | Mercury Deep Cycle | 383,000 | Bronze | Mercury Direct |

**Category: Home Appliances**

| Product | Price (NGN) | Min Tier | Source |
|---|---|---|---|
| LG 43" 4K Smart TV | 450,000 | Bronze | Slot/Jumia |
| Samsung 65" 4K Smart TV | 1,200,000 | Silver | Slot |
| LG Twin Wash Washing Machine | 750,000 | Silver | Jumia |
| Samsung Inverter Refrigerator | 850,000 | Silver | Slot |
| Generac 5.5kVA Generator | 1,100,000 | Silver | Jumia |
| Inverter Air Conditioner 1.5HP | 650,000 | Bronze | Slot |

### 3.3 Catalog Display & Filtering

**Default View:** All products grouped by category tabs.

Each product card shows:
- Product image (placeholder or sourced)
- Product name + brief spec
- Price in NGN
- "You qualify" badge (green) or "Need X tier" badge (gray)
- Monthly installment estimate

**Filters:**
- Category tabs: All | Laptops | Phones | Solar | Appliances
- Sort: Price low-high | Price high-low | Tier required
- Toggle: "Show only items I qualify for" (default: ON)

**Tier Gating Logic:**
```
if product.min_tier == "Bronze":
    always visible
elif product.min_tier == "Silver" and user.tier in ["silver", "gold", "platinum"]:
    visible
elif product.min_tier == "Gold" and user.tier in ["gold", "platinum"]:
    visible
elif product.min_tier == "Platinum" and user.tier == "platinum":
    visible
else:
    grayed out with "Need Gold tier" overlay
```

**Safe Limit Filtering:**
```
if product.price > user.safe_limit_ngn:
    show "NXXX,XXX above your Safe Limit" warning
    BUT still visible (they can see what to work toward)
```

### 3.4 Product Detail Screen

When user taps a product card:

```
+----------------------------------------------------------------+
|  [Back to Marketplace]                                          |
|                                                                  |
|  MacBook Pro 14" M4 (2024)                                       |
|  18GB RAM / 512GB SSD                                            |
|  N2,700,000                                                      |
|                                                                  |
|  +------------------------------------------------------------+ |
|  |  YOU QUALIFY                                                | |
|  |  - Gold tier required — you are Gold                        | |
|  |  - N2,700,000 — within your N3,200,000 limit                | |
|  +------------------------------------------------------------+ |
|                                                                  |
|  Repayment Options:                                              |
|  +------------------------------------------------------------+ |
|  |  o 6 months:  N450,000/month                                | |
|  |  o 12 months: N225,000/month  [RECOMMENDED]                 | |
|  |  o 18 months: N150,000/month                                | |
|  +------------------------------------------------------------+ |
|                                                                  |
|  [Apply for Financing]                                           |
|                                                                  |
|  Note: This is not a purchase. We pay the merchant               |
|  directly. You repay us through your Savings Vault.              |
+----------------------------------------------------------------+
```

---

## 4. Loan Application Flow

### 4.1 Steps After "Apply"

```
User taps "Apply for Financing"
  |
  v
Step 1 — Confirm amount & tenor
  |         Product price: N2,700,000
  |         Selected: 12 months @ N225,000/month
  |
  v
Step 2 — ML Score check
  |         POST /score with requested_amount_ngn = 2,700,000
  |         If score drops due to high loan_to_income -> warn user
  |         "This loan may reduce your Trust Score. Continue?"
  |
  v
Step 3 — Confirm repayment via vault
  |         Auto-sweep will increase to N7,500/day to cover
  |         N225,000/month. Confirm?
  |
  v
Step 4 — Squad Direct Debit mandate setup
  |         POST /transaction/mandate/create
  |         Start date: today. End date: loan tenor.
  |         Amount: total repayment amount in kobo.
  |
  v
Step 5 — Squad Transfer to merchant
  |         POST /payout/transfer
  |         N2,700,000 to merchant's bank account
  |
  v
Step 6 — Loan active in user's account
  |         Track in "My Loans"
  |         Auto-sweep -> vault grows -> installments marked paid
```

### 4.2 Approval Rules

```
if user.trust_score < 30:
    reject: "Your Trust Score needs to reach 30+ for financing"
elif product.price > user.safe_limit_ngn:
    reject: "This exceeds your Safe Limit. Build your score to increase it."
elif user.trust_score >= lender_configured_min_score:
    approve (may be auto-approve if under auto_approve_threshold)
else:
    route to manual review (for lender to approve/reject)
```

### 4.3 Safe Limit Recalculation

Calculated server-side whenever Trust Score changes:
```
monthly_capacity = monthly_income * 0.15 * (1 + trust_score / 100)
total_limit      = monthly_capacity * 12
safe_limit_ngn   = min(total_limit, tier_max_cap)
```

| Tier | Hard Cap |
|---|---|
| Bronze | N200,000 |
| Silver | N1,000,000 |
| Gold | N5,000,000 |
| Platinum | N15,000,000 |

---

## 5. Savings Vault

### 5.1 What It Is

The Squad virtual account created during onboarding (or later if skipped). It holds funds used for loan repayment. It is LOCKED — funds cannot be withdrawn freely.

### 5.2 Funding Methods

| Method | Implementation | Triggers Score Signal |
|---|---|---|
| **Auto-sweep (primary)** | Squad Direct Debit mandate pulls from user's bank into vault daily | Yes — builds streak |
| **Manual transfer** | User sends money to their virtual account number from any bank | Partial — counts as one event |
| **Gig earnings** | Cr3dentials-connected platforms auto-deposit | Yes — proof of income |

### 5.3 Auto-Sweep Configuration

**Default:** N5,000/day (user can change).

**Squad API — Create Mandate:**
```
POST https://sandbox-api-d.squadco.com/transaction/mandate/create
Headers: { Authorization: "Bearer {{squad_secret}}" }
Body: {
  mandate_type: "emandate",
  amount: total_loan_amount_in_kobo,
  account_number: "{{user_bank_account}}",
  bank_code: "{{user_bank_code}}",
  start_date: "today",
  end_date: "loan_end_date",
  customer_email: "{{user_email}}",
  customerInformation: {
    identity: { type: "bvn", number: "{{user_bvn}}" },
    firstName: "{{firstname}}",
    lastName: "{{lastname}}",
    address: "{{address}}",
    phone: "{{phone}}"
  }
}
```

### 5.4 Streak Tracking

```
Daily check (cron, midnight):
  if vault received funds from auto-sweep today:
    streak_days += 1
  else:
    streak_days = 0
```

- Streak does NOT directly add score points.
- It's logged and informs the ML model when retrained.
- Model learns: "users with >30 day streaks default less."

### 5.5 Vault Page

```
+----------------------------------------------------------------+
|  SAVINGS VAULT                              [Settings]          |
|                                                                  |
|  Balance: N245,000                                               |
|  ====================..  40% toward N600K active loan           |
|                                                                  |
|  12-day streak                     [Share]                       |
|                                                                  |
|  --- Next Sweep -------------------------------------------------|
|  Today at 6:00 PM - N5,000                                       |
|  [Adjust Amount]  [Pause Sweep]                                  |
|                                                                  |
|  --- Recent Vault Activity ------------------------------------|
|  May 15  +N5,000  Auto-sweep                                     |
|  May 14  +N5,000  Auto-sweep                                     |
|  May 13  +N10,000 Manual top-up                                 |
|  May 12  +N5,000  Auto-sweep                                     |
|  May 11  MISSED   (failed)                                       |
|                                                                  |
|  [View All Transactions ->]                                      |
+----------------------------------------------------------------+
```

---

## 6. Loan Tracking (My Loans)

### 6.1 Active Loans List

Shows active loans with progress bar (installments paid / total). Each shows next installment due date, vault progress, and a "View Details" link.

Completed loans show payment summary (X of Y on-time, completion date).

### 6.2 Loan Detail Screen

Shows:
- Product name, amount, tenor, monthly payment
- Payment schedule with status per month
- Vault connection (current balance, next installment coverage status)
- Auto-sweep details (daily amount, next sweep time)

### 6.3 Repayment Mechanics

```
Monthly check (cron, 1st of month):
  if vault_balance >= installment_amount:
    mark_installment_paid(user, loan, month)
    deduct from vault (book entry)
  else:
    mark_installment_missed(user, loan, month)
    -> send SMS via Squad SMS API
    -> after 3 missed months: flag default
```

### 6.4 Default Handling

```
After 3 consecutive missed monthly installments:
  user.status = "defaulted"
  trust_score = 0 (hard reset via guardrails)
  lender notified via webhook

If user catches up (pays all missed):
  trust_score gradually recovers (model retrain picks this up)
  "delinquent_accounts" feature stays >0 for 24 months
```

---

## 7. Profile Page

### 7.1 Layout

Full page with sidebar navigation (shadcn Sidebar component). Mobile responsive — slides out as overlay drawer.

```
+--------------+--------------------------------------------------+
|  PROFILE     |  [Active sub-page Content]                        |
|  ----------  |                                                   |
|  Personal    |  (changes based on selected sidebar item)          |
|  Security    |                                                   |
|  Documents   |                                                   |
|  Bank Links  |                                                   |
|  Settings    |                                                   |
|              |                                                   |
|  ----------  |                                                   |
|  Log Out     |                                                   |
+--------------+--------------------------------------------------+
```

### 7.2 Sub-Pages

**Personal Info:** Name, email, phone, DOB (read-only from NIN), NIN/BVN (masked), state, persona.

**Security:** Change password, active sessions, 2FA toggle (future).

**Documents:** Payslip upload history, NIN/BVN verification status.

**Bank Links:** Linked bank accounts (Mono Connect), gig platforms (Cr3dentials), LinkedIn connection status.

**Settings:** Notification preferences (SMS on/off), auto-sweep default amount, dark mode toggle.

---

## 8. Trust Score Mechanics (ML-Driven)

### 8.1 Score Calculation

Per features.py > score_applicant():
1. Build feature vector from user data
2. XGBoost predicts default_probability (0.0-1.0)
3. model_score = 100 * (1 - default_probability)
4. Blended: (model_score * 0.7) + (base_score * 0.3)
5. Guardrails cap based on risk factors
6. Clamp 0-100

### 8.2 Recalculation Triggers

| Trigger | When | Effect |
|---|---|---|
| Vault sweep logged | Every sweep | Accumulates data |
| Installment paid | Monthly | Updates repayment history |
| New bank linked | User action | Updates features immediately |
| Employment verified | User action | Updates features immediately |
| Manual recalculate | User taps "Recalculate" | Forces full ML call |
| Weekly batch | Cron | Recalculates all active users |

### 8.3 ML Retraining (Weekly)

```
Frequency: Weekly (Sunday 3am)
Command: python train_model.py --sample-rows 200000
Data: Hugging Face datasets + internal repayment data
Output: new credit_xgb.joblib
```

The model learns patterns like:
- 30+ day vault streaks correlate with 40% fewer defaults
- Cr3dentials-verified freelancers default 25% less
- Govt workers with >5yr tenure default 50% less

### 8.4 User-Facing Score Impact

| Action | Score Effect | When |
|---|---|---|
| Complete identity verification | Removes cap (unlocks up to 54+) | Immediate |
| Complete employment verification | Removes cap (unlocks up to 59+) | Immediate |
| Maintain vault streak | Model sees reliability | Weekly batch |
| Pay installments on time | Lower default probability | Weekly batch |
| Reduce debt/DTI | Guardrail softens | Next recalc |
| Link bank (3+ months history) | Removes "thin history" cap (unlocks 64+) | Immediate |
| Miss sweep | Breaks streak, model sees inconsistency | Weekly batch |
| Miss installment | Guardrail caps at 69 or 44 | Next recalc |
| Default (3 missed) | Score resets to 0 | Immediate |

---

## 9. Squad API Integration Map

| Flow | Squad API | Endpoint |
|---|---|---|
| Create vault | Virtual Account | POST /virtual-account |
| Set up repayment mandate | Direct Debit | POST /transaction/mandate/create |
| Execute daily sweep | Direct Debit | POST /transaction/mandate/debit |
| Pay merchant on approval | Transfer | POST /payout/transfer |
| Send payment reminder | SMS | POST /vending/sms |
| Verify borrower bank | Resolve NUBAN | POST /payout/account/lookup |
| Query vault transactions | Virtual Account | GET /virtual-account/customer/transactions/{{id}} |
| Disburse loan | Transfer | POST /payout/transfer |
| Receive payment notifications | Webhook | POST to our URL |

---

## 10. Data Schema Additions

### 10.1 New Columns on user

```
vault_balance             REAL DEFAULT 0
streak_days               INTEGER DEFAULT 0
last_sweep_date           DATE
last_score_calculation    TIMESTAMP
score_history             JSONB
```

### 10.2 New Tables

See onboarding spec for full DDL. Additional tables:
- loan (id, user_id, product_name, price, tenor, installment, status, mandate_id)
- installment (id, loan_id, month_number, due_date, amount, status, paid_at)
- vault_transaction (id, user_id, type, amount_ngn, balance_after, reference)
- score_snapshot (id, user_id, score, safe_limit, tier, guardrails, model_version)

---

## 11. Route Map

```
/dashboard                        Dashboard home
/dashboard/marketplace             Product catalog
/dashboard/marketplace/[id]       Product detail + apply
/dashboard/vault                  Savings vault
/dashboard/vault/transactions     Vault history
/dashboard/loans                  My loans list
/dashboard/loans/[id]             Loan detail
/dashboard/profile                Profile (sidebar nav)
/dashboard/profile/personal       Personal info
/dashboard/profile/security       Password, sessions
/dashboard/profile/documents      Upload history
/dashboard/profile/banks          Linked accounts
/dashboard/profile/settings       Notifications, prefs
```

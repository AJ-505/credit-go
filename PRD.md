# Product Requirements Document — CreditGo

> **Status:** Draft v1.0
> **Target Market:** Nigeria & Africa (formally employed professionals, freelancers)
> **Theme:** Behavioral credit infrastructure powered by Save-to-Pay signals

---

## 1. Executive Summary

### 1.1 Problem

Millions of creditworthy Nigerians cannot access asset financing because traditional credit bureaus lack visibility into their savings behaviour, income patterns, and employment history. The 60% of adults without formal credit histories are locked out of buying laptops, phones, solar panels, and other productivity assets — even when they have the capacity to pay.

### 1.2 Solution

**CreditGo** is a behavioral credit infrastructure that connects three pillars:

| Pillar                | What It Does                                                                                                                                               | Why It Matters                                           |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| **Save-to-Pay Vault** | Users save directly on-platform or link existing savings (PiggyVest, Cowrywise, bank) to build a "Repayment Vault" that serves as psychological collateral | De-risks borrowers without requiring physical collateral |
| **Asset Marketplace** | Users buy electronics, solar, and appliances via BNPL/installments through integrated provider network                                                     | Converts savings history into purchasing power           |
| **Task Marketplace**  | Freelancers complete micro-gigs (content writing, design, data entry, virtual assistance) on-platform as proof of consistent income                        | Gives gig-economy workers a credit path                  |

### 1.3 Unique Value Proposition

> "CreditGo is not a lender. We are a **trust intelligence layer** that uses your savings behaviour, work history, and spending patterns to unlock asset financing — no collateral, no traditional credit score required."

**Core innovations:**

- **Savings-Linked Credit** — First platform in Nigeria to use PiggyVest/Cowrywise savings history as a credit signal
- **Proof-of-Work Scoring** — Freelancers build credit by completing verifiable micro-gigs rather than submitting bank statements
- **Real-time Trust Score** — BTS (Behavioral Trust Score) updates daily based on savings streaks, not monthly bureau reports

---

## 2. Target Audiences

### 2.1 Borrower Segments

| Segment                       | Size                  | Key Need                              | Verification Method                        |
| ----------------------------- | --------------------- | ------------------------------------- | ------------------------------------------ |
| **Government Workers**        | ~4M                   | Salary advances, device financing     | IPPIS number, official ID, payroll history |
| **Corporate Employees**       | ~8M                   | Laptop, phone, solar financing        | Work email, LinkedIn, 6-month statement    |
| **Freelancers / Gig Workers** | ~20M+                 | Income-smoothing, equipment financing | Mono open banking, platform work history   |
| **Savings-First Users**       | ~6M (PiggyVest users) | Convert savings into purchasing power | PiggyVest API, savings history             |

### 2.2 Lender Segments

| Segment                                   | Need                                                |
| ----------------------------------------- | --------------------------------------------------- |
| **BNPL Providers** (Carbon Zero, CredPal) | Pre-qualified leads with verifiable savings history |
| **Device Financing Companies**            | Risk-scored borrowers with active repayment vaults  |
| **Micro-lenders**                         | Real-time savings health monitoring                 |
| **Solar/Asset Finance Companies**         | Automated underwriting for green assets             |

---

## 3. The Three Pillars — Detailed

### 3.1 Pillar 1: Save-to-Pay Vault

This is the core differentiator. Users build a "Repayment Vault" that serves as psychological collateral.

#### 3.1.1 External Savings Linking

Users connect existing savings accounts from:

| Platform                  | Integration Method                                                      | What We Read                                |
| ------------------------- | ----------------------------------------------------------------------- | ------------------------------------------- |
| **PiggyVest**             | PiggyVest Business API (via customer wallet interest/balance endpoints) | Savings balance, streak length, total saved |
| **Cowrywise**             | Mono open banking (if bank-linked) or statement upload                  | Savings history                             |
| **Bank Savings Accounts** | Mono Financial Data API                                                 | Transaction history, average balance        |

**API Integration Detail (PiggyVest via Mono):**
Since PiggyVest doesn't expose a read-only savings-history API, we use **Mono Connect** → user authenticates their PiggyVest wallet bank account → Mono returns transaction history showing inflows/outflows to PiggyVest. This reveals:

- Regularity of savings (weekly/biweekly/monthly)
- Amount consistency
- Withdrawal patterns (frequent vs. disciplined)

#### 3.1.2 On-Platform Savings (Direct Vault)

Users can save directly into a CreditGo-managed wallet:

| Feature                  | Details                                                                                   |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| **Daily Savings Streak** | Auto-sweep from bank account via Squad Direct Debit mandate                               |
| **Vault Types**          | Locked (cannot withdraw until loan repaid), Flex (can withdraw but loses streak)          |
| **Interest**             | Users earn interest on vault balances (powered by PiggyVest Business wallet interest API) |
| **Target-Based**         | "Save ₦50,000 in 3 months to unlock ₦350,000 device financing"                            |

**Technical Implementation:**

- Squad Direct Debit Mandate → daily/weekly sweep
- PiggyVest Business Wallet API → store funds in interest-yielding wallets
- Squad Virtual Account → each user gets a dedicated account number for manual top-ups

#### 3.1.3 "Save-to-Pay" Flow

```
User selects asset → "Unlock with Save-to-Pay"
→ System calculates: "Save ₦15,000/day for 60 days = ₦900,000 vault"
→ Auto-mandate created via Squad Daily Debit
→ Vault fills → Asset released → Repayments deducted from vault
→ Trust Score ticks up with each successful save
```

### 3.2 Pillar 2: Asset Marketplace (BNPL / Device Financing)

Users buy electronics, appliances, solar, and other assets through CreditGo's integrated provider network.

#### 3.2.1 Available Asset Categories

| Category            | Examples                        | Provider Integration                  | Typical Price Range |
| ------------------- | ------------------------------- | ------------------------------------- | ------------------- |
| **Laptops**         | MacBook, Dell, HP, Lenovo       | Direct partnerships + PoS integration | ₦250K - ₦2M         |
| **Phones**          | iPhone, Samsung, Tecno, Infinix | PoS integration + distributor APIs    | ₦100K - ₦1.5M       |
| **Solar**           | Panels, inverters, batteries    | Solar provider partnerships           | ₦500K - ₦5M         |
| **Home Appliances** | Generators, fridges, AC         | Retailer partnerships                 | ₦200K - ₦1M         |

#### 3.2.2 How It Works (Provider-Agnostic)

We don't hold inventory. We act as a **credit layer** on top of existing merchants:

1. User selects "MacBook Pro — ₦1.2M" on CreditGo marketplace
2. CreditGo checks Trust Score + Vault balance
3. If approved: CreditGo pays the merchant via Squad Transfer API
4. User repays CreditGo via vault deductions or installments
5. Merchant knows nothing about the credit — they just receive full payment

**Provider Integration Points:**

| Method                  | Providers                      | How                                                        |
| ----------------------- | ------------------------------ | ---------------------------------------------------------- |
| **PoS / Inventory API** | Slot, Pointek, 3C+             | Real-time price & stock sync                               |
| **Affiliate Links**     | Jumia, Konga                   | Track purchases; CreditGo pays on confirmation             |
| **Direct Partnership**  | Solar providers, SME suppliers | Invoice-based; CreditGo disburses on delivery confirmation |

#### 3.2.3 Repayment Models

| Model              | Description                           | Best For                      |
| ------------------ | ------------------------------------- | ----------------------------- |
| **Vault Drawdown** | Lump sum repaid from vault balance    | Large purchases (solar)       |
| **Installments**   | Monthly deductions from vault or bank | Electronics (phones, laptops) |
| **Income Share**   | % of future Task Marketplace earnings | Freelancers                   |

### 3.3 Pillar 3: Task Marketplace (Proof-of-Work for Freelancers)

A micro-gig platform where freelancers complete verifiable tasks to build their credit profile.

#### 3.3.1 Task Categories

| Category               | Examples                                                | Payout (Per Task) | Verification Method             |
| ---------------------- | ------------------------------------------------------- | ----------------- | ------------------------------- |
| **Content Writing**    | Blog posts, product descriptions, social media captions | ₦2K - ₦20K        | Editor approval + client rating |
| **Data Entry**         | Form filling, spreadsheet cleaning, data extraction     | ₦1K - ₦10K        | Automated validation            |
| **Design**             | Canva flyers, social media graphics, basic logos        | ₦3K - ₦15K        | Client approval                 |
| **Virtual Assistance** | Email management, scheduling, research                  | ₦5K - ₦30K        | Time-tracked + client rating    |
| **Transcription**      | Audio/video to text                                     | ₦2K - ₦8K         | Automated accuracy check        |
| **AI Training**        | Data labeling, content moderation, prompt testing       | ₦3K - ₦12K        | Quality score                   |

#### 3.3.2 Credit Impact Model

Each completed task contributes to the freelancer's Trust Score:

| Factor                   | Weight | How It Works                                 |
| ------------------------ | ------ | -------------------------------------------- |
| **Task Completion Rate** | 30%    | % of accepted tasks completed on time        |
| **Earnings Consistency** | 25%    | Number of weeks with ≥ 1 completed task      |
| **Client Rating**        | 20%    | Average rating across completed tasks        |
| **Earnings Growth**      | 15%    | Trajectory of per-task earnings over time    |
| **Task Diversity**       | 10%    | Number of distinct task categories attempted |

#### 3.3.3 Business Model

- **CreditGo takes 10-15%** of task payout as platform fee
- **Task providers** (businesses posting gigs) pay a posting fee or subscribe monthly
- **Freelancers** get credit-score-building as a secondary benefit beyond cash earnings

---

## 4. Behavioral Trust Score (BTS)

The BTS is the central engine. It ranges from **0 to 100** and updates daily.

### 4.1 Score Components

| Component                 | Weight | Source                                        | Update Frequency |
| ------------------------- | ------ | --------------------------------------------- | ---------------- |
| **Savings Streak**        | 35%    | Vault balance + daily save consistency        | Daily            |
| **On-time Repayment**     | 30%    | Installment payment history                   | Per payment      |
| **Account Liquidity**     | 15%    | Average vault balance over 30 days            | Daily            |
| **Income Stability**      | 10%    | Consistency of income (bank or task earnings) | Weekly           |
| **Identity Verification** | 10%    | BVN/NIN + email domain + task rating          | One-time         |

### 4.2 Score Tiers

| Tier         | Score Range | Unlocks                                        |
| ------------ | ----------- | ---------------------------------------------- |
| **Bronze**   | 0-30        | Access to Task Marketplace only                |
| **Silver**   | 31-55       | Devices up to ₦200K; 50% down payment required |
| **Gold**     | 56-75       | Devices up to ₦1M; 25% down payment            |
| **Platinum** | 76-100      | Devices up to ₦5M; 0% down; best rates         |

### 4.3 Gamification Mechanics

| Mechanic                 | Effect                                                       |
| ------------------------ | ------------------------------------------------------------ |
| **Daily Savings Streak** | +1 point per day (capped at 35 pts); resets to 0 if missed   |
| **Milestone Badges**     | "7-Day Streak", "First Repayment", "₦100K Saved"             |
| **Score Boosts**         | Complete "Credit School" (+5 pts), refer a friend (+3 pts)   |
| **Penalties**            | Missed repayment (-15 pts), early vault withdrawal (-10 pts) |

---

## 5. Functional Requirements

### 5.1 Borrower-Side Requirements

| ID    | Requirement                                                                          | Priority |
| ----- | ------------------------------------------------------------------------------------ | -------- |
| FR-01 | User can sign up with email/phone + BVN verification (via Squad BVN API)             | P0       |
| FR-02 | User can link external savings accounts (PiggyVest via Mono, bank accounts via Mono) | P0       |
| FR-03 | User can create an on-platform savings vault with auto-debit mandate                 | P0       |
| FR-04 | User can view their Behavioral Trust Score with breakdown                            | P0       |
| FR-05 | User can browse Asset Marketplace filtered by score tier & category                  | P0       |
| FR-06 | User can apply for asset financing with one-click approval                           | P0       |
| FR-07 | User can browse and accept micro-tasks in Task Marketplace                           | P1       |
| FR-08 | User can view task history and earnings dashboard                                    | P1       |
| FR-09 | User can complete "Credit School" interactive onboarding                             | P1       |
| FR-10 | User can set savings targets linked to specific asset goals                          | P1       |
| FR-11 | User can refer friends and earn score boosts                                         | P2       |
| FR-12 | User can download transaction history and score PDF                                  | P2       |

### 5.2 Lender-Side Requirements

| ID     | Requirement                                                                   | Priority |
| ------ | ----------------------------------------------------------------------------- | -------- |
| FR-L01 | Lender can register and complete business KYC                                 | P0       |
| FR-L02 | Lender can configure risk filters (min score, asset type, user category)      | P0       |
| FR-L03 | Lender can view pre-qualified leads matching their parameters                 | P0       |
| FR-L04 | Lender can view "Savings Health" of active borrowers in real-time             | P0       |
| FR-L05 | Lender can approve/reject loan requests with one click                        | P1       |
| FR-L06 | Lender can report defaults to shared registry                                 | P1       |
| FR-L07 | Lender can view portfolio analytics (default rate, avg score, total exposure) | P1       |
| FR-L08 | Lender receives webhook notifications on borrower score changes               | P2       |

### 5.3 System-Wide Requirements

| ID     | Requirement                                                                                 | Priority |
| ------ | ------------------------------------------------------------------------------------------- | -------- |
| FR-S01 | Automated underwriting engine calculates Safe Limit (max 35% DTI)                           | P0       |
| FR-S02 | Behavioral Trust Score recalculates daily                                                   | P0       |
| FR-S03 | Shared Default Registry — borrower flagged by one lender triggers ecosystem-wide score drop | P0       |
| FR-S04 | Squad webhook receiver for payment/disbursement notifications                               | P0       |
| FR-S05 | Email + SMS notifications (via Squad SMS API) for due payments                              | P1       |
| FR-S06 | Admin dashboard for CreditGo operators                                                      | P1       |
| FR-S07 | Audit log for all score changes and financial transactions                                  | P2       |

---

## 6. Nigerian API Integrations (Real)

### 6.1 Identity & Verification

| API                            | Purpose                                                   | Endpoint                  | Cost                    |
| ------------------------------ | --------------------------------------------------------- | ------------------------- | ----------------------- |
| **Squad BVN Resolution**       | Verify BVN details                                        | `Squad profile API`       | Free with Squad account |
| **Mono Identity Verification** | NIN lookup, name match                                    | `POST /v2/lookup`         | Pay-per-call            |
| **Mono Lookup**                | NIN verification/validation for borrower and director KYC | `POST /v3/lookup/nin`     | Partner lookup pricing  |
| **LumiID**                     | CAC verification only until CAC migrates                  | `POST /identities/verify` | ₦50-₦150 per call       |

### 6.2 Open Banking & Data

| API                 | Purpose                                | Endpoint                                    | Cost                                |
| ------------------- | -------------------------------------- | ------------------------------------------- | ----------------------------------- |
| **Mono Connect**    | Link bank accounts, fetch transactions | `Mono Connect SDK` + `GET /v2/transactions` | Free to connect; pay-per-data-fetch |
| **Mono Statements** | Fetch 6-12 month bank statements       | `POST /v2/statements`                       | Per statement                       |
| **Mono Income**     | Income analysis from transaction data  | `GET /v2/income`                            | Per analysis                        |

### 6.3 Savings Integration

| API                           | Purpose                                    | Endpoint                                               | Cost            |
| ----------------------------- | ------------------------------------------ | ------------------------------------------------------ | --------------- |
| **PiggyVest Business**        | Create wallets, accrue interest, transfers | `POST /api/wallet/create`, `POST /api/wallet/interest` | Per transaction |
| **PiggyVest Pay with Pocket** | Direct payment from user's Pocket          | SDK integration                                        | Per transaction |

Note: For reading PiggyVest savings history, we use **Mono Connect** — the user authenticates via Mono, which connects to their bank account. PiggyVest inflows/outflows appear as bank transactions tagged with "PIGGYVEST" or "SAVINGS" descriptors, enabling us to infer savings behavior.

### 6.4 Payments & Transfers

| API                         | Purpose                                   | Endpoint                           | Cost                   |
| --------------------------- | ----------------------------------------- | ---------------------------------- | ---------------------- |
| **Squad Payment Gateway**   | Card payments, USSD, bank transfers       | `POST /transaction/initiate`       | 1.2%/txn (cap ₦1,500)  |
| **Squad Transfer API**      | Disburse funds to merchants/lenders       | `POST /payout/transfer`            | ₦8-₦40/txn             |
| **Squad Direct Debit**      | Auto-sweep from user bank account         | `POST /transaction/mandate/create` | Per txn fee            |
| **Squad Virtual Account**   | Dedicated account numbers for user vaults | `POST /virtual-account`            | 0.25%/txn (cap ₦1,000) |
| **Squad Recurring Charges** | Tokenize card for recurring repayments    | `POST /transaction/charge_card`    | Per txn fee            |

### 6.5 Communication

| API               | Purpose                            | Endpoint            | Cost      |
| ----------------- | ---------------------------------- | ------------------- | --------- |
| **Squad SMS API** | Repayment reminders, score updates | `POST /vending/sms` | Per SMS   |
| **Termii**        | OTP, transactional SMS             | Various             | ₦2-₦4/SMS |

### 6.6 VAS (Value Added Services)

| API                       | Purpose                                         | Endpoint                         |
| ------------------------- | ----------------------------------------------- | -------------------------------- |
| **Squad Airtime Vending** | Users can buy airtime/data from dashboard       | `POST /vending/purchase/airtime` |
| **Squad Electricity**     | Pay electricity bills (data source for scoring) | `POST /vending/electricity`      |

---

## 7. User Flows

### 7.1 Borrower Journey

```
1. LANDING
   └── User selects language (English, Pidgin, Yoruba, Hausa, Igbo)
   └── Views "Check Your Trust Score" CTA
   └── Sees demo calculator: "Enter your income to see your Safe Limit"

2. ONBOARDING
   └── Email/Phone + OTP verification (via Termii)
   └── BVN/NIN verification (via Squad BVN API)
   └── "Which path best describes you?"
       ├── Government Worker → IPPIS number / official ID upload
       ├── Corporate Employee → Work email verification + LinkedIn
       └── Freelancer → Link bank account (Mono) + Task Marketplace intro

3. THE CONNECTORS
   └── "Link your savings" → Mono Connect → reads bank history
       └── Detects PiggyVest/Cowrywise patterns in transaction history
       └── Shows: "We found your PiggyVest savings! ₦250,000 saved over 8 months"
   └── "Set up your Vault" → Squad Direct Debit mandate → auto-sweep
       └── "Save ₦5,000 daily" or custom amount

4. THE REVEAL
   └── "Congratulations Chidi! Your Safe Limit is ₦650,000"
   └── "Your Trust Score is 62 (Rising — save for 3 more days to reach Silver tier)"
   └── SHAP breakdown: "Savings: +28 | Income: +20 | Identity: +14"

5. CREDIT SCHOOL
   └── 3-minute interactive: "How not to let debt show you pepper"
   └── Covers: interest rates, missed payment penalties, vault benefits
   └── Quiz at end → +5 Trust Score boost

6. MARKETPLACE
   └── Filter: Laptops | Phones | Solar | Appliances
   └── Each item shows: price, monthly payment, "You need Trust Score: 50+"
   └── "Unlock with Save-to-Pay" button

7. SAVE-TO-PAY ACTIVATION
   └── User selects "MacBook Pro — ₦1.2M"
   └── System: "Save ₦20,000/day for 60 days to unlock this MacBook"
   └── User confirms → Daily mandate activated
   └── Countdown: "57 days until your MacBook ships"
   └── Visual progress bar fills as vault grows

8. ASSET RELEASED
   └── Vault reaches target → CreditGo pays merchant via Squad Transfer
   └── Notification: "Your MacBook has been shipped! Tracking: ABC123"
   └── Trust Score ticks up: "On-time vault completion +10 points"

9. REPAYMENT PHASE
   └── If installment model: monthly deductions from vault
   └── User can top up vault manually anytime
   └── SMS reminders 3 days before due date
   └── Score updates with each successful payment
```

### 7.2 Lender Journey

```
1. LENDER KYC
   └── Business registration number (CAC)
   └── Capital verification (bank statement)
   └── Sign agreement with CreditGo

2. CONFIGURATION
   └── "I want to finance: [Solar Panels] [Laptops] [All Categories]"
   └── "Minimum Trust Score: [70]"
   └── "User Category: [Freelancers] [Government Workers] [All]"
   └── "Auto-approve loans under ₦[500,000]"

3. LEAD MANAGEMENT
   └── Dashboard shows matching pre-qualified leads
   └── Columns: Name | Score | Vault Balance | Requested Asset | Status
   └── One-click: Approve | Reject | Request More Info

4. LIVE MONITORING (BORROWER SAVINGS HEALTH)
   └── For each active borrower:
       └── Current vault balance vs. expected
       └── Days since last save (green/amber/red)
       └── Score trend (up/down arrow with %)
   └── Real-time webhook on score drops below threshold

5. DISBURSEMENT
   └── Auto-disbursement on approval (Squad Transfer API)
   └── Escrow hold until delivery confirmed
   └── Release to merchant on confirmation

6. REPORTING
   └── Portfolio summary: Active loans, default rate, avg score
   └── CSV export for accounting
   └── Tax-compliant transaction logs

7. BLACKLIST TRIGGER
   └── One-click: "Report Default"
   └── Federated to all lenders on CreditGo network
   └── Borrower's Trust Score drops to 0
   └── Reported to CRC Credit Bureau / FirstCentral
```

### 7.3 Freelancer Task Journey

```
1. TASK DISCOVERY
   └── Freelancer enters Task Marketplace from dashboard
   └── Filter by: category, pay range, estimated time
   └── See: "Complete 5 tasks this week to boost your score +8 pts"

2. TASK ACCEPTANCE
   └── User reads task brief
   └── "Write 500-word blog post: 'Solar Energy in Nigeria'"
   └── Accept → timer starts
   └── Access to task resources and submission portal

3. SUBMISSION & VERIFICATION
   └── User submits work
   └── Automated checks (if data entry) or client review
   └── Rating given (1-5 stars)
   └── Payout released to CreditGo vault or bank account

4. SCORE IMPACT
   └── Immediate Trust Score update:
   └── "+3 points for completing task on time"
   └── "+2 points for 5-star rating"
   └── Vault grows → unlocks higher-tier financing options
```

---

## 8. Non-Functional Requirements

| Requirement           | Specification                                                 |
| --------------------- | ------------------------------------------------------------- |
| **Performance**       | Trust Score calculation < 2s; page load < 3s on 3G            |
| **Availability**      | 99.5% uptime (Squad APIs have separate SLA)                   |
| **Security**          | AES-256 at rest; TLS 1.3 in transit; HMAC webhook validation  |
| **Compliance**        | NDPA 2023, CBN Open Banking Framework, FCCPC DEON Regulations |
| **Scalability**       | Handle 10K concurrent users at MVP (horizontal scaling ready) |
| **Accessibility**     | PWA with offline mode; screen-reader compatible               |
| **Data Localization** | Primary DB within Nigeria (or cloud with NDPA compliance)     |

---

## 9. Success Metrics (KPIs)

### 9.1 Launch Metrics (3 Months)

| Metric                                    | Target       |
| ----------------------------------------- | ------------ |
| Total registered users                    | 5,000        |
| Active vault users (saved in last 7 days) | 1,500        |
| Assets financed via marketplace           | 500          |
| Task Marketplace completions              | 2,000        |
| Average Trust Score improvement per user  | +8 pts/month |
| Default rate (over 90 days)               | < 5%         |
| Lender partners onboarded                 | 10           |

### 9.2 Behavioral Metrics

| Metric                           | Definition                                              |
| -------------------------------- | ------------------------------------------------------- |
| **Savings Streak Retention**     | % of users maintaining 7+ day streak after 30 days      |
| **Vault-to-Purchase Conversion** | % of users who reach vault target and complete purchase |
| **Task Repeat Rate**             | % of freelancers who complete > 5 tasks                 |
| **Score Accuracy**               | Correlation between Trust Score and actual repayment    |
| **NPS**                          | User satisfaction (target: 40+)                         |

---

## 10. Competitive Landscape

| Competitor      | Strengths                    | Weaknesses                                      | Our Advantage                                |
| --------------- | ---------------------------- | ----------------------------------------------- | -------------------------------------------- |
| **Carbon Zero** | Large user base, brand trust | Only salary earners, no savings integration     | Freelancers welcome, savings-linked credit   |
| **CredPal**     | 13K+ merchants, high limits  | Traditional underwriting, no behavioral scoring | Behavioral scoring, proof-of-work            |
| **Veend**       | Focused on govt workers      | Extremely narrow segment                        | Multi-segment (govt + corporate + freelance) |
| **M-KOPA**      | Proven in asset financing    | Kenya-focused, hardware-heavy                   | Nigeria-first, SaaS/platform model           |
| **FairMoney**   | Strong ML credit scoring     | Short-term loans only, not asset financing      | Asset marketplace + savings vault            |
| **Branch**      | Large user base              | Not asset-specific, high interest               | Save-to-Pay lowers risk and rates            |

---

## 11. Monetisation Model

| Revenue Stream            | How It Works                                                         | Target Margin   |
| ------------------------- | -------------------------------------------------------------------- | --------------- |
| **Lender Fee**            | 2-5% of each financed asset (paid by lender)                         | Primary revenue |
| **Task Marketplace Fee**  | 10-15% of task payout                                                | Growth revenue  |
| **Vault Interest Spread** | Interest paid by PiggyVest Business (pass some to user, keep spread) | 1-2% margin     |
| **Premium Tiers**         | "Pro" subscription: higher score ceiling, priority support           | ₦2,500/month    |
| **API Access**            | Third-party lenders pay for creditGo score API access                | Per-call        |

---

## 12. Implementation Phases

| Phase                         | Timeline    | Focus                                                                 |
| ----------------------------- | ----------- | --------------------------------------------------------------------- |
| **Phase 1: Foundation**       | Weeks 1-4   | Auth, BVN/KYC, Mono Connect, Basic Trust Score, Vault creation        |
| **Phase 2: Marketplace**      | Weeks 5-8   | Asset catalog, provider integrations, disbursement flow, direct debit |
| **Phase 3: Tasks**            | Weeks 9-12  | Task Marketplace, gig verification, score impact model                |
| **Phase 4: Lender Dashboard** | Weeks 13-16 | Risk filtering UI, real-time monitoring, default registry             |
| **Phase 5: Growth**           | Weeks 17-20 | Referrals, gamification, premium tiers, API access                    |

---

## 13. Risks & Mitigation

| Risk                                       | Likelihood | Impact | Mitigation                                                                     |
| ------------------------------------------ | ---------- | ------ | ------------------------------------------------------------------------------ |
| **PiggyVest blocks API scraping via Mono** | Medium     | High   | Direct PiggyVest Business API partnership; also accept manual statement upload |
| **Freelancers fake task completions**      | High       | Medium | Automated quality checks; client verification; CAPTCHA-style validation tasks  |
| **Lenders don't trust behavioral scoring** | High       | High   | Start with one anchor lender; prove low default rate with MVP data             |
| **Squad Direct Debit sandbox limitations** | Medium     | Medium | Card tokenization as fallback for MVP                                          |
| **Regulatory changes (NDPA, FCCPC)**       | Low        | High   | Legal counsel; build explainable AI; user consent flows                        |
| **Default rate > 10%**                     | Medium     | High   | Conservative vault requirements; strict score thresholds initially             |

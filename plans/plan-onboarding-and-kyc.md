# CreditGo Onboarding Specification

> **Document purpose:** Granular implementation spec for borrower & lender onboarding flows.
> **APIs in use:** Mono Lookup (NIN), LumiID (CAC until CAC migrates), Mono Telco Data (phone), Mono Connect (bank), Squad (BVN validation, virtual accounts, payments), Cr3dentials (gig income verification), LinkedIn OAuth (optional score boost).
> **ML Service:** Python/FastAPI/XGBoost at `src/services/ml/`.

---

## 1. Overview

CreditGo has two distinct onboarding flows served from separate entry points on the landing page:

| Entry        | Tab           | Link Target          |
| ------------ | ------------- | -------------------- |
| **Borrower** | "For Earners" | `/onboarding`        |
| **Lender**   | "For Lenders" | `/onboarding/lender` |

Borrower flow has 8 steps. Lender flow has 5 steps.

---

## 2. Borrower Onboarding Flow (8 Steps)

### 2.1 High-Level Sequence

```
LANDING ("Check My Safe Limit" / "Get Started")
  │
  ▼
STEP 1 ── NIN Verification (Mono Lookup)
  │         └── pre-fills: name, DOB, phone, photo, address, state
  │
  ▼
STEP 2 ── Phone Verification (Mono Telco Data)
  │         └── OTP → telco identity + cross-check with NIN
  │
  ▼
STEP 3 ── BVN Validation (Squad Virtual Account side-effect)
  │         └── validates BVN matches NIN details, creates vault account
  │
  ▼
STEP 4 ── Account Creation
  │         └── email + password, session created
  │
  ▼
STEP 5 ── Role Selection
  │         ├── Freelancer / Gig Worker
  │         ├── Corporate Employee
  │         └── Government Worker
  │
  ▼
STEP 6 ── Role-Specific Verification
  │         ├── Freelancer → Mono Connect + Cr3dentials + LinkedIn (opt)
  │         ├── Corporate → Work email OTP + Payslip OCR + Mono Connect + LinkedIn (opt)
  │         └── Government → Agency info + Payslip OCR + Mono Connect
  │
  ▼
STEP 7 ── ML Scoring (XGBoost)
  │         └── Trust Score (0-100) + SHAP breakdown + Safe Limit
  │
  ▼
STEP 8 ── DASHBOARD
            └── Score gauge, Safe Limit, vault prompt, action items
```

---

### 2.2 Step 1: NIN Verification

**Screen:** Single field — 11-digit NIN input.

| Element   | Detail                                              |
| --------- | --------------------------------------------------- |
| Title     | "Verify your identity"                              |
| Subtitle  | "Enter your National Identification Number"         |
| Input     | 11-digit numeric, digits only                       |
| CTA       | "Continue"                                          |
| Help text | "Your NIN is on your NIMC slip or SIM registration" |

**Business Rules:**

- NIN exactly 11 digits. Reject < 11 or > 11.
- Max 3 failed attempts per IP per hour. Lock for 1 hour on 3rd failure.
- NIN stored in `user.nin` after success.

**API Call — Mono NIN Lookup:**

```
POST https://api.withmono.com/v3/lookup/nin
Headers: { mono-sec-key: "{{mono_secret}}", Content-Type: "application/json" }
Body: { "nin": "89184072280" }
```

**Success Response — map to these fields:**

```
data.firstname          → user's legal first name
data.lastname           → user's legal last name
data.middlename         → user's middle name (optional, can be empty)
data.phone              → registered mobile number
data.gender             → "m" or "f"
data.birthdate          → "DD-MM-YYYY" format
data.photo              → base64 JPEG (store for future face match)
data.residence.address1 → address line
data.residence.town     → town/city
data.residence.lga      → local government area
data.residence.state    → state of residence
```

**State → Risk Bucket Mapping (in code):**

```
Low risk states (bucket 1): Lagos, Abuja FCT, Rivers
Medium risk states (bucket 2): Ogun, Oyo, Kaduna, Edo, Delta, Akwa Ibom
Higher risk states (bucket 3-5): All others bucketed by economic indicators
Unknown/empty: bucket 0
```

**Error States:**

| HTTP                        | UX Message                                                  | Action                  |
| --------------------------- | ----------------------------------------------------------- | ----------------------- |
| 400 NIN_NOT_FOUND           | "No record found for this NIN. Double-check and try again." | User re-enters          |
| 400 NIN_VERIFICATION_FAILED | "Verification failed. Please try again or contact support." | User re-tries           |
| 429 Rate limit              | "Too many attempts. Please wait 1 hour."                    | Block + countdown timer |
| 5xx / Network               | "Connection error. Please check your internet."             | Retry button            |
| Empty photo field           | Continue anyway (photo is informational, not blocking)      |                         |

**ML Fields Set:**

```
identity_verified = true
state_risk_bucket = map_residence_state(data.residence.state)
```

---

### 2.3 Step 2: Phone Verification (Mono Telco Data API)

**Screen:** Phone confirmation + telco selection.

| Element        | Detail                                               |
| -------------- | ---------------------------------------------------- |
| Title          | "Confirm your phone number"                          |
| Pre-filled     | Phone from NIN response (read-only)                  |
| Alternative    | "Use a different number" link (opens editable field) |
| Telco selector | MTN / Airtel radio buttons                           |
| CTA            | "Send OTP"                                           |
| OTP input      | 6-digit, appears after send                          |
| Resend         | "Resend OTP" — 30s cooldown                          |

**Flow Sequence:**

1. Phone pre-filled from NIN (Step 1). User can edit if different.
2. User selects telco (MTN or Airtel — the two Mono supports).
3. Mono sends OTP to phone number.
4. User enters OTP. Session ID is valid for 10 minutes.
5. On success: Mono returns permanent Account ID. We fetch identity.
6. Cross-validate: Mono Telco identity name matches Mono Lookup NIN name. Mismatch → flag (non-blocking).

**API Calls:**

```
Step 2a — Initiate:
POST https://api.withmono.com/v3/telco/login
Headers: { mono-sec-key: "{{mono_secret}}" }
Body: { phone: "08012345678", provider: "mtn" | "airtel" }
→ Response: { session_id: "uuid", message: "OTP sent" }

Step 2b — Verify OTP:
POST https://api.withmono.com/v3/telco/verify-otp
Headers: { mono-sec-key: "{{mono_secret}}" }
Body: { session_id: "uuid", otp: "123456" }
→ Response: { code: "temp_exchange_token" }

Step 2c — Exchange for permanent ID:
POST https://api.withmono.com/v3/telco/exchange-token
Headers: { mono-sec-key: "{{mono_secret}}" }
Body: { code: "temp_exchange_token" }
→ Response: { account_id: "perm_account_id" }

Step 2d — Fetch identity:
GET https://api.withmono.com/v3/telco/identity/{{account_id}}
Headers: { mono-sec-key: "{{mono_secret}}" }
→ Response: { fullName, gender, dateOfBirth, phoneNumber }
```

**Cross-Validation Logic:**

```
nin_name      = data.firstname + " " + data.lastname   (from Mono Lookup)
mono_name     = response.fullName                      (from Mono Telco)
match_score   = string_similarity(nin_name, mono_name)

if match_score < 0.7:
    flag "identity_name_mismatch" in user record (non-blocking, fraud signal)
```

**Error States:**

| Error                   | UX                                             | Action                |
| ----------------------- | ---------------------------------------------- | --------------------- |
| OTP expired             | "OTP expired. Request a new one."              | New OTP button        |
| Invalid OTP x1-x2       | "Incorrect OTP. X attempt(s) remaining."       | Re-enter              |
| Invalid OTP x3          | "Too many failed attempts. Please start over." | Reset to phone input  |
| 400 wrong provider      | "Phone not found on MTN. Try Airtel?"          | Auto-switch or manual |
| 429 rate limit          | "Too many OTP requests. Try again later."      | Timer                 |
| Session expired (10min) | "Session expired. Please restart."             | Start over            |

**ML Fields Set:**

```
phone_confirmed = true
mono_telco_account_id = perm_account_id
```

---

### 2.4 Step 3: BVN Validation + Vault Creation (Squad)

**Screen:** BVN input.

| Element   | Detail                                        |
| --------- | --------------------------------------------- |
| Title     | "Set up your repayment vault"                 |
| Subtitle  | "Enter your BVN to create your savings vault" |
| Input     | 11-digit BVN                                  |
| CTA       | "Create Vault"                                |
| Skip link | "Skip for now" (bottom of page, subtle)       |

**What Actually Happens:**

We call Squad's Virtual Account creation endpoint. Squad internally validates the BVN against the name, DOB, gender, and phone we provide. If everything matches, Squad creates a virtual account (this IS the user's repayment vault). If any field doesn't match, Squad returns a validation error.

This is NOT a "get BVN data" call — it's a "create account with BVN validation" call. The validation is a side-effect.

**API Call:**

```
POST https://sandbox-api-d.squadco.com/virtual-account
Headers: { Authorization: "Bearer {{squad_secret_key}}" }
Body: {
  first_name:          data.firstname,       // from NIN
  last_name:           data.lastname,        // from NIN
  middle_name:         data.middlename,      // from NIN
  mobile_num:          user.phone,           // confirmed in Step 2
  dob:                 "04/15/1992",         // NIN birthdate in mm/dd/yyyy
  gender:              "1" | "2",            // 1=Male, 2=Female
  address:             data.residence.address1 + ", " + data.residence.town,
  email:               user.email,
  bvn:                 user_bvn_input,
  customer_identifier: "cg_" + uuid_v4(),   // our internal identifier
  beneficiary_account: "{{merchant_gtbank_account}}"  // our settlement account
}

Success Response:
{
  "virtual_account_number": "9111228017",
  "bank": "GTBank",
  "customer_identifier": "cg_abc123..."
}
```

**Store:**

```
user.squad_virtual_account     = virtual_account_number
user.squad_customer_identifier = customer_identifier
user.bvn                       = bvn (encrypted)
```

**Error States:**

| Error             | UX                                                                                                  | Action                         |
| ----------------- | --------------------------------------------------------------------------------------------------- | ------------------------------ |
| 422 BVN mismatch  | "Your BVN details don't match your NIN. Visit your bank to update your records, or skip this step." | Allow skip (non-blocking)      |
| 409 Duplicate BVN | "This BVN is already registered to another account."                                                | Block + fraud alert (escalate) |
| 5xx / Network     | "Verification service unavailable. You can do this later."                                          | Allow skip                     |

**Important:** This step is skippable. If skipped:

- User has NO vault account
- `identity_verified` stays at base value from NIN (slightly lower score)
- Dashboard will show "Complete your vault setup" prompt
- They can come back later and enter BVN

---

### 2.5 Step 4: Account Creation

**Screen:** Register form.

| Element    | Detail                                                                    |
| ---------- | ------------------------------------------------------------------------- |
| Pre-filled | firstname, lastname, phone (read-only)                                    |
| Editable   | Email input (pre-filled if NIN had email, else blank)                     |
| Password   | min 8 chars, strength indicator (weak/medium/strong)                      |
| CTA        | "Create Account"                                                          |
| Legal      | "By creating an account you agree to our Terms & Privacy Policy" checkbox |

**Post-Account:**

- User authenticated (session created via Better Auth)
- `user.onboarding_step` set to `'role_selection'`
- Redirect to Step 5

**Validation:**

- Email format validation on client + server
- Password strength: at least one uppercase, one number, min 8 chars
- Email uniqueness check (server-side)

---

### 2.6 Step 5: Role Selection

**Screen:** Three cards in a grid.

| Card | Emoji | Title                   | Description                                                       | Link                     |
| ---- | ----- | ----------------------- | ----------------------------------------------------------------- | ------------------------ |
| 1    | 💻    | Freelancer / Gig Worker | "Variable income — creators, contractors, drivers, self-employed" | `/onboarding/freelancer` |
| 2    | 🏢    | Corporate Employee      | "Private payroll — employees of registered companies"             | `/onboarding/corporate`  |
| 3    | 🏛️    | Government Worker       | "Public payroll — local, state, federal civil servants"           | `/onboarding/government` |

**Behavior:**

- Selecting a card sets `user.persona` in the database
- Sets `user.onboarding_step` to the role-specific path
- Navigates to the role-specific verification flow

**Base Trust Scores (from `BASE_TRUST_SCORES` in `features.py`):**

```
freelancer         → 45
corporate_worker   → 55
government_official → 60
former_worker      → 35 (catch-all)
```

These are defaults the ML model uses if it can't compute a better score.

---

### 2.7 Step 6: Role-Specific Verification

Three distinct sub-flows below.

---

#### 2.7A Freelancer Verification

**Step A1 — Link Bank Account (Mono Connect)**

| Element | Detail                                            |
| ------- | ------------------------------------------------- |
| Title   | "Link your bank account"                          |
| Body    | "We'll analyze your income and spending patterns" |
| Button  | "Link Bank Account"                               |

Mono Connect SDK opens in an iframe redirect. User selects their bank, logs in, and grants permission.

**Returned via Mono Webhook/Callback:**

```
account_id               → mono_account_id (permanent)
transactions[]           → last 12 months of transactions
  .amount                → in kobo
  .type                  → "debit" | "credit"
  .narration             → transaction description
  .date                  → ISO date
income_analysis          → monthly average inflow
  .average_monthly_income → float
  .income_consistency     → score 0-1
```

**Data Extracted:**

```
monthly_income_ngn   = income_analysis.average_monthly_income
income_log           = log(monthly_income_ngn + 1)
debt_to_income       = min(total_monthly_outflows / monthly_income_ngn, 5.0)
bank_statement_months = count of distinct months in transactions
```

**Store:**

```
user.mono_account_id = account_id
user.monthly_income_ngn = extracted value
user.bank_statement_months = extracted value
```

**Error States:**

- User closes Mono window → "Bank linking cancelled. You can try again."
- Mono returns no transactions → "We couldn't find sufficient data. Try a different account."
- Mono connection fails → "Unable to connect to your bank. Try again later."

---

**Step A2 — Connect Gig Platforms (Cr3dentials)**

| Element       | Detail                                                                      |
| ------------- | --------------------------------------------------------------------------- |
| Title         | "Verify your income sources"                                                |
| Body          | "Connect your gig platforms to prove your earnings"                         |
| Platform list | Upwork, Fiverr, Deel, YouTube, Shopify, etc. (fetched from Cr3dentials API) |
| CTA           | "Verify"                                                                    |

**Flow:**

1. User selects platform from list
2. We call Cr3dentials API to create a browser session
3. User is shown an iframe where they log into the platform
4. Cr3dentials generates a zk proof of income/activity
5. Cr3dentials sends webhook to our server with results

**API — Cr3dentials Create Session:**

```
POST https://api.cr3dentials.xyz/partner/browser-session
Headers: { x-api-key: "{{cr3dentials_key}}" }
Body: {
  platformId: 1,
  receiverData: { name: user.firstname, email: user.email },
  expiresInHours: 24,
  webhookUrl: "https://our-app.com/webhooks/cr3dentials",
  externalReferenceId: user.id
}
→ Response: { sessionId, embedUrl, status: "CREATED" }
```

**Webhook received (on completion):**

```
{
  sessionId: "uuid",
  status: "COMPLETED",
  externalReferenceId: "user_id",
  extractedData: {
    platform: "upwork",
    accountHolder: "John Doe",
    totalEarnings: 50000,
    monthlyAverage: 4200,
    accountAgeMonths: 18,
    rating: 4.8,
    completedJobs: 45
  }
}
```

**Data Extracted:**

```
employment_verified = true
gig_income_monthly  = extractedData.monthlyAverage * NGN_USD_RATE
job_tenure_years    = extractedData.accountAgeMonths / 12
```

**Fallback Path (if Cr3dentials fails or skipped):**

- Income is estimated from Mono Connect bank data only
- `employment_verified` = false
- Score suffers slightly but onboarding still completes

---

**Step A3 — Optional LinkedIn Connection**

| Element | Detail                                                           |
| ------- | ---------------------------------------------------------------- |
| Title   | "Connect LinkedIn (Optional)"                                    |
| Body    | "Boost your trust score by verifying your professional identity" |
| Button  | "Connect LinkedIn"                                               |

**OAuth Flow:**

- Standard LinkedIn OAuth 2.0 with scopes: `openid`, `profile`, `email`
- Returns: name, headline, profile picture, email
- Score boost: +3-5 points if name matches NIN

**Skip:** User can skip — purely optional.

---

#### 2.7B Corporate Worker Verification

**Step B1 — Work Email Verification**

| Element   | Detail                       |
| --------- | ---------------------------- |
| Title     | "Verify your work email"     |
| Input     | "you@company.com"            |
| CTA       | "Send OTP"                   |
| OTP input | Appears after send — 6-digit |
| Resend    | 30s cooldown                 |

**Flow:**

1. User enters work email
2. Extract domain. If personal domain (@gmail, @yahoo, @hotmail, etc.) → reject: "Please use your company email address"
3. Send OTP to that email
4. User enters OTP → verified

**Domain Check Logic:**

```
personal_domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com",
                    "aol.com", "icloud.com", "protonmail.com", "mail.com",
                    "ymail.com", "live.com", "msn.com"]
domain = extract_domain(email)
if domain in personal_domains:
    reject("Please use your company email address, not a personal one")
else:
    proceed_with_otp()
```

**On success:**

```
employment_verified = true
employer_domain     = domain
```

---

**Step B2 — Payslip Upload + OCR**

| Element      | Detail                                                             |
| ------------ | ------------------------------------------------------------------ |
| Title        | "Upload your latest payslip"                                       |
| Body         | "We'll extract your income details to calculate your score"        |
| Upload       | Drag-and-drop or click to upload. Accepts: PDF, PNG, JPG. Max 5MB. |
| Preview      | Thumbnail preview once uploaded                                    |
| CTA          | "Analyze Payslip"                                                  |
| Confirmation | Shows extracted data for user to confirm/correct                   |

**OCR Extraction (use a service like Google Document AI, or a simpler regex/parser):**

```
Target fields:
  employer_name    → string (e.g. "Flutterwave Technology Solutions Limited")
  employee_name    → string (must fuzzy-match NIN name)
  gross_salary     → number (monthly gross)
  net_salary       → number (monthly net — PREFERRED for income)
  pay_date         → date (must be recent — within 90 days)
  hire_date        → date (optional, for job_tenure_years)
  grade_or_level   → string (optional, storage only)

Validation:
  - employee_name must fuzzy-match user's NIN name (similarity > 0.7)
  - employer_name domain should match email domain (loose check)
  - pay_date must be within 90 days of today (reject stale payslips)
```

**Confirmation Screen:**

```
"We found the following details from your payslip:"
  Employer:   Flutterwave Technology Solutions Limited
  Net Salary: ₦620,000/month
  Hire Date:  March 2023 (2 years ago)

[Yes, this looks correct]  [No, adjust values]

If "No, adjust" → editable form fields pre-filled with OCR values
```

**Data Extracted:**

```
monthly_income_ngn   = net_salary
job_tenure_years     = months_between(hire_date, today) / 12
```

**Error States:**
| Error | UX |
|---|---|
| Blurry/unreadable | "Could not read your payslip. Upload a clearer image." |
| Name mismatch | "The name on your payslip doesn't match your NIN. Upload your own payslip." |
| Payslip > 90 days | "This payslip is too old. Upload one from the last 3 months." |
| Can't extract | "We couldn't find salary information. Try a different document or enter manually." |
| File too large | "File must be under 5MB." |

---

**Step B3 — Link Salary Account (Mono Connect)**

| Element | Detail                                                |
| ------- | ----------------------------------------------------- |
| Title   | "Link your salary account"                            |
| Body    | "Confirm your salary by connecting your bank account" |
| Button  | "Link Salary Account"                                 |

Same Mono Connect flow as freelancer. Additionally:

- Cross-validate: look for a monthly credit matching the payslip amount
- If found → "salary confirmed" flag
- If not found → "Your salary wasn't found in this account. Try a different account."

**Data Extracted:**

```
income_log           = log(monthly_income_ngn + 1)
debt_to_income       = from outflow analysis
bank_statement_months = months of data
salary_confirmed     = true|false (did we see matching salary credits?)
```

---

**Step B4 — Optional LinkedIn Connection**

Same as Freelancer Step A3. Score boost higher (+5-8) if workplace verification matches employer from payslip.

---

#### 2.7C Government Worker Verification

**Step C1 — Agency & Grade Details**

| Element | Detail                                                                                  |
| ------- | --------------------------------------------------------------------------------------- |
| Title   | "Tell us about your role"                                                               |
| Input 1 | "Agency, Ministry, or Parastatal" — text (e.g. "Lagos State Health Service Commission") |
| Input 2 | "Staff ID / IPPIS Number" — text (optional, stored but NOT verified)                    |
| Input 3 | "Grade Level & Step" — text (e.g. "GL 10 Step 3")                                       |
| CTA     | "Continue"                                                                              |

**Note:** IPPIS number is collected for reference only. There is no IPPIS verification API, so it's not used for scoring.

---

**Step C2 — Payslip Upload + OCR**

Same as Corporate Step B2, with additional extraction:

```
Additional fields specific to government payslips:
  agency_name       → fuzzy-match against user's stated agency
  grade_level       → cross-reference with user input
  deductions:       → pension (7.5%), NHIS, etc. — confirms it's genuine govt payslip
```

**Validation:**

- Standard government deduction patterns (pension, NHIS, union dues) confirm it's a genuine government payslip vs a fake one
- If deductions don't match expected govt pattern → flag for manual review

---

**Step C3 — Link Salary Account (Mono Connect)**

Same as Corporate Step B3. Look for salary credits with government-related narration (e.g., "Federal Gov't Salaries", "Lagos State Salary", "IPPIS Payment").

---

### 2.8 Step 7: ML Scoring (The Reveal)

**Screen:** Full-page reveal with animated score gauge.

| Element        | Detail                                                                 |
| -------------- | ---------------------------------------------------------------------- |
| Headline       | "Congratulations {{name}}!"                                            |
| Gauge          | Circular score gauge 0-100, color bands (Bronze/Silver/Gold/Platinum)  |
| Score value    | Large animated numeral (e.g., "72")                                    |
| Tier badge     | Badge with tier name and color                                         |
| SHAP breakdown | Stacked horizontal bar: Income +20, Identity +15, Employment +12, etc. |
| Safe Limit     | "You can access up to ₦{{safe_limit}}" with info tooltip               |
| CTA            | "Go to Dashboard"                                                      |

**API Call — ML Service at `/score`:**

```
POST http://{{ml_service_url}}/score
Content-Type: application/json

{
  "persona": "corporate_worker",
  "monthly_income_ngn": 620000,
  "monthly_debt_ngn": 150000,
  "requested_amount_ngn": 0,
  "tenor_days": 30,
  "state": "Lagos",
  "identity_verified": true,
  "employment_verified": true,
  "job_tenure_years": 2.5,
  "bank_statement_months": 8,
  "previous_loans_count": 0,
  "credit_utilization": 0.35,
  "delinquent_accounts": 0,
  "active_accounts": 0
}
```

**Response:**

```json
{
  "trust_score": 72,
  "default_probability": 0.12,
  "safe_limit_ngn": 650000,
  "tier": "gold",
  "shap_explanation": {
    "income_log": 18,
    "identity_verified": 15,
    "employment_verified": 12,
    "debt_to_income": 8,
    "job_tenure_years": 7,
    "state_risk_bucket": 5,
    "bank_statement_months": 4,
    "base_trust_score": 3
  },
  "tier_ranges": {
    "bronze": [0, 30],
    "silver": [31, 55],
    "gold": [56, 75],
    "platinum": [76, 100]
  },
  "timestamp": "2026-05-15T12:00:00Z"
}
```

**Safe Limit Calculation (server-side rule engine, not ML):**

```
base_rate      = 0.15  (15% of income as baseline)
score_mult     = trust_score / 100  (e.g. 0.72 for score 72)
safe_monthly   = monthly_income_ngn * base_rate * (1 + score_mult)
total_limit    = safe_monthly * 12  (capped at 12 months)
```

**Error Handling:**

| Scenario                                 | UX                                                                                                         |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| ML service down (5xx)                    | Fallback to rule-based score: `BASE_TRUST_SCORES[persona] + identity_verified*10 + employment_verified*10` |
| ML service timeout                       | Retry once. On second fail → fallback as above                                                             |
| Model returns anomaly (>0.9 probability) | "Your profile is being reviewed. We'll notify you within 24 hours." Set user status to `pending_review`    |
| OK response                              | Show reveal screen                                                                                         |

**Post-Success:**

```
user.onboarding_step      = 'completed'
user.onboarding_completed = true
user.trust_score          = response.trust_score
user.safe_limit_ngn       = response.safe_limit_ngn
user.tier                 = response.tier
user.score_last_updated   = now()
```

---

### 2.9 Step 8: Dashboard (Post-Onboarding Home)

First-time dashboard acts as the onboarding landing page. It's NOT the marketplace.

**Widget Layout:**

| Position             | Widget                            | Data Source                       |
| -------------------- | --------------------------------- | --------------------------------- |
| Top                  | Trust Score gauge + trend arrow   | `user.trust_score` stored value   |
| Next                 | Safe Limit card                   | `user.safe_limit_ngn`             |
| Next                 | SHAP breakdown (expandable)       | Cached from last /score response  |
| Next                 | Tier card + progress to next tier | `user.tier` + next threshold      |
| Side (if applicable) | Action items list                 | Based on missing onboarding steps |

**First-Time Action Items (non-blocking prompts):**

| Condition                 | Prompt                                              | Priority |
| ------------------------- | --------------------------------------------------- | -------- |
| Squad vault not created   | "Set up your repayment vault to unlock financing →" | High     |
| Mono Connect not linked   | "Link your bank account to improve your score →"    | Medium   |
| Cr3dentials not completed | "Verify your gig income for a score boost →"        | Medium   |
| LinkedIn not connected    | "Connect LinkedIn to boost your score →"            | Low      |
| Credit School not taken   | "Take Credit School for +5 Trust Score →"           | Medium   |

---

## 3. Lender Onboarding Flow (5 Steps)

### 3.1 Entry Point

Landing page "For Lenders" tab → "Create Partner Account" button → `/onboarding/lender`

This is a completely separate flow from the borrower side. Lenders get a business account, not a consumer account.

---

### 3.2 High-Level Sequence

```
STEP L1 ── Business Registration
  │         CAC number → LumiID CAC lookup
  │
  ▼
STEP L2 ── Director KYC
  │         Director BVN via Squad + NIN via Mono Lookup
  │
  ▼
STEP L3 ── Platform Configuration
  │         Asset categories, score thresholds, target niches
  │
  ▼
STEP L4 ── Settlement Account
  │         Bank details for loan payouts
  │
  ▼
STEP L5 ── Dashboard + API Keys
            Webhook URL + API key generation
```

---

### 3.3 Step L1: Business Registration

**Screen:** CAC verification.

| Element | Detail                                                       |
| ------- | ------------------------------------------------------------ |
| Title   | "Register your business"                                     |
| Body    | "Enter your CAC registration number to verify your business" |
| Input   | "RC123456" or "BN123456" or "NC123456"                       |
| CTA     | "Verify Business"                                            |

**API — LumiID CAC Lookup:**

```
POST https://api.lumiid.com/v1/identities/verify/
Headers: { Authorization: "Bearer {{lumiid_key}}" }
Body: {
  country: "NG",
  id_type: "CAC",
  level: "basic",
  params: { id_number: "RC200002" }
}
```

**Returns:**

```
data.companyName     → pre-filled business name
data.rcNumber        → RC number
data.status          → "ACTIVE" | "INACTIVE" | "DISSOLVED"
data.registrationDate → incorporation date
```

**Validation:**

- Only allow active companies (`status === "ACTIVE"`)
- Pre-fill business name (read-only confirmation)

---

### 3.4 Step L2: Director KYC

**Screen:** Director's personal verification.

| Element | Detail                                                   |
| ------- | -------------------------------------------------------- |
| Title   | "Verify the business director"                           |
| Body    | "A company director must verify their identity"          |
| Inputs  | NIN + BVN (same validation flow as borrower Steps 1 & 3) |

Same APIs as borrower:

- NIN via Mono Lookup → pre-fill director details
- BVN via Squad Virtual Account creation → validate director identity

---

### 3.5 Step L3: Platform Configuration

**Screen:** Configuration form.

| Element                      | Type                    | Options                                                           |
| ---------------------------- | ----------------------- | ----------------------------------------------------------------- |
| Asset categories             | Multi-select checkboxes | Laptops, Phones, Solar Panels, Home Appliances, Rent, School Fees |
| Minimum Trust Score          | Slider/input            | 0-100 (default: 40)                                               |
| Target niches                | Multi-select            | Freelancers, Corporate Workers, Government Workers, All           |
| Max loan amount per borrower | Input                   | ₦ (default: ₦5,000,000)                                           |
| Auto-approve under           | Input                   | ₦ (default: ₦500,000)                                             |

**Store:**

```
lender.min_trust_score
lender.target_niches[]
lender.max_per_borrower
lender.auto_approve_threshold
lender.asset_categories[]
```

---

### 3.6 Step L4: Settlement Account

**Screen:** Bank account details.

| Element | Detail                                 |
| ------- | -------------------------------------- |
| Title   | "Where should we send payouts?"        |
| Input 1 | Bank name (dropdown of Nigerian banks) |
| Input 2 | Account number (10 digits)             |
| CTA     | "Verify Account"                       |

**API — Squad Resolve NUBAN:**

```
POST https://sandbox-api-d.squadco.com/payout/account/lookup
Headers: { Authorization: "Bearer {{squad_secret}}" }
Body: {
  bank_code: "058",
  account_number: "0123456789"
}
→ Response: { account_name: "BUSINESS NAME LTD" }
```

**Validation:**

- Confirm returned account name matches business name from CAC
- If mismatch → warn but allow override

---

### 3.7 Step L5: Dashboard + API Keys

- Lender dashboard created (separate from borrower dashboard)
- API key generated for webhook callbacks
- Lender directed to lead management dashboard

---

## 4. Database Schema Additions

### 4.1 Extend `user` Table

```
ALTER TABLE user ADD COLUMN nin                    TEXT;
ALTER TABLE user ADD COLUMN bvn                    TEXT;
ALTER TABLE user ADD COLUMN phone                  TEXT;
ALTER TABLE user ADD COLUMN persona                TEXT;
ALTER TABLE user ADD COLUMN identity_verified       BOOLEAN DEFAULT false;
ALTER TABLE user ADD COLUMN employment_verified     BOOLEAN DEFAULT false;
ALTER TABLE user ADD COLUMN state_risk_bucket       INTEGER DEFAULT 0;
ALTER TABLE user ADD COLUMN lumid_photo            TEXT;
ALTER TABLE user ADD COLUMN mono_telco_account_id  TEXT;
ALTER TABLE user ADD COLUMN mono_bank_account_id   TEXT;
ALTER TABLE user ADD COLUMN squad_virtual_account   TEXT;
ALTER TABLE user ADD COLUMN squad_customer_identifier TEXT;
ALTER TABLE user ADD COLUMN monthly_income_ngn      REAL;
ALTER TABLE user ADD COLUMN monthly_debt_ngn        REAL DEFAULT 0;
ALTER TABLE user ADD COLUMN job_tenure_years        REAL DEFAULT 0;
ALTER TABLE user ADD COLUMN bank_statement_months   INTEGER DEFAULT 0;
ALTER TABLE user ADD COLUMN trust_score             INTEGER;
ALTER TABLE user ADD COLUMN safe_limit_ngn          REAL;
ALTER TABLE user ADD COLUMN tier                    TEXT;
ALTER TABLE user ADD COLUMN score_last_updated      TIMESTAMP;
ALTER TABLE user ADD COLUMN onboarding_step         TEXT DEFAULT 'nin';
ALTER TABLE user ADD COLUMN onboarding_completed    BOOLEAN DEFAULT false;
ALTER TABLE user ADD COLUMN employer_domain         TEXT;
ALTER TABLE user ADD COLUMN gig_platform            TEXT;
ALTER TABLE user ADD COLUMN cr3dentials_session_id  TEXT;
```

### 4.2 New `lender` Table

```
CREATE TABLE lender (
  id                    TEXT PRIMARY KEY,
  email                 TEXT NOT NULL UNIQUE,
  business_name         TEXT NOT NULL,
  rc_number             TEXT NOT NULL,
  cac_status            TEXT NOT NULL,
  director_name         TEXT,
  director_nin          TEXT,
  director_bvn          TEXT,
  settlement_bank       TEXT,
  settlement_account    TEXT,
  min_trust_score       INTEGER DEFAULT 40,
  target_niches         TEXT[] DEFAULT '{}',
  asset_categories      TEXT[] DEFAULT '{}',
  max_per_borrower      REAL DEFAULT 5000000,
  auto_approve_threshold REAL DEFAULT 500000,
  api_key               TEXT,
  webhook_url           TEXT,
  created_at            TIMESTAMP DEFAULT NOW(),
  updated_at            TIMESTAMP DEFAULT NOW()
);
```

---

## 5. Route Map (Next.js App Router)

```
BORROWER:
/onboarding/identity                → Step 1 (NIN)
/onboarding/phone                   → Step 2 (Mono Telco)
/onboarding/bvn                     → Step 3 (Squad BVN + vault)
/onboarding/register                → Step 4 (account creation)
/onboarding/role                    → Step 5 (role selection)
/onboarding/freelancer/bank         → Step 6a (Mono Connect)
/onboarding/freelancer/income       → Step 6a (Cr3dentials)
/onboarding/freelancer/linkedin     → Step 6a (LinkedIn optional)
/onboarding/corporate/email         → Step 6b (work email OTP)
/onboarding/corporate/payslip       → Step 6b (payslip OCR)
/onboarding/corporate/bank          → Step 6b (Mono Connect)
/onboarding/corporate/linkedin      → Step 6b (LinkedIn optional)
/onboarding/government/details      → Step 6c (agency + grade)
/onboarding/government/payslip      → Step 6c (payslip OCR)
/onboarding/government/bank         → Step 6c (Mono Connect)
/onboarding/reveal                  → Step 7 (score reveal)
/dashboard                          → Step 8 (post-onboarding home)

LENDER:
/onboarding/lender/register         → Step L1 (CAC)
/onboarding/lender/kyc              → Step L2 (director KYC)
/onboarding/lender/config           → Step L3 (filters)
/onboarding/lender/settlement       → Step L4 (bank account)
/onboarding/lender/complete         → Step L5 (dashboard)
```

import { relations } from "drizzle-orm";
import {
  index,
  integer,
  real,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const posts = sqliteTable("post", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text({ length: 256 }),
  createdById: text()
    .notNull()
    .references(() => user.id),
  createdAt: integer({ mode: "timestamp_ms" })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer({ mode: "timestamp_ms" }).$onUpdate(() => new Date()),
}, (t) => [
  index("created_by_idx").on(t.createdById),
  index("name_idx").on(t.name),
]);

export const user = sqliteTable("user", {
  id: text().primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
  emailVerified: integer({ mode: "boolean" })
    .$defaultFn(() => false)
    .notNull(),
  image: text(),
  nin: text(),
  bvn: text(),
  phone: text(),
  persona: text(),
  identityVerified: integer({ mode: "boolean" })
    .$defaultFn(() => false)
    .notNull(),
  employmentVerified: integer({ mode: "boolean" })
    .$defaultFn(() => false)
    .notNull(),
  stateRiskBucket: integer()
    .$defaultFn(() => 0)
    .notNull(),
  lumiidPhoto: text(),
  monoTelcoAccountId: text(),
  monoBankAccountId: text(),
  squadVirtualAccount: text(),
  squadCustomerIdentifier: text(),
  monthlyIncomeNgn: real(),
  monthlyDebtNgn: real().$defaultFn(() => 0),
  jobTenureYears: real().$defaultFn(() => 0),
  bankStatementMonths: integer().$defaultFn(() => 0),
  trustScore: integer(),
  safeLimitNgn: real(),
  tier: text(),
  scoreLastUpdated: integer({ mode: "timestamp_ms" }),
  onboardingStep: text().$defaultFn(() => "nin"),
  onboardingCompleted: integer({ mode: "boolean" })
    .$defaultFn(() => false)
    .notNull(),
  employerDomain: text(),
  gigPlatform: text(),
  cr3dentialsSessionId: text(),
  linkedinConnected: integer({ mode: "boolean" })
    .$defaultFn(() => false)
    .notNull(),
  status: text().$defaultFn(() => "active"),
  firstName: text(),
  lastName: text(),
  middleName: text(),
  gender: text(),
  birthdate: text(),
  residenceState: text(),
  residenceAddress: text(),
  identityFlags: text({ mode: "json" })
    .$type<string[]>()
    .$defaultFn(() => []),
  scoreBreakdown: text({ mode: "json" })
    .$type<Record<string, number>>()
    .$defaultFn(() => ({})),
  createdAt: integer({ mode: "timestamp_ms" })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer({ mode: "timestamp_ms" })
    .$defaultFn(() => new Date())
    .notNull(),
});

export const session = sqliteTable("session", {
  id: text().primaryKey(),
  expiresAt: integer({ mode: "timestamp_ms" }).notNull(),
  token: text().notNull().unique(),
  createdAt: integer({ mode: "timestamp_ms" }).notNull(),
  updatedAt: integer({ mode: "timestamp_ms" }).notNull(),
  ipAddress: text(),
  userAgent: text(),
  userId: text()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = sqliteTable("account", {
  id: text().primaryKey(),
  accountId: text().notNull(),
  providerId: text().notNull(),
  userId: text()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text(),
  refreshToken: text(),
  idToken: text(),
  accessTokenExpiresAt: integer({ mode: "timestamp_ms" }),
  refreshTokenExpiresAt: integer({ mode: "timestamp_ms" }),
  scope: text(),
  password: text(),
  createdAt: integer({ mode: "timestamp_ms" }).notNull(),
  updatedAt: integer({ mode: "timestamp_ms" }).notNull(),
});

export const verification = sqliteTable("verification", {
  id: text().primaryKey(),
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: integer({ mode: "timestamp_ms" }).notNull(),
  createdAt: integer({ mode: "timestamp_ms" }).$defaultFn(() => new Date()),
  updatedAt: integer({ mode: "timestamp_ms" }).$defaultFn(() => new Date()),
});

export const onboardingDraft = sqliteTable(
  "onboarding_draft",
  {
    id: text().primaryKey(),
    userId: text().references(() => user.id, { onDelete: "set null" }),
    flow: text()
      .$defaultFn(() => "borrower")
      .notNull(),
    step: text()
      .$defaultFn(() => "nin")
      .notNull(),
    email: text(),
    nin: text(),
    bvn: text(),
    phone: text(),
    persona: text(),
    firstName: text(),
    lastName: text(),
    middleName: text(),
    gender: text(),
    birthdate: text(),
    lumiidPhoto: text(),
    residenceAddress: text(),
    residenceTown: text(),
    residenceLga: text(),
    residenceState: text(),
    stateRiskBucket: integer().$defaultFn(() => 0),
    identityVerified: integer({ mode: "boolean" })
      .$defaultFn(() => false)
      .notNull(),
    phoneConfirmed: integer({ mode: "boolean" })
      .$defaultFn(() => false)
      .notNull(),
    emailConfirmed: integer({ mode: "boolean" })
      .$defaultFn(() => false)
      .notNull(),
    employmentVerified: integer({ mode: "boolean" })
      .$defaultFn(() => false)
      .notNull(),
    monoTelcoSessionId: text(),
    monoTelcoAccountId: text(),
    monoBankAccountId: text(),
    squadVirtualAccount: text(),
    squadCustomerIdentifier: text(),
    employerDomain: text(),
    gigPlatform: text(),
    cr3dentialsSessionId: text(),
    linkedinConnected: integer({ mode: "boolean" })
      .$defaultFn(() => false)
      .notNull(),
    monthlyIncomeNgn: real(),
    monthlyDebtNgn: real().$defaultFn(() => 0),
    jobTenureYears: real().$defaultFn(() => 0),
    bankStatementMonths: integer().$defaultFn(() => 0),
    salaryConfirmed: integer({ mode: "boolean" })
      .$defaultFn(() => false)
      .notNull(),
    agencyName: text(),
    staffIdentifier: text(),
    gradeLevel: text(),
    trustScore: integer(),
    safeLimitNgn: real(),
    tier: text(),
    scoreBreakdown: text({ mode: "json" })
      .$type<Record<string, number>>()
      .$defaultFn(() => ({})),
    identityFlags: text({ mode: "json" })
      .$type<string[]>()
      .$defaultFn(() => []),
    raw: text({ mode: "json" })
      .$type<Record<string, unknown>>()
      .$defaultFn(() => ({})),
    createdAt: integer({ mode: "timestamp_ms" })
      .$defaultFn(() => new Date())
      .notNull(),
    updatedAt: integer({ mode: "timestamp_ms" })
      .$defaultFn(() => new Date())
      .notNull(),
  },
  (t) => [
    index("onboarding_draft_user_idx").on(t.userId),
    index("onboarding_draft_step_idx").on(t.step),
  ],
);

export const onboardingAttempt = sqliteTable(
  "onboarding_attempt",
  {
    id: text().primaryKey(),
    ipAddress: text().notNull(),
    target: text().notNull(),
    success: integer({ mode: "boolean" })
      .$defaultFn(() => false)
      .notNull(),
    createdAt: integer({ mode: "timestamp_ms" })
      .$defaultFn(() => new Date())
      .notNull(),
  },
  (t) => [
    index("onboarding_attempt_ip_target_idx").on(t.ipAddress, t.target),
    index("onboarding_attempt_created_at_idx").on(t.createdAt),
  ],
);

export const workEmailOtp = sqliteTable(
  "work_email_otp",
  {
    id: text().primaryKey(),
    userId: text().references(() => user.id, { onDelete: "cascade" }),
    draftId: text().references(() => onboardingDraft.id, {
      onDelete: "cascade",
    }),
    email: text().notNull(),
    codeHash: text().notNull(),
    attempts: integer()
      .$defaultFn(() => 0)
      .notNull(),
    consumedAt: integer({ mode: "timestamp_ms" }),
    expiresAt: integer({ mode: "timestamp_ms" }).notNull(),
    createdAt: integer({ mode: "timestamp_ms" })
      .$defaultFn(() => new Date())
      .notNull(),
  },
  (t) => [
    index("work_email_otp_email_idx").on(t.email),
    index("work_email_otp_draft_idx").on(t.draftId),
  ],
);

export const lender = sqliteTable(
  "lender",
  {
    id: text().primaryKey(),
    userId: text().references(() => user.id, { onDelete: "set null" }),
    email: text().notNull().unique(),
    businessName: text().notNull(),
    rcNumber: text().notNull(),
    cacStatus: text().notNull(),
    registrationDate: text(),
    directorName: text(),
    directorNin: text(),
    directorBvn: text(),
    settlementBank: text(),
    settlementBankCode: text(),
    settlementAccount: text(),
    settlementAccountName: text(),
    settlementNameOverridden: integer({ mode: "boolean" })
      .$defaultFn(() => false)
      .notNull(),
    minTrustScore: integer()
      .$defaultFn(() => 40)
      .notNull(),
    targetNiches: text({ mode: "json" })
      .$type<string[]>()
      .$defaultFn(() => []),
    assetCategories: text({ mode: "json" })
      .$type<string[]>()
      .$defaultFn(() => []),
    maxPerBorrower: real().$defaultFn(() => 5000000),
    autoApproveThreshold: real().$defaultFn(() => 500000),
    apiKeyHash: text(),
    apiKeyPreview: text(),
    webhookUrl: text(),
    onboardingStep: text().$defaultFn(() => "register"),
    createdAt: integer({ mode: "timestamp_ms" })
      .$defaultFn(() => new Date())
      .notNull(),
    updatedAt: integer({ mode: "timestamp_ms" })
      .$defaultFn(() => new Date())
      .notNull(),
  },
  (t) => [
    uniqueIndex("lender_rc_number_idx").on(t.rcNumber),
    index("lender_user_idx").on(t.userId),
  ],
);

export const providerWebhookEvent = sqliteTable(
  "provider_webhook_event",
  {
    id: text().primaryKey(),
    provider: text().notNull(),
    eventType: text(),
    externalId: text(),
    processed: integer({ mode: "boolean" })
      .$defaultFn(() => false)
      .notNull(),
    payload: text({ mode: "json" })
      .$type<Record<string, unknown>>()
      .$defaultFn(() => ({})),
    createdAt: integer({ mode: "timestamp_ms" })
      .$defaultFn(() => new Date())
      .notNull(),
  },
  (t) => [
    index("provider_webhook_provider_idx").on(t.provider),
    index("provider_webhook_external_idx").on(t.externalId),
  ],
);

export const userRelations = relations(user, ({ many }) => ({
  account: many(account),
  session: many(session),
  onboardingDrafts: many(onboardingDraft),
  lenders: many(lender),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id] }),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, { fields: [session.userId], references: [user.id] }),
}));

export const onboardingDraftRelations = relations(
  onboardingDraft,
  ({ one }) => ({
    user: one(user, {
      fields: [onboardingDraft.userId],
      references: [user.id],
    }),
  }),
);

export const lenderRelations = relations(lender, ({ one }) => ({
  user: one(user, { fields: [lender.userId], references: [user.id] }),
}));

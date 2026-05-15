CREATE TABLE `account` (
	`id` text PRIMARY KEY NOT NULL,
	`accountId` text NOT NULL,
	`providerId` text NOT NULL,
	`userId` text NOT NULL,
	`accessToken` text,
	`refreshToken` text,
	`idToken` text,
	`accessTokenExpiresAt` integer,
	`refreshTokenExpiresAt` integer,
	`scope` text,
	`password` text,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `lender` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text,
	`email` text NOT NULL,
	`businessName` text NOT NULL,
	`rcNumber` text NOT NULL,
	`cacStatus` text NOT NULL,
	`registrationDate` text,
	`directorName` text,
	`directorNin` text,
	`directorBvn` text,
	`settlementBank` text,
	`settlementBankCode` text,
	`settlementAccount` text,
	`settlementAccountName` text,
	`settlementNameOverridden` integer NOT NULL,
	`minTrustScore` integer NOT NULL,
	`targetNiches` text,
	`assetCategories` text,
	`maxPerBorrower` real,
	`autoApproveThreshold` real,
	`apiKeyHash` text,
	`apiKeyPreview` text,
	`webhookUrl` text,
	`onboardingStep` text,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `lender_email_unique` ON `lender` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `lender_rc_number_idx` ON `lender` (`rcNumber`);--> statement-breakpoint
CREATE INDEX `lender_user_idx` ON `lender` (`userId`);--> statement-breakpoint
CREATE TABLE `onboarding_attempt` (
	`id` text PRIMARY KEY NOT NULL,
	`ipAddress` text NOT NULL,
	`target` text NOT NULL,
	`success` integer NOT NULL,
	`createdAt` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `onboarding_attempt_ip_target_idx` ON `onboarding_attempt` (`ipAddress`,`target`);--> statement-breakpoint
CREATE INDEX `onboarding_attempt_created_at_idx` ON `onboarding_attempt` (`createdAt`);--> statement-breakpoint
CREATE TABLE `onboarding_draft` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text,
	`flow` text NOT NULL,
	`step` text NOT NULL,
	`email` text,
	`nin` text,
	`bvn` text,
	`phone` text,
	`persona` text,
	`firstName` text,
	`lastName` text,
	`middleName` text,
	`gender` text,
	`birthdate` text,
	`lumiidPhoto` text,
	`residenceAddress` text,
	`residenceTown` text,
	`residenceLga` text,
	`residenceState` text,
	`stateRiskBucket` integer,
	`identityVerified` integer NOT NULL,
	`phoneConfirmed` integer NOT NULL,
	`employmentVerified` integer NOT NULL,
	`monoTelcoSessionId` text,
	`monoTelcoAccountId` text,
	`monoBankAccountId` text,
	`squadVirtualAccount` text,
	`squadCustomerIdentifier` text,
	`employerDomain` text,
	`gigPlatform` text,
	`cr3dentialsSessionId` text,
	`linkedinConnected` integer NOT NULL,
	`monthlyIncomeNgn` real,
	`monthlyDebtNgn` real,
	`jobTenureYears` real,
	`bankStatementMonths` integer,
	`salaryConfirmed` integer NOT NULL,
	`agencyName` text,
	`staffIdentifier` text,
	`gradeLevel` text,
	`trustScore` integer,
	`safeLimitNgn` real,
	`tier` text,
	`scoreBreakdown` text,
	`identityFlags` text,
	`raw` text,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `onboarding_draft_user_idx` ON `onboarding_draft` (`userId`);--> statement-breakpoint
CREATE INDEX `onboarding_draft_step_idx` ON `onboarding_draft` (`step`);--> statement-breakpoint
CREATE TABLE `post` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(256),
	`createdById` text NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer,
	FOREIGN KEY (`createdById`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `created_by_idx` ON `post` (`createdById`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `post` (`name`);--> statement-breakpoint
CREATE TABLE `provider_webhook_event` (
	`id` text PRIMARY KEY NOT NULL,
	`provider` text NOT NULL,
	`eventType` text,
	`externalId` text,
	`processed` integer NOT NULL,
	`payload` text,
	`createdAt` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `provider_webhook_provider_idx` ON `provider_webhook_event` (`provider`);--> statement-breakpoint
CREATE INDEX `provider_webhook_external_idx` ON `provider_webhook_event` (`externalId`);--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`expiresAt` integer NOT NULL,
	`token` text NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	`ipAddress` text,
	`userAgent` text,
	`userId` text NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `session_token_unique` ON `session` (`token`);--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`emailVerified` integer NOT NULL,
	`image` text,
	`nin` text,
	`bvn` text,
	`phone` text,
	`persona` text,
	`identityVerified` integer NOT NULL,
	`employmentVerified` integer NOT NULL,
	`stateRiskBucket` integer NOT NULL,
	`lumiidPhoto` text,
	`monoTelcoAccountId` text,
	`monoBankAccountId` text,
	`squadVirtualAccount` text,
	`squadCustomerIdentifier` text,
	`monthlyIncomeNgn` real,
	`monthlyDebtNgn` real,
	`jobTenureYears` real,
	`bankStatementMonths` integer,
	`trustScore` integer,
	`safeLimitNgn` real,
	`tier` text,
	`scoreLastUpdated` integer,
	`onboardingStep` text,
	`onboardingCompleted` integer NOT NULL,
	`employerDomain` text,
	`gigPlatform` text,
	`cr3dentialsSessionId` text,
	`linkedinConnected` integer NOT NULL,
	`status` text,
	`firstName` text,
	`lastName` text,
	`middleName` text,
	`gender` text,
	`birthdate` text,
	`residenceState` text,
	`residenceAddress` text,
	`identityFlags` text,
	`scoreBreakdown` text,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE TABLE `verification` (
	`id` text PRIMARY KEY NOT NULL,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expiresAt` integer NOT NULL,
	`createdAt` integer,
	`updatedAt` integer
);
--> statement-breakpoint
CREATE TABLE `work_email_otp` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text,
	`draftId` text,
	`email` text NOT NULL,
	`codeHash` text NOT NULL,
	`attempts` integer NOT NULL,
	`consumedAt` integer,
	`expiresAt` integer NOT NULL,
	`createdAt` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`draftId`) REFERENCES `onboarding_draft`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `work_email_otp_email_idx` ON `work_email_otp` (`email`);--> statement-breakpoint
CREATE INDEX `work_email_otp_draft_idx` ON `work_email_otp` (`draftId`);
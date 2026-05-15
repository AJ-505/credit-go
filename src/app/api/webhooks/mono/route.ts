import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

import { db } from "@/server/db";
import {
  onboardingDraft,
  providerWebhookEvent,
  user,
} from "@/server/db/schema";
import { makeId } from "@/server/onboarding/utils";

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as Record<string, unknown>;
  const data =
    payload.data && typeof payload.data === "object"
      ? (payload.data as Record<string, unknown>)
      : payload;
  const account =
    data.account && typeof data.account === "object"
      ? (data.account as Record<string, unknown>)
      : {};
  const accountId = String(account._id ?? account.id ?? "");
  const status = String(
    (data.meta as Record<string, unknown> | undefined)?.data_status ?? "",
  );

  await db.insert(providerWebhookEvent).values({
    id: makeId("webhook"),
    provider: "mono",
    eventType: String(payload.event ?? "account_updated"),
    externalId: accountId,
    payload,
    processed: true,
  });

  if (accountId && status.toUpperCase() === "AVAILABLE") {
    await db
      .update(user)
      .set({ monoBankAccountId: accountId, updatedAt: new Date() })
      .where(eq(user.monoBankAccountId, accountId));
    await db
      .update(onboardingDraft)
      .set({ monoBankAccountId: accountId, updatedAt: new Date() })
      .where(eq(onboardingDraft.monoBankAccountId, accountId));
  }

  return NextResponse.json({ received: true });
}

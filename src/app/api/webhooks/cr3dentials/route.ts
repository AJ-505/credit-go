import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

import { env } from "@/env";
import { db } from "@/server/db";
import {
  onboardingDraft,
  providerWebhookEvent,
  user,
} from "@/server/db/schema";
import { hashSecret, makeId } from "@/server/onboarding/utils";

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as Record<string, unknown>;
  const signature = request.headers.get("x-cr3dentials-signature");
  if (
    env.CR3DENTIALS_WEBHOOK_SECRET &&
    signature &&
    signature !==
      hashSecret(`${env.CR3DENTIALS_WEBHOOK_SECRET}:${JSON.stringify(payload)}`)
  ) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const data =
    payload.data && typeof payload.data === "object"
      ? (payload.data as Record<string, unknown>)
      : payload;
  const externalReferenceId = String(
    data.externalReferenceId ?? data.external_reference_id ?? "",
  );
  const extracted =
    data.extractedData && typeof data.extractedData === "object"
      ? (data.extractedData as Record<string, unknown>)
      : {};
  const monthlyAverage = Number(extracted.monthlyAverage ?? 0);
  const accountAgeMonths = Number(extracted.accountAgeMonths ?? 0);

  await db.insert(providerWebhookEvent).values({
    id: makeId("webhook"),
    provider: "cr3dentials",
    eventType: String(data.status ?? "unknown"),
    externalId: String(data.sessionId ?? ""),
    payload,
    processed: true,
  });

  if (
    externalReferenceId &&
    String(data.status).toUpperCase() === "COMPLETED"
  ) {
    const incomeNgn = monthlyAverage * env.NGN_USD_RATE;
    await db
      .update(user)
      .set({
        employmentVerified: true,
        monthlyIncomeNgn: incomeNgn || undefined,
        jobTenureYears: accountAgeMonths ? accountAgeMonths / 12 : undefined,
        gigPlatform: String(extracted.platform ?? ""),
        updatedAt: new Date(),
      })
      .where(eq(user.id, externalReferenceId));
    await db
      .update(onboardingDraft)
      .set({
        employmentVerified: true,
        monthlyIncomeNgn: incomeNgn || undefined,
        jobTenureYears: accountAgeMonths ? accountAgeMonths / 12 : undefined,
        gigPlatform: String(extracted.platform ?? ""),
        updatedAt: new Date(),
      })
      .where(eq(onboardingDraft.userId, externalReferenceId));
  }

  return NextResponse.json({ received: true });
}

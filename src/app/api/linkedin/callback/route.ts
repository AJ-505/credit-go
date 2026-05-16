import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

import { env } from "@/env";
import { auth } from "@/server/better-auth";
import { db } from "@/server/db";
import { onboardingDraft, user } from "@/server/db/schema";
import { apiFetch } from "@/server/integrations/http";
import { stringSimilarity } from "@/server/onboarding/utils";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const next = parseState(state) ?? "/onboarding/reveal";
  if (!code || !env.LINKEDIN_CLIENT_ID || !env.LINKEDIN_CLIENT_SECRET) {
    return NextResponse.redirect(new URL(next, request.nextUrl.origin));
  }

  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) {
    return NextResponse.redirect(new URL("/onboarding/register", appBaseUrl()));
  }

  const redirectUri = `${request.nextUrl.origin}/api/linkedin/callback`;
  const token = await apiFetch<Record<string, unknown>>(
    "https://www.linkedin.com/oauth/v2/accessToken",
    {
      service: "LinkedIn token",
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        client_id: env.LINKEDIN_CLIENT_ID,
        client_secret: env.LINKEDIN_CLIENT_SECRET,
        redirect_uri: redirectUri,
      }),
    },
  );
  const accessToken = String(token.access_token ?? "");
  const profile = await apiFetch<Record<string, unknown>>(
    "https://api.linkedin.com/v2/userinfo",
    {
      service: "LinkedIn userinfo",
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );

  const current = await db.query.user.findFirst({
    where: eq(user.id, session.user.id),
  });
  const name = String(profile.name ?? "");
  const expected =
    `${current?.firstName ?? ""} ${current?.lastName ?? ""}`.trim() ||
    current?.name ||
    "";
  const matches = stringSimilarity(expected, name) >= 0.7;

  await db
    .update(user)
    .set({
      linkedinConnected: true,
      trustScore:
        current?.trustScore !== null && current?.trustScore !== undefined
          ? Math.min(100, current.trustScore + (matches ? 5 : 3))
          : current?.trustScore,
      updatedAt: new Date(),
    })
    .where(eq(user.id, session.user.id));
  await db
    .update(onboardingDraft)
    .set({ linkedinConnected: true, updatedAt: new Date() })
    .where(eq(onboardingDraft.userId, session.user.id));

  return NextResponse.redirect(new URL(next, appBaseUrl()));
}

function parseState(state: string | null) {
  if (!state) return null;
  try {
    const parsed = JSON.parse(Buffer.from(state, "base64url").toString()) as {
      next?: string;
    };
    return parsed.next?.startsWith("/") ? parsed.next : null;
  } catch {
    return null;
  }
}

import { NextResponse, type NextRequest } from "next/server";

import { env } from "@/env";
import { appBaseUrl } from "@/server/onboarding/utils";

export async function GET(request: NextRequest) {
  if (!env.LINKEDIN_CLIENT_ID) {
    return NextResponse.json(
      { error: "LINKEDIN_CLIENT_ID is not configured" },
      { status: 503 },
    );
  }

  const next = request.nextUrl.searchParams.get("next") ?? "/onboarding/reveal";
  const redirectUri = `${request.nextUrl.origin}/api/linkedin/callback`;
  const state = Buffer.from(JSON.stringify({ next })).toString("base64url");
  const url = new URL("https://www.linkedin.com/oauth/v2/authorization");
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", env.LINKEDIN_CLIENT_ID);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("scope", "openid profile email");
  url.searchParams.set("state", state);

  return NextResponse.redirect(url);
}

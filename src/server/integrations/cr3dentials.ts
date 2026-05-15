import { env } from "@/env";
import { appBaseUrl, requireEnv } from "@/server/onboarding/utils";

import { apiFetch } from "./http";

type Cr3dentialsObject = Record<string, unknown>;

function headers() {
  return {
    "x-api-key": requireEnv(env.CR3DENTIALS_API_KEY, "CR3DENTIALS_API_KEY"),
    "Content-Type": "application/json",
  };
}

export async function listCr3dentialsPlatforms() {
  const response = await apiFetch<Cr3dentialsObject>(
    `${env.CR3DENTIALS_BASE_URL}/partner/types`,
    {
      service: "Cr3dentials platforms",
      method: "GET",
      headers: headers(),
    },
  );
  const data = response.data;
  return Array.isArray(data) ? data : [];
}

export async function createCr3dentialsSession(input: {
  platformId: number;
  name: string;
  email: string;
  externalReferenceId: string;
}) {
  const response = await apiFetch<Cr3dentialsObject>(
    `${env.CR3DENTIALS_BASE_URL}/partner/browser-session`,
    {
      service: "Cr3dentials browser session",
      method: "POST",
      headers: headers(),
      body: JSON.stringify({
        platformId: input.platformId,
        receiverData: { name: input.name, email: input.email },
        expiresInHours: 24,
        webhookUrl: `${appBaseUrl()}/api/webhooks/cr3dentials`,
        externalReferenceId: input.externalReferenceId,
      }),
    },
  );
  const data =
    response.data && typeof response.data === "object"
      ? (response.data as Cr3dentialsObject)
      : response;

  return {
    sessionId: String(data.sessionId ?? data.session_id ?? ""),
    embedUrl: String(data.embedUrl ?? data.embed_url ?? ""),
    status: String(data.status ?? "CREATED"),
    raw: response,
  };
}

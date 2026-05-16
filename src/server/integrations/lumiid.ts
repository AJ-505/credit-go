import { env } from "@/env";
import { requireEnv } from "@/server/onboarding/utils";

import { apiFetch, ProviderApiError } from "./http";

type LumiIdEnvelope<T> = {
  success?: boolean;
  code?: string;
  message?: string;
  data?: T | null;
};

export type LumiIdCacData = {
  companyName?: string;
  company_name?: string;
  rcNumber?: string;
  rc_number?: string;
  status?: string;
  registrationDate?: string;
  registration_date?: string;
};

export async function verifyCac(rcNumber: string) {
  const key = requireEnv(env.LUMIID_API_KEY, "LUMIID_API_KEY");
  const response = await apiFetch<LumiIdEnvelope<LumiIdCacData>>(
    lumiIdUrl("/v1/identities/verify/"),
    {
      service: "LumiID CAC",
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: "NG",
        id_type: "CAC",
        method: "identity",
        level: "basic",
        params: { id_number: rcNumber },
      }),
    },
  );

  if (!response.success || !response.data) {
    throw new ProviderApiError({
      status: 400,
      code: response.code,
      message: response.message ?? "CAC verification failed",
      body: response,
    });
  }

  return response.data;
}

function lumiIdUrl(path: string) {
  const base = env.LUMIID_BASE_URL.replace(/\/+$/, "").replace(/\/api$/, "");
  return `${base}${path}`;
}

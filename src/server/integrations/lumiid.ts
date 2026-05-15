import { env } from "@/env";
import { requireEnv } from "@/server/onboarding/utils";

import { apiFetch, ProviderApiError } from "./http";

export type LumiIdNinData = {
  nin?: string;
  firstname: string;
  lastname: string;
  middlename?: string;
  phone?: string;
  gender?: string;
  birthdate?: string;
  photo?: string;
  residence?: {
    address1?: string;
    town?: string;
    lga?: string;
    state?: string;
  };
};

type LumiIdEnvelope<T> = {
  success?: boolean;
  code?: string;
  message?: string;
  data?: T | null;
};

export async function verifyNin(nin: string) {
  const key = requireEnv(env.LUMIID_API_KEY, "LUMIID_API_KEY");
  const response = await apiFetch<LumiIdEnvelope<LumiIdNinData>>(
    `${env.LUMIID_BASE_URL}/v1/ng/nin-basic/`,
    {
      service: "LumiID NIN",
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_number: nin }),
    },
  );

  if (!response.success || !response.data) {
    throw new ProviderApiError({
      status: 400,
      code: response.code,
      message: response.message ?? "NIN verification failed",
      body: response,
    });
  }

  return response.data;
}

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
    `${env.LUMIID_BASE_URL}/v1/identities/verify/`,
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

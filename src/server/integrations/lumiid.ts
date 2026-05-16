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
  const mock = verifyMockNin(nin);
  if (mock) return mock;

  const key = requireEnv(env.LUMIID_API_KEY, "LUMIID_API_KEY");
  const response = await apiFetch<LumiIdEnvelope<LumiIdNinData>>(
    lumiIdUrl("/v1/identities/verify/"),
    {
      service: "LumiID NIN",
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: "NG",
        id_type: "NIN",
        method: "identity",
        level: "basic",
        params: { id_number: nin },
      }),
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

function verifyMockNin(nin: string) {
  // NOTE: Mock NIN test values while LumiID org approval is blocked: 11112222333 passes, 00000000000 returns record-not-found, 99999999999 simulates provider outage. Any other 11-digit NIN falls through to real LumiID.
  if (nin === "11112222333") {
    return {
      nin,
      firstname: "Ada",
      lastname: "Okafor",
      middlename: "Chiamaka",
      phone: "08012345678",
      gender: "f",
      birthdate: "14-04-1994",
      photo: "",
      residence: {
        address1: "12 Marina Road",
        town: "Lagos Island",
        lga: "Lagos Island",
        state: "Lagos",
      },
    } satisfies LumiIdNinData;
  }

  if (nin === "00000000000") {
    throw new ProviderApiError({
      status: 404,
      code: "RECORD_NOT_FOUND",
      message: "No matching identity found for this NIN",
      service: "Mock LumiID NIN",
      method: "POST",
      body: { nin, success: false, code: "RECORD_NOT_FOUND" },
    });
  }

  if (nin === "99999999999") {
    throw new ProviderApiError({
      status: 503,
      code: "SERVICE_UNAVAILABLE",
      message: "Mock LumiID NIN service is temporarily unavailable",
      service: "Mock LumiID NIN",
      method: "POST",
      body: { nin, success: false, code: "SERVICE_UNAVAILABLE" },
    });
  }

  return null;
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

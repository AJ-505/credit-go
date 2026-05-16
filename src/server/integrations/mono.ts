import { env } from "@/env";
import { requireEnv } from "@/server/onboarding/utils";

import { apiFetch, ProviderApiError } from "./http";

type MonoObject = Record<string, unknown>;
export type TelcoProvider = "mtn" | "airtel" | "glo" | "9mobile";

export type MonoNinData = {
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
  raw: MonoObject;
};

function monoHeaders() {
  return {
    "Content-Type": "application/json",
    "mono-sec-key": requireEnv(env.MONO_SECRET_KEY, "MONO_SECRET_KEY"),
  };
}

function monoLookupHeaders() {
  const secretKey = requireEnv(env.MONO_SECRET_KEY, "MONO_SECRET_KEY");
  if (env.MONO_LOOKUP_MODE === "sandbox" && !secretKey.startsWith("test_")) {
    throw new ProviderApiError({
      status: 500,
      code: "MONO_SANDBOX_KEY_REQUIRED",
      message:
        "MONO_LOOKUP_MODE is sandbox, but MONO_SECRET_KEY is not a Mono test key.",
      service: "Mono NIN lookup",
      method: "POST",
    });
  }

  return {
    "Content-Type": "application/json",
    "mono-sec-key": secretKey,
  };
}

function pickString(body: MonoObject, keys: string[]) {
  for (const key of keys) {
    const value = body[key];
    if (typeof value === "string") return value;
  }
  const data = body.data;
  if (data && typeof data === "object") {
    return pickString(data as MonoObject, keys);
  }
  return undefined;
}

export async function verifyNin(nin: string): Promise<MonoNinData> {
  if (env.PROVIDER_MODE === "fake") return fakeNin(nin);

  const response = await apiFetch<MonoObject>(
    `${env.MONO_BASE_URL}/v3/lookup/nin`,
    {
      service: "Mono NIN lookup",
      method: "POST",
      headers: monoLookupHeaders(),
      body: JSON.stringify({ nin }),
    },
  );

  if (response.status !== "successful" && response.status !== "success") {
    throw new ProviderApiError({
      status: 400,
      code: String(response.status ?? "NIN_LOOKUP_FAILED"),
      message:
        typeof response.message === "string"
          ? response.message
          : "NIN lookup failed",
      service: "Mono NIN lookup",
      method: "POST",
      body: response,
    });
  }

  const data =
    response.data && typeof response.data === "object"
      ? (response.data as MonoObject)
      : response;
  const firstname = pickString(data, ["firstname", "first_name"]);
  const lastname = pickString(data, ["surname", "lastname", "last_name"]);

  if (!firstname || !lastname) {
    throw new ProviderApiError({
      status: 502,
      code: "NIN_LOOKUP_INCOMPLETE",
      message: "Mono returned an incomplete NIN lookup response",
      service: "Mono NIN lookup",
      method: "POST",
      body: response,
    });
  }

  return {
    nin: pickString(data, ["nin"]) ?? nin,
    firstname,
    lastname,
    middlename: pickString(data, ["middlename", "middle_name"]),
    phone: pickString(data, ["telephoneno", "phone", "phone_number"]),
    gender: pickString(data, ["gender"]),
    birthdate: pickString(data, ["birthdate", "date_of_birth"]),
    photo: pickString(data, ["photo"]),
    residence: {
      address1: pickString(data, ["residence_address", "address"]),
      town: pickString(data, ["residence_town", "town"]),
      lga: pickString(data, ["residence_lga", "lga"]),
      state: pickString(data, ["residence_state", "state"]),
    },
    raw: response,
  };
}

function fakeNin(nin: string): MonoNinData {
  if (nin === "00000000000") {
    throw new ProviderApiError({
      status: 404,
      code: "RECORD_NOT_FOUND",
      message: "No matching identity found for this NIN",
      service: "Fake Mono NIN lookup",
      method: "POST",
      body: { nin, status: "failed", code: "RECORD_NOT_FOUND" },
    });
  }

  if (nin === "99999999999") {
    throw new ProviderApiError({
      status: 503,
      code: "SERVICE_UNAVAILABLE",
      message: "Fake Mono NIN lookup service is temporarily unavailable",
      service: "Fake Mono NIN lookup",
      method: "POST",
      body: { nin, status: "failed", code: "SERVICE_UNAVAILABLE" },
    });
  }

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
    raw: {
      status: "successful",
      message: "Fake Mono NIN lookup",
      data: { nin },
    },
  };
}

export async function initiateTelcoLogin(input: {
  phone: string;
  provider: TelcoProvider;
}) {
  if (env.PROVIDER_MODE === "fake") {
    return {
      sessionId: `fake_telco_${crypto.randomUUID()}`,
      raw: {
        status: "successful",
        message: "Fake Mono Telco OTP sent",
        phone: input.phone,
        provider: input.provider,
      },
    };
  }

  const path =
    env.MONO_TELCO_API_VERSION === "v3"
      ? "/v3/telco/login"
      : "/v2/telecom/auth";
  const response = await apiFetch<MonoObject>(`${env.MONO_BASE_URL}${path}`, {
    service: "Mono Telco login",
    method: "POST",
    headers: monoHeaders(),
    body: JSON.stringify({ phone: input.phone, provider: input.provider }),
  });

  return {
    sessionId:
      pickString(response, ["session_id", "sessionId", "id"]) ??
      crypto.randomUUID(),
    raw: response,
  };
}

export async function verifyTelcoOtp(input: {
  sessionId?: string | null;
  otp: string;
}) {
  if (env.PROVIDER_MODE === "fake") {
    return {
      code: `fake_telco_code_${input.sessionId ?? crypto.randomUUID()}`,
      raw: {
        status: "successful",
        message: "Fake Mono Telco OTP verified",
        session_id: input.sessionId,
        otp: input.otp,
      },
    };
  }

  const isV3 = env.MONO_TELCO_API_VERSION === "v3";
  const path = isV3 ? "/v3/telco/verify-otp" : "/v2/telecom/verify";
  const body = isV3
    ? { session_id: input.sessionId, otp: input.otp }
    : { otp: input.otp };
  const response = await apiFetch<MonoObject>(`${env.MONO_BASE_URL}${path}`, {
    service: "Mono Telco OTP",
    method: "POST",
    headers: monoHeaders(),
    body: JSON.stringify(body),
  });

  return {
    code: pickString(response, ["code", "token", "temp_exchange_token"]) ?? "",
    raw: response,
  };
}

export async function exchangeMonoCode(code: string) {
  if (env.PROVIDER_MODE === "fake") {
    return {
      accountId: `fake_mono_${crypto.randomUUID()}`,
      raw: {
        status: "successful",
        message: "Fake Mono token exchange",
        code,
      },
    };
  }

  const path =
    env.MONO_TELCO_API_VERSION === "v3"
      ? "/v3/telco/exchange-token"
      : "/v2/accounts/auth";
  const response = await apiFetch<MonoObject>(`${env.MONO_BASE_URL}${path}`, {
    service: "Mono token exchange",
    method: "POST",
    headers: monoHeaders(),
    body: JSON.stringify({ code }),
  });

  return {
    accountId:
      pickString(response, ["account_id", "accountId", "id", "_id"]) ?? "",
    raw: response,
  };
}

export async function fetchTelcoIdentity(accountId: string) {
  if (env.PROVIDER_MODE === "fake") {
    return {
      status: "successful",
      accountId,
      fullName: "Ada Okafor",
      gender: "f",
      dateOfBirth: "14-04-1994",
      phoneNumber: "08012345678",
    };
  }

  const path =
    env.MONO_TELCO_API_VERSION === "v3"
      ? `/v3/telco/identity/${accountId}`
      : `/v2/accounts/${accountId}/identity`;
  return apiFetch<MonoObject>(`${env.MONO_BASE_URL}${path}`, {
    service: "Mono Telco identity",
    method: "GET",
    headers: {
      "mono-sec-key": requireEnv(env.MONO_SECRET_KEY, "MONO_SECRET_KEY"),
    },
  });
}

export async function exchangeConnectCode(code: string) {
  if (env.PROVIDER_MODE === "fake") {
    return {
      accountId: `fake_bank_${crypto.randomUUID()}`,
      raw: {
        status: "successful",
        message: "Fake Mono Connect token exchange",
        code,
      },
    };
  }

  const response = await apiFetch<MonoObject>(
    `${env.MONO_BASE_URL}/v2/accounts/auth`,
    {
      service: "Mono Connect token exchange",
      method: "POST",
      headers: monoHeaders(),
      body: JSON.stringify({ code }),
    },
  );

  return {
    accountId:
      pickString(response, ["account_id", "accountId", "id", "_id"]) ?? "",
    raw: response,
  };
}

export async function fetchTransactions(accountId: string) {
  const response = await apiFetch<MonoObject>(
    `${env.MONO_BASE_URL}/v2/accounts/${accountId}/transactions`,
    {
      service: "Mono transactions",
      method: "GET",
      headers: {
        "mono-sec-key": requireEnv(env.MONO_SECRET_KEY, "MONO_SECRET_KEY"),
      },
    },
  );

  const data = response.data;
  return Array.isArray(data) ? data : [];
}

export async function fetchIncome(accountId: string) {
  return apiFetch<MonoObject>(
    `${env.MONO_BASE_URL}/v2/accounts/${accountId}/income`,
    {
      service: "Mono income",
      method: "GET",
      headers: {
        "mono-sec-key": requireEnv(env.MONO_SECRET_KEY, "MONO_SECRET_KEY"),
      },
    },
  );
}

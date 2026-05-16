import { env } from "@/env";
import { requireEnv } from "@/server/onboarding/utils";

import { apiFetch } from "./http";

type MonoObject = Record<string, unknown>;
export type TelcoProvider = "mtn" | "airtel" | "glo" | "9mobile";

function monoHeaders() {
  return {
    "Content-Type": "application/json",
    "mono-sec-key": requireEnv(env.MONO_SECRET_KEY, "MONO_SECRET_KEY"),
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

export async function initiateTelcoLogin(input: {
  phone: string;
  provider: TelcoProvider;
}) {
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

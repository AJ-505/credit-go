import { env } from "@/env";
import { requireEnv } from "@/server/onboarding/utils";

import { apiFetch } from "./http";

type SquadObject = Record<string, unknown>;

function squadHeaders() {
  return {
    Authorization: `Bearer ${requireEnv(env.SQUAD_SECRET_KEY, "SQUAD_SECRET_KEY")}`,
    "Content-Type": "application/json",
  };
}

function pick(body: SquadObject, key: string) {
  const value = body[key];
  if (typeof value === "string") return value;
  const data = body.data;
  if (data && typeof data === "object") {
    const nested = (data as SquadObject)[key];
    if (typeof nested === "string") return nested;
  }
  return undefined;
}

export async function createVirtualAccount(input: {
  firstName: string;
  lastName: string;
  middleName?: string | null;
  mobileNum: string;
  dob: string;
  gender: "1" | "2";
  address: string;
  email: string;
  bvn: string;
  customerIdentifier: string;
}) {
  const response = await apiFetch<SquadObject>(
    `${env.SQUAD_BASE_URL}/virtual-account`,
    {
      service: "Squad virtual account",
      method: "POST",
      headers: squadHeaders(),
      body: JSON.stringify({
        first_name: input.firstName,
        last_name: input.lastName,
        middle_name: input.middleName ?? "",
        mobile_num: input.mobileNum,
        dob: input.dob,
        gender: input.gender,
        address: input.address,
        email: input.email,
        bvn: input.bvn,
        customer_identifier: input.customerIdentifier,
        beneficiary_account: requireEnv(
          env.SQUAD_MERCHANT_GT_BANK_ACCOUNT,
          "SQUAD_MERCHANT_GT_BANK_ACCOUNT",
        ),
      }),
    },
  );

  return {
    virtualAccountNumber:
      pick(response, "virtual_account_number") ??
      pick(response, "account_number") ??
      "",
    bank: pick(response, "bank") ?? pick(response, "bank_name"),
    customerIdentifier:
      pick(response, "customer_identifier") ?? input.customerIdentifier,
    raw: response,
  };
}

export async function resolveNuban(input: {
  bankCode: string;
  accountNumber: string;
}) {
  const response = await apiFetch<SquadObject>(
    `${env.SQUAD_BASE_URL}/payout/account/lookup`,
    {
      service: "Squad account lookup",
      method: "POST",
      headers: squadHeaders(),
      body: JSON.stringify({
        bank_code: input.bankCode,
        account_number: input.accountNumber,
      }),
    },
  );

  return {
    accountName: pick(response, "account_name") ?? "",
    raw: response,
  };
}

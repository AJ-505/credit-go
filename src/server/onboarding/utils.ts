import { createHash, randomBytes, randomUUID } from "crypto";

import { TRPCError } from "@trpc/server";

import { env } from "@/env";

export const PERSONAL_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "aol.com",
  "icloud.com",
  "protonmail.com",
  "mail.com",
  "ymail.com",
  "live.com",
  "msn.com",
]);

export const BASE_TRUST_SCORES: Record<string, number> = {
  freelancer: 45,
  corporate_worker: 55,
  government_official: 60,
  former_worker: 35,
};

export function requireEnv(value: string | undefined, name: string) {
  if (!value) {
    throw new TRPCError({
      code: "PRECONDITION_FAILED",
      message: `${name} is not configured`,
    });
  }
  return value;
}

export function appBaseUrl() {
  return env.APP_BASE_URL ?? "http://localhost:3000";
}

export function makeId(prefix: string) {
  return `${prefix}_${randomUUID()}`;
}

export function makeApiKey() {
  return `cg_live_${randomBytes(24).toString("base64url")}`;
}

export function hashSecret(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export function normalizeName(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .join(" ");
}

export function stringSimilarity(a: string, b: string) {
  const left = normalizeName(a);
  const right = normalizeName(b);
  if (!left || !right) return 0;
  if (left === right) return 1;

  const rows = left.length + 1;
  const cols = right.length + 1;
  const distances = Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) =>
      row === 0 ? col : col === 0 ? row : 0,
    ),
  );

  for (let row = 1; row < rows; row++) {
    for (let col = 1; col < cols; col++) {
      const cost = left[row - 1] === right[col - 1] ? 0 : 1;
      distances[row]![col] = Math.min(
        distances[row - 1]![col]! + 1,
        distances[row]![col - 1]! + 1,
        distances[row - 1]![col - 1]! + cost,
      );
    }
  }

  const distance = distances[left.length]![right.length]!;
  return 1 - distance / Math.max(left.length, right.length);
}

export function mapResidenceState(state: string | null | undefined) {
  const normalized = (state ?? "").toLowerCase();
  if (!normalized) return 0;
  if (
    normalized.includes("lagos") ||
    normalized.includes("abuja") ||
    normalized.includes("fct") ||
    normalized.includes("rivers")
  ) {
    return 1;
  }
  if (
    ["ogun", "oyo", "kaduna", "edo", "delta", "akwa ibom"].some((item) =>
      normalized.includes(item),
    )
  ) {
    return 2;
  }
  const bucketSeed = normalized
    .split("")
    .reduce((total, char) => total + char.charCodeAt(0), 0);
  return 3 + (bucketSeed % 3);
}

export function ninToSquadDob(birthdate: string | null | undefined) {
  if (!birthdate) return "";
  const [day, month, year] = birthdate.split("-");
  if (!day || !month || !year) return birthdate;
  return `${month}/${day}/${year}`;
}

export function squadGender(gender: string | null | undefined) {
  return gender?.toLowerCase().startsWith("m") ? "1" : "2";
}

export function extractDomain(email: string) {
  return email.trim().toLowerCase().split("@").at(1) ?? "";
}

export function parseMoney(value: string | number | null | undefined) {
  if (typeof value === "number") return value;
  if (!value) return 0;
  const parsed = Number(value.replace(/[^\d.]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

export function safeLimit(monthlyIncome: number, trustScore: number) {
  const baseRate = 0.15;
  const scoreMultiplier = trustScore / 100;
  return Math.round(monthlyIncome * baseRate * (1 + scoreMultiplier) * 12);
}

export function tierForScore(score: number) {
  if (score >= 76) return "platinum";
  if (score >= 56) return "gold";
  if (score >= 31) return "silver";
  return "bronze";
}

export function getClientIp(headers: Headers) {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headers.get("x-real-ip") ??
    "unknown"
  );
}

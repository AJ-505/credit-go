import { env } from "@/env";
import { apiFetch } from "@/server/integrations/http";
import { parseMoney, stringSimilarity } from "@/server/onboarding/utils";

export type PayslipExtraction = {
  employerName: string;
  employeeName: string;
  grossSalary: number;
  netSalary: number;
  payDate: string;
  hireDate?: string;
  gradeOrLevel?: string;
  flags: string[];
};

export async function extractPayslip(input: {
  text: string;
  expectedName: string;
  expectedEmployerDomain?: string | null;
  statedAgency?: string | null;
  government?: boolean;
}) {
  const extracted =
    env.PAYSLIP_OCR_PROVIDER === "google-document-ai" &&
    env.GOOGLE_DOCUMENT_AI_ENDPOINT &&
    env.GOOGLE_DOCUMENT_AI_ACCESS_TOKEN
      ? await extractWithDocumentAi(input.text)
      : extractWithRegex(input.text);

  const flags = [...extracted.flags];
  if (
    extracted.employeeName &&
    stringSimilarity(input.expectedName, extracted.employeeName) < 0.7
  ) {
    flags.push("name_mismatch");
  }

  if (extracted.payDate && !isWithinDays(extracted.payDate, 90)) {
    flags.push("stale_payslip");
  }

  if (input.government && !/pension|nhis|ippis|union/i.test(input.text)) {
    flags.push("government_deduction_pattern_missing");
  }

  if (
    input.statedAgency &&
    extracted.employerName &&
    stringSimilarity(input.statedAgency, extracted.employerName) < 0.45
  ) {
    flags.push("agency_mismatch");
  }

  return { ...extracted, flags };
}

function extractWithRegex(text: string): PayslipExtraction {
  const employerName =
    match(text, /(?:employer|company|agency|ministry)[:\s]+(.+)/i) ?? "";
  const employeeName =
    match(text, /(?:employee|name|staff name)[:\s]+(.+)/i) ?? "";
  const grossSalary = parseMoney(
    match(text, /(?:gross salary|gross pay)[:\s]+([^\n]+)/i),
  );
  const netSalary = parseMoney(
    match(text, /(?:net salary|net pay|net income)[:\s]+([^\n]+)/i),
  );
  const payDate =
    match(text, /(?:pay date|payment date|date)[:\s]+([0-9A-Za-z,\-/\s]+)/i) ??
    "";
  const hireDate = match(
    text,
    /(?:hire date|employment date|start date)[:\s]+([0-9A-Za-z,\-/\s]+)/i,
  );
  const gradeOrLevel = match(
    text,
    /(?:grade|level|grade level)[:\s]+([A-Za-z0-9\s-]+)/i,
  );
  const flags: string[] = [];

  if (!netSalary && !grossSalary) flags.push("salary_not_found");
  if (!employeeName) flags.push("employee_name_not_found");
  if (!payDate) flags.push("pay_date_not_found");

  return {
    employerName,
    employeeName,
    grossSalary,
    netSalary: netSalary || grossSalary,
    payDate,
    hireDate,
    gradeOrLevel,
    flags,
  };
}

async function extractWithDocumentAi(text: string) {
  const response = await apiFetch<Record<string, unknown>>(
    env.GOOGLE_DOCUMENT_AI_ENDPOINT!,
    {
      service: "Google Document AI",
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.GOOGLE_DOCUMENT_AI_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rawText: text }),
    },
  );

  return extractWithRegex(JSON.stringify(response));
}

function match(text: string, pattern: RegExp) {
  return text.match(pattern)?.[1]?.trim().split("\n")[0]?.trim();
}

function isWithinDays(value: string, days: number) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return false;
  const age = Date.now() - parsed.getTime();
  return age <= days * 24 * 60 * 60 * 1000;
}

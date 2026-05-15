import { env } from "@/env";

import { apiFetch } from "./http";

export async function sendOtpEmail(input: { to: string; code: string }) {
  if (!env.RESEND_API_KEY) {
    return { delivered: false, devCode: input.code };
  }

  await apiFetch("https://api.resend.com/emails", {
    service: "Resend email",
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.EMAIL_FROM ?? "CreditGo <onboarding@example.com>",
      to: [input.to],
      subject: "Your CreditGo work email code",
      html: `<p>Your CreditGo verification code is <strong>${input.code}</strong>.</p><p>This code expires in 10 minutes.</p>`,
    }),
  });

  return { delivered: true, devCode: undefined };
}

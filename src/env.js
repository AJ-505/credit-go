import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const requiredInProduction = (schema = z.string()) =>
  process.env.NODE_ENV === "production" ? schema : schema.optional();

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    BETTER_AUTH_SECRET: requiredInProduction(),
    DATABASE_URL: z.string(),
    DATABASE_AUTH_TOKEN: requiredInProduction(),
    APP_BASE_URL: z.string().url().optional(),
    LUMIID_API_KEY: requiredInProduction(),
    LUMIID_BASE_URL: z.string().url().default("https://api.lumiid.com"),
    MONO_SECRET_KEY: requiredInProduction(),
    MONO_PUBLIC_KEY: requiredInProduction(),
    MONO_BASE_URL: z.string().url().default("https://api.withmono.com"),
    MONO_TELCO_API_VERSION: z.enum(["v2", "v3"]).default("v2"),
    SQUAD_SECRET_KEY: requiredInProduction(),
    SQUAD_BASE_URL: z
      .string()
      .url()
      .default("https://sandbox-api-d.squadco.com"),
    SQUAD_MERCHANT_GT_BANK_ACCOUNT: requiredInProduction(),
    CR3DENTIALS_API_KEY: requiredInProduction(),
    CR3DENTIALS_BASE_URL: z
      .string()
      .url()
      .default("https://api.cr3dentials.xyz"),
    CR3DENTIALS_WEBHOOK_SECRET: requiredInProduction(),
    LINKEDIN_CLIENT_ID: requiredInProduction(),
    LINKEDIN_CLIENT_SECRET: requiredInProduction(),
    LINKEDIN_REDIRECT_URI: requiredInProduction(z.string().url()),
    ML_SERVICE_URL: z.string().url().default("http://127.0.0.1:8000"),
    NGN_USD_RATE: z.coerce.number().positive().default(1500),
    RESEND_API_KEY: requiredInProduction(),
    EMAIL_FROM: requiredInProduction(),
    PAYSLIP_OCR_PROVIDER: z
      .enum(["regex", "google-document-ai"])
      .default("regex"),
    GOOGLE_DOCUMENT_AI_ENDPOINT: z.string().url().optional(),
    GOOGLE_DOCUMENT_AI_ACCESS_TOKEN: z.string().optional(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_MONO_PUBLIC_KEY: z.string().optional(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,

    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_AUTH_TOKEN: process.env.DATABASE_AUTH_TOKEN,
    APP_BASE_URL: process.env.APP_BASE_URL,
    LUMIID_API_KEY: process.env.LUMIID_API_KEY,
    LUMIID_BASE_URL: process.env.LUMIID_BASE_URL,
    MONO_SECRET_KEY: process.env.MONO_SECRET_KEY,
    MONO_PUBLIC_KEY: process.env.MONO_PUBLIC_KEY,
    MONO_BASE_URL: process.env.MONO_BASE_URL,
    MONO_TELCO_API_VERSION: process.env.MONO_TELCO_API_VERSION,
    SQUAD_SECRET_KEY: process.env.SQUAD_SECRET_KEY,
    SQUAD_BASE_URL: process.env.SQUAD_BASE_URL,
    SQUAD_MERCHANT_GT_BANK_ACCOUNT: process.env.SQUAD_MERCHANT_GT_BANK_ACCOUNT,
    CR3DENTIALS_API_KEY: process.env.CR3DENTIALS_API_KEY,
    CR3DENTIALS_BASE_URL: process.env.CR3DENTIALS_BASE_URL,
    CR3DENTIALS_WEBHOOK_SECRET: process.env.CR3DENTIALS_WEBHOOK_SECRET,
    LINKEDIN_CLIENT_ID: process.env.LINKEDIN_CLIENT_ID,
    LINKEDIN_CLIENT_SECRET: process.env.LINKEDIN_CLIENT_SECRET,
    LINKEDIN_REDIRECT_URI: process.env.LINKEDIN_REDIRECT_URI,
    ML_SERVICE_URL: process.env.ML_SERVICE_URL,
    NGN_USD_RATE: process.env.NGN_USD_RATE,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
    PAYSLIP_OCR_PROVIDER: process.env.PAYSLIP_OCR_PROVIDER,
    GOOGLE_DOCUMENT_AI_ENDPOINT: process.env.GOOGLE_DOCUMENT_AI_ENDPOINT,
    GOOGLE_DOCUMENT_AI_ACCESS_TOKEN:
      process.env.GOOGLE_DOCUMENT_AI_ACCESS_TOKEN,
    NEXT_PUBLIC_MONO_PUBLIC_KEY: process.env.NEXT_PUBLIC_MONO_PUBLIC_KEY,
    NODE_ENV: process.env.NODE_ENV,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});

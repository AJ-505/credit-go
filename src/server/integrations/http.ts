import { TRPCError } from "@trpc/server";

type ApiFetchOptions = RequestInit & {
  service: string;
  timeoutMs?: number;
};

export type ApiErrorShape = {
  status: number;
  code?: string;
  message: string;
  body?: unknown;
  method?: string;
  service?: string;
  url?: string;
};

export class ProviderApiError extends Error {
  status: number;
  code?: string;
  body?: unknown;
  method?: string;
  service?: string;
  url?: string;

  constructor(error: ApiErrorShape) {
    super(error.message);
    this.name = "ProviderApiError";
    this.status = error.status;
    this.code = error.code;
    this.body = error.body;
    this.method = error.method;
    this.service = error.service;
    this.url = error.url;
  }
}

export async function apiFetch<T>(url: string, options: ApiFetchOptions) {
  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    options.timeoutMs ?? 20_000,
  );

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        accept: "application/json",
        ...options.headers,
      },
    });
    const text = await response.text();
    let body: unknown = null;
    let isJson = true;
    try {
      body = text ? JSON.parse(text) : null;
    } catch {
      isJson = false;
      body = { responseText: text.slice(0, 500) };
    }

    if (!response.ok) {
      const message =
        getPath(body, "message") ??
        getPath(body, "error") ??
        getPath(body, "detail") ??
        (!isJson && text
          ? `${options.service} returned a non-JSON response`
          : null) ??
        `${options.service} request failed`;
      const code = getPath(body, "code") ?? getPath(body, "statusCode");
      throw new ProviderApiError({
        status: response.status,
        code: code ? String(code) : undefined,
        message: String(message),
        body,
        method: options.method ?? "GET",
        service: options.service,
        url,
      });
    }

    return body as T;
  } catch (error) {
    if (error instanceof ProviderApiError) throw error;
    if (error instanceof Error && error.name === "AbortError") {
      throw new ProviderApiError({
        status: 504,
        message: `${options.service} request timed out`,
        method: options.method ?? "GET",
        service: options.service,
        url,
      });
    }
    throw new ProviderApiError({
      status: 503,
      message:
        error instanceof Error
          ? error.message
          : `${options.service} request failed`,
      method: options.method ?? "GET",
      service: options.service,
      url,
    });
  } finally {
    clearTimeout(timeout);
  }
}

export function providerErrorToTrpc(error: unknown, fallback: string): never {
  if (error instanceof ProviderApiError) {
    logProviderError(error);

    if (error.status === 429) {
      throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message: error.message,
      });
    }
    if (error.status >= 500) {
      throw new TRPCError({ code: "BAD_GATEWAY", message: error.message });
    }
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: error.message || fallback,
      cause: error,
    });
  }
  throw new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: fallback,
    cause: error,
  });
}

function logProviderError(error: ProviderApiError) {
  const url = sanitizeUrl(error.url);
  console.error("Provider API error", {
    service: error.service,
    method: error.method,
    url,
    status: error.status,
    code: error.code,
    message: error.message,
    body: error.body,
  });
}

function sanitizeUrl(url: string | undefined) {
  if (!url) return undefined;
  try {
    const parsed = new URL(url);
    return `${parsed.origin}${parsed.pathname}`;
  } catch {
    return url;
  }
}

function getPath(body: unknown, key: string) {
  if (!body || typeof body !== "object") return undefined;
  const value = (body as Record<string, unknown>)[key];
  return typeof value === "string" || typeof value === "number"
    ? value
    : undefined;
}

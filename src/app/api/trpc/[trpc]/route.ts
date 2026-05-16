import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { type NextRequest } from "next/server";

import { env } from "@/env";
import { appRouter } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";
import { ProviderApiError } from "@/server/integrations/http";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */
const createContext = async (req: NextRequest) => {
  return createTRPCContext({
    headers: req.headers,
  });
};

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext(req),
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            const cause = error.cause;
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
              cause instanceof ProviderApiError
                ? {
                    provider: cause.service,
                    method: cause.method,
                    url: sanitizeUrl(cause.url),
                    status: cause.status,
                    code: cause.code,
                    body: cause.body,
                  }
                : { cause },
            );
          }
        : undefined,
  });

export { handler as GET, handler as POST };

function sanitizeUrl(url: string | undefined) {
  if (!url) return undefined;
  try {
    const parsed = new URL(url);
    return `${parsed.origin}${parsed.pathname}`;
  } catch {
    return url;
  }
}

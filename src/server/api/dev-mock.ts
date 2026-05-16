import { env } from "@/env";

export function useDevMock<T>(
  key: string | undefined | null,
  mock: () => T,
): T | null {
  if (env.PROVIDER_MODE === "fake") return mock();
  if (key) return null;
  return mock();
}

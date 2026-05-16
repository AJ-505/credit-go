export function useDevMock<T>(key: string | undefined | null, mock: () => T): T | null {
  if (key) return null;
  return mock();
}

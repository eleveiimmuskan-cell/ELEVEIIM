const PRODUCTION_API_BASE = "https://api.eleveiim.com/api/v1";
const LOCAL_API_BASE = "http://127.0.0.1:3001/api/v1";

/**
 * Nest API base (`…/api/v1`).
 * An explicit API_URL / NEXT_PUBLIC_API_URL is used as-is, including the live
 * api.eleveiim.com host. Missing env falls back to localhost in dev and the
 * live API in production.
 */
export function getConfiguredApiBase(): string {
  const fromEnv = (
    process.env.API_URL?.trim() ||
    process.env.NEXT_PUBLIC_API_URL?.trim() ||
    ""
  ).replace(/\/+$/, "");
  const isProd = process.env.NODE_ENV === "production";

  if (fromEnv) return fromEnv;

  return isProd ? PRODUCTION_API_BASE : LOCAL_API_BASE;
}

export function getConfiguredApiOrigin(): string {
  return getConfiguredApiBase().replace(/\/api\/v\d+\/?$/, "");
}

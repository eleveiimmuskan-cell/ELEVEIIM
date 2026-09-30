const PRODUCTION_API_BASE = "https://api.eleveiim.com/api/v1";
const LOCAL_API_BASE = "http://127.0.0.1:3001/api/v1";

function isRemoteProductionApi(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.hostname === "api.eleveiim.com";
  } catch {
    return false;
  }
}

/**
 * Nest API base (`…/api/v1`).
 * Local `next dev` never falls through to production, even if env is missing
 * or still points at api.eleveiim.com. Hostinger production keeps the live URL.
 */
export function getConfiguredApiBase(): string {
  const fromEnv = (
    process.env.API_URL?.trim() ||
    process.env.NEXT_PUBLIC_API_URL?.trim() ||
    ""
  ).replace(/\/+$/, "");
  const isProd = process.env.NODE_ENV === "production";

  if (fromEnv) {
    if (!isProd && isRemoteProductionApi(fromEnv)) {
      return LOCAL_API_BASE;
    }
    return fromEnv;
  }

  return isProd ? PRODUCTION_API_BASE : LOCAL_API_BASE;
}

export function getConfiguredApiOrigin(): string {
  return getConfiguredApiBase().replace(/\/api\/v\d+\/?$/, "");
}

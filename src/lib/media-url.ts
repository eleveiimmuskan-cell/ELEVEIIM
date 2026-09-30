import { getConfiguredApiOrigin } from "@/lib/configured-api";

/** API server origin without the `/api/v1` suffix — used for upload proxying. */
export function getApiOrigin(): string {
  return getConfiguredApiOrigin();
}

/**
 * Resolves a stored media path into a browser-loadable URL.
 *
 * Local `/uploads/*` stays relative so Next.js can proxy to the local API.
 * On Live, Hostinger does not proxy `/uploads` on eleveiim.com, so those
 * paths are loaded from the API origin instead.
 */
export function resolveMediaUrl(path: string | null | undefined): string {
  if (!path) return "";
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("blob:") ||
    path.startsWith("data:")
  ) {
    return path;
  }
  if (path.startsWith("/uploads/")) {
    const origin = getApiOrigin();
    try {
      const host = new URL(origin).hostname;
      if (host !== "localhost" && host !== "127.0.0.1" && host !== "[::1]") {
        return `${origin}${path}`;
      }
    } catch {
      return path;
    }
    return path;
  }
  if (path.startsWith("/")) return path;
  return `${getApiOrigin()}/${path}`;
}

/** Whether the URL points at uploaded media (API / CDN), not a local public asset. */
export function isRemoteMediaUrl(path: string): boolean {
  if (!path) return false;
  if (path.startsWith("blob:") || path.startsWith("data:")) return true;
  if (path.startsWith("/uploads/")) return true;
  if (path.startsWith("http://") || path.startsWith("https://")) return true;
  return false;
}

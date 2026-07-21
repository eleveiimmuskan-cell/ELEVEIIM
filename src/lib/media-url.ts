/** API server origin without the `/api/v1` suffix — used for upload proxying. */
export function getApiOrigin(): string {
  const base =
    process.env.API_URL?.trim() ||
    process.env.NEXT_PUBLIC_API_URL?.trim() ||
    "http://localhost:3001/api/v1";
  return base.replace(/\/api\/v\d+\/?$/, "");
}

/**
 * Resolves a stored media path into a browser-loadable URL.
 * Relative `/uploads/*` paths stay relative so Next.js can proxy them.
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

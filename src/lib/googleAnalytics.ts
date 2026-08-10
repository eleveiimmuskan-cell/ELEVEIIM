/**
 * Google Analytics 4 (gtag) helpers for the ELEVEIIM public site.
 *
 * NEXT_PUBLIC_* values are inlined at build time for client bundles.
 * Keep a production fallback so a missing host env cannot silently disable GA
 * (same pattern as the hardcoded Meta Pixel ID).
 */
const GA_MEASUREMENT_ID_FALLBACK = "G-RXT00K9MYM";

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ||
  GA_MEASUREMENT_ID_FALLBACK;

export function isGaConfigured(): boolean {
  return GA_MEASUREMENT_ID.length > 0;
}

/** Sends a GA4 page_view for App Router client navigations. */
export function trackGaPageView(url: string): void {
  if (typeof window === "undefined") return;
  if (!isGaConfigured()) return;
  if (typeof window.gtag !== "function") return;

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
}

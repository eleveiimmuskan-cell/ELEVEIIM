/**
 * Google Ads (gtag) helpers for the ELEVEIIM public site.
 *
 * NEXT_PUBLIC_* values are inlined at build time for client bundles.
 * Keep a production fallback so a missing host env cannot silently disable Ads
 * (same pattern as GA4 / Meta Pixel).
 */
const GOOGLE_ADS_ID_FALLBACK = "AW-18376148494";

export const GOOGLE_ADS_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim() || GOOGLE_ADS_ID_FALLBACK;

export function isGoogleAdsConfigured(): boolean {
  return GOOGLE_ADS_ID.length > 0;
}

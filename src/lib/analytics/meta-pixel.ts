/** Shared Meta Pixel ID for ELEVEIIM. */
export const META_PIXEL_ID = "1558000026003817";

/** Fires a Meta Pixel PageView when `fbq` is available. */
export function trackMetaPageView(): void {
  if (typeof window === "undefined") return;
  if (typeof window.fbq !== "function") return;
  window.fbq("track", "PageView");
}

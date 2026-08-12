"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import {
  GA_MEASUREMENT_ID,
  isGaConfigured,
  trackGaPageView,
} from "@/lib/googleAnalytics";
import { GOOGLE_ADS_ID, isGoogleAdsConfigured } from "@/lib/googleAds";

/**
 * Shared gtag.js loader for GA4 + Google Ads.
 *
 * Loads the library once (`afterInteractive`), initializes dataLayer/gtag once,
 * then calls `gtag('config')` for each configured property so Ads and Analytics
 * do not fight over duplicate script tags or re-definitions of `gtag`.
 *
 * Initial page_view is sent by GA `gtag('config')`; route-change tracking skips
 * the first mount so client navigations do not duplicate it.
 */
export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const isFirstLoad = useRef(true);

  const gaEnabled = isGaConfigured();
  const adsEnabled = isGoogleAdsConfigured();
  const gtagEnabled = gaEnabled || adsEnabled;

  // Either ID works as the loader query param; prefer GA when both exist.
  const gtagLoaderId = gaEnabled ? GA_MEASUREMENT_ID : GOOGLE_ADS_ID;

  useEffect(() => {
    if (!gaEnabled) return;

    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    const url = search ? `${pathname}?${search}` : pathname;
    trackGaPageView(url);
  }, [pathname, search, gaEnabled]);

  if (!gtagEnabled) return null;

  const configCalls = [
    gaEnabled ? `gtag('config', '${GA_MEASUREMENT_ID}');` : "",
    adsEnabled ? `gtag('config', '${GOOGLE_ADS_ID}');` : "",
  ]
    .filter(Boolean)
    .join("\n          ");

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gtagLoaderId}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          if (!window.__ELEVEIIM_GTAG_INITIALIZED__) {
            gtag('js', new Date());
            ${configCalls}
            window.__ELEVEIIM_GTAG_INITIALIZED__ = true;
          }
        `}
      </Script>
    </>
  );
}

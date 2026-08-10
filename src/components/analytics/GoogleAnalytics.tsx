"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import {
  GA_MEASUREMENT_ID,
  isGaConfigured,
  trackGaPageView,
} from "@/lib/googleAnalytics";

/**
 * Loads GA4 via next/script and tracks App Router client navigations.
 * Initial page_view is sent by gtag('config'); this skips the first mount
 * so route-change tracking does not duplicate it.
 */
export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (!isGaConfigured()) return;

    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    const url = search ? `${pathname}?${search}` : pathname;
    trackGaPageView(url);
  }, [pathname, search]);

  if (!isGaConfigured()) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}

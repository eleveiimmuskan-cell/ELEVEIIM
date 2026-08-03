"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackMetaPageView } from "@/lib/analytics/meta-pixel";

/**
 * Fires Meta Pixel PageView on App Router client navigations.
 * Skips the initial mount — MetaPixel already tracks the first PageView.
 * useRef (not a module flag) so React Strict Mode remounts do not double-fire.
 */
export function FacebookPixelEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    trackMetaPageView();
  }, [pathname, search]);

  return null;
}

import { cache } from "react";
import { apiFetch } from "@/lib/api/client";
import type { ApiFooter } from "@/types/api-footer";

const DEFAULT_REVALIDATE_SECONDS = 60;

/**
 * Site footer chrome from `GET /footer`.
 * Cached per-request via React `cache` and revalidated via Next ISR.
 */
export const getSiteFooter = cache(async (): Promise<ApiFooter | null> => {
  try {
    const { data } = await apiFetch<ApiFooter>("/footer", {
      next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
    });

    if (!data) return null;
    return data;
  } catch (error) {
    console.error("[footer] Failed to load site footer:", error);
    return null;
  }
});

import { cache } from "react";
import { apiFetch } from "@/lib/api/client";
import type { IndustryPartner } from "@/types/industry-partner";

const DEFAULT_REVALIDATE_SECONDS = 60;

/**
 * Active industry partners for the public site (homepage marquee, etc.).
 * Cached per-request via React `cache` and revalidated via Next ISR.
 */
export const getActiveIndustryPartners = cache(
  async (limit = 100): Promise<IndustryPartner[]> => {
    try {
      const { data } = await apiFetch<IndustryPartner[]>("/industry-partners", {
        query: { active: true, page: 1, limit },
        next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
      });
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("[industry-partners] Failed to load active partners:", error);
      return [];
    }
  }
);

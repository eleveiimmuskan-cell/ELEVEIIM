import { cache } from "react";
import { apiFetch } from "@/lib/api/client";
import type { IndustryPartner } from "@/types/industry-partner";

const DEFAULT_REVALIDATE_SECONDS = 60;
/** Backend caps page size at 100 (`PaginationDto` Max). */
const PAGE_SIZE = 100;

/**
 * All active industry partners for the public site (homepage + placements marquee).
 * Pages through the API so nothing is truncated by the per-request limit.
 */
export const getActiveIndustryPartners = cache(
  async (): Promise<IndustryPartner[]> => {
    try {
      const all: IndustryPartner[] = [];
      let page = 1;
      let totalPages = 1;

      do {
        const { data, meta } = await apiFetch<IndustryPartner[]>(
          "/industry-partners",
          {
            query: { active: true, page, limit: PAGE_SIZE },
            next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
          }
        );

        if (Array.isArray(data)) all.push(...data);

        totalPages = meta?.totalPages && meta.totalPages > 0 ? meta.totalPages : 1;
        page += 1;
      } while (page <= totalPages);

      return all;
    } catch (error) {
      console.error("[industry-partners] Failed to load active partners:", error);
      return [];
    }
  }
);

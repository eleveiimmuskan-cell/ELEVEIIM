import { cache } from "react";
import { apiFetch } from "@/lib/api/client";
import type { ApiWhoCanJoinSection } from "@/types/api-who-can-join";

const DEFAULT_REVALIDATE_SECONDS = 60;

/**
 * Active Who Can Join homepage section (active cards only from the public API).
 * Cached per-request via React `cache` and revalidated via Next ISR.
 */
export const getWhoCanJoinSection = cache(
  async (): Promise<ApiWhoCanJoinSection | null> => {
    try {
      const { data } = await apiFetch<ApiWhoCanJoinSection>(
        "/homepage/who-can-join",
        {
          next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
        }
      );

      if (!data || data.isActive === false) return null;

      const cards = (Array.isArray(data.cards) ? data.cards : [])
        .filter((card) => card.isActive !== false)
        .sort((a, b) => a.displayOrder - b.displayOrder);

      if (cards.length === 0) return null;

      return { ...data, cards };
    } catch (error) {
      console.error("[homepage] Failed to load Who Can Join section:", error);
      return null;
    }
  }
);

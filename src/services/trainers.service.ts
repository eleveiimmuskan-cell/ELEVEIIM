import { cache } from "react";
import { apiFetch } from "@/lib/api/client";
import { mapApiTrainerToCard } from "@/lib/mappers/trainer";
import type { ApiTrainer } from "@/types/api-trainer";
import type { Trainer } from "@/types";

const DEFAULT_REVALIDATE_SECONDS = 60;

/**
 * Featured active trainers for the About page.
 * Falls back to active trainers when none are marked featured.
 */
export const getFeaturedTrainers = cache(
  async (limit = 8): Promise<Trainer[]> => {
    const mapList = (data: ApiTrainer[] | undefined) =>
      (Array.isArray(data) ? data : [])
        .slice(0, limit)
        .map(mapApiTrainerToCard);

    try {
      const { data } = await apiFetch<ApiTrainer[]>("/trainers", {
        query: {
          featured: true,
          page: 1,
          limit,
        },
        next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
      });
      const featured = mapList(data);
      if (featured.length > 0) return featured;
    } catch (error) {
      console.error(
        "[trainers] Featured trainers request failed, trying active fallback:",
        error
      );
    }

    try {
      const { data } = await apiFetch<ApiTrainer[]>("/trainers", {
        query: {
          active: true,
          page: 1,
          limit,
        },
        next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
      });
      return mapList(data);
    } catch (error) {
      console.error("[trainers] Failed to load active trainers:", error);
      return [];
    }
  }
);

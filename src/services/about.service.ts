import { cache } from "react";
import { apiFetch } from "@/lib/api/client";
import { resolveMediaUrl } from "@/lib/media-url";
import type {
  ApiAboutHero,
  ApiAboutMissionVision,
  ApiAboutStatistics,
  ApiAboutValues,
} from "@/types/api-about";

const DEFAULT_REVALIDATE_SECONDS = 60;

/**
 * Active About hero section.
 * Cached per-request via React `cache` and revalidated via Next ISR.
 */
export const getAboutHero = cache(async (): Promise<ApiAboutHero | null> => {
  try {
    const { data } = await apiFetch<ApiAboutHero>("/about/hero", {
      next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
    });

    if (!data || data.isActive === false) return null;
    if (!data.heading?.trim()) return null;

    return {
      ...data,
      backgroundImage: resolveMediaUrl(data.backgroundImage) || "",
    };
  } catch (error) {
    console.error("[about] Failed to load hero section:", error);
    return null;
  }
});

/**
 * Active About mission & vision section.
 * Ready for the next batch — not wired on `/about` yet.
 */
export const getAboutMissionVision = cache(
  async (): Promise<ApiAboutMissionVision | null> => {
    try {
      const { data } = await apiFetch<ApiAboutMissionVision>(
        "/about/mission-vision",
        {
          next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
        }
      );

      if (!data || data.isActive === false) return null;
      if (!data.mission?.trim() && !data.vision?.trim()) return null;

      return data;
    } catch (error) {
      console.error("[about] Failed to load mission & vision:", error);
      return null;
    }
  }
);

/**
 * Active About statistics section.
 * Ready for the next batch — not wired on `/about` yet.
 */
export const getAboutStatistics = cache(
  async (): Promise<ApiAboutStatistics | null> => {
    try {
      const { data } = await apiFetch<ApiAboutStatistics>("/about/statistics", {
        next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
      });

      if (!data || data.isActive === false) return null;
      return data;
    } catch (error) {
      console.error("[about] Failed to load statistics:", error);
      return null;
    }
  }
);

/**
 * Active About values section (active cards only).
 * Ready for the next batch — not wired on `/about` yet.
 */
export const getAboutValues = cache(
  async (): Promise<ApiAboutValues | null> => {
    try {
      const { data } = await apiFetch<ApiAboutValues>("/about/values", {
        next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
      });

      if (!data || data.isActive === false) return null;

      const values = (Array.isArray(data.values) ? data.values : [])
        .filter((item) => item.isActive !== false)
        .sort((a, b) => a.displayOrder - b.displayOrder);

      if (values.length === 0) return null;

      return { ...data, values };
    } catch (error) {
      console.error("[about] Failed to load values:", error);
      return null;
    }
  }
);

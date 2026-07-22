import { cache } from "react";
import { apiFetch } from "@/lib/api/client";
import { resolveMediaUrl } from "@/lib/media-url";
import type { ApiAboutPage } from "@/types/api-about";

const DEFAULT_REVALIDATE_SECONDS = 60;

/**
 * Full About page CMS payload from `GET /about` (all sections in one call).
 * Cached per-request via React `cache` and revalidated via Next ISR.
 */
export const getAboutPage = cache(async (): Promise<ApiAboutPage | null> => {
  try {
    const { data } = await apiFetch<ApiAboutPage>("/about", {
      next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
    });

    if (!data) return null;

    const hero =
      data.hero && data.hero.isActive !== false && data.hero.heading?.trim()
        ? {
            ...data.hero,
            backgroundImage: resolveMediaUrl(data.hero.backgroundImage) || "",
          }
        : null;

    const missionVision =
      data.missionVision &&
      data.missionVision.isActive !== false &&
      (data.missionVision.mission?.trim() || data.missionVision.vision?.trim())
        ? data.missionVision
        : null;

    const statistics =
      data.statistics && data.statistics.isActive !== false
        ? data.statistics
        : null;

    const valuesRaw = data.values;
    const valueCards = (
      Array.isArray(valuesRaw?.values) ? valuesRaw.values : []
    )
      .filter((item) => item.isActive !== false)
      .sort((a, b) => a.displayOrder - b.displayOrder);

    const values =
      valuesRaw && valuesRaw.isActive !== false && valueCards.length > 0
        ? { ...valuesRaw, values: valueCards }
        : null;

    return { hero, missionVision, statistics, values };
  } catch (error) {
    console.error("[about] Failed to load About page sections:", error);
    return null;
  }
});

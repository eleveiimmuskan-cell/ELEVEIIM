import { cache } from "react";
import {
  offerLetters,
  placementCompanies,
  placementStats,
  placementStories,
  salaryPackages,
} from "@/data/placements";
import { apiFetch } from "@/lib/api/client";
import {
  extractPlacementIdFromSlug,
  mapApiPlacementToStory,
} from "@/lib/mappers/placement";
import type { ApiPlacement } from "@/types/api-placement";
import type { PlacementStory } from "@/types";

const DEFAULT_REVALIDATE_SECONDS = 60;

export interface PlacementFilters {
  search?: string;
  page?: number;
  pageSize?: number;
}

/**
 * Active placements for the public placements listing page.
 * Search/pagination are handled on the client.
 */
export const getActivePlacements = cache(
  async (limit = 50): Promise<PlacementStory[]> => {
    try {
      const { data } = await apiFetch<ApiPlacement[]>("/placements", {
        query: {
          active: true,
          page: 1,
          limit,
        },
        next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
      });
      return (Array.isArray(data) ? data : []).map(mapApiPlacementToStory);
    } catch (error) {
      console.error("[placements] Failed to load active placements:", error);
      return [];
    }
  }
);

/**
 * Featured active placements for the homepage (max `limit`).
 * Falls back to active placements when none are marked featured, or when the
 * live API rejects the `featured` filter (older backend deployments).
 */
export const getFeaturedPlacements = cache(
  async (limit = 3): Promise<PlacementStory[]> => {
    const mapList = (data: ApiPlacement[] | undefined) =>
      (Array.isArray(data) ? data : [])
        .slice(0, limit)
        .map(mapApiPlacementToStory);

    try {
      const { data } = await apiFetch<ApiPlacement[]>("/placements", {
        query: {
          featured: true,
          active: true,
          page: 1,
          limit,
        },
        next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
      });
      const featured = mapList(data);
      if (featured.length > 0) return featured;
    } catch (error) {
      console.error(
        "[placements] Featured placements request failed, trying active fallback:",
        error
      );
    }

    try {
      const { data } = await apiFetch<ApiPlacement[]>("/placements", {
        query: {
          active: true,
          page: 1,
          limit,
        },
        next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
      });
      return mapList(data);
    } catch (error) {
      console.error("[placements] Failed to load active placements:", error);
      return [];
    }
  }
);

export function getAllPlacementStories(): PlacementStory[] {
  return placementStories;
}

/** Mock-only lookup (sitemap / legacy static paths). */
export function getMockPlacementBySlug(
  slug: string
): PlacementStory | undefined {
  return placementStories.find((p) => p.slug === slug);
}

/**
 * Resolve a placement story by URL slug.
 * Supports mock stories and API placements (`name-slug-{uuid}` or raw UUID).
 */
export const getPlacementBySlug = cache(
  async (slug: string): Promise<PlacementStory | null> => {
    const mock = getMockPlacementBySlug(slug);
    if (mock) return mock;

    const id = extractPlacementIdFromSlug(slug);
    if (!id) return null;

    try {
      const { data } = await apiFetch<ApiPlacement>(`/placements/${id}`, {
        next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
      });
      if (!data) return null;
      return mapApiPlacementToStory(data);
    } catch (error) {
      console.error(`[placements] Failed to load placement "${slug}":`, error);
      return null;
    }
  }
);

export function getPlacementSlugs(): string[] {
  return placementStories.map((p) => p.slug);
}

export function filterPlacements(filters: PlacementFilters) {
  const pageSize = filters.pageSize ?? 6;
  const page = filters.page ?? 1;

  let result = [...placementStories];

  if (filters.search?.trim()) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.studentName.toLowerCase().includes(q) ||
        p.company.toLowerCase().includes(q) ||
        p.course.toLowerCase().includes(q)
    );
  }

  const total = result.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;

  return {
    items: result.slice(start, start + pageSize),
    total,
    page,
    pageSize,
    totalPages,
  };
}

export {
  placementCompanies,
  placementStats,
  salaryPackages,
  offerLetters,
};

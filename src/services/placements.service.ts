import { cache } from "react";
import {
  offerLetters,
  placementCompanies,
  placementStats,
  placementStories,
  salaryPackages,
} from "@/data/placements";
import { apiFetch } from "@/lib/api/client";
import { mapApiPlacementToStory } from "@/lib/mappers/placement";
import type { ApiPlacement } from "@/types/api-placement";
import type { PlacementStory } from "@/types";

const DEFAULT_REVALIDATE_SECONDS = 60;

export interface PlacementFilters {
  search?: string;
  page?: number;
  pageSize?: number;
}

/**
 * Featured active placements for the homepage (max `limit`).
 * Cached per-request via React `cache` and revalidated via Next ISR.
 */
export const getFeaturedPlacements = cache(
  async (limit = 3): Promise<PlacementStory[]> => {
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
      return (Array.isArray(data) ? data : [])
        .slice(0, limit)
        .map(mapApiPlacementToStory);
    } catch (error) {
      console.error("[placements] Failed to load featured placements:", error);
      return [];
    }
  }
);

export function getAllPlacementStories(): PlacementStory[] {
  return placementStories;
}

export function getPlacementBySlug(slug: string): PlacementStory | undefined {
  return placementStories.find((p) => p.slug === slug);
}

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

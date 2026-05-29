import {
  offerLetters,
  placementCompanies,
  placementStats,
  placementStories,
  salaryPackages,
} from "@/data/placements";
import type { PlacementStory } from "@/types";

export interface PlacementFilters {
  search?: string;
  page?: number;
  pageSize?: number;
}

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

export function getFeaturedPlacements(limit = 3): PlacementStory[] {
  return placementStories.slice(0, limit);
}

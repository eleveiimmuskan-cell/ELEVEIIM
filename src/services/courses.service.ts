import { cache } from "react";
import { courses } from "@/data/courses";
import { apiFetch, ApiError } from "@/lib/api/client";
import { mapApiCourseToCourse } from "@/lib/mappers/course";
import type { ApiCourse } from "@/types/api-course";
import type { Course } from "@/types";

const DEFAULT_REVALIDATE_SECONDS = 60;

export interface CourseFilters {
  search?: string;
  category?: string;
  page?: number;
  pageSize?: number;
}

/**
 * All published courses for the public listing page (~50 max).
 * Filtering (search + chips) is done on the client.
 */
export const getPublishedCourses = cache(
  async (limit = 50): Promise<Course[]> => {
    try {
      const { data } = await apiFetch<ApiCourse[]>("/courses", {
        query: {
          isPublished: true,
          page: 1,
          limit,
        },
        next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
      });
      return (Array.isArray(data) ? data : []).map(mapApiCourseToCourse);
    } catch (error) {
      console.error("[courses] Failed to load published courses:", error);
      return [];
    }
  }
);

/**
 * Featured published courses for the homepage (max `limit`).
 * Cached per-request via React `cache` and revalidated via Next ISR.
 */
export const getFeaturedCourses = cache(
  async (limit = 3): Promise<Course[]> => {
    try {
      const { data } = await apiFetch<ApiCourse[]>("/courses", {
        query: {
          isFeatured: true,
          isPublished: true,
          page: 1,
          limit,
        },
        next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
      });
      return (Array.isArray(data) ? data : [])
        .slice(0, limit)
        .map(mapApiCourseToCourse);
    } catch (error) {
      console.error("[courses] Failed to load featured courses:", error);
      return [];
    }
  }
);

/**
 * Published course by slug for the public course detail page.
 */
export const getCourseBySlug = cache(
  async (slug: string): Promise<Course | null> => {
    if (!slug?.trim()) return null;

    try {
      const { data } = await apiFetch<ApiCourse>(
        `/courses/slug/${encodeURIComponent(slug)}`,
        { next: { revalidate: DEFAULT_REVALIDATE_SECONDS } }
      );

      if (!data || data.isPublished === false) return null;
      return mapApiCourseToCourse(data);
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) return null;
      console.error(`[courses] Failed to load course "${slug}":`, error);
      return null;
    }
  }
);

/**
 * Related published courses for a detail page (same category when possible).
 */
export const getRelatedCourses = cache(
  async (slug: string, limit = 3): Promise<Course[]> => {
    try {
      const current = await getCourseBySlug(slug);
      const { data } = await apiFetch<ApiCourse[]>("/courses", {
        query: {
          isPublished: true,
          page: 1,
          limit: Math.max(limit * 4, 12),
        },
        next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
      });

      const mapped = (Array.isArray(data) ? data : [])
        .map(mapApiCourseToCourse)
        .filter((course) => course.slug !== slug);

      const sameCategory = current
        ? mapped.filter((course) => course.category === current.category)
        : [];

      const pool = sameCategory.length >= limit ? sameCategory : mapped;
      return pool.slice(0, limit);
    } catch (error) {
      console.error("[courses] Failed to load related courses:", error);
      return [];
    }
  }
);

/** Published course slugs for static/ISR path generation. */
export const getPublishedCourseSlugs = cache(async (): Promise<string[]> => {
  try {
    const { data } = await apiFetch<ApiCourse[]>("/courses", {
      query: {
        isPublished: true,
        page: 1,
        limit: 100,
      },
      next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
    });
    return (Array.isArray(data) ? data : [])
      .map((course) => course.slug)
      .filter(Boolean);
  } catch (error) {
    console.error("[courses] Failed to load published course slugs:", error);
    return [];
  }
});

export function getAllCourses(): Course[] {
  return courses;
}

export function getCourseSlugs(): string[] {
  return courses.map((c) => c.slug);
}

export function getCourseCategories(): string[] {
  return [...new Set(courses.map((c) => c.category))];
}

export function filterCourses(filters: CourseFilters): {
  items: Course[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
} {
  const pageSize = filters.pageSize ?? 6;
  const page = filters.page ?? 1;

  let result = [...courses];

  if (filters.category && filters.category !== "All") {
    result = result.filter((c) => c.category === filters.category);
  }

  if (filters.search?.trim()) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
    );
  }

  const total = result.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const items = result.slice(start, start + pageSize);

  return { items, total, page, pageSize, totalPages };
}

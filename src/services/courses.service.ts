import { courses } from "@/data/courses";
import type { Course } from "@/types";

export interface CourseFilters {
  search?: string;
  category?: string;
  page?: number;
  pageSize?: number;
}

export function getAllCourses(): Course[] {
  return courses;
}

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
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

export function getRelatedCourses(slug: string, limit = 3): Course[] {
  const current = getCourseBySlug(slug);
  if (!current) return courses.slice(0, limit);
  return courses
    .filter((c) => c.slug !== slug && c.category === current.category)
    .slice(0, limit);
}

export function getFeaturedCourses(limit = 3): Course[] {
  return courses.slice(0, limit);
}

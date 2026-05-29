import { blogPosts } from "@/data/blogs";
import type { BlogPost } from "@/types";

export interface BlogFilters {
  search?: string;
  category?: string;
  tag?: string;
  page?: number;
  pageSize?: number;
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((b) => b.slug === slug);
}

export function getBlogSlugs(): string[] {
  return blogPosts.map((b) => b.slug);
}

export function getBlogCategories(): string[] {
  return [...new Set(blogPosts.map((b) => b.category))];
}

export function filterBlogPosts(filters: BlogFilters) {
  const pageSize = filters.pageSize ?? 6;
  const page = filters.page ?? 1;

  let result = [...blogPosts];

  if (filters.category && filters.category !== "All") {
    result = result.filter((b) => b.category === filters.category);
  }

  if (filters.tag) {
    result = result.filter((b) => b.tags.includes(filters.tag!));
  }

  if (filters.search?.trim()) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.excerpt.toLowerCase().includes(q) ||
        b.tags.some((t) => t.includes(q))
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

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getBlogBySlug(slug);
  if (!current) return blogPosts.slice(0, limit);
  return blogPosts
    .filter((b) => b.slug !== slug && b.category === current.category)
    .slice(0, limit);
}

export function getFeaturedPosts(limit = 2): BlogPost[] {
  return blogPosts.filter((b) => b.featured).slice(0, limit);
}

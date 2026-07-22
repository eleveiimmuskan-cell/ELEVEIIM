import { cache } from "react";
import { ApiError, apiFetch } from "@/lib/api/client";
import { mapApiBlogPostToUi } from "@/lib/mappers/blog";
import type { ApiBlogPost } from "@/types/api-blog";
import type { BlogPost } from "@/types";

const DEFAULT_REVALIDATE_SECONDS = 60;

export interface BlogFilters {
  search?: string;
  category?: string;
  page?: number;
  pageSize?: number;
}

/**
 * Published blog posts for the public listing (~50 max).
 * Search/category filtering is done on the client.
 */
export const getPublishedBlogPosts = cache(
  async (limit = 50): Promise<BlogPost[]> => {
    try {
      const { data } = await apiFetch<ApiBlogPost[]>("/blog", {
        query: {
          isPublished: true,
          page: 1,
          limit,
        },
        next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
      });
      return (Array.isArray(data) ? data : []).map(mapApiBlogPostToUi);
    } catch (error) {
      console.error("[blog] Failed to load published posts:", error);
      return [];
    }
  }
);

/** Slugs for ISR static params. */
export const getPublishedBlogSlugs = cache(async (): Promise<string[]> => {
  const posts = await getPublishedBlogPosts(50);
  return posts.map((p) => p.slug).filter(Boolean);
});

/**
 * Published blog post by slug for the public detail page.
 */
export const getBlogBySlug = cache(
  async (slug: string): Promise<BlogPost | null> => {
    if (!slug?.trim()) return null;

    try {
      const { data } = await apiFetch<ApiBlogPost>(
        `/blog/slug/${encodeURIComponent(slug)}`,
        { next: { revalidate: DEFAULT_REVALIDATE_SECONDS } }
      );

      if (!data || data.isPublished === false) return null;
      return mapApiBlogPostToUi(data);
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) return null;
      console.error(`[blog] Failed to load post "${slug}":`, error);
      return null;
    }
  }
);

/**
 * Related published posts for a detail page (same category when possible).
 */
export const getRelatedPosts = cache(
  async (slug: string, limit = 3): Promise<BlogPost[]> => {
    try {
      const current = await getBlogBySlug(slug);
      const posts = await getPublishedBlogPosts(50);
      const others = posts.filter((p) => p.slug !== slug);

      const sameCategory = current
        ? others.filter((p) => p.category === current.category)
        : [];

      const pool = sameCategory.length >= limit ? sameCategory : others;
      return pool.slice(0, limit);
    } catch (error) {
      console.error(`[blog] Failed to load related posts for "${slug}":`, error);
      return [];
    }
  }
);

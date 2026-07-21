import { cache } from "react";
import { apiFetch } from "@/lib/api/client";
import { mapApiTestimonialToUi } from "@/lib/mappers/testimonial";
import type { ApiTestimonial } from "@/types/api-testimonial";
import type { Testimonial } from "@/types";

const DEFAULT_REVALIDATE_SECONDS = 60;

/**
 * Active testimonials for the homepage marquee.
 * Cached per-request via React `cache` and revalidated via Next ISR.
 */
export const getActiveTestimonials = cache(
  async (limit = 20): Promise<Testimonial[]> => {
    try {
      const { data } = await apiFetch<ApiTestimonial[]>("/testimonials", {
        query: {
          active: true,
          page: 1,
          limit,
        },
        next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
      });
      return (Array.isArray(data) ? data : []).map(mapApiTestimonialToUi);
    } catch (error) {
      console.error("[testimonials] Failed to load active testimonials:", error);
      return [];
    }
  }
);

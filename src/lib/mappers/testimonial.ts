import type { Testimonial } from "@/types";
import type { ApiTestimonial } from "@/types/api-testimonial";
import { resolveMediaUrl } from "@/lib/media-url";

function studentInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

function toStarRating(rating: number | null | undefined): number {
  if (typeof rating !== "number" || !Number.isFinite(rating)) return 5;
  return Math.min(5, Math.max(1, Math.round(rating)));
}

/** Maps a backend testimonial into the UI Testimonial shape used by the marquee. */
export function mapApiTestimonialToUi(api: ApiTestimonial): Testimonial {
  return {
    id: api.id,
    name: api.studentName,
    role: api.designation?.trim() || api.course?.title?.trim() || "Student",
    company: api.industryPartner?.name?.trim() || "ELEVEIIM",
    content:
      api.reviewText?.trim() ||
      "ELEVEIIM helped me elevate my career with practical, industry-ready training.",
    rating: toStarRating(api.rating),
    image: studentInitials(api.studentName),
    photoUrl: resolveMediaUrl(api.photoUrl) || null,
  };
}

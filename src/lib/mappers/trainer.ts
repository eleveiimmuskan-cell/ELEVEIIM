import type { Trainer } from "@/types";
import type { ApiTrainer } from "@/types/api-trainer";
import { resolveMediaUrl } from "@/lib/media-url";

function trainerInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

function experienceLabel(years: number | null | undefined): string {
  if (years == null || years < 0) return "";
  return `${years}+ Years`;
}

/** Maps a backend trainer into the UI Trainer card shape. */
export function mapApiTrainerToCard(api: ApiTrainer): Trainer {
  return {
    id: api.id,
    name: api.name,
    role: api.designation?.trim() || "Trainer",
    expertise: Array.isArray(api.tags) ? api.tags.filter(Boolean) : [],
    experience: experienceLabel(api.experience),
    students: api.studentsMentored ?? 0,
    rating: api.rating ?? 0,
    image: trainerInitials(api.name),
    photoUrl: resolveMediaUrl(api.photoUrl) || null,
  };
}

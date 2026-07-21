import type { PlacementStory } from "@/types";
import type { ApiPlacement } from "@/types/api-placement";
import { resolveMediaUrl } from "@/lib/media-url";
import { slugify } from "@/lib/slug";

function studentInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

function toSummary(story: string | null | undefined): string {
  const text = (story || "").trim();
  if (!text) return "A career transformation story from ELEVEIIM.";
  if (text.length <= 120) return text;
  return `${text.slice(0, 117).trimEnd()}…`;
}

/** Maps a backend placement into the UI PlacementStory shape used by PlacementCard. */
export function mapApiPlacementToStory(api: ApiPlacement): PlacementStory {
  const slugBase = slugify(api.studentName) || "placement";
  const photoUrl = resolveMediaUrl(api.studentPhotoUrl) || null;

  return {
    id: api.id,
    slug: `${slugBase}-${api.id.slice(0, 8)}`,
    studentName: api.studentName,
    course: api.course?.title?.trim() || "ELEVEIIM Program",
    company: api.industryPartner?.name?.trim() || "Industry Partner",
    role: api.role?.trim() || "Professional",
    package: api.package?.trim() || "—",
    batch: api.batch?.trim() || "",
    summary: toSummary(api.placementStory),
    story: api.placementStory?.trim() || toSummary(api.placementStory),
    image: studentInitials(api.studentName),
    photoUrl,
  };
}

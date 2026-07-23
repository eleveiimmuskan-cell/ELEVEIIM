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

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function toSummary(story: string | null | undefined): string {
  const text = stripHtml(story || "");
  if (!text) return "A career transformation story from ELEVEIIM.";
  if (text.length <= 120) return text;
  return `${text.slice(0, 117).trimEnd()}…`;
}

/** Maps a backend placement into the UI PlacementStory shape used by PlacementCard. */
export function mapApiPlacementToStory(api: ApiPlacement): PlacementStory {
  const slugBase = slugify(api.studentName) || "placement";
  const photoUrl = resolveMediaUrl(api.studentPhotoUrl) || null;

  const storyHtml = api.placementStory?.trim() || "";

  return {
    id: api.id,
    // Full UUID suffix so `/placements/[slug]` can resolve via GET /placements/:id
    slug: `${slugBase}-${api.id}`,
    studentName: api.studentName,
    course: api.course?.title?.trim() || "ELEVEIIM Program",
    company: api.industryPartner?.name?.trim() || "Industry Partner",
    role: api.role?.trim() || "Professional",
    package: api.package?.trim() || "—",
    batch: api.batch?.trim() || "",
    summary: toSummary(storyHtml),
    story: stripHtml(storyHtml) ? storyHtml : toSummary(null),
    image: studentInitials(api.studentName),
    photoUrl,
  };
}

const PLACEMENT_UUID_RE =
  /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Extracts a placement UUID from a detail slug or raw id. */
export function extractPlacementIdFromSlug(slug: string): string | null {
  const trimmed = slug.trim();
  if (
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      trimmed
    )
  ) {
    return trimmed;
  }
  const match = trimmed.match(PLACEMENT_UUID_RE);
  return match ? match[0] : null;
}

import type { Course } from "@/types";

export const COURSE_LISTING_FILTERS = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI" },
  { id: "tech-dev", label: "Software Development" },
  { id: "digital-skills", label: "Marketing" },
  { id: "graphics", label: "Graphics" },
  { id: "personality", label: "Personality Development" },
  { id: "business-development", label: "Business" },
] as const;

export type CourseListingFilterId =
  (typeof COURSE_LISTING_FILTERS)[number]["id"];

function courseHaystack(course: Course): string {
  return [course.title, course.category, ...(course.tags ?? [])]
    .join(" ")
    .toLowerCase();
}

function matchesPersonality(text: string) {
  return /personality|soft skill|communication skill|grooming|elevate x|public speaking|interview preparation|confidence building/.test(
    text
  );
}

function matchesGraphics(text: string) {
  return /graphic|photoshop|illustrator|figma|logo design|creative branding|ai-driven graphic|ai graphic/.test(
    text
  );
}

function matchesBusiness(text: string) {
  return /real estate|business development|property consultant|rera|property management/.test(
    text
  );
}

function matchesTechDev(text: string) {
  return /full stack|node\.?js|php|react|flutter|backend|frontend|express\.js|web development|mysql|mobile app/.test(
    text
  );
}

function matchesDigitalSkills(text: string) {
  return /digital marketing|seo|e-?commerce|marketplace|performance marketing|social media|google ads|ppc|content marketing/.test(
    text
  );
}

function matchesAi(text: string) {
  return /artificial intelligence|generative ai|chatgpt|machine learning|data science|prompt|ai for everyone|python ai|data analytics/.test(
    text
  );
}

/** Each course belongs to at most one group so chips stay exclusive. */
export function courseListingGroup(course: Course): Exclude<
  CourseListingFilterId,
  "all"
> | null {
  const text = courseHaystack(course);
  if (matchesPersonality(text)) return "personality";
  if (matchesGraphics(text)) return "graphics";
  if (matchesBusiness(text)) return "business-development";
  if (matchesTechDev(text)) return "tech-dev";
  if (matchesDigitalSkills(text)) return "digital-skills";
  if (matchesAi(text)) return "ai";
  return null;
}

export function courseMatchesListingFilter(
  course: Course,
  filterId: CourseListingFilterId
): boolean {
  if (filterId === "all") return true;
  return courseListingGroup(course) === filterId;
}

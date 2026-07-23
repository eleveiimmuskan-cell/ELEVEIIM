import type { Course, CurriculumModule, FAQItem, Review } from "@/types";
import type { ApiCourse } from "@/types/api-course";
import { courses as mockCourses } from "@/data/courses";
import { reviews as mockReviews } from "@/data/reviews";

const FALLBACK_FAQS: FAQItem[] =
  mockCourses[0]?.faqs ?? [
    {
      question: "Do I need prior experience?",
      answer:
        "Most courses include beginner-friendly modules. Check the level on each course page for specific prerequisites.",
    },
    {
      question: "Is placement support included?",
      answer:
        "Yes. All enrolled students receive resume building, mock interviews, and referrals to 500+ hiring partners.",
    },
  ];

function formatLevel(level: string): string {
  const normalized = level.replace(/_/g, " ").toLowerCase();
  return normalized.replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatDuration(weeks: number | null | undefined): string {
  if (!weeks || weeks < 1) return "Flexible duration";
  if (weeks % 4 === 0) {
    const months = weeks / 4;
    return months === 1 ? "1 Month" : `${months} Months`;
  }
  return weeks === 1 ? "1 Week" : `${weeks} Weeks`;
}

function toShortDescription(course: ApiCourse): string {
  const text = (
    course.shortDescription ||
    course.description ||
    ""
  ).trim();
  if (!text) return "Industry-ready training designed for career outcomes.";
  if (text.length <= 140) return text;
  return `${text.slice(0, 137).trimEnd()}…`;
}

function toSeoDescription(course: ApiCourse): string {
  const text = (
    course.seoDesc ||
    course.shortDescription ||
    course.description ||
    ""
  ).trim();
  if (!text) return "Industry-ready training designed for career outcomes.";
  return text;
}

function resolveTrainerName(course: ApiCourse): string {
  const linked = course.trainers?.find(
    (t) => t.name?.trim() && t.isActive !== false
  )?.name?.trim();
  if (linked) return linked;
  const anyLinked = course.trainers?.find((t) => t.name?.trim())?.name?.trim();
  if (anyLinked) return anyLinked;
  const named = course.trainerName?.trim();
  if (named) return named;
  return "ELEVEIIM Faculty";
}

function resolveRating(course: ApiCourse): number {
  if (typeof course.rating === "number" && Number.isFinite(course.rating)) {
    return Math.round(course.rating * 10) / 10;
  }
  const trainerRating = course.trainers?.find(
    (t) =>
      typeof t.rating === "number" &&
      Number.isFinite(t.rating) &&
      t.isActive !== false
  )?.rating;
  if (typeof trainerRating === "number") {
    return Math.round(trainerRating * 10) / 10;
  }
  return 4.8;
}

function resolveCertification(course: ApiCourse): string {
  const labeled = course.certification?.trim();
  if (labeled) return labeled;
  const fromRelation = course.certifications?.find((c) => c.name?.trim())?.name?.trim();
  if (fromRelation) return fromRelation;
  return "Industry Certified";
}

function resolveBatchTiming(course: ApiCourse): string {
  const labeled = course.batchTiming?.trim();
  if (labeled) return labeled;
  const batch = course.batches?.[0];
  if (batch?.schedule?.trim()) {
    return batch.mode?.trim()
      ? `${batch.schedule.trim()} · ${batch.mode.trim()}`
      : batch.schedule.trim();
  }
  return "Flexible schedule";
}

function parseCurriculum(syllabus: unknown): CurriculumModule[] {
  if (!syllabus) return [];

  const modules = Array.isArray(syllabus)
    ? syllabus
    : typeof syllabus === "object" &&
        syllabus !== null &&
        Array.isArray((syllabus as { modules?: unknown }).modules)
      ? ((syllabus as { modules: unknown[] }).modules)
      : null;

  if (!modules) return [];

  return modules
    .map((mod) => {
      if (!mod || typeof mod !== "object") return null;
      const record = mod as Record<string, unknown>;
      const title =
        typeof record.title === "string"
          ? record.title.trim()
          : typeof record.name === "string"
            ? record.name.trim()
            : "";
      if (!title) return null;

      const rawTopics = record.topics ?? record.items ?? record.lessons;
      const topics = Array.isArray(rawTopics)
        ? rawTopics
            .map((t) => (typeof t === "string" ? t.trim() : ""))
            .filter(Boolean)
        : [];

      return { title, topics } satisfies CurriculumModule;
    })
    .filter((mod): mod is CurriculumModule => mod !== null);
}

function parseFaqs(syllabus: unknown): FAQItem[] {
  if (!syllabus || typeof syllabus !== "object" || Array.isArray(syllabus)) {
    return [];
  }

  const rawFaqs = (syllabus as { faqs?: unknown }).faqs;
  if (!Array.isArray(rawFaqs)) return [];

  return rawFaqs
    .map((faq) => {
      if (!faq || typeof faq !== "object") return null;
      const record = faq as Record<string, unknown>;
      const question =
        typeof record.question === "string" ? record.question.trim() : "";
      const answer =
        typeof record.answer === "string" ? record.answer.trim() : "";
      if (!question || !answer) return null;
      return { question, answer } satisfies FAQItem;
    })
    .filter((faq): faq is FAQItem => faq !== null);
}

function mapCourseReviews(course: ApiCourse): Review[] {
  return (course.testimonials ?? [])
    .filter((t) => t.isActive !== false && t.reviewText?.trim())
    .map((t) => ({
      id: t.id,
      name: t.studentName,
      course: course.title,
      rating:
        typeof t.rating === "number" && Number.isFinite(t.rating)
          ? Math.round(t.rating)
          : 5,
      date: t.createdAt
        ? new Date(t.createdAt).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
          })
        : "",
      content: t.reviewText!.trim(),
      verified: true,
    }));
}

function resolveMockFaqs(title: string): FAQItem[] {
  const keyword = title.split(/\s+/)[0]?.toLowerCase() ?? "";
  const matched = mockCourses.find((c) =>
    c.title.toLowerCase().includes(keyword)
  );
  return matched?.faqs?.length ? matched.faqs : FALLBACK_FAQS;
}

function resolveMockReviews(title: string): Review[] {
  const keyword = title.split(/\s+/)[0]?.toLowerCase() ?? "";
  const matched = mockReviews.filter((r) =>
    r.course.toLowerCase().includes(keyword)
  );
  if (matched.length > 0) return matched;
  return mockReviews.slice(0, 3);
}

function resolveMockStudents(title: string): number {
  const keyword = title.split(/\s+/)[0]?.toLowerCase() ?? "";
  const matched = mockCourses.find((c) =>
    c.title.toLowerCase().includes(keyword)
  );
  return matched?.students && matched.students > 0 ? matched.students : 2400;
}

/**
 * Maps a backend course list/detail item into the UI `Course` shape.
 * Curriculum comes only from `syllabus` (admin-managed). FAQs, reviews, and
 * enrolled count still fall back to mock data when the API has none.
 */
export function mapApiCourseToCourse(api: ApiCourse): Course {
  const levelLabel = formatLevel(api.level);
  const curriculum = parseCurriculum(api.syllabus);
  const faqs = parseFaqs(api.syllabus);
  const reviews = mapCourseReviews(api);

  return {
    id: api.id,
    slug: api.slug,
    title: api.title,
    description: api.description?.trim() || toShortDescription(api),
    shortDescription: toShortDescription(api),
    seoDescription: toSeoDescription(api),
    duration: formatDuration(api.durationWeeks),
    certification: resolveCertification(api),
    trainer: resolveTrainerName(api),
    rating: resolveRating(api),
    batchTiming: resolveBatchTiming(api),
    category: api.category?.name?.trim() || api.tags?.[0] || levelLabel,
    tags: Array.isArray(api.tags)
      ? api.tags.map((t) => t.trim()).filter(Boolean)
      : [],
    students: resolveMockStudents(api.title),
    level: levelLabel,
    curriculum,
    faqs: faqs.length > 0 ? faqs : resolveMockFaqs(api.title),
    reviews: reviews.length > 0 ? reviews : resolveMockReviews(api.title),
  };
}

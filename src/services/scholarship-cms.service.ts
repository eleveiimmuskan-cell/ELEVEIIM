import { cache } from "react";
import { apiFetch } from "@/lib/api/client";
import { resolveMediaUrl } from "@/lib/media-url";
import { SCHOLARSHIP_ADMIN_SETTINGS } from "@/data/scholarship-admin.mock";
import {
  faqItems,
  scholarshipBenefits,
  SCHOLARSHIP_HIGHLIGHT_STATS,
  SCHOLARSHIP_STUDENTS_IMAGE,
  SCHOLARSHIP_STUDENTS_IMAGE_ALT,
} from "@/data/scholarship";
import type {
  ApiScholarshipModal,
  ApiScholarshipPage,
  ApiScholarshipSettings,
  ScholarshipPageView,
} from "@/types/api-scholarship-cms";
const DEFAULT_REVALIDATE_SECONDS = 60;

function fallbackSettings(): ApiScholarshipSettings {
  return {
    id: "fallback-settings",
    lastDateToApply: SCHOLARSHIP_ADMIN_SETTINGS.lastDateToApply,
    seatsMessage: SCHOLARSHIP_ADMIN_SETTINGS.seatsMessage,
    closedMessage: SCHOLARSHIP_ADMIN_SETTINGS.closedMessage,
    // Never open applications from a CMS fallback / outage path.
    applicationsOpen: false,
    discountPrefix: SCHOLARSHIP_HIGHLIGHT_STATS.discountPrefix,
    discountValue: SCHOLARSHIP_HIGHLIGHT_STATS.discountValue,
    discountSuffix: SCHOLARSHIP_HIGHLIGHT_STATS.discountSuffix,
    statsBadge: SCHOLARSHIP_HIGHLIGHT_STATS.badge,
    avgAwardAmount: SCHOLARSHIP_HIGHLIGHT_STATS.avgAwardAmount,
    avgAwardLabel: SCHOLARSHIP_HIGHLIGHT_STATS.avgAwardLabel,
    avgAwardNote: SCHOLARSHIP_HIGHLIGHT_STATS.avgAwardNote,
    studentsImage: SCHOLARSHIP_STUDENTS_IMAGE,
    studentsImageAlt: SCHOLARSHIP_STUDENTS_IMAGE_ALT,
    isActive: false,
    createdAt: "",
    updatedAt: "",
  };
}

function fallbackPage(): ApiScholarshipPage {
  return {
    id: "fallback-page",
    heroEyebrow: "Scholarship Program",
    heroDescription:
      "Future Leaders Scholarship Program make premium education accessible. Limited seats — apply today.",
    benefits: scholarshipBenefits.map((b, index) => ({
      id: b.id,
      title: b.title,
      description: b.description,
      displayOrder: index + 1,
    })),
    eligibility: [
      "Strong academic record or exceptional talent in tech/design",
      "Financial need documentation (if applicable)",
      "Minimum age 16  years",
      "Commitment to complete the full program",
      "Must have a laptop",
    ].map((text, index) => ({
      id: `elig-${index + 1}`,
      text,
      displayOrder: index + 1,
    })),
    examSteps: [
      {
        id: "exam-1",
        title: "Registration",
        description: "Register for the exam by filling the form. ",
        displayOrder: 1,
      },
      {
        id: "exam-1",
        title: "Aptitude Test",
        description: "Logical reasoning, quantitative ability, and verbal skills.",
        displayOrder: 2,
      },
      {
        id: "exam-2",
        title: "Domain Assessment",
        description: "Basic knowledge in your chosen course area.",
        displayOrder: 3,
      },
      {
        id: "exam-3",
        title: "Personal Interview",
        description: "Short interview to understand your goals and motivation.",
        displayOrder: 4,
      },
    ],
    faqs: faqItems.map((faq, index) => ({
      id: `faq-${index + 1}`,
      question: faq.question,
      answer: faq.answer,
      displayOrder: index + 1,
    })),
    isActive: true,
  };
}

function fallbackModal(): ApiScholarshipModal {
  return {
    id: "fallback-modal",
    enabled: true,
    eyebrow: "ELEVEIIM Scholarship Program",
    description:
      "Take the scholarship assessment and earn fee waivers based on your performance.",
    trustItems: ["Merit Based", "Instant Registration", "Limited Seats"].map(
      (text, index) => ({
        id: `trust-${index + 1}`,
        text,
        displayOrder: index + 1,
      })
    ),
    primaryButtonText: "Apply Now",
    secondaryButtonText: "Maybe Later",
    footerNote: "Trusted by aspiring learners across India",
    initialDelayMs: 900,
    intervalMs: 120000,
    isActive: true,
  };
}

function normalizeSettings(data: ApiScholarshipSettings): ApiScholarshipSettings {
  const image = resolveMediaUrl(data.studentsImage?.trim() || "") || SCHOLARSHIP_STUDENTS_IMAGE;
  return {
    ...data,
    studentsImage: image,
    studentsImageAlt: data.studentsImageAlt?.trim() || SCHOLARSHIP_STUDENTS_IMAGE_ALT,
  };
}

export const getScholarshipCmsSettings = cache(
  async (): Promise<ApiScholarshipSettings> => {
    try {
      const { data } = await apiFetch<ApiScholarshipSettings>(
        "/scholarships/cms/settings",
        { next: { revalidate: DEFAULT_REVALIDATE_SECONDS } }
      );
      if (!data) return fallbackSettings();
      if (data.isActive === false) {
        return normalizeSettings({
          ...data,
          applicationsOpen: false,
          isActive: false,
        });
      }
      return normalizeSettings(data);
    } catch (error) {
      console.error("[scholarship-cms] Failed to load settings:", error);
      return fallbackSettings();
    }
  }
);

export const getScholarshipCmsPage = cache(
  async (): Promise<ApiScholarshipPage> => {
    try {
      const { data } = await apiFetch<ApiScholarshipPage>(
        "/scholarships/cms/page",
        { next: { revalidate: DEFAULT_REVALIDATE_SECONDS } }
      );
      if (!data || data.isActive === false) return fallbackPage();
      return data;
    } catch (error) {
      console.error("[scholarship-cms] Failed to load page:", error);
      return fallbackPage();
    }
  }
);

export const getScholarshipCmsModal = cache(
  async (): Promise<ApiScholarshipModal> => {
    try {
      const { data } = await apiFetch<ApiScholarshipModal>(
        "/scholarships/cms/modal",
        { next: { revalidate: DEFAULT_REVALIDATE_SECONDS } }
      );
      if (!data || data.isActive === false) return { ...fallbackModal(), enabled: false };
      return data;
    } catch (error) {
      console.error("[scholarship-cms] Failed to load modal:", error);
      return fallbackModal();
    }
  }
);

export const getScholarshipPageView = cache(
  async (): Promise<ScholarshipPageView> => {
    const [settings, page] = await Promise.all([
      getScholarshipCmsSettings(),
      getScholarshipCmsPage(),
    ]);
    return { settings, page };
  }
);

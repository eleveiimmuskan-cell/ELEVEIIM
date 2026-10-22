import { cache } from "react";
import { apiFetch } from "@/lib/api/client";
import { SITE_TAGLINE } from "@/lib/constants";
import { resolveMediaUrl } from "@/lib/media-url";
import type { ApiWhoCanJoinSection } from "@/types/api-who-can-join";
import type { ApiFooterCtaSection } from "@/types/api-footer-cta";
import type {
  ApiBenefitsSection,
  BenefitsSectionData,
} from "@/types/api-benefits";
import type {
  ApiHeroBannerItem,
  ApiHeroBannerSection,
  HeroBannerData,
  HeroCampaignSlide,
  HeroHomepageContent,
} from "@/types/api-hero-banner";

const DEFAULT_REVALIDATE_SECONDS = 60;

const DEFAULT_LIVE_COURSE_COUNT = 25;
const LEGACY_LIVE_COURSE_COUNTS = new Set([120, 125]);

function publicLiveCourseCount(value: unknown): number {
  if (
    typeof value === "number" &&
    Number.isFinite(value) &&
    !LEGACY_LIVE_COURSE_COUNTS.has(value)
  ) {
    return value;
  }
  return DEFAULT_LIVE_COURSE_COUNT;
}

/** Correct known CMS typos / reversed brand tagline. */
function normalizeMainHeading(value: string): string {
  const heading = value.trim();
  if (
    /^elevate\s+to\s+educate$/i.test(heading) ||
    /^educate\s+to\s+elevtae$/i.test(heading)
  ) {
    return SITE_TAGLINE;
  }
  return heading;
}

/**
 * Active Who Can Join homepage section (active cards only from the public API).
 * Cached per-request via React `cache` and revalidated via Next ISR.
 */
export const getWhoCanJoinSection = cache(
  async (): Promise<ApiWhoCanJoinSection | null> => {
    try {
      const { data } = await apiFetch<ApiWhoCanJoinSection>(
        "/homepage/who-can-join",
        {
          next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
        }
      );

      if (!data || data.isActive === false) return null;

      const cards = (Array.isArray(data.cards) ? data.cards : [])
        .filter((card) => card.isActive !== false)
        .sort((a, b) => a.displayOrder - b.displayOrder);

      if (cards.length === 0) return null;

      return { ...data, cards };
    } catch (error) {
      console.error("[homepage] Failed to load Who Can Join section:", error);
      return null;
    }
  }
);

/**
 * Active Footer CTA homepage section.
 * Cached per-request via React `cache` and revalidated via Next ISR.
 */
export const getFooterCtaSection = cache(
  async (): Promise<ApiFooterCtaSection | null> => {
    try {
      const { data } = await apiFetch<ApiFooterCtaSection>(
        "/homepage/footer-cta",
        {
          next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
        }
      );

      if (!data || data.isActive === false) return null;
      if (!data.title?.trim() || !data.description?.trim()) return null;
      if (!data.button1Text?.trim() || !data.button1Url?.trim()) return null;
      if (!data.button2Text?.trim() || !data.button2Url?.trim()) return null;

      return data;
    } catch (error) {
      console.error("[homepage] Failed to load Footer CTA section:", error);
      return null;
    }
  }
);

/**
 * Active Benefits homepage section (features + certificates; statistics skipped for public UI).
 * Cached per-request via React `cache` and revalidated via Next ISR.
 */
export const getBenefitsSection = cache(
  async (): Promise<BenefitsSectionData | null> => {
    try {
      const { data } = await apiFetch<ApiBenefitsSection>("/homepage/benefits", {
        next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
      });

      if (!data || data.isActive === false) return null;

      const heading = data.heading?.trim() || "";
      const description = data.description?.trim() || "";
      if (!heading || !description) return null;

      const features = (Array.isArray(data.features) ? data.features : [])
        .filter((feature) => feature.isActive !== false && feature.title?.trim())
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .map((feature) => ({
          id: feature.id,
          title: feature.title.trim(),
        }));

      if (features.length === 0) return null;

      const certificates = (Array.isArray(data.certificates)
        ? data.certificates
        : []
      )
        .filter((cert) => cert.imageUrl?.trim())
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .map((cert, index) => {
          const imageUrl = resolveMediaUrl(cert.imageUrl.trim());
          return {
            id: cert.id,
            imageUrl,
            alt: `ELEVEIIM certificate sample ${index + 1}`,
          };
        })
        .filter((cert) => Boolean(cert.imageUrl));

      return {
        heading,
        description,
        features,
        certificates,
      };
    } catch (error) {
      console.error("[homepage] Failed to load Benefits section:", error);
      return null;
    }
  }
);

function isPlaceholderLogo(url: string): boolean {
  return url.endsWith("/eleveiim-logo.png");
}

/** Real uploaded artwork. The seed logo stays a left-column decoration, not a slide. */
function usableCampaignImage(raw: string | undefined): string {
  const resolved = resolveMediaUrl(raw?.trim() || "");
  if (!resolved || isPlaceholderLogo(resolved)) return "";
  return resolved;
}

function toPrimaryBanner(banner: ApiHeroBannerItem): HeroBannerData {
  const resolvedBackground = usableCampaignImage(banner.backgroundImage);
  return {
    scholarshipText: banner.scholarshipText?.trim() || "",
    mainHeading: normalizeMainHeading(banner.mainHeading),
    subHeading: banner.subHeading?.trim() || "",
    description: banner.description.trim(),
    buttonText: banner.buttonText.trim(),
    buttonUrl: banner.buttonUrl.trim(),
    backgroundImage: resolvedBackground,
    liveCourseCount: publicLiveCourseCount(banner.liveCourseCount),
    studentRating:
      typeof banner.studentRating === "number" ? banner.studentRating : 4.9,
    successRate:
      typeof banner.successRate === "number" ? banner.successRate : 98,
  };
}

function isPrimaryCandidate(banner: ApiHeroBannerItem): boolean {
  return Boolean(
    banner.mainHeading?.trim() &&
      banner.description?.trim() &&
      banner.buttonText?.trim() &&
      banner.buttonUrl?.trim()
  );
}

function toCampaignSlide(banner: ApiHeroBannerItem): HeroCampaignSlide | null {
  const imageUrl = usableCampaignImage(banner.backgroundImage);
  const heading = banner.mainHeading?.trim() || "";
  const description = banner.description?.trim() || "";
  if (!imageUrl || !heading || !description) return null;
  const imageAlt = banner.imageAlt?.trim() || heading;
  return {
    id: banner.id,
    eyebrow: banner.scholarshipText?.trim() || "",
    heading: normalizeMainHeading(heading),
    subHeading: banner.subHeading?.trim() || "",
    description,
    imageUrl,
    imageAlt,
    buttonText: banner.buttonText?.trim() || "",
    buttonUrl: banner.buttonUrl?.trim() || "",
  };
}

/**
 * Primary left-column banner, plus later photographic campaigns.
 * Hardcoded promo slides stay in the carousel component.
 */
export const getHeroBannerSection = cache(
  async (): Promise<HeroHomepageContent> => {
    try {
      const { data } = await apiFetch<ApiHeroBannerSection>(
        "/homepage/hero-banner",
        {
          next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
        }
      );

      if (!data || data.isActive === false) {
        return { primary: null, campaigns: [] };
      }

      const active = (Array.isArray(data.banners) ? data.banners : [])
        .filter((item) => item.isActive !== false)
        .sort((a, b) => a.displayOrder - b.displayOrder);

      const primaryItem = active.find(isPrimaryCandidate) ?? null;
      const primary = primaryItem ? toPrimaryBanner(primaryItem) : null;
      const campaigns = active
        .filter((item) => item.id !== primaryItem?.id)
        .map(toCampaignSlide)
        .filter((slide): slide is HeroCampaignSlide => slide !== null);

      return { primary, campaigns };
    } catch (error) {
      console.error("[homepage] Failed to load Hero Banner section:", error);
      return { primary: null, campaigns: [] };
    }
  }
);

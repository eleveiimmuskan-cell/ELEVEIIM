import { cache } from "react";
import { apiFetch } from "@/lib/api/client";
import { resolveMediaUrl } from "@/lib/media-url";
import type { ApiWhoCanJoinSection } from "@/types/api-who-can-join";
import type { ApiFooterCtaSection } from "@/types/api-footer-cta";
import type {
  ApiBenefitsSection,
  BenefitsSectionData,
} from "@/types/api-benefits";
import type {
  ApiHeroBannerSection,
  HeroBannerData,
} from "@/types/api-hero-banner";

const DEFAULT_REVALIDATE_SECONDS = 60;

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

/**
 * First active Hero Banner for the public homepage left column.
 * Right-side scholarship offer stays static on the public site for now.
 */
export const getHeroBannerSection = cache(
  async (): Promise<HeroBannerData | null> => {
    try {
      const { data } = await apiFetch<ApiHeroBannerSection>(
        "/homepage/hero-banner",
        {
          next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
        }
      );

      if (!data || data.isActive === false) return null;

      const banner = (Array.isArray(data.banners) ? data.banners : [])
        .filter((item) => item.isActive !== false)
        .sort((a, b) => a.displayOrder - b.displayOrder)[0];

      if (!banner) return null;
      if (!banner.mainHeading?.trim() || !banner.description?.trim()) return null;
      if (!banner.buttonText?.trim() || !banner.buttonUrl?.trim()) return null;

      const rawBackground = banner.backgroundImage?.trim() || "";
      const resolvedBackground = resolveMediaUrl(rawBackground);
      // Seed/placeholder logo is not a real hero background — keep the default look.
      const backgroundImage =
        resolvedBackground &&
        !resolvedBackground.endsWith("/eleveiim-logo.png")
          ? resolvedBackground
          : "";

      return {
        scholarshipText: banner.scholarshipText?.trim() || "",
        mainHeading: banner.mainHeading.trim(),
        subHeading: banner.subHeading?.trim() || "",
        description: banner.description.trim(),
        buttonText: banner.buttonText.trim(),
        buttonUrl: banner.buttonUrl.trim(),
        backgroundImage,
        liveCourseCount:
          typeof banner.liveCourseCount === "number" ? banner.liveCourseCount : 120,
        studentRating:
          typeof banner.studentRating === "number" ? banner.studentRating : 4.9,
        successRate:
          typeof banner.successRate === "number" ? banner.successRate : 98,
      };
    } catch (error) {
      console.error("[homepage] Failed to load Hero Banner section:", error);
      return null;
    }
  }
);

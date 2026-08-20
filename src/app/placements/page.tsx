import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/data/page-seo";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/common/json-ld";
import { PageHero } from "@/components/common/page-header";
import { PageCta } from "@/components/common/page-cta";
import { PageTransition } from "@/animations/page-transition";
import { PlacementsPageContent } from "@/components/pages/placements-page-content";
import { getActiveIndustryPartners } from "@/services/industry-partners.service";
import { getActivePlacements } from "@/services/placements.service";
import { getActiveTestimonials } from "@/services/testimonials.service";

export const metadata: Metadata = createPageMetadata({
  title: PAGE_SEO.placements.title,
  description: PAGE_SEO.placements.description,
  path: "/placements",
  keywords: ["placements", "jobs", "salary", "career", "ELEVEIIM"],
  absoluteTitle: true,
});

/** Placements page ISR — extend Promise.all below as more sections go dynamic. */
export const revalidate = 60;

export default async function PlacementsPage() {
  const [partners, stories, testimonials] = await Promise.all([
    getActiveIndustryPartners(),
    getActivePlacements(50),
    getActiveTestimonials(12),
  ]);

  return (
    <PageTransition>
      <JsonLd
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Placements" },
        ])}
      />
      <PageHero
        eyebrow="Career Outcomes"
        title="Placement Excellence"
        description="From resume building to offer letters — our placement cell connects you with top hiring partners."
      />

      <PlacementsPageContent
        partners={partners}
        stories={stories}
        testimonials={testimonials}
      />
      <PageCta />
    </PageTransition>
  );
}

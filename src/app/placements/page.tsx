import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/common/json-ld";
import { PageHero } from "@/components/common/page-header";
import { PageCta } from "@/components/common/page-cta";
import { PageTransition } from "@/animations/page-transition";
import { PlacementsPageContent } from "@/components/pages/placements-page-content";

export const metadata: Metadata = createPageMetadata({
  title: "Placements",
  description:
    "Explore ELEVEIIM placement success stories, hiring partners, salary packages, and career outcomes.",
  path: "/placements",
  keywords: ["placements", "jobs", "salary", "career", "ELEVEIIM"],
});

export default function PlacementsPage() {
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

      <PlacementsPageContent />
      <PageCta />
    </PageTransition>
  );
}

import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/common/json-ld";
import { PageHero } from "@/components/common/page-header";
import { PageCta } from "@/components/common/page-cta";
import { PageTransition } from "@/animations/page-transition";
import { aboutContent } from "@/data/about";
import { AboutPageContent } from "@/components/pages/animated-page-sections";
import { TrainersSection } from "@/components/home/trainers-section";
import { WorkshopsSection } from "@/components/home/workshops-section";

export const metadata: Metadata = createPageMetadata({
  title: "About Us",
  description: `Learn about ELEVEIIM — ${aboutContent.experience} years of excellence in premium training, placements, and career development.`,
  path: "/about",
  keywords: ["about", "training institute", "mission", "vision", "ELEVEIIM"],
});

export default function AboutPage() {
  return (
    <PageTransition>
      <JsonLd
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "About" },
        ])}
      />
      <PageHero
        eyebrow="About ELEVEIIM"
        title={`${aboutContent.experience} Years of Excellence`}
        description={aboutContent.intro}
      />

      <AboutPageContent />
      <TrainersSection />
      <WorkshopsSection />
      <PageCta />
    </PageTransition>
  );
}

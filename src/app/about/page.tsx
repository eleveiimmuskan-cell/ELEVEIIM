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
import {
  getAboutHero,
  getAboutMissionVision,
  getAboutStatistics,
  getAboutValues,
} from "@/services/about.service";

export const metadata: Metadata = createPageMetadata({
  title: "About Us",
  description: `Learn about ELEVEIIM — ${aboutContent.experience} years of excellence in premium training, placements, and career development.`,
  path: "/about",
  keywords: ["about", "training institute", "mission", "vision", "ELEVEIIM"],
});

/** About page ISR — all four About CMS sections load in parallel. */
export const revalidate = 60;

const HERO_FALLBACK = {
  title: "About ELEVEIIM",
  heading: `${aboutContent.experience} Years of Excellence`,
  subtitle: aboutContent.intro,
  backgroundImage: "",
} as const;

export default async function AboutPage() {
  const [hero, missionVision, valuesSection, statistics] = await Promise.all([
    getAboutHero(),
    getAboutMissionVision(),
    getAboutValues(),
    getAboutStatistics(),
  ]);

  return (
    <PageTransition>
      <JsonLd
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "About" },
        ])}
      />
      <PageHero
        eyebrow={hero?.title?.trim() || HERO_FALLBACK.title}
        title={hero?.heading?.trim() || HERO_FALLBACK.heading}
        description={hero?.subtitle?.trim() || HERO_FALLBACK.subtitle}
        backgroundImage={
          hero?.backgroundImage?.trim() || HERO_FALLBACK.backgroundImage || null
        }
      />

      <AboutPageContent
        mission={missionVision?.mission}
        vision={missionVision?.vision}
        values={valuesSection?.values?.map((v) => ({
          id: v.id,
          title: v.title,
          description: v.description,
        }))}
        statistics={
          statistics
            ? {
                studentsTrained: statistics.studentsTrained,
                placementPartners: statistics.placementPartners,
                placementRate: statistics.placementRate,
                expertTrainers: statistics.expertTrainers,
              }
            : null
        }
      />
      <TrainersSection />
      <WorkshopsSection />
      <PageCta />
    </PageTransition>
  );
}

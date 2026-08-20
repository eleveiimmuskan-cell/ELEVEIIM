import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/data/page-seo";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/common/json-ld";
import { PageHero } from "@/components/common/page-header";
import { PageCta } from "@/components/common/page-cta";
import { PageTransition } from "@/animations/page-transition";
import { aboutContent } from "@/data/about";
import { AboutPageContent } from "@/components/pages/animated-page-sections";
import { TrainersSection } from "@/components/home/trainers-section";
import { WorkshopsSection } from "@/components/home/workshops-section";
import { getAboutPage } from "@/services/about.service";
import { getFeaturedTrainers } from "@/services/trainers.service";

export const metadata: Metadata = createPageMetadata({
  title: PAGE_SEO.about.title,
  description: PAGE_SEO.about.description,
  path: "/about",
  keywords: ["about", "training institute", "mission", "vision", "ELEVEIIM"],
  absoluteTitle: true,
});

/** About page ISR — CMS aggregate + trainers. */
export const revalidate = 60;

const HERO_FALLBACK = {
  title: "About ELEVEIIM",
  heading: `${aboutContent.experience} Years of Excellence`,
  subtitle: aboutContent.intro,
  backgroundImage: "",
} as const;

export default async function AboutPage() {
  const [about, trainers] = await Promise.all([
    getAboutPage(),
    getFeaturedTrainers(8),
  ]);

  const hero = about?.hero ?? null;
  const missionVision = about?.missionVision ?? null;
  const valuesSection = about?.values ?? null;
  const statistics = about?.statistics ?? null;

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
      <TrainersSection trainers={trainers} />
      <WorkshopsSection />
      <PageCta />
    </PageTransition>
  );
}

import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/common/json-ld";
import { PageHero, Breadcrumb } from "@/components/common/page-header";
import { PageCta } from "@/components/common/page-cta";
import { PageTransition } from "@/animations/page-transition";
import { aboutContent } from "@/data/about";
import { counterStats } from "@/data/counters";
import { TrainersSection } from "@/components/home/trainers-section";
import { WorkshopsSection } from "@/components/home/workshops-section";
import { GlassCard } from "@/components/common/glass-card";

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

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />

          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold">Our Mission</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{aboutContent.mission}</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Our Vision</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{aboutContent.vision}</p>
            </div>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {aboutContent.values.map((v) => (
              <GlassCard key={v.title} hover={false}>
                <h3 className="font-bold text-brand">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.description}</p>
              </GlassCard>
            ))}
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {counterStats.map((s) => (
              <GlassCard key={s.id} className="text-center">
                <p className="text-2xl font-bold text-brand">
                  {s.value}{s.suffix}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <TrainersSection />
      <WorkshopsSection />
      <PageCta />
    </PageTransition>
  );
}

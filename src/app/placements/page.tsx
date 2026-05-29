import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/common/json-ld";
import { PageHero, Breadcrumb } from "@/components/common/page-header";
import { PageCta } from "@/components/common/page-cta";
import { PageTransition } from "@/animations/page-transition";
import { PlacementsListing } from "@/components/placements/placements-listing";
import {
  placementCompanies,
  placementStats,
  salaryPackages,
} from "@/services/placements.service";
import { GlassCard } from "@/components/common/glass-card";
import { testimonials } from "@/data/testimonials";

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

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Placements" }]} />

          <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {placementStats.map((s) => (
              <GlassCard key={s.id} className="text-center">
                <p className="text-2xl font-bold text-brand">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </GlassCard>
            ))}
          </div>

          <h2 className="mb-6 text-xl font-bold">Hiring Partners</h2>
          <div className="mb-12 flex flex-wrap gap-3">
            {placementCompanies.map((c) => (
              <div
                key={c.id}
                className="flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2 shadow-sm"
              >
                <span className="flex size-8 items-center justify-center rounded-lg bg-brand/10 text-xs font-bold text-brand">
                  {c.logo}
                </span>
                <span className="text-sm font-medium">{c.name}</span>
              </div>
            ))}
          </div>

          <h2 className="mb-6 text-xl font-bold">Salary Packages</h2>
          <div className="mb-12 grid gap-4 sm:grid-cols-2">
            {salaryPackages.map((p) => (
              <GlassCard key={p.id} hover={false}>
                <div className="flex justify-between gap-4">
                  <div>
                    <p className="font-semibold">{p.role}</p>
                    <p className="text-xs text-muted-foreground">{p.company}</p>
                  </div>
                  <p className="font-bold text-brand-accent">{p.range}</p>
                </div>
              </GlassCard>
            ))}
          </div>

          <h2 className="mb-6 text-xl font-bold">Success Stories</h2>
          <PlacementsListing />

          <h2 className="mb-6 mt-16 text-xl font-bold">What Alumni Say</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <GlassCard key={t.id} hover={false}>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{t.content}&rdquo;
                </p>
                <p className="mt-4 text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role} · {t.company}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <PageCta />
    </PageTransition>
  );
}

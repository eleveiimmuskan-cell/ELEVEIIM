"use client";

import { Breadcrumb } from "@/components/common/page-header";
import { GlassCard } from "@/components/common/glass-card";
import { PlacementsListing } from "@/components/placements/placements-listing";
import {
  placementCompanies,
  placementStats,
  salaryPackages,
} from "@/services/placements.service";
import { testimonials } from "@/data/testimonials";
import {
  AnimatedHeading,
  PageContentSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/common/motion-wrapper";

export function PlacementsPageContent() {
  return (
    <PageContentSection>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Placements" }]} />

      <StaggerContainer className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {placementStats.map((s) => (
          <StaggerItem key={s.id}>
            <GlassCard className="text-center">
              <p className="text-2xl font-bold text-brand">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </GlassCard>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <AnimatedHeading>
        <h2 className="mb-6 text-xl font-bold">Hiring Partners</h2>
      </AnimatedHeading>
      <StaggerContainer className="mb-12 flex flex-wrap gap-3" stagger={0.05}>
        {placementCompanies.map((c) => (
          <StaggerItem key={c.id}>
            <div className="flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2 shadow-sm">
              <span className="flex size-8 items-center justify-center rounded-lg bg-brand/10 text-xs font-bold text-brand">
                {c.logo}
              </span>
              <span className="text-sm font-medium">{c.name}</span>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <AnimatedHeading>
        <h2 className="mb-6 text-xl font-bold">Salary Packages</h2>
      </AnimatedHeading>
      <StaggerContainer className="mb-12 grid gap-4 sm:grid-cols-2">
        {salaryPackages.map((p) => (
          <StaggerItem key={p.id}>
            <GlassCard hover={false}>
              <div className="flex justify-between gap-4">
                <div>
                  <p className="font-semibold">{p.role}</p>
                  <p className="text-xs text-muted-foreground">{p.company}</p>
                </div>
                <p className="font-bold text-brand-accent">{p.range}</p>
              </div>
            </GlassCard>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <AnimatedHeading>
        <h2 className="mb-6 text-xl font-bold">Success Stories</h2>
      </AnimatedHeading>
      <PlacementsListing />

      <AnimatedHeading className="mt-16">
        <h2 className="mb-6 text-xl font-bold">What Alumni Say</h2>
      </AnimatedHeading>
      <StaggerContainer className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <StaggerItem key={t.id}>
            <GlassCard hover={false}>
              <p className="text-sm leading-relaxed text-muted-foreground">
                &ldquo;{t.content}&rdquo;
              </p>
              <p className="mt-4 text-sm font-semibold">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role} · {t.company}</p>
            </GlassCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </PageContentSection>
  );
}

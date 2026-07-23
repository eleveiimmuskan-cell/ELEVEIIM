"use client";

import { Breadcrumb } from "@/components/common/page-header";
import { GlassCard } from "@/components/common/glass-card";
import { IndustryPartnersMarquee } from "@/components/home/trusted-partners";
import { PlacementsListing } from "@/components/placements/placements-listing";
import {
  placementStats,
  salaryPackages,
} from "@/services/placements.service";
import {
  AnimatedHeading,
  PageContentSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/common/motion-wrapper";
import type { IndustryPartner } from "@/types/industry-partner";
import type { PlacementStory, Testimonial } from "@/types";

interface PlacementsPageContentProps {
  partners?: IndustryPartner[];
  stories?: PlacementStory[];
  testimonials?: Testimonial[];
}

export function PlacementsPageContent({
  partners = [],
  stories = [],
  testimonials = [],
}: PlacementsPageContentProps) {
  return (
    <PageContentSection>
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Placements" }]}
      />

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
      {partners.length === 0 ? (
        <p className="mb-12 text-sm text-muted-foreground">
          Hiring partners will appear here soon.
        </p>
      ) : (
        <div className="mb-12">
          <IndustryPartnersMarquee partners={partners} />
        </div>
      )}

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
      <PlacementsListing stories={stories} />

      <AnimatedHeading className="mt-16">
        <h2 className="mb-6 text-xl font-bold">What Alumni Say</h2>
      </AnimatedHeading>
      {testimonials.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Alumni testimonials will appear here soon.
        </p>
      ) : (
        <StaggerContainer className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <StaggerItem key={t.id}>
              <GlassCard hover={false}>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{t.content}&rdquo;
                </p>
                <p className="mt-4 text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">
                  {t.role} · {t.company}
                </p>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </PageContentSection>
  );
}

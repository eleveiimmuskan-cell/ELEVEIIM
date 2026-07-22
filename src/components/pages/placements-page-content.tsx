"use client";

import { useState } from "react";
import Image from "next/image";
import { Breadcrumb } from "@/components/common/page-header";
import { GlassCard } from "@/components/common/glass-card";
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
import { isRemoteMediaUrl, resolveMediaUrl } from "@/lib/media-url";
import type { IndustryPartner } from "@/types/industry-partner";
import type { PlacementStory, Testimonial } from "@/types";

function partnerInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

function HiringPartnerChip({ partner }: { partner: IndustryPartner }) {
  const [failed, setFailed] = useState(false);
  const resolved = resolveMediaUrl(partner.logoUrl);
  const showImage = Boolean(resolved) && !failed;

  const chip = (
    <div className="flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2 shadow-sm">
      <span className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-brand/10 text-xs font-bold text-brand">
        {showImage ? (
          <Image
            src={resolved}
            alt=""
            width={32}
            height={32}
            className="size-full object-contain p-0.5"
            unoptimized={isRemoteMediaUrl(partner.logoUrl ?? "")}
            onError={() => setFailed(true)}
          />
        ) : (
          partnerInitials(partner.name)
        )}
      </span>
      <span className="text-sm font-medium">{partner.name}</span>
    </div>
  );

  if (partner.website?.trim()) {
    return (
      <a
        href={partner.website.trim()}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-opacity hover:opacity-90"
        aria-label={`Visit ${partner.name}`}
      >
        {chip}
      </a>
    );
  }

  return chip;
}

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
        <StaggerContainer className="mb-12 flex flex-wrap gap-3" stagger={0.05}>
          {partners.map((partner) => (
            <StaggerItem key={partner.id}>
              <HiringPartnerChip partner={partner} />
            </StaggerItem>
          ))}
        </StaggerContainer>
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

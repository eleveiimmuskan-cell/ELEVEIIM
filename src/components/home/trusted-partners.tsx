"use client";

import { partners } from "@/data/partners";
import { SectionReveal } from "@/components/common/motion-wrapper";
import { SectionHeader } from "@/components/common/section-header";

export function TrustedPartnersSection() {
  return (
    <SectionReveal className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Trusted By"
          title="Our Industry Partners"
          description="Collaborating with leading companies to deliver career-ready training and placement opportunities."
        />

        <div className="relative overflow-hidden">
          <div className="flex animate-marquee gap-8 whitespace-nowrap">
            {[...partners, ...partners].map((partner, i) => (
              <div
                key={`${partner.id}-${i}`}
                className="flex shrink-0 items-center gap-3 rounded-2xl border border-border bg-muted/30 px-8 py-4 transition-colors hover:border-brand/30 hover:bg-brand/5"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-brand/10 text-sm font-bold text-brand">
                  {partner.logo}
                </span>
                <span className="text-sm font-semibold text-foreground">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}

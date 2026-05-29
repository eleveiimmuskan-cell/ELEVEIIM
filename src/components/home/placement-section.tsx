"use client";

import { motion } from "framer-motion";
import { Briefcase, Quote, TrendingUp } from "lucide-react";
import {
  offerLetters,
  placementCompanies,
  placementStats,
  salaryPackages,
} from "@/data/placements";
import { placementTestimonials } from "@/data/testimonials";
import {
  SectionReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/common/motion-wrapper";
import { SectionHeader } from "@/components/common/section-header";
import { GlassCard } from "@/components/common/glass-card";

export function PlacementSection() {
  return (
    <SectionReveal id="placements" className="bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Career Outcomes"
          title="Placement Excellence"
          description="From resume building to offer letters — our dedicated placement cell connects you with top hiring partners."
        />

        <StaggerContainer className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {placementStats.map((stat) => (
            <StaggerItem key={stat.id}>
              <GlassCard className="text-center">
                <p className="text-2xl font-bold text-brand">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mb-12">
          <h3 className="mb-6 text-center text-lg font-semibold text-foreground">
            Hiring Partners
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {placementCompanies.map((company) => (
              <motion.div
                key={company.id}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 rounded-xl border border-border bg-white px-5 py-3 shadow-sm"
              >
                <span className="flex size-8 items-center justify-center rounded-lg bg-brand/10 text-xs font-bold text-brand">
                  {company.logo}
                </span>
                <span className="text-sm font-medium">{company.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-12 grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <TrendingUp className="size-5 text-brand" />
              Salary Packages
            </h3>
            <div className="space-y-3">
              {salaryPackages.map((pkg) => (
                <GlassCard key={pkg.id} hover={false} className="bg-white py-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-foreground">{pkg.role}</p>
                      <p className="text-xs text-muted-foreground">{pkg.company}</p>
                    </div>
                    <p className="text-lg font-bold text-brand-accent">{pkg.range}</p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <Briefcase className="size-5 text-brand" />
              Offer Letter Previews
            </h3>
            <div className="space-y-3">
              {offerLetters.map((letter) => (
                <GlassCard
                  key={letter.id}
                  className="relative overflow-hidden border-l-4 border-l-brand bg-white py-4"
                >
                  <div className="absolute right-4 top-4 text-[10px] font-bold uppercase tracking-widest text-brand/30">
                    Offer Letter
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    {letter.studentName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {letter.role} at {letter.company}
                  </p>
                  <p className="mt-2 text-lg font-bold text-brand">
                    {letter.package}
                  </p>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>

        <h3 className="mb-6 text-center text-lg font-semibold text-foreground">
          Student Success Stories
        </h3>
        <StaggerContainer className="grid gap-6 md:grid-cols-3">
          {placementTestimonials.map((item) => (
            <StaggerItem key={item.id}>
              <GlassCard className="bg-white">
                <Quote className="mb-3 size-8 text-brand/20" />
                <p className="text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{item.content}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                  <div className="flex size-10 items-center justify-center rounded-full bg-brand/10 text-xs font-bold text-brand">
                    {item.image}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.role} · {item.company}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </SectionReveal>
  );
}

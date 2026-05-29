"use client";

import Link from "next/link";
import { CheckCircle2, GraduationCap } from "lucide-react";
import { scholarshipBenefits } from "@/data/scholarship";
import { SectionReveal } from "@/components/common/motion-wrapper";
import { SectionHeader } from "@/components/common/section-header";
import { GlassCard } from "@/components/common/glass-card";
import { ScholarshipButton } from "@/components/common/scholarship-button";
import { Button } from "@/components/ui/button";

export function ScholarshipHighlightSection() {
  return (
    <SectionReveal className="bg-brand/5 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader
              align="left"
              eyebrow="Scholarship Program"
              title="Up to 100% Fee Waiver Available"
              description="Merit-based scholarships make premium education accessible. Apply today — limited seats."
            />
            <ul className="space-y-4">
              {scholarshipBenefits.slice(0, 3).map((b) => (
                <li key={b.id} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand" />
                  <div>
                    <p className="font-semibold text-foreground">{b.title}</p>
                    <p className="text-sm text-muted-foreground">{b.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <ScholarshipButton />
              <Button asChild variant="outline" className="border-brand text-brand">
                <Link href="/scholarship">Learn More</Link>
              </Button>
            </div>
          </div>

          <GlassCard hover={false} className="relative overflow-hidden bg-white">
            <div className="absolute -right-8 -top-8 size-32 rounded-full bg-brand/10" />
            <div className="relative">
              <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-brand text-white shadow-lg shadow-brand/25">
                <GraduationCap className="size-7" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">GET 75% SCHOLARSHIP</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Take the scholarship exam and unlock premium training at a fraction of the cost.
              </p>
              <Button asChild className="mt-6 w-full bg-brand-accent hover:bg-brand-accent/90">
                <Link href="/scholarship">Start Application</Link>
              </Button>
            </div>
          </GlassCard>
        </div>
      </div>
    </SectionReveal>
  );
}

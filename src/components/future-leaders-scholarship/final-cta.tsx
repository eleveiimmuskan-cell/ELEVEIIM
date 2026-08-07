"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedScholarshipDeadline } from "@/components/future-leaders-scholarship/animated-deadline";
import { FUTURE_LEADERS_SCHOLARSHIP_APPLY_HREF } from "@/data/future-leaders-scholarship";
import { SectionReveal } from "@/components/common/motion-wrapper";

export function FutureLeadersScholarshipFinalCta() {
  return (
    <SectionReveal
      className="relative overflow-hidden bg-gradient-to-br from-brand via-[#1565d8] to-[#0e4a9e] py-16 sm:py-20"
      aria-labelledby="future-leaders-final-cta-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(255,255,255,0.18),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-10 top-0 size-48 rounded-full bg-white/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-10 bottom-0 size-56 rounded-full bg-brand-accent/20 blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2
          id="future-leaders-final-cta-heading"
          className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl"
        >
          Don&apos;t Miss This Opportunity
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
          Take the scholarship test today and get 100% free scholarship for 100
          students on ELEVEIIM&apos;s industry-ready professional training
          program.
        </p>

        <Button
          asChild
          size="lg"
          className="mt-8 h-12 rounded-xl bg-brand-accent px-10 text-base font-bold text-white shadow-lg shadow-brand-accent/35 hover:bg-brand-accent/90"
        >
          <Link href={FUTURE_LEADERS_SCHOLARSHIP_APPLY_HREF}>
            Apply Now
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Button>

        {/* <AnimatedScholarshipDeadline
          className="mt-5 justify-center"
          label="Last Date to Apply:"
        /> */}
      </div>
    </SectionReveal>
  );
}

"use client";

import { SectionReveal } from "@/components/common/motion-wrapper";
import { PayNowButton } from "@/components/free-ai-foundation-course/pay-now-button";

export function FreeAiFoundationFinalCta() {
  return (
    <SectionReveal
      className="relative overflow-hidden bg-gradient-to-br from-brand via-[#1565d8] to-[#0e4a9e] py-16 sm:py-20"
      aria-labelledby="free-ai-final-cta-heading"
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
          id="free-ai-final-cta-heading"
          className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl"
        >
          Pay ₹299 and start the course
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
          One registration fee. The course stays free after that, with no extra charges.
        </p>
        <PayNowButton className="mt-8" />
      </div>
    </SectionReveal>
  );
}

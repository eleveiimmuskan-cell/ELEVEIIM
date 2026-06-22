"use client";

import { COMPANY_LOGOS } from "@/data/industrial-training";
import { SectionHeading } from "./section-heading";
import { SectionReveal } from "@/components/common/motion-wrapper";

export function CompanyLogos() {
  const logos = [...COMPANY_LOGOS, ...COMPANY_LOGOS];

  return (
    <SectionReveal className="overflow-hidden bg-[#1E293B] py-14" aria-labelledby="companies-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="companies-heading"
          title="Our Students Work At"
          align="center"
          className="text-white [&_p]:text-white/70 [&_h2]:text-white"
        />
      </div>

      <div className="relative mt-2 overflow-hidden" aria-label="Leading company logos">
        <div className="flex w-max animate-marquee gap-4 px-4 [animation-duration:40s]">
          {logos.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex h-14 min-w-[140px] items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 text-sm font-semibold text-white/90"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}

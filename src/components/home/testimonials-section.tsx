"use client";

import { SectionReveal } from "@/components/common/motion-wrapper";
import { SectionHeader } from "@/components/common/section-header";
import { TestimonialMarquee } from "@/components/home/testimonial-marquee";
import type { Testimonial } from "@/types";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  if (testimonials.length === 0) return null;

  return (
    <SectionReveal className="overflow-hidden bg-brand py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Success Stories"
          title="What Our Students Say"
          description="Real transformations from learners who elevated their careers with ELEVEIIM."
          className="[&_h2]:text-white [&_p]:text-white/75 [&_p:first-of-type]:text-white/90"
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <TestimonialMarquee items={testimonials} />
      </div>
    </SectionReveal>
  );
}

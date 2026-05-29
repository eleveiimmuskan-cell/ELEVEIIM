"use client";

import { Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import {
  SectionReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/common/motion-wrapper";
import { SectionHeader } from "@/components/common/section-header";
import { GlassCard } from "@/components/common/glass-card";

export function TestimonialsSection() {
  return (
    <SectionReveal className="bg-brand py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Success Stories"
          title="What Our Students Say"
          description="Real transformations from learners who elevated their careers with ELEVEIIM."
          className="[&_h2]:text-white [&_p]:text-white/75 [&_p:first-of-type]:text-white/90"
        />

        <StaggerContainer className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <StaggerItem key={item.id}>
              <GlassCard className="border-white/20 bg-white/10 text-white backdrop-blur-xl hover:border-white/40">
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-brand-accent text-brand-accent"
                    />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-white/90">
                  &ldquo;{item.content}&rdquo;
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-full bg-white/20 text-sm font-bold">
                    {item.image}
                  </div>
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-xs text-white/70">
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

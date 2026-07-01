"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HOME_PREVIEW, HOME_STATS } from "@/data/industrial-training";
import { itCardClass } from "@/components/industrial-training/constants";
import {
  SectionReveal,
  StaggerContainer,
  StaggerItem,
  AnimatedHeading,
  VIEWPORT_ONCE,
  PREMIUM_EASE,
} from "@/components/common/motion-wrapper";
import { motion } from "framer-motion";

export function IndustrialTrainingPreview() {
  return (
    <SectionReveal
      id="industrial-training"
      className="bg-gradient-to-br from-white via-[#0B63CE]/[0.04] to-white py-20"
      aria-labelledby="industrial-training-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <AnimatedHeading>
            <header>
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#0B63CE]">
                Career Program
              </p>
              <h2
                id="industrial-training-heading"
                className="text-3xl font-bold tracking-tight text-[#1E293B] sm:text-4xl"
              >
                {HOME_PREVIEW.heading}
              </h2>
              <p className="mt-3 text-lg font-medium text-[#0B63CE]">
                {HOME_PREVIEW.subheading}
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {HOME_PREVIEW.description}
              </p>

              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Program highlights">
                {HOME_PREVIEW.highlights.map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#0B63CE]/15 bg-white px-3 py-1.5 text-xs font-semibold text-[#1E293B] shadow-sm"
                  >
                    <CheckCircle2 className="size-3.5 text-[#059669]" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-xl bg-[#0B63CE] hover:bg-[#0B63CE]/90">
              
                  <Link href="/contact">
                    Explore Program
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </Button>
              </div>
            </header>
          </AnimatedHeading>

          <motion.div
            initial={{ opacity: 0, x: 32, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.7, ease: PREMIUM_EASE, delay: 0.15 }}
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
          >
              <div className="overflow-hidden rounded-2xl border border-[#0B63CE]/10 bg-white shadow-[0_8px_32px_rgba(11,99,206,0.12)]">
                <Image
                  src={HOME_PREVIEW.heroImage}
                  alt={HOME_PREVIEW.heroImageAlt}
                  width={640}
                  height={480}
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
          </motion.div>
        </div>

        <StaggerContainer className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_STATS.map((stat) => (
            <StaggerItem key={stat.label}>
              <article className={`${itCardClass} text-center`}>
                <p className="text-2xl font-bold text-[#0B63CE] sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-sm font-medium text-muted-foreground">{stat.label}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </SectionReveal>
  );
}

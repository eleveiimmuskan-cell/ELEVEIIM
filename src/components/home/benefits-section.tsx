"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { SectionReveal, StaggerContainer, StaggerItem } from "@/components/common/motion-wrapper";
import {
  BENEFITS_HEADING,
  CERTIFICATE_IMAGES,
  eleveiimBenefits,
} from "@/data/home-sections";

export function BenefitsSection() {
  return (
    <SectionReveal
      id="eleveiim-benefits"
      className="bg-gradient-to-b from-white to-[#1E63FF]/[0.04] py-20"
      aria-labelledby="benefits-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <header className="max-w-xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#1E63FF]">
              Career Outcomes
            </p>
            <h2
              id="benefits-heading"
              className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              {BENEFITS_HEADING.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {BENEFITS_HEADING.description}
            </p>

            <ul
              className="mt-8 space-y-3.5"
              aria-label="ELEVEIIM training benefits"
            >
              {eleveiimBenefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-3 text-sm font-medium text-foreground/90 sm:text-[15px]"
                >
                  <CheckCircle2
                    className="mt-0.5 size-5 shrink-0 text-[#1E63FF]"
                    aria-hidden
                  />
                  {benefit}
                </li>
              ))}
            </ul>
          </header>

          <div
            className="relative mx-auto flex min-h-[320px] w-full max-w-md items-center justify-center sm:min-h-[380px] lg:mx-0 lg:max-w-none"
            aria-label="Sample ELEVEIIM certification previews"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative h-[260px] w-full max-w-[340px] sm:h-[300px] sm:max-w-[380px]"
            >
              <motion.div
                whileHover={{ rotate: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="absolute left-0 top-6 z-10 w-[72%] origin-bottom-right"
                style={{ perspective: 1000 }}
              >
                <div className="overflow-hidden rounded-2xl border border-white/70 bg-white shadow-[0_20px_50px_rgba(30,99,255,0.18)]">
                  <Image
                    src={CERTIFICATE_IMAGES[0].src}
                    alt={CERTIFICATE_IMAGES[0].alt}
                    width={CERTIFICATE_IMAGES[0].width}
                    height={CERTIFICATE_IMAGES[0].height}
                    loading="lazy"
                    className="h-auto w-full object-cover"
                    sizes="(max-width: 1024px) 70vw, 320px"
                  />
                </div>
              </motion.div>

              <motion.div
                whileHover={{ rotate: 6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="absolute bottom-0 right-0 z-20 w-[72%] origin-bottom-left"
                style={{ perspective: 1000 }}
              >
                <div className="overflow-hidden rounded-2xl border border-white/70 bg-white shadow-[0_24px_56px_rgba(30,99,255,0.22)]">
                  <Image
                    src={CERTIFICATE_IMAGES[1].src}
                    alt={CERTIFICATE_IMAGES[1].alt}
                    width={CERTIFICATE_IMAGES[1].width}
                    height={CERTIFICATE_IMAGES[1].height}
                    loading="lazy"
                    className="h-auto w-full object-cover"
                    sizes="(max-width: 1024px) 70vw, 320px"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}

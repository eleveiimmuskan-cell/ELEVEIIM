"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { SectionReveal } from "@/components/common/motion-wrapper";
import { isRemoteMediaUrl } from "@/lib/media-url";
import type { BenefitsSectionData } from "@/types/api-benefits";
import {
  BENEFITS_HEADING,
  CERTIFICATE_IMAGES,
  eleveiimBenefits,
} from "@/data/home-sections";

interface BenefitsSectionProps {
  section?: BenefitsSectionData | null;
}

function toFallbackSection(): BenefitsSectionData {
  return {
    heading: BENEFITS_HEADING.title,
    description: BENEFITS_HEADING.description,
    features: eleveiimBenefits.map((title, index) => ({
      id: `fallback-feature-${index}`,
      title,
    })),
    certificates: CERTIFICATE_IMAGES.map((image, index) => ({
      id: `fallback-cert-${index}`,
      imageUrl: image.src,
      alt: image.alt,
    })),
  };
}

export function BenefitsSection({ section }: BenefitsSectionProps) {
  const data = section ?? toFallbackSection();
  const certificates = data.certificates.slice(0, 2);
  const primary = certificates[0];
  const secondary = certificates[1];

  return (
    <SectionReveal
      id="eleveiim-benefits"
      className="bg-gradient-to-b from-white to-[#1E63FF]/[0.04] py-20"
      aria-labelledby="benefits-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={
            certificates.length > 0
              ? "grid items-center gap-12 lg:grid-cols-2 lg:gap-16"
              : "grid items-center gap-12"
          }
        >
          <header className="max-w-xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#1E63FF]">
              Career Outcomes
            </p>
            <h2
              id="benefits-heading"
              className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              {data.heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {data.description}
            </p>

            <ul
              className="mt-8 space-y-3.5"
              aria-label="ELEVEIIM training benefits"
            >
              {data.features.map((benefit) => (
                <li
                  key={benefit.id}
                  className="flex items-start gap-3 text-sm font-medium text-foreground/90 sm:text-[15px]"
                >
                  <CheckCircle2
                    className="mt-0.5 size-5 shrink-0 text-[#1E63FF]"
                    aria-hidden
                  />
                  {benefit.title}
                </li>
              ))}
            </ul>
          </header>

          {certificates.length > 0 && (
            <div
              className="relative mx-auto flex min-h-[280px] w-full max-w-xl items-center justify-center sm:min-h-[340px] lg:mx-0 lg:max-w-none"
              aria-label="Sample ELEVEIIM certification previews"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative h-[260px] w-full max-w-[520px] sm:h-[320px] sm:max-w-[560px]"
              >
                {primary && (
                  <motion.div
                    whileHover={{ rotate: secondary ? -5 : 0, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className={
                      secondary
                        ? "absolute left-0 top-0 z-10 w-[68%] origin-bottom-right sm:w-[66%]"
                        : "absolute inset-x-0 top-1/2 z-10 mx-auto w-[78%] -translate-y-1/2"
                    }
                    style={{ perspective: 1000 }}
                  >
                    <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-white/70 bg-white p-2 shadow-[0_20px_50px_rgba(30,99,255,0.18)] sm:p-2.5">
                      <Image
                        src={primary.imageUrl}
                        alt={primary.alt}
                        width={640}
                        height={480}
                        loading="lazy"
                        unoptimized={isRemoteMediaUrl(primary.imageUrl)}
                        className="h-full w-full object-contain"
                        sizes="(max-width: 1024px) 55vw, 320px"
                      />
                    </div>
                  </motion.div>
                )}

                {secondary && (
                  <motion.div
                    whileHover={{ rotate: 6, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="absolute bottom-0 right-0 z-20 w-[68%] origin-bottom-left sm:w-[66%]"
                    style={{ perspective: 1000 }}
                  >
                    <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-white/70 bg-white p-2 shadow-[0_24px_56px_rgba(30,99,255,0.22)] sm:p-2.5">
                      <Image
                        src={secondary.imageUrl}
                        alt={secondary.alt}
                        width={640}
                        height={480}
                        loading="lazy"
                        unoptimized={isRemoteMediaUrl(secondary.imageUrl)}
                        className="h-full w-full object-contain"
                        sizes="(max-width: 1024px) 55vw, 320px"
                      />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </SectionReveal>
  );
}

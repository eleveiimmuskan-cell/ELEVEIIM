"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/common/page-header";
import { ScholarshipBannerDecorations } from "@/components/scholarship/scholarship-banner-decorations";
import {
  PREMIUM_EASE,
  VIEWPORT_ONCE,
} from "@/components/common/motion-wrapper";
import { useScholarshipCms } from "@/components/common/scholarship-cms-provider";
import { cn } from "@/lib/utils";

function StudentsIllustration({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  const { studentsImage, studentsImageAlt } = useScholarshipCms();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: 0.75, ease: PREMIUM_EASE, delay: 0.2 }}
      className={cn("relative", className)}
    >
      <div
        className="pointer-events-none absolute bottom-[8%] left-1/2 h-4 w-[72%] -translate-x-1/2 rounded-[100%] bg-slate-900/20 blur-xl"
        aria-hidden
      />
      <Image
        src={studentsImage}
        alt={studentsImageAlt}
        width={1024}
        height={682}
        priority={priority}
        sizes="(max-width: 640px) 62vw, (max-width: 1024px) 46vw, 340px"
        className="relative mx-auto h-auto w-full max-w-[220px] object-contain drop-shadow-[0_20px_40px_rgba(15,23,42,0.02)] sm:max-w-[270px] md:max-w-[300px] lg:max-w-[330px] xl:max-w-[360px]"
      />
    </motion.div>
  );
}

export function ScholarshipPageHero({
  eyebrow,
  description,
}: {
  eyebrow: string;
  description: string;
}) {
  const { highlightStats } = useScholarshipCms();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand via-[#1565d8] to-[#0e4a9e]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(255,255,255,0.16),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 top-1/4 size-56 rounded-full bg-white/8 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 right-1/4 size-40 rounded-full bg-brand-accent/10 blur-3xl"
        aria-hidden
      />
      <ScholarshipBannerDecorations variant="hero" />

      <div className="relative z-[2] mx-auto max-w-7xl px-4 pt-24 sm:px-6 sm:pt-28 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 xl:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.75, ease: PREMIUM_EASE }}
            className="pb-6 pt-2 sm:pb-8 lg:self-center lg:pb-10 lg:pt-0"
          >
            <PageHeader
              eyebrow={eyebrow}
              title={`GET ${highlightStats.discountPrefix.toUpperCase()} ${highlightStats.discountValue} SCHOLARSHIP`}
              description={description}
              light
            />
          </motion.div>

          <StudentsIllustration
            priority
            className="hidden lg:block lg:self-center lg:pb-0 lg:pt-0"
          />
        </div>

        <StudentsIllustration className="mx-auto pb-0 pt-2 sm:pt-4 lg:hidden" />
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/30 to-transparent sm:h-16"
        aria-hidden
      />
    </section>
  );
}

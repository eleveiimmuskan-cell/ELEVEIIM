"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import { isRemoteMediaUrl } from "@/lib/media-url";
import { cn } from "@/lib/utils";
import { AnimatedCounter } from "@/components/shared/motion-wrapper";
import { GlassButton } from "@/components/shared/glass-card";
import { HeroPromoCarousel } from "@/components/home/hero-promo-carousel";
import type { HeroBannerData, HeroCampaignSlide } from "@/types/api-hero-banner";

/** Running hero backgrounds. The first image is the lead banner. */
const HERO_RUN_BACKGROUNDS = [
  { src: "/images/home/hero-bg-1.jpg", position: "object-[center_center]" },
  { src: "/images/home/hero-bg-2-group.jpg", position: "object-[center_center]" },
] as const;

const HERO_BACKGROUND_ADVANCE_MS = 6000;

function HeroRunBackground() {
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const count = HERO_RUN_BACKGROUNDS.length;

  useEffect(() => {
    if (reducedMotion || count < 2) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, HERO_BACKGROUND_ADVANCE_MS);

    return () => window.clearInterval(timer);
  }, [reducedMotion, count]);

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {HERO_RUN_BACKGROUNDS.map((slide, slideIndex) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt=""
          fill
          priority={slideIndex === 0}
          sizes="100vw"
          className={cn(
            "object-cover transition-opacity duration-1000",
            slide.position,
            slideIndex === index ? "opacity-100" : "opacity-0"
          )}
        />
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.22)_30%,rgba(0,0,0,0.08)_52%,rgba(0,0,0,0.22)_100%)]" />
    </div>
  );
}

interface HeroSectionProps {
  banner?: HeroBannerData | null;
  campaigns?: HeroCampaignSlide[];
}

const FALLBACK_BANNER: HeroBannerData = {
  scholarshipText: "Scholarship seats open — Apply today",
  mainHeading: SITE_TAGLINE,
  subHeading: "",
  description:
    "Industry-ready courses, expert trainers, and placement support to launch your dream career.",
  buttonText: "Explore Courses",
  buttonUrl: "/courses",
  backgroundImage: "",
  liveCourseCount: 25,
  studentRating: 4.9,
  successRate: 98,
};

export function HeroSection({ banner, campaigns = [] }: HeroSectionProps) {
  const data = banner ?? FALLBACK_BANNER;
  const hasBackground = Boolean(data.backgroundImage?.trim());
  const stats = [
    {
      id: "live-courses",
      value: data.liveCourseCount,
      suffix: "+",
      label: "Live Courses",
    },
    {
      id: "student-rating",
      value: data.studentRating,
      suffix: "",
      label: "Student Rating",
    },
    {
      id: "success-rate",
      value: data.successRate,
      suffix: "%",
      label: "Success Rate",
    },
  ];

  return (
    <section
      id="home"
      className={cn(
        "relative flex min-h-[40vh] items-center overflow-hidden pt-16 pb-10 sm:pb-12",
        hasBackground ? "bg-brand" : "bg-[#071020]"
      )}
      aria-label="Hero banner"
    >
      {hasBackground ? (
        <>
          <Image
            src={data.backgroundImage}
            alt=""
            fill
            priority
            className="object-cover"
            unoptimized={isRemoteMediaUrl(data.backgroundImage)}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-brand/80" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12),transparent_60%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,103,0,0.1),transparent_50%)]" />
        </>
      ) : (
        <HeroRunBackground />
      )}

      <div className="relative isolate z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left — brand & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 flex min-w-0 flex-col gap-5 sm:gap-6"
          >
            {data.scholarshipText ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm"
              >
                <Sparkles className="size-3.5" />
                {data.scholarshipText}
              </motion.div>
            ) : null}

            <div className="space-y-2">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {SITE_NAME}
              </h1>
              <p className="text-lg font-semibold text-white sm:text-xl">
                {data.mainHeading}
              </p>
              {data.subHeading ? (
                <p className="text-sm font-medium text-white/85 sm:text-base">
                  {data.subHeading}
                </p>
              ) : null}
            </div>

            <p className="max-w-md text-sm leading-relaxed text-white/80 sm:text-base">
              {data.description}
            </p>

            <div className="relative z-20 flex flex-wrap items-center gap-3">
              <GlassButton href={data.buttonUrl} variant="light">
                {data.buttonText}
                <ArrowRight className="size-4" />
              </GlassButton>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-5 sm:gap-x-10">
              {stats.map((stat) => (
                <div key={stat.id}>
                  <p className="text-xl font-bold tabular-nums text-white sm:text-2xl">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      decimals={stat.value % 1 !== 0 ? 1 : 0}
                    />
                  </p>
                  <p className="mt-0.5 text-xs font-medium text-white/65">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — promo carousel */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 min-w-0"
          >
            <HeroPromoCarousel
              campaigns={campaigns}
              prioritizeFirstPhoto={!hasBackground && campaigns.length > 0}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

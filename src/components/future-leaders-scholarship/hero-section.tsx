"use client";

import Image from "next/image";
import { Megaphone } from "lucide-react";
import { motion } from "framer-motion";
import { ScholarshipBannerDecorations } from "@/components/scholarship/scholarship-banner-decorations";
import { ScholarshipApplicationForm } from "@/components/scholarship/application-form";
import {
  AnimatedScholarshipDeadline,
} from "@/components/future-leaders-scholarship/animated-deadline";
import {
  FUTURE_LEADERS_SCHOLARSHIP_FEATURES,
  FUTURE_LEADERS_STUDENTS_IMAGE,
} from "@/data/future-leaders-scholarship";
import {
  PREMIUM_EASE,
  VIEWPORT_ONCE,
} from "@/components/common/motion-wrapper";

export function FutureLeadersScholarshipHero() {
  return (
    <section
      className="relative overflow-x-clip overflow-y-visible bg-gradient-to-br from-brand via-[#1565d8] to-[#0e4a9e] pt-24 pb-20 sm:pt-28 sm:pb-24 lg:pb-28 xl:pb-32"
      aria-labelledby="future-leaders-scholarship-hero-heading"
    >
      {/* Clip decorative layers only — allow hero image to overflow downward */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(255,255,255,0.16),transparent_50%)]" />
        <div className="absolute -left-16 top-1/4 size-56 rounded-full bg-white/8 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 size-40 rounded-full bg-brand-accent/15 blur-3xl" />
        <ScholarshipBannerDecorations variant="hero" />
      </div>

      <div className="relative z-[2] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_0.85fr_1.1fr] lg:gap-6 xl:gap-8">
          {/* Left — messaging (top-aligned with form) */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.7, ease: PREMIUM_EASE }}
            className="relative z-[3] min-w-0"
          >
            <span className="animate-blink inline-flex items-center gap-2 rounded-lg bg-brand-accent px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white shadow-lg shadow-brand-accent/30 sm:text-xs">
              <Megaphone className="size-3.5" aria-hidden />
              GOOD NEWS FOR STUDENTS
            </span>

            <h1
              id="future-leaders-scholarship-hero-heading"
              className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl xl:text-[2.75rem] xl:leading-[1.15]"
            >
              Get{" "}
              <span className="text-brand-accent">100% Free Scholarship</span>
              <span className="mt-1 block">For 100 Students</span>
            </h1>

            <p className="mt-3 text-base font-semibold text-white sm:text-lg">
              Industry-Ready Professional Training Program
            </p>

            {/* <div className="mt-6 inline-flex items-end gap-3 rounded-2xl border border-brand-accent/60 bg-slate-950/35 px-5 py-4 shadow-[0_12px_40px_rgba(15,23,42,0.25)] backdrop-blur-sm sm:px-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
                  Course Worth ₹45,000
                </span>
                <p className="mt-1 text-3xl font-black tracking-tight text-brand-accent sm:text-4xl">
                  FREE
                </p>
              </div>
            </div> */}

            {/* <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/85 sm:text-[15px]">
              Kickstart your career with ELEVEIIM&apos;s industry-focused training
              program. Learn from experienced mentors, work on real-world
              projects, gain practical skills, and become job-ready with our
              premium scholarship program.
            </p> */}

            <ul className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-6 sm:gap-2">
              {FUTURE_LEADERS_SCHOLARSHIP_FEATURES.map(({ label, icon: Icon }) => (
                <li
                  key={label}
                  className="flex flex-col items-center gap-2 text-center"
                >
                  <span className="flex size-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white backdrop-blur-sm">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="text-[10px] font-medium leading-tight text-white/90 sm:text-[11px]">
                    {label}
                  </span>
                </li>
              ))}
            </ul>

            <AnimatedScholarshipDeadline className="mt-8" />
          </motion.div>

          {/* Center — desktop students image (overflows onto stats) */}
          <div className="relative mx-auto hidden w-full max-w-[23rem] self-stretch lg:block xl:max-w-[26rem]">
            {/* Invisible spacer keeps the grid column height */}
            <div className="aspect-[3/4] w-full" aria-hidden />

            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.75, ease: PREMIUM_EASE, delay: 0.12 }}
              className="absolute inset-x-0 bottom-[-3.5rem] z-20 -translate-y-8 xl:bottom-[-5rem] xl:-translate-y-10"
            >
              <div
                className="pointer-events-none absolute bottom-[6%] left-1/2 h-5 w-[70%] -translate-x-1/2 rounded-[100%] bg-slate-900/30 blur-xl"
                aria-hidden
              />
              <Image
                src={FUTURE_LEADERS_STUDENTS_IMAGE}
                alt="ELEVEIIM students promoting the Future Leaders Scholarship"
                width={1024}
                height={682}
                priority
                sizes="(max-width: 1280px) 368px, 416px"
                className="relative mx-auto h-auto w-full origin-bottom scale-110 object-contain drop-shadow-[0_28px_56px_rgba(15,23,42,0.4)]"
              />
            </motion.div>
          </div>

          {/* Right — existing scholarship application form */}
          <motion.aside
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.7, ease: PREMIUM_EASE, delay: 0.18 }}
            className="relative z-[3] mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none"
          >
            <ScholarshipApplicationForm showDeadlineBanner />
          </motion.aside>
        </div>

        {/* Mobile / tablet — normal flow, light tablet overlap only */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.6, ease: PREMIUM_EASE }}
          className="relative z-20 mx-auto mt-10 max-w-[18.5rem] sm:max-w-[21rem] md:-mb-8 lg:hidden"
        >
          <Image
            src={FUTURE_LEADERS_STUDENTS_IMAGE}
            alt="ELEVEIIM students promoting the Future Leaders Scholarship"
            width={1024}
            height={682}
            sizes="(max-width: 640px) 296px, 336px"
            className="h-auto w-full object-contain drop-shadow-[0_20px_40px_rgba(15,23,42,0.3)]"
          />
        </motion.div>
      </div>
    </section>
  );
}

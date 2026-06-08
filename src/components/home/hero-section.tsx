"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { heroStats } from "@/data/counters";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import { AnimatedCounter } from "@/components/shared/motion-wrapper";
import { FloatingShapes } from "@/components/shared/floating-shapes";
import { GlassButton } from "@/components/shared/glass-card";
import { ScholarshipButton } from "@/components/shared/scholarship-button";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-[40vh] items-center overflow-hidden bg-brand pt-16 pb-10 sm:pb-12"
      aria-label="Hero banner"
    >
      <FloatingShapes />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,103,0,0.12),transparent_50%)]" />

      <div className="relative isolate z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left — brand & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 flex min-w-0 flex-col gap-5 sm:gap-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm"
            >
              <Sparkles className="size-3.5" />
              Scholarship seats open — Apply today
            </motion.div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {SITE_NAME}
              </h1>
              <p className="text-lg font-semibold text-white sm:text-xl">
                {SITE_TAGLINE}
              </p>
            </div>

            <p className="max-w-md text-sm leading-relaxed text-white/80 sm:text-base">
              Industry-ready courses, expert trainers, and placement support to
              launch your dream career.
            </p>

            <div className="relative z-20 flex flex-wrap items-center gap-3">
              <GlassButton href="/courses" variant="light">
                Explore Courses
                <ArrowRight className="size-4" />
              </GlassButton>
              <ScholarshipButton href="/scholarship" />
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-5 sm:gap-x-10">
              {heroStats.map((stat) => (
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

          {/* Right — scholarship headline */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 hidden min-w-0 flex-col items-center justify-center overflow-hidden text-center lg:flex lg:items-end lg:text-right"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
              Limited Time Offer
            </p>

            <div className="space-y-1">
              <motion.p
                animate={{ opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="text-4xl font-black uppercase leading-none tracking-tight text-white xl:text-5xl"
              >
                Get
              </motion.p>

              <p className="text-6xl font-black leading-none tracking-tighter xl:text-7xl">
                <span className="bg-gradient-to-r from-brand-accent via-[#ff8533] to-brand-accent bg-clip-text text-transparent">
                  75%
                </span>
              </p>

              <p className="text-4xl font-black uppercase leading-none tracking-tight text-white xl:text-5xl">
                Scholarship
              </p>
            </div>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70 lg:ml-auto">
              Unlock premium training at a fraction of the cost. Apply before
              seats fill up.
            </p>

            <Link
              href="/scholarship"
              className="relative z-20 mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white underline-offset-4 transition-colors hover:text-brand-accent hover:underline"
            >
              Learn more about eligibility
              <ArrowRight className="size-4" />
            </Link>
          </motion.div>

          {/* Mobile scholarship headline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative z-20 rounded-2xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur-md lg:hidden"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              Limited Time Offer
            </p>
            <p className="mt-2 text-3xl font-black uppercase leading-tight text-white">
              Get{" "}
              <span className="text-brand-accent">75%</span> Scholarship
            </p>
            <Link
              href="/scholarship"
              className="relative z-20 mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white underline-offset-4 transition-colors hover:text-brand-accent hover:underline"
            >
              Learn more about eligibility
              <ArrowRight className="size-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

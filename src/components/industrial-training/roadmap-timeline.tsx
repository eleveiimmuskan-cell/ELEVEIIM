"use client";

import {
  BookOpen,
  Bot,
  Brain,
  GraduationCap,
  Layers,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { ROADMAP } from "@/data/industrial-training";
import {
  AnimatedSectionHeading,
  itemFadeScale,
  PREMIUM_EASE,
  VIEWPORT_ONCE,
} from "./journey-motion";
import { SectionHeading } from "./section-heading";
import { cn } from "@/lib/utils";

const STEP_ICONS: LucideIcon[] = [
  BookOpen,
  Layers,
  Brain,
  Rocket,
  Bot,
  GraduationCap,
];

function RoadmapCard({
  month,
  title,
  index,
  Icon,
  className,
}: {
  month: string;
  title: string;
  index: number;
  Icon: LucideIcon;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative w-[148px] rounded-2xl border border-[#0B63CE]/15 bg-gradient-to-br from-white via-white to-[#0B63CE]/[0.06] p-3.5 shadow-[0_10px_28px_rgba(11,99,206,0.12),0_2px_0_rgba(255,255,255,0.9)_inset] transition-shadow sm:w-[168px] sm:p-4",
        "hover:border-[#0B63CE]/30 hover:shadow-[0_16px_40px_rgba(11,99,206,0.18)]",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80"
        aria-hidden
      />
      <div className="flex items-center gap-2">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#0B63CE] text-xs font-bold text-white shadow-[0_4px_12px_rgba(11,99,206,0.35)]">
          {index + 1}
        </span>
        <span className="flex size-8 items-center justify-center rounded-xl bg-[#0B63CE]/10 text-[#0B63CE] transition-colors group-hover:bg-[#0B63CE]/15">
          <Icon className="size-4" aria-hidden />
        </span>
      </div>
      <p className="mt-2.5 text-[10px] font-semibold uppercase tracking-wider text-[#0B63CE] sm:text-[11px]">
        {month}
      </p>
      <h3 className="mt-0.5 text-sm font-bold leading-snug text-[#1E293B] sm:text-[15px]">
        {title}
      </h3>
    </article>
  );
}

function CircularRoadmap() {
  const radius = 34;
  const ringSize = 320;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      className="relative mx-auto hidden h-[500px] w-full max-w-xl md:block lg:h-[540px] lg:max-w-2xl"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.7, ease: PREMIUM_EASE }}
        className="absolute left-1/2 top-1/2 size-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(11,99,206,0.07)_0%,transparent_70%)]"
        aria-hidden
      />

      <svg
        viewBox={`0 0 ${ringSize} ${ringSize}`}
        className="absolute left-1/2 top-1/2 size-[68%] -translate-x-1/2 -translate-y-1/2"
        aria-hidden
      >
        <defs>
          <linearGradient id="roadmap-ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B63CE" stopOpacity="0.55" />
            <stop offset="50%" stopColor="#059669" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0B63CE" stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <motion.circle
          cx={ringSize / 2}
          cy={ringSize / 2}
          r={ringSize / 2 - 12}
          fill="none"
          stroke="url(#roadmap-ring-gradient)"
          strokeWidth="2"
          strokeDasharray="10 8"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 1.4, ease: PREMIUM_EASE, delay: 0.15 }}
        />
      </svg>

      <motion.div
        initial={{ opacity: 0, scale: 0.75 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.65, ease: PREMIUM_EASE, delay: 0.35 }}
        className="absolute left-1/2 top-1/2 z-10 flex size-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/40 bg-gradient-to-br from-[#0B63CE] to-[#1E293B] text-center text-white shadow-[0_20px_50px_rgba(11,99,206,0.35)] sm:size-32"
      >
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.5, delay: 0.55, ease: PREMIUM_EASE }}
          className="text-3xl font-black leading-none sm:text-4xl"
        >
          6
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.5, delay: 0.7, ease: PREMIUM_EASE }}
          className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/85 sm:text-xs"
        >
          Month Journey
        </motion.span>
      </motion.div>

      {ROADMAP.map((step, index) => {
        const angle = ((index * 60 - 90) * Math.PI) / 180;
        const left = 50 + radius * Math.cos(angle);
        const top = 50 + radius * Math.sin(angle);
        const Icon = STEP_ICONS[index] ?? BookOpen;

        return (
          <motion.div
            key={step.month}
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${left}%`, top: `${top}%` }}
            initial={{ opacity: 0, scale: 0.82 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -4, scale: 1.02 }}
            viewport={VIEWPORT_ONCE}
            transition={{
              duration: 0.6,
              ease: PREMIUM_EASE,
              delay: 0.45 + index * 0.12,
            }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={VIEWPORT_ONCE}
              transition={{
                delay: 0.5 + index * 0.12,
                type: "spring",
                stiffness: 260,
                damping: 18,
              }}
              className="absolute left-1/2 top-1/2 z-0 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#059669] shadow-sm"
              aria-hidden
            />
            <div className="relative z-10">
              <RoadmapCard
                month={step.month}
                title={step.title}
                index={index}
                Icon={Icon}
              />
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function MobileRoadmap() {
  return (
    <motion.ol
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
      }}
      className="relative space-y-4 md:hidden"
    >
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 1, ease: PREMIUM_EASE, delay: 0.1 }}
        style={{ transformOrigin: "top" }}
        className="absolute bottom-4 left-[18px] top-4 w-px bg-gradient-to-b from-[#0B63CE]/40 via-[#0B63CE]/20 to-[#059669]/40"
        aria-hidden
      />
      {ROADMAP.map((step, index) => {
        const Icon = STEP_ICONS[index] ?? BookOpen;
        return (
          <motion.li
            key={step.month}
            variants={itemFadeScale}
            className="relative pl-12"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={VIEWPORT_ONCE}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="absolute left-3 top-5 z-10 size-3.5 -translate-x-1/2 rounded-full border-2 border-white bg-[#0B63CE] shadow-[0_0_0_4px_rgba(11,99,206,0.15)]"
              aria-hidden
            />
            <RoadmapCard
              month={step.month}
              title={step.title}
              index={index}
              Icon={Icon}
              className="w-full max-w-none"
            />
          </motion.li>
        );
      })}
    </motion.ol>
  );
}

export function RoadmapTimeline() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: 0.5, ease: PREMIUM_EASE }}
      className="overflow-hidden bg-gradient-to-b from-white via-[#0B63CE]/[0.03] to-white py-16 sm:py-20"
      aria-labelledby="roadmap-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSectionHeading className="mx-auto mb-0">
          <SectionHeading
            id="roadmap-heading"
            title="6 Month Roadmap"
            description="A structured progression from foundations to placement readiness."
            align="center"
            className="mx-auto mb-0"
          />
        </AnimatedSectionHeading>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.65, ease: PREMIUM_EASE, delay: 0.1 }}
          className="mt-10 md:mt-14"
        >
          <CircularRoadmap />
          <MobileRoadmap />
        </motion.div>
      </div>
    </motion.section>
  );
}

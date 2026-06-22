"use client";

import {
  Briefcase,
  Building2,
  FileText,
  GraduationCap,
  MessageSquare,
  Rocket,
  Target,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { PLACEMENT_STEPS } from "@/data/industrial-training";
import {
  AnimatedSectionHeading,
  AnimatedSpine,
  itemFadeScale,
  itemSlideLeft,
  itemSlideRight,
  nodePop,
  PREMIUM_EASE,
  VIEWPORT_ONCE,
} from "./journey-motion";
import { SectionHeading } from "./section-heading";
import { cn } from "@/lib/utils";

const STEP_ICONS: LucideIcon[] = [
  GraduationCap,
  Rocket,
  Briefcase,
  FileText,
  MessageSquare,
  Target,
  Building2,
  Trophy,
];

function PlacementStepCard({
  title,
  index,
  Icon,
  isFinal,
}: {
  title: string;
  index: number;
  Icon: LucideIcon;
  isFinal: boolean;
}) {
  return (
    <article
      className={cn(
        "group relative rounded-2xl border p-4 shadow-[0_8px_28px_rgba(11,99,206,0.08)] transition-shadow sm:p-5",
        isFinal
          ? "border-[#059669]/30 bg-gradient-to-br from-white via-white to-[#059669]/[0.08] shadow-[0_12px_36px_rgba(5,150,105,0.15)] hover:shadow-[0_16px_44px_rgba(5,150,105,0.2)]"
          : "border-[#0B63CE]/12 bg-gradient-to-br from-white via-white to-[#0B63CE]/[0.04] hover:border-[#0B63CE]/25 hover:shadow-[0_14px_36px_rgba(11,99,206,0.14)]"
      )}
    >
      <div className="flex items-start gap-3">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.45, delay: 0.08, ease: PREMIUM_EASE }}
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-xl shadow-sm",
            isFinal
              ? "bg-[#059669] text-white shadow-[#059669]/25"
              : "bg-[#0B63CE] text-white shadow-[#0B63CE]/25"
          )}
        >
          <Icon className="size-5" aria-hidden />
        </motion.div>
        <div className="min-w-0 flex-1">
          <p
            className={cn(
              "text-[10px] font-bold uppercase tracking-widest sm:text-[11px]",
              isFinal ? "text-[#059669]" : "text-[#0B63CE]"
            )}
          >
            Step {index + 1}
            {isFinal && " · Goal"}
          </p>
          <h3 className="mt-1 text-base font-bold leading-snug text-[#1E293B] sm:text-lg">
            {title}
          </h3>
        </div>
      </div>
    </article>
  );
}

function DesktopJourney() {
  return (
    <motion.ol
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.14, delayChildren: 0.25 } },
      }}
      className="relative hidden lg:block"
    >
      <AnimatedSpine className="absolute left-1/2 top-6 bottom-6 w-1 -translate-x-1/2 rounded-full bg-gradient-to-b from-[#0B63CE] via-[#0B63CE]/60 to-[#059669]" />

      {PLACEMENT_STEPS.map((step, index) => {
        const isLeft = index % 2 === 0;
        const isFinal = index === PLACEMENT_STEPS.length - 1;
        const Icon = STEP_ICONS[index] ?? GraduationCap;

        return (
          <motion.li
            key={step}
            variants={isLeft ? itemSlideLeft : itemSlideRight}
            className={cn(
              "relative grid grid-cols-2 items-center gap-8",
              index > 0 && "mt-10"
            )}
          >
            <div className={cn(isLeft ? "col-start-1" : "col-start-2")}>
              <motion.div whileHover={{ y: -3 }}>
                <PlacementStepCard
                  title={step}
                  index={index}
                  Icon={Icon}
                  isFinal={isFinal}
                />
              </motion.div>
            </div>

            <motion.div
              variants={nodePop}
              className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
              aria-hidden
            >
              <span
                className={cn(
                  "flex size-4 items-center justify-center rounded-full border-2 border-white shadow-md",
                  isFinal ? "bg-[#059669]" : "bg-[#0B63CE]"
                )}
              />
            </motion.div>

            {!isLeft && <div className="col-start-1" aria-hidden />}
            {isLeft && <div className="col-start-2" aria-hidden />}
          </motion.li>
        );
      })}
    </motion.ol>
  );
}

function TabletJourney() {
  return (
    <motion.ol
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
      }}
      className="relative hidden gap-5 md:grid md:grid-cols-2 lg:hidden"
    >
      {PLACEMENT_STEPS.map((step, index) => {
        const isFinal = index === PLACEMENT_STEPS.length - 1;
        const Icon = STEP_ICONS[index] ?? GraduationCap;

        return (
          <motion.li key={step} variants={itemFadeScale} whileHover={{ y: -3 }} className="relative">
            <PlacementStepCard
              title={step}
              index={index}
              Icon={Icon}
              isFinal={isFinal}
            />
          </motion.li>
        );
      })}
    </motion.ol>
  );
}

function MobileJourney() {
  return (
    <motion.ol
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
      }}
      className="relative space-y-5 md:hidden"
    >
      <AnimatedSpine className="absolute bottom-3 left-[18px] top-3 w-0.5 rounded-full bg-gradient-to-b from-[#0B63CE] via-[#0B63CE]/50 to-[#059669]" />

      {PLACEMENT_STEPS.map((step, index) => {
        const isFinal = index === PLACEMENT_STEPS.length - 1;
        const Icon = STEP_ICONS[index] ?? GraduationCap;

        return (
          <motion.li key={step} variants={itemFadeScale} className="relative pl-12">
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={VIEWPORT_ONCE}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className={cn(
                "absolute left-[18px] top-6 z-10 size-3.5 -translate-x-1/2 rounded-full border-2 border-white shadow-sm",
                isFinal ? "bg-[#059669]" : "bg-[#0B63CE]"
              )}
              aria-hidden
            />
            <PlacementStepCard
              title={step}
              index={index}
              Icon={Icon}
              isFinal={isFinal}
            />
          </motion.li>
        );
      })}
    </motion.ol>
  );
}

export function PlacementProcess() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: 0.5, ease: PREMIUM_EASE }}
      className="overflow-hidden bg-gradient-to-b from-[#0B63CE]/[0.04] via-white to-[#0B63CE]/[0.03] py-16 sm:py-20"
      aria-labelledby="placement-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSectionHeading className="mx-auto mb-0 max-w-2xl">
          <SectionHeading
            id="placement-heading"
            title="Placement Process"
            description="A clear path from training to employment — step by step until you get hired."
            align="center"
            className="mx-auto mb-0"
          />
        </AnimatedSectionHeading>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.65, ease: PREMIUM_EASE, delay: 0.1 }}
          className="mt-12 lg:mt-16"
        >
          <DesktopJourney />
          <TabletJourney />
          <MobileJourney />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.55, ease: PREMIUM_EASE, delay: 0.2 }}
          className="mt-10 text-center text-sm font-medium text-muted-foreground"
        >
          Dedicated placement support at every stage — from your first project to your offer letter.
        </motion.p>
      </div>
    </motion.section>
  );
}

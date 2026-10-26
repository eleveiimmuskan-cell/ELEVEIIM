"use client";

import { motion } from "framer-motion";
import { FREE_AI_FOUNDATION_STATS } from "@/data/free-ai-foundation-course";
import { PREMIUM_EASE, VIEWPORT_ONCE } from "@/components/common/motion-wrapper";
import { cn } from "@/lib/utils";

export function FreeAiFoundationStatsBar() {
  return (
    <div className="relative z-10 -mt-8 px-4 sm:-mt-10 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.65, ease: PREMIUM_EASE }}
        className="mx-auto max-w-7xl"
      >
        <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-border bg-white shadow-soft-lg sm:rounded-3xl lg:grid-cols-4">
          {FREE_AI_FOUNDATION_STATS.map(({ value, label, icon: Icon, tone }, index) => (
            <div
              key={label}
              className={cn(
                "flex flex-col items-center justify-center gap-2 px-4 py-7 text-center sm:px-6 sm:py-8",
                index % 2 === 1 && "border-l border-border",
                index >= 2 && "border-t border-border lg:border-t-0",
                index > 0 && "lg:border-l lg:border-border"
              )}
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand sm:size-11">
                <Icon className="size-5" aria-hidden />
              </span>
              <p
                className={cn(
                  "text-2xl font-bold tracking-tight sm:text-3xl",
                  tone === "accent" && "text-brand-accent",
                  tone === "positive" && "text-emerald-600",
                  !tone && "text-brand"
                )}
              >
                {value}
              </p>
              <p className="text-xs font-medium text-muted-foreground sm:text-sm">
                {label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { FUTURE_LEADERS_SCHOLARSHIP_STATS } from "@/data/future-leaders-scholarship";
import {
  PREMIUM_EASE,
  VIEWPORT_ONCE,
} from "@/components/common/motion-wrapper";
import { cn } from "@/lib/utils";

export function FutureLeadersScholarshipStatsBar() {
  return (
    <div className="relative z-10 -mt-14 px-4 sm:-mt-16 md:-mt-16 lg:-mt-20 xl:-mt-24 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.65, ease: PREMIUM_EASE }}
        className="relative z-10 mx-auto max-w-7xl"
      >
        <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-border bg-white shadow-soft-lg sm:rounded-3xl lg:grid-cols-4">
          {FUTURE_LEADERS_SCHOLARSHIP_STATS.map(
            ({ value, label, icon: Icon, freeOverride }, index) => (
              <div
                key={label}
                className={cn(
                  "flex flex-col items-center justify-center gap-2 px-4 py-7 text-center sm:px-6 sm:py-8",
                  index % 2 === 1 && "border-l border-border",
                  index >= 2 && "border-t border-border lg:border-t-0",
                  index === 2 && "lg:border-l lg:border-border",
                  index === 3 && "lg:border-l lg:border-border"
                )}
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand sm:size-11">
                  <Icon className="size-5" aria-hidden />
                </span>
                {freeOverride ? (
                  <div className="flex flex-col items-center leading-none">
                    <p className="text-lg font-bold tracking-tight text-brand/55 line-through tabular-nums sm:text-xl">
                      {value}
                    </p>
                    <p className="mt-1 text-2xl font-extrabold tracking-tight text-brand-accent sm:text-3xl">
                      FREE
                    </p>
                  </div>
                ) : (
                  <p className="text-2xl font-extrabold tracking-tight text-brand tabular-nums sm:text-3xl">
                    {value}
                  </p>
                )}
                <p className="text-xs font-medium text-muted-foreground sm:text-sm">
                  {label}
                </p>
              </div>
            )
          )}
        </div>
      </motion.div>
    </div>
  );
}

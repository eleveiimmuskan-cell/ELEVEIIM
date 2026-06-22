"use client";

import { GraduationCap, IndianRupee, Sparkles } from "lucide-react";
import { motion, type MotionProps } from "framer-motion";
import { GlassCard } from "@/components/common/glass-card";
import {
  SCHOLARSHIP_APPLY_SECTION_ID,
  SCHOLARSHIP_HIGHLIGHT_STATS,
} from "@/data/scholarship";
import { useScholarshipApplicationsOpen } from "@/hooks/use-scholarship-deadline";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

function scrollToScholarshipForm() {
  document
    .getElementById(SCHOLARSHIP_APPLY_SECTION_ID)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

interface ScholarshipHighlightStatsProps {
  variant?: "page" | "modal";
  className?: string;
  animated?: boolean;
  scrollToApply?: boolean;
  onApplyClick?: () => void;
}

function StatsContent({ variant }: { variant: "page" | "modal" }) {
  const stats = SCHOLARSHIP_HIGHLIGHT_STATS;
  const isModal = variant === "modal";

  return (
    <>
      <div
        className={cn(
          "pointer-events-none absolute -right-10 -top-10 rounded-full bg-brand/10 blur-3xl",
          isModal ? "size-28" : "size-36"
        )}
        aria-hidden
      />
      <div
        className={cn(
          "pointer-events-none absolute -bottom-8 left-1/3 rounded-full bg-brand-accent/10 blur-3xl",
          isModal ? "size-20" : "size-28"
        )}
        aria-hidden
      />

      <div className={cn("relative", isModal ? "p-3 sm:p-4" : "p-5 sm:p-6")}>
        <div
          className={cn(
            "flex items-center justify-between gap-3",
            isModal ? "mb-3.5" : "mb-5"
          )}
        >
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border border-brand/15 bg-white/80 font-semibold uppercase tracking-wider text-brand",
              isModal
                ? "px-2.5 py-0.5 text-[10px]"
                : "px-3 py-1 text-[11px]"
            )}
          >
            <Sparkles className={isModal ? "size-2.5" : "size-3"} aria-hidden />
            {stats.badge}
          </span>
          <div
            className={cn(
              "flex items-center justify-center rounded-2xl bg-brand text-white shadow-[0_6px_20px_rgba(24,119,242,0.28)]",
              isModal ? "size-9" : "size-11"
            )}
            aria-hidden
          >
            <GraduationCap className={isModal ? "size-4" : "size-5"} />
          </div>
        </div>

        <div
          className={cn(
            "grid gap-4",
            isModal
              ? "grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3"
              : "gap-5 sm:grid-cols-2 sm:gap-0"
          )}
        >
          <div className={cn(!isModal && "sm:pr-5")}>
            <p
              className={cn(
                "font-semibold uppercase tracking-widest text-muted-foreground",
                isModal ? "text-[10px]" : "text-xs"
              )}
            >
              Maximum fee waiver
            </p>
            <div
              className={cn(
                "mt-1.5 flex flex-wrap items-end gap-x-1.5 gap-y-1",
                !isModal && "mt-2 gap-x-2"
              )}
            >
              <span
                className={cn(
                  "font-semibold text-brand",
                  isModal ? "text-xs" : "text-sm"
                )}
              >
                {stats.discountPrefix}
              </span>
              <span
                className={cn(
                  "font-black leading-none tracking-tight text-brand tabular-nums",
                  isModal ? "text-[1.75rem]" : "text-4xl sm:text-[2.75rem]"
                )}
              >
                {stats.discountValue}
              </span>
              <span
                className={cn(
                  "rounded-md bg-brand-accent/15 font-extrabold uppercase tracking-wide text-brand-accent",
                  isModal
                    ? "mb-0.5 px-1.5 py-0.5 text-[10px]"
                    : "mb-1 px-2 py-0.5 text-sm"
                )}
              >
                {stats.discountSuffix}
              </span>
            </div>
          </div>

          <div
            className={cn(
              "border-brand/10",
              isModal
                ? "border-t pt-3 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-3"
                : "border-t pt-5 sm:border-t-0 sm:border-l sm:pl-5 sm:pt-0"
            )}
          >
            <p
              className={cn(
                "font-semibold uppercase tracking-widest text-muted-foreground",
                isModal ? "text-[10px] leading-snug" : "text-xs"
              )}
            >
              {stats.avgAwardLabel}
            </p>
            <div
              className={cn(
                "mt-1.5 flex items-center gap-2",
                !isModal && "mt-2 gap-2.5"
              )}
            >
              <span
                className={cn(
                  "flex shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600",
                  isModal ? "size-7 rounded-lg" : "size-9"
                )}
              >
                <IndianRupee className={isModal ? "size-3.5" : "size-4"} aria-hidden />
              </span>
              <p
                className={cn(
                  "font-black tracking-tight text-foreground tabular-nums",
                  isModal ? "text-lg leading-tight" : "text-2xl sm:text-[1.75rem]"
                )}
              >
                {stats.avgAwardAmount}
              </p>
            </div>
            <p
              className={cn(
                "leading-relaxed text-muted-foreground",
                isModal ? "mt-1 text-[10px] leading-snug" : "mt-1.5 text-xs"
              )}
            >
              {stats.avgAwardNote}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export function ScholarshipHighlightStats({
  variant = "page",
  className,
  animated = false,
  scrollToApply = false,
  onApplyClick,
}: ScholarshipHighlightStatsProps) {
  const stats = SCHOLARSHIP_HIGHLIGHT_STATS;
  const isModal = variant === "modal";
  const isInteractive = scrollToApply || Boolean(onApplyClick);

  const shellClass = cn(
    "relative overflow-hidden border border-brand/15 bg-gradient-to-br from-brand/[0.07] via-white to-brand-accent/[0.05]",
    isModal &&
      "w-full max-w-none rounded-2xl shadow-[0_8px_32px_rgba(24,119,242,0.08)] backdrop-blur-xl sm:max-w-md",
    isInteractive &&
      "cursor-pointer transition-all hover:border-brand/25 hover:shadow-[0_12px_40px_rgba(24,119,242,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30",
    className
  );

  const ariaLabel = isInteractive
    ? `${stats.discountPrefix} ${stats.discountValue} ${stats.discountSuffix}. ${stats.avgAwardLabel}: ${stats.avgAwardAmount}. Click to apply for scholarship.`
    : `${stats.discountPrefix} ${stats.discountValue} ${stats.discountSuffix}. ${stats.avgAwardLabel}: ${stats.avgAwardAmount}`;

  const handleActivate = () => {
    if (onApplyClick) {
      onApplyClick();
      return;
    }
    if (scrollToApply) {
      scrollToScholarshipForm();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isInteractive) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleActivate();
    }
  };

  const interactiveProps = isInteractive
    ? {
        role: "button" as const,
        tabIndex: 0,
        onClick: handleActivate,
        onKeyDown: handleKeyDown,
      }
    : {
        role: "region" as const,
      };

  if (animated) {
    const motionProps: MotionProps = {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.45, delay: 0.18, ease: EASE },
    };

    return (
      <motion.div
        {...motionProps}
        className={shellClass}
        aria-label={ariaLabel}
        {...interactiveProps}
      >
        <StatsContent variant={variant} />
      </motion.div>
    );
  }

  return (
    <div className={shellClass} aria-label={ariaLabel} {...interactiveProps}>
      <StatsContent variant={variant} />
    </div>
  );
}

interface ScholarshipStatsCardProps {
  className?: string;
}

export function ScholarshipStatsCard({ className }: ScholarshipStatsCardProps) {
  const applicationsOpen = useScholarshipApplicationsOpen();

  return (
    <GlassCard
      hover={false}
      className={cn(
        "relative overflow-hidden border-brand/15 bg-transparent p-0 shadow-none backdrop-blur-none",
        className
      )}
    >
      <ScholarshipHighlightStats
        variant="page"
        scrollToApply={applicationsOpen}
      />
    </GlassCard>
  );
}

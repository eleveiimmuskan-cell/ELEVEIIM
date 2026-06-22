"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { Clock, GraduationCap } from "lucide-react";
import { useScholarshipDeadline } from "@/hooks/use-scholarship-deadline";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

interface InlineCountdownProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  compact?: boolean;
}

function InlineCountdown({
  days,
  hours,
  minutes,
  seconds,
  compact,
}: InlineCountdownProps) {
  const units = [
    { value: days, label: "Days" },
    { value: hours, label: "Hours" },
    { value: minutes, label: "Minutes" },
    { value: seconds, label: "Seconds" },
  ];

  return (
    <p
      className={cn(
        "mt-2 flex flex-nowrap items-baseline gap-x-1 sm:gap-x-1.5",
        compact ? "text-[11px] sm:text-xs" : "text-xs sm:text-sm"
      )}
      aria-hidden
    >
      {units.map((unit, index) => (
        <Fragment key={unit.label}>
          <span className="inline-flex shrink-0 items-baseline gap-0.5 whitespace-nowrap">
            <span
              className={cn(
                "font-black tabular-nums leading-none text-red-600",
                compact ? "text-sm sm:text-base" : "text-base sm:text-lg"
              )}
            >
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className="font-bold uppercase tracking-wide text-red-500/90">
              {unit.label}
            </span>
          </span>
          {index < units.length - 1 && (
            <span className="shrink-0 font-light text-red-300/90">·</span>
          )}
        </Fragment>
      ))}
    </p>
  );
}

export interface CountdownTimerProps {
  variant?: "page" | "modal";
  className?: string;
}

export function CountdownTimer({ variant = "page", className }: CountdownTimerProps) {
  const { days, hours, minutes, seconds, isExpired, settings } =
    useScholarshipDeadline();
  const isModal = variant === "modal";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-red-200/40 bg-gradient-to-br from-white/85 via-red-50/40 to-white/80 shadow-[0_8px_32px_rgba(220,38,38,0.08)] backdrop-blur-xl",
        isModal ? "px-3 py-2.5 sm:px-4 sm:py-3" : "p-4 sm:p-5",
        className
      )}
      role="region"
      aria-live="polite"
      aria-label={
        isExpired
          ? settings.closedMessage
          : `${settings.headline}. ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds remaining.`
      }
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-red-500/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-10 left-1/4 size-24 rounded-full bg-red-400/10 blur-3xl"
        aria-hidden
      />

      <div className="relative">
        <div
          className={cn(
            "flex items-center gap-1.5 font-bold text-foreground",
            isModal ? "text-xs sm:text-sm" : "text-sm sm:text-base"
          )}
        >
          <span aria-hidden>🎓</span>
          <span>{settings.headline}</span>
        </div>

        {isExpired ? (
          <div
            className={cn(
              "mt-2 flex items-center gap-2 rounded-lg border border-red-200/80 bg-red-50/80 px-3 py-2 backdrop-blur-sm",
              !isModal && "mt-3 px-4 py-2.5"
            )}
          >
            <Clock
              className={cn("shrink-0 text-red-600", isModal ? "size-3.5" : "size-4")}
              aria-hidden
            />
            <p
              className={cn(
                "font-bold text-red-700",
                isModal ? "text-xs sm:text-sm" : "text-sm sm:text-base"
              )}
            >
              {settings.closedMessage}
            </p>
          </div>
        ) : (
          <>
            <InlineCountdown
              days={days}
              hours={hours}
              minutes={minutes}
              seconds={seconds}
              compact={isModal}
            />

            <p
              className={cn(
                "mt-1.5 flex items-center gap-1 font-semibold text-brand-accent",
                isModal ? "text-[10px] sm:text-[11px]" : "text-xs sm:text-sm"
              )}
            >
              <GraduationCap
                className={cn("shrink-0", isModal ? "size-3" : "size-3.5")}
                aria-hidden
              />
              {settings.seatsMessage}
            </p>
          </>
        )}
      </div>
    </motion.div>
  );
}

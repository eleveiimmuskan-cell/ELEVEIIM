import { CalendarDays } from "lucide-react";
import {
  FUTURE_LEADERS_DEADLINE_DATE,
  FUTURE_LEADERS_DEADLINE_LABEL,
} from "@/data/future-leaders-scholarship";
import { cn } from "@/lib/utils";

interface AnimatedScholarshipDeadlineProps {
  className?: string;
  /** Override the static label prefix. Defaults to "Last Date to Apply:". */
  label?: string;
  showIcon?: boolean;
}

export function AnimatedScholarshipDeadline({
  className,
  label = FUTURE_LEADERS_DEADLINE_LABEL,
  showIcon = true,
}: AnimatedScholarshipDeadlineProps) {
  return (
    <p
      className={cn(
        "flex flex-wrap items-center gap-2 text-sm font-semibold text-white sm:text-base",
        className
      )}
    >
      {showIcon && (
        <CalendarDays
          className="size-4 shrink-0 text-brand-accent"
          aria-hidden
        />
      )}
      <span>{label}</span>
      <span className="text-brand-accent">{FUTURE_LEADERS_DEADLINE_DATE}</span>
    </p>
  );
}

export { ScholarshipDeadlineBanner } from "@/components/scholarship/deadline-banner";

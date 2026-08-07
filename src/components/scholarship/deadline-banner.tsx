import { CalendarDays } from "lucide-react";
import {
  FUTURE_LEADERS_DEADLINE_DATE,
  FUTURE_LEADERS_DEADLINE_LABEL,
} from "@/data/future-leaders-scholarship";
import { cn } from "@/lib/utils";

/** In-card blinking deadline notice for the scholarship application form. */
export function ScholarshipDeadlineBanner({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      role="status"
      className={cn(
        "animate-blink mb-5 flex w-full items-center justify-center gap-2 rounded-lg border border-border border-l-4 border-l-brand-accent bg-white px-3 py-3 text-center sm:px-4",
        className
      )}
    >
      <CalendarDays
        className="size-4 shrink-0 text-brand-accent sm:size-5"
        aria-hidden
      />
      <p className="text-sm font-bold text-foreground sm:text-[15px]">
        <span>{FUTURE_LEADERS_DEADLINE_LABEL}</span>{" "}
        <span className="text-brand-accent">{FUTURE_LEADERS_DEADLINE_DATE}</span>
      </p>
    </div>
  );
}

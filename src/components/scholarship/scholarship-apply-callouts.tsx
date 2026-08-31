"use client";

import { Building2, Monitor } from "lucide-react";
import { motion } from "framer-motion";
import { useScholarshipApplicationsOpen } from "@/hooks/use-scholarship-deadline";
import { cn } from "@/lib/utils";

export function RegistrationOpenBadge({ className }: { className?: string }) {
  return (
    <motion.div
      role="status"
      aria-live="polite"
      animate={{ opacity: [1, 0.28, 1] }}
      transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
      className={cn(
        "pointer-events-none inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_6px_18px_rgba(220,38,38,0.35)] sm:px-3 sm:text-[11px]",
        className
      )}
    >
      <span className="size-1.5 shrink-0 rounded-full bg-white" aria-hidden />
      Registration Open
    </motion.div>
  );
}

export function LearningModesAvailable({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex w-fit max-w-full flex-wrap items-center gap-2 rounded-xl border border-brand/12 bg-white/80 px-2.5 py-1.5 shadow-[0_2px_12px_rgba(24,119,242,0.06)] sm:gap-2.5 sm:px-3 sm:py-2",
        className
      )}
      aria-label="Online and offline modes available"
    >
      <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2 py-0.5 text-[11px] font-semibold text-brand sm:text-xs">
        <Monitor className="size-3 shrink-0" aria-hidden />
        Online
      </span>
      <span className="text-[11px] font-medium text-muted-foreground sm:text-xs">
        &amp;
      </span>
      <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2 py-0.5 text-[11px] font-semibold text-brand sm:text-xs">
        <Building2 className="size-3 shrink-0" aria-hidden />
        Offline
      </span>
      <span className="text-[11px] font-medium text-foreground/75 sm:text-xs">
        modes available
      </span>
    </div>
  );
}

/** Callouts shown just above the scholarship apply form. */
export function ScholarshipApplyCallouts({
  className,
}: {
  className?: string;
}) {
  const applicationsOpen = useScholarshipApplicationsOpen();

  return (
    <div
      className={cn(
        "mb-4 flex flex-wrap items-center gap-2.5 sm:mb-5 sm:gap-3",
        className
      )}
    >
      {applicationsOpen ? <RegistrationOpenBadge /> : null}
      <LearningModesAvailable />
    </div>
  );
}

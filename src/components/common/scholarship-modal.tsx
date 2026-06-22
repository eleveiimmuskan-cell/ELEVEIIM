"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Dialog as DialogPrimitive } from "radix-ui";
import {
  ArrowRight,
  Check,
  GraduationCap,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { CountdownTimer } from "@/components/scholarship/countdown-timer";
import { ScholarshipBannerDecorations } from "@/components/scholarship/scholarship-banner-decorations";
import { ScholarshipHighlightStats } from "@/components/scholarship/scholarship-stats-card";
import { useScholarshipApplicationsOpen } from "@/hooks/use-scholarship-deadline";
import { SCHOLARSHIP_APPLY_SECTION_ID, SCHOLARSHIP_HIGHLIGHT_STATS, SCHOLARSHIP_STUDENTS_IMAGE } from "@/data/scholarship";
import {
  Dialog,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TRUST_ITEMS = [
  "Merit Based",
  "Instant Registration",
  "Limited Seats",
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

const MODAL_GRADIENT =
  "linear-gradient(135deg, #f8fbff 0%, #f4f8ff 50%, #eef5ff 100%)";

const STUDENT_IMAGE = SCHOLARSHIP_STUDENTS_IMAGE;

function HeroDecorations() {
  return <ScholarshipBannerDecorations variant="modal" />;
}

function FloatingScholarshipBadge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none rounded-2xl border border-white/65 bg-white/85 px-3.5 py-2 shadow-[0_8px_32px_rgba(24,119,242,0.12)] backdrop-blur-xl sm:px-4 sm:py-2.5",
        className
      )}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brand">
        Scholarship
      </p>
      <p className="text-xs font-bold text-brand-accent sm:text-[13px]">
        {SCHOLARSHIP_HIGHLIGHT_STATS.discountPrefix}{" "}
        {SCHOLARSHIP_HIGHLIGHT_STATS.discountValue} Waiver
      </p>
    </div>
  );
}

function ScholarshipHighlightCard({
  onApplyClick,
}: {
  onApplyClick: () => void;
}) {
  const applicationsOpen = useScholarshipApplicationsOpen();

  return (
    <ScholarshipHighlightStats
      variant="modal"
      animated
      className="mt-3 sm:mt-5"
      onApplyClick={applicationsOpen ? onApplyClick : undefined}
      scrollToApply={false}
    />
  );
}

interface ScholarshipModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ScholarshipModal({ open, onOpenChange }: ScholarshipModalProps) {
  const router = useRouter();
  const pathname = usePathname();
  const applicationsOpen = useScholarshipApplicationsOpen();

  const handleStatsCardClick = () => {
    onOpenChange(false);

    if (pathname === "/scholarship") {
      window.setTimeout(() => {
        document
          .getElementById(SCHOLARSHIP_APPLY_SECTION_ID)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
      return;
    }

    router.push(`/scholarship#${SCHOLARSHIP_APPLY_SECTION_ID}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay
          className={cn(
            "z-[60] bg-slate-950/50 backdrop-blur-sm",
            "data-open:animate-in data-open:fade-in-0 data-open:duration-300",
            "data-closed:animate-out data-closed:fade-out-0 data-closed:duration-200"
          )}
        />
        <DialogPrimitive.Content
          className={cn(
            "fixed top-1/2 left-1/2 z-[70] w-full max-w-[calc(100%-1rem)] -translate-x-1/2 -translate-y-1/2 outline-none sm:max-w-[960px]",
            "max-h-[92dvh] overflow-y-auto overscroll-contain sm:max-h-[95dvh]",
            "rounded-2xl border border-border/50 p-0 sm:rounded-[28px]",
            "shadow-[0_32px_80px_rgba(15,23,42,0.14)] ring-1 ring-black/[0.03]",
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-[0.97] data-open:duration-300",
            "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-[0.97] data-closed:duration-200"
          )}
          style={{ background: MODAL_GRADIENT }}
          aria-describedby="scholarship-modal-description"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="relative md:min-h-[560px] lg:min-h-[580px]"
          >
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="absolute right-4 top-4 z-[30] inline-flex size-9 items-center justify-center rounded-xl border border-border/60 bg-white/90 text-muted-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-white hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
              aria-label="Close scholarship dialog"
            >
              <X className="size-4" />
            </button>

            <HeroDecorations />

            <div
              className="pointer-events-none absolute bottom-0 right-[8%] z-[2] h-3 w-[34%] rounded-[100%] bg-foreground/8 blur-lg max-md:right-[4%] max-md:w-[48%]"
              aria-hidden
            />

            <Image
              src={STUDENT_IMAGE}
              alt=""
              width={1024}
              height={682}
              priority
              className={cn(
                "hero-students pointer-events-none absolute bottom-0 z-[3] hidden h-auto object-contain object-bottom md:block",
                "drop-shadow-[0_16px_32px_rgba(24,119,242,0.14)]",
                "md:right-[-20px] md:w-[55%]",
                "lg:right-[-24px] lg:w-[60%]"
              )}
              sizes="(max-width: 865px) 65vw, 500px"
            />

            <FloatingScholarshipBadge className="absolute right-[6%] top-[11%] z-[6] hidden md:block" />

            <div
              className={cn(
                "relative z-[5] flex flex-col",
                "px-4 py-5 sm:px-8 sm:py-10",
                "md:w-[58%] md:justify-center md:pl-10 md:pr-8"
              )}
            >
              <div className="mb-3 inline-flex w-fit max-w-full items-center gap-2 rounded-full border border-brand/12 bg-white/75 px-3 py-1.5 text-[11px] font-semibold text-brand shadow-[0_2px_12px_rgba(24,119,242,0.06)] sm:mb-5 sm:px-3.5 sm:text-xs">
                <GraduationCap className="size-3.5 shrink-0" aria-hidden />
                <span className="truncate">ELEVEIIM Scholarship Program</span>
              </div>

              <DialogTitle className="max-w-lg text-left text-xl font-bold leading-[1.2] tracking-tight text-foreground sm:text-[1.65rem] md:text-[2rem]">
                Unlock {SCHOLARSHIP_HIGHLIGHT_STATS.discountPrefix}{" "}
                {SCHOLARSHIP_HIGHLIGHT_STATS.discountValue} Scholarship
              </DialogTitle>

              <DialogDescription
                id="scholarship-modal-description"
                className="mt-2 max-w-md text-left text-[13px] leading-relaxed text-muted-foreground sm:mt-3 sm:text-sm md:text-[15px]"
              >
                Take the scholarship assessment and earn fee waivers based on
                your performance.
              </DialogDescription>

              <CountdownTimer variant="modal" className="mt-3 sm:mt-4" />

              <ScholarshipHighlightCard onApplyClick={handleStatsCardClick} />

              <ul
                className="mt-4 grid grid-cols-1 gap-2 sm:mt-5 sm:flex sm:flex-wrap sm:gap-x-5 sm:gap-y-2.5"
                aria-label="Program highlights"
              >
                {TRUST_ITEMS.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-1.5 text-[13px] font-medium text-foreground/85 sm:text-sm"
                  >
                    <Check
                      className="size-4 shrink-0 text-emerald-500"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex w-full flex-col gap-2.5 sm:mt-7 sm:max-w-md sm:flex-row sm:items-center sm:gap-3">
                <motion.div
                  className="w-full sm:flex-1"
                  whileHover={applicationsOpen ? { y: -2 } : undefined}
                  whileTap={applicationsOpen ? { scale: 0.99 } : undefined}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                >
                  {applicationsOpen ? (
                    <Button
                      asChild
                      className="h-12 w-full rounded-2xl bg-brand text-[15px] font-semibold text-white shadow-[0_6px_20px_rgba(24,119,242,0.3)] transition-all hover:bg-brand/90 hover:shadow-[0_8px_28px_rgba(24,119,242,0.35)]"
                    >
                      <Link
                        href="/scholarship"
                        onClick={() => onOpenChange(false)}
                      >
                        Apply Now
                        <ArrowRight className="size-4" aria-hidden />
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      disabled
                      className="h-12 w-full rounded-2xl bg-muted text-[15px] font-semibold text-muted-foreground"
                    >
                      Applications Closed
                    </Button>
                  )}
                </motion.div>
                <Button
                  type="button"
                  variant="ghost"
                  className="h-10 w-full rounded-2xl text-sm font-medium text-muted-foreground hover:bg-white/50 hover:text-foreground sm:w-auto sm:px-5"
                  onClick={() => onOpenChange(false)}
                >
                  Maybe Later
                </Button>
              </div>

              <p className="mt-4 pb-1 text-center text-[11px] text-muted-foreground/80 sm:mt-5 sm:text-left sm:text-xs">
                Trusted by aspiring learners across India
              </p>
            </div>
          </motion.div>

          <span className="sr-only">
            ELEVEIIM male and female students in branded apparel representing
            scholarship opportunities
          </span>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}

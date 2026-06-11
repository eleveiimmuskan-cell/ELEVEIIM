"use client";

import Image from "next/image";
import Link from "next/link";
import { Dialog as DialogPrimitive } from "radix-ui";
import {
  ArrowRight,
  Check,
  GraduationCap,
  Star,
  Trophy,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
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

const STUDENT_IMAGE = "/images/scholarship-students-transparent.png";

function HeroDecorations() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
      <div className="absolute -left-6 top-[20%] size-32 rounded-full bg-brand/8 blur-3xl" />
      <div className="absolute right-[8%] top-[35%] size-28 rounded-full bg-brand/6 blur-3xl" />
      <GraduationCap className="absolute left-[84%] top-[28%] size-7 text-brand/25" />
    <Star className="absolute right-[45%] top-[5%] size-5 fill-brand-accent/10 text-brand-accent/30" /><Star className="absolute right-[32%] top-[24%] size-5 fill-brand-accent/10 text-brand-accent/30" />

      <div className="absolute left-[10%] top-10 size-16 rounded-full border border-white/50 bg-white/30 backdrop-blur-md" />
      <div className="absolute right-[28%] top-16 size-11 rounded-full border border-white/40 bg-white/25 backdrop-blur-sm" />
      <GraduationCap className="absolute left-[65%] top-[8%] size-7 text-brand/25" />
      <div className="absolute right-[10%] top-0 size-11 rounded-full border border-white/40 bg-white/25 backdrop-blur-sm" />
      <Star className="absolute right-[32%] top-[24%] size-5 fill-brand-accent/10 text-brand-accent/30" />
      <Star className="absolute right-[82%] top-[15%] size-5 fill-brand-accent/10 text-brand-accent/30" />
    </div>
  );
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
        Up To 75% Waiver
      </p>
    </div>
  );
}

function ScholarshipHighlightCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.18, ease: EASE }}
      className="relative mt-5 max-w-md overflow-hidden rounded-2xl border border-brand/10 bg-white/75 p-4 shadow-[0_8px_32px_rgba(24,119,242,0.08)] backdrop-blur-xl sm:p-5"
      role="region"
      aria-label="Up to 75 percent fee waiver, limited scholarship seats"
    >
      <div className="relative flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-accent/10 text-brand-accent">
          <Trophy className="size-5" aria-hidden />
        </div>
        <div>
          <p className="text-base font-bold tracking-tight text-foreground sm:text-lg">
            Up To 75% Fee Waiver
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Limited Scholarship Seats
          </p>
        </div>
      </div>
    </motion.div>
  );
}

interface ScholarshipModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ScholarshipModal({ open, onOpenChange }: ScholarshipModalProps) {
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
            "fixed top-1/2 left-1/2 z-[70] w-full max-w-[calc(100%-1.5rem)] -translate-x-1/2 -translate-y-1/2 outline-none sm:max-w-[960px]",
            "overflow-hidden rounded-[28px] border border-border/50 p-0",
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
            className="relative min-h-[min(640px,92vh)] md:min-h-[560px] lg:min-h-[580px]"
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
                "hero-students pointer-events-none absolute bottom-0 z-[3] h-auto object-contain object-bottom",
                "drop-shadow-[0_16px_32px_rgba(24,119,242,0.14)]",
                "max-md:right-[-12px] max-md:w-[52%]",
                "md:right-[-20px] md:w-[55%]",
                "lg:right-[-24px] lg:w-[60%]"
              )}
              sizes="(max-width: 865px) 65vw, 500px"
            />

            <FloatingScholarshipBadge className="absolute right-[6%] top-[11%] z-[6] max-md:right-14 max-md:top-14" />

            <div
              className={cn(
                "relative z-[5] flex flex-col justify-center",
                "px-5 py-8 sm:px-8 sm:py-10",
                "md:w-[58%] md:pl-10 md:pr-8",
                "max-md:pb-[min(240px,36vh)]"
              )}
            >
              <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-brand/12 bg-white/75 px-3.5 py-1.5 text-xs font-semibold text-brand shadow-[0_2px_12px_rgba(24,119,242,0.06)]">
                <GraduationCap className="size-3.5" aria-hidden />
                <span>ELEVEIIM Scholarship Program</span>
              </div>

              <DialogTitle className="max-w-lg text-left text-[1.65rem] font-bold leading-[1.15] tracking-tight text-foreground sm:text-[2rem]">
                Unlock Up To 75% Scholarship
              </DialogTitle>

              <DialogDescription
                id="scholarship-modal-description"
                className="mt-3 max-w-md text-left text-sm leading-relaxed text-muted-foreground sm:text-[15px]"
              >
                Take the scholarship assessment and earn fee waivers based on
                your performance.
              </DialogDescription>

              <ScholarshipHighlightCard />

              <ul
                className="mt-5 flex flex-wrap gap-x-5 gap-y-2.5"
                aria-label="Program highlights"
              >
                {TRUST_ITEMS.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-1.5 text-sm font-medium text-foreground/85"
                  >
                    <Check
                      className="size-4 shrink-0 text-emerald-500"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex max-w-md flex-col gap-3 sm:flex-row sm:items-center">
                <motion.div
                  className="w-full sm:flex-1"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                >
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

              <p className="mt-5 text-xs text-muted-foreground/80">
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

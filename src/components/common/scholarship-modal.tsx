"use client";

import Link from "next/link";
import { Dialog as DialogPrimitive } from "radix-ui";
import { GraduationCap, Sparkles, X } from "lucide-react";
import {
  Dialog,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FEATURES = [
  "Limited-time scholarship offers",
  "Merit-based eligibility",
  "Instant application process",
  "Personalized guidance",
] as const;

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
            "z-[60] bg-slate-950/65 backdrop-blur-md",
            "data-open:animate-in data-open:fade-in-0 data-open:duration-300",
            "data-closed:animate-out data-closed:fade-out-0 data-closed:duration-200"
          )}
        />
        <DialogPrimitive.Content
          className={cn(
            "fixed top-1/2 left-1/2 z-[70] grid w-full max-w-[calc(100%-1.5rem)] -translate-x-1/2 -translate-y-1/2 outline-none sm:max-w-lg",
            "overflow-hidden rounded-2xl border border-white/60 p-0 shadow-[0_24px_80px_rgba(24,119,242,0.22)]",
            "bg-gradient-to-br from-white via-white to-brand/5 ring-1 ring-brand/10",
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-open:duration-300",
            "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-closed:duration-200"
          )}
        >
          <div
            className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-brand/10 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-20 -left-12 size-56 rounded-full bg-brand-accent/15 blur-3xl"
            aria-hidden
          />

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="absolute right-3 top-3 z-10 inline-flex size-9 items-center justify-center rounded-full border border-border/60 bg-white/80 text-muted-foreground shadow-sm transition-colors hover:bg-white hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
            aria-label="Close scholarship offer"
          >
            <X className="size-4" />
          </button>

          <div className="relative border-b border-brand/10 bg-gradient-to-r from-brand/10 via-brand/5 to-brand-accent/10 px-6 pb-5 pt-6 sm:px-8 sm:pt-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand shadow-sm backdrop-blur-md">
              <span className="flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand/80 text-white shadow-md shadow-brand/25">
                <GraduationCap className="size-3.5" />
              </span>
              <Sparkles className="size-3.5 text-brand-accent" />
              Premium Scholarship
            </div>

            <DialogTitle className="pr-8 text-left text-xl font-bold leading-tight tracking-tight text-foreground sm:text-2xl">
              <span aria-hidden>🎓 </span>
              Unlock Your Scholarship Opportunity
            </DialogTitle>

            <DialogDescription className="mt-3 text-left text-sm leading-relaxed text-muted-foreground sm:text-base">
              Get exclusive scholarship benefits for ELEVEIIM programs and accelerate
              your academic journey.
            </DialogDescription>
          </div>

          <div className="relative space-y-5 px-6 py-5 sm:px-8 sm:py-6">
            <ul className="space-y-3" aria-label="Scholarship benefits">
              {FEATURES.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 rounded-xl border border-brand/10 bg-white/60 px-3.5 py-2.5 text-sm text-foreground/90 shadow-[0_4px_20px_rgba(24,119,242,0.06)] backdrop-blur-sm"
                >
                  <span
                    className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs font-bold text-brand"
                    aria-hidden
                  >
                    ✓
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-3">
              <Button
                asChild
                className="h-11 flex-1 rounded-xl bg-brand-accent text-sm font-semibold text-white shadow-lg shadow-brand-accent/25 hover:bg-brand-accent/90"
              >
                <Link href="/scholarship" onClick={() => onOpenChange(false)}>
                  Apply for Scholarship
                </Link>
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-11 flex-1 rounded-xl border-border/80 bg-white/80 text-sm font-semibold text-foreground hover:bg-muted/50"
                onClick={() => onOpenChange(false)}
              >
                Maybe Later
              </Button>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}

"use client";

import { Check, GraduationCap, X } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { CountdownTimer } from "@/components/scholarship/countdown-timer";
import { ScholarshipBannerDecorations } from "@/components/scholarship/scholarship-banner-decorations";
import {
  LearningModesAvailable,
  RegistrationOpenBadge,
} from "@/components/scholarship/scholarship-apply-callouts";
import { ContactQueryForm } from "@/components/contact/contact-query-form";
import { useScholarshipApplicationsOpen } from "@/hooks/use-scholarship-deadline";
import { useScholarshipCms } from "@/components/common/scholarship-cms-provider";
import {
  Dialog,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MODAL_GRADIENT =
  "linear-gradient(135deg, #f8fbff 0%, #f4f8ff 50%, #eef5ff 100%)";

interface ScholarshipModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ScholarshipModal({ open, onOpenChange }: ScholarshipModalProps) {
  const applicationsOpen = useScholarshipApplicationsOpen();
  const { modal, highlightStats } = useScholarshipCms();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay
          className={cn(
            "z-[10040] bg-slate-950/50 backdrop-blur-sm",
            "data-open:animate-in data-open:fade-in-0 data-open:duration-300",
            "data-closed:animate-out data-closed:fade-out-0 data-closed:duration-200"
          )}
        />
        <DialogPrimitive.Content
          data-slot="dialog-content"
          data-lenis-prevent
          className={cn(
            "fixed top-1/2 left-1/2 z-[10050] flex w-full max-w-[calc(100%-1rem)] -translate-x-1/2 -translate-y-1/2 flex-col outline-none sm:max-w-[920px]",
            "max-h-[min(92dvh,100svh)] pointer-events-auto",
            "rounded-2xl border border-border/50 p-0 sm:rounded-[28px]",
            "shadow-[0_32px_80px_rgba(15,23,42,0.14)] ring-1 ring-black/[0.03]",
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-[0.97] data-open:duration-300",
            "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-[0.97] data-closed:duration-200"
          )}
          style={{ background: MODAL_GRADIENT }}
          aria-describedby="scholarship-modal-description"
        >
          <div className="sticky top-0 z-40 flex shrink-0 items-center justify-end gap-2 px-3 py-3 sm:px-4">
            {applicationsOpen ? (
              <RegistrationOpenBadge className="mr-auto max-w-[calc(100%-3.25rem)]" />
            ) : null}
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-white/95 text-muted-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-white hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
              aria-label="Close scholarship dialog"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain">
            <ScholarshipBannerDecorations variant="modal" />

            <div className="relative z-[5] grid gap-6 px-4 pb-5 sm:gap-8 sm:px-8 sm:pb-10 md:grid-cols-2 md:items-start md:gap-10 md:px-10">
              <div className="flex min-w-0 flex-col">
                <div className="mb-3 inline-flex w-fit max-w-full items-center gap-2 rounded-full border border-brand/12 bg-white/75 px-3 py-1.5 text-[11px] font-semibold text-brand shadow-[0_2px_12px_rgba(24,119,242,0.06)] sm:mb-4 sm:px-3.5 sm:text-xs">
                  <GraduationCap className="size-3.5 shrink-0" aria-hidden />
                  <span className="truncate">{modal.eyebrow}</span>
                </div>

                <LearningModesAvailable className="mb-3 sm:mb-4" />

                <DialogTitle className="max-w-lg text-left text-xl font-bold leading-[1.2] tracking-tight text-foreground sm:text-[1.65rem] md:text-[1.85rem]">
                  Unlock {highlightStats.discountPrefix}{" "}
                  {highlightStats.discountValue} Scholarship
                </DialogTitle>

                <DialogDescription
                  id="scholarship-modal-description"
                  className="mt-2 max-w-md text-left text-[13px] leading-relaxed text-muted-foreground sm:mt-3 sm:text-sm"
                >
                  {modal.description}
                </DialogDescription>

                <CountdownTimer variant="modal" className="mt-3 sm:mt-4" />

                <ul
                  className="mt-4 grid grid-cols-1 gap-2 sm:mt-5 sm:flex sm:flex-wrap sm:gap-x-5 sm:gap-y-2.5"
                  aria-label="Program highlights"
                >
                  {modal.trustItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center gap-1.5 text-[13px] font-medium text-foreground/85 sm:text-sm"
                    >
                      <Check
                        className="size-4 shrink-0 text-emerald-500"
                        aria-hidden
                      />
                      {item.text}
                    </li>
                  ))}
                </ul>

                <p className="mt-5 hidden text-[11px] text-muted-foreground/80 sm:mt-6 sm:block sm:text-xs md:mt-auto md:pt-8">
                  {modal.footerNote}
                </p>
              </div>

              <div className="relative z-[6] rounded-2xl border border-brand/10 bg-white p-4 shadow-[0_8px_40px_rgba(11,99,206,0.08)] sm:p-5 md:p-6">
                <h3 className="text-base font-bold text-foreground sm:text-lg">
                  Send a Quick Query
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  Ask about scholarships, courses, or eligibility — our
                  counselors will get back to you shortly.
                </p>

                <ContactQueryForm
                  className="mt-4"
                  compact
                  defaultSubject="Scholarship Inquiry"
                  submitLabel="Submit Query"
                  honeypotId="scholarship_modal_hp"
                />

                <Button
                  type="button"
                  variant="ghost"
                  className="mt-2 h-10 w-full rounded-2xl text-sm font-medium text-muted-foreground hover:bg-slate-50 hover:text-foreground"
                  onClick={() => onOpenChange(false)}
                >
                  {modal.secondaryButtonText}
                </Button>
              </div>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}

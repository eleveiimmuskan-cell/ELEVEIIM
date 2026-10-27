import { CalendarDays, Check, Lock } from "lucide-react";
import { PayNowButton } from "@/components/free-ai-foundation-course/pay-now-button";
import {
  FREE_AI_FOUNDATION_INCLUDES,
  FREE_AI_FOUNDATION_SCHEDULE,
} from "@/data/free-ai-foundation-course";

export function FreeAiFoundationPayCard() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.18)] sm:p-7">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        Registration
      </p>

      <div className="mt-4 flex items-start justify-between gap-4 border-b border-border pb-5">
        <div>
          <p className="text-sm text-muted-foreground">One-time fee</p>
          <p className="mt-1 text-4xl font-bold tracking-tight text-foreground">₹299</p>
          <p className="mt-1 text-sm font-semibold text-brand-accent">₹9 per day</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Course</p>
          <p className="relative mt-1 inline-block text-lg font-semibold text-slate-400">
            <span className="relative">
              ₹41,000
              <span
                className="pointer-events-none absolute top-1/2 -right-0.5 -left-0.5 h-0.5 -translate-y-1/2 bg-red-500"
                aria-hidden
              />
            </span>
          </p>
          <p className="mt-2 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-600">
            Free
          </p>
        </div>
      </div>

      <p className="mt-4 inline-flex items-center gap-2 animate-blink text-sm font-semibold text-brand-accent">
        <CalendarDays className="size-4 shrink-0" aria-hidden />
        {FREE_AI_FOUNDATION_SCHEDULE.ends}
      </p>

      <ul className="mt-5 space-y-3">
        {FREE_AI_FOUNDATION_INCLUDES.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
            <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <PayNowButton className="mt-6 w-full" />

      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <Lock className="size-3.5" aria-hidden />
        Secure payment on Razorpay. No hidden charges.
      </p>
    </div>
  );
}

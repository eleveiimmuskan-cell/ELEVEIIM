import { Check, Lock } from "lucide-react";
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

      <div className="mt-4 flex items-end justify-between gap-4 border-b border-border pb-5">
        <div>
          <p className="text-sm text-muted-foreground">One-time fee</p>
          <p className="mt-1 text-4xl font-bold tracking-tight text-foreground">₹299</p>
          <p className="mt-1 text-sm font-semibold text-brand-accent">₹9 per day</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Course fee</p>
          <p className="mt-1 text-lg font-semibold text-emerald-600">Free</p>
        </div>
      </div>

      <div className="mt-4 text-sm leading-relaxed">
        <p className="font-semibold text-foreground">{FREE_AI_FOUNDATION_SCHEDULE.duration}</p>
        <p className="mt-1 text-muted-foreground">{FREE_AI_FOUNDATION_SCHEDULE.daily}</p>
        <p className="text-muted-foreground">{FREE_AI_FOUNDATION_SCHEDULE.timing}</p>
        <p className="text-muted-foreground">{FREE_AI_FOUNDATION_SCHEDULE.ends}</p>
      </div>

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

import { AlertTriangle } from "lucide-react";
import { SCHOLARSHIP_CANCELLATION_POINTS } from "@/data/scholarship-terms";

export function CancellationCard() {
  return (
    <section id="cancellation" className="scroll-mt-28">
      <article
        className="rounded-xl border border-red-200 bg-gradient-to-br from-red-50 to-white p-6 shadow-sm sm:p-8 dark:border-red-900/50 dark:from-red-950/40 dark:to-slate-900"
        role="region"
        aria-labelledby="cancellation-heading"
      >
        <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400">
          <AlertTriangle className="size-5" aria-hidden />
        </div>
        <h2
          id="cancellation-heading"
          className="text-xl font-bold tracking-tight text-[#0F172A] sm:text-2xl dark:text-white"
        >
          Scholarship Cancellation
        </h2>
        <p className="mt-2 text-sm font-medium text-red-700 dark:text-red-300">
          Scholarship may be cancelled if:
        </p>
        <ul className="mt-5 space-y-3">
          {SCHOLARSHIP_CANCELLATION_POINTS.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <span
                className="mt-2 size-1.5 shrink-0 rounded-full bg-red-500"
                aria-hidden
              />
              <span className="text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
                {point}
              </span>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}

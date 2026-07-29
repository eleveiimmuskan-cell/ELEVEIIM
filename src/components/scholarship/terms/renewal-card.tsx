import { CheckCircle2, RefreshCw } from "lucide-react";
import { SCHOLARSHIP_RENEWAL_POINTS } from "@/data/scholarship-terms";

export function RenewalCard() {
  return (
    <section id="renewal" className="scroll-mt-28">
      <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-[#DBEAFE] text-[#2563EB] dark:bg-blue-950 dark:text-blue-400">
          <RefreshCw className="size-5" aria-hidden />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-[#0F172A] sm:text-2xl dark:text-white">
          Scholarship Renewal
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Continued scholarship support depends on maintaining institute
          standards throughout the program.
        </p>
        <ul className="mt-6 space-y-3">
          {SCHOLARSHIP_RENEWAL_POINTS.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <CheckCircle2
                className="mt-0.5 size-5 shrink-0 text-[#2563EB] dark:text-blue-400"
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

import {
  BadgeCheck,
  Ban,
  FileCheck2,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { SCHOLARSHIP_ELIGIBILITY_POINTS } from "@/data/scholarship-terms";

const ICONS = [BadgeCheck, FileCheck2, Ban, Ban, Scale] as const;

export function EligibilityCard() {
  return (
    <section id="eligibility" className="scroll-mt-28">
      <article className="rounded-xl border border-slate-200 bg-[#F8FBFF] p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-[#DBEAFE] text-[#2563EB] dark:bg-blue-950 dark:text-blue-400">
          <ShieldCheck className="size-5" aria-hidden />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-[#0F172A] sm:text-2xl dark:text-white">
          Eligibility Criteria
        </h2>
        <ul className="mt-6 space-y-4">
          {SCHOLARSHIP_ELIGIBILITY_POINTS.map((point, index) => {
            const Icon = ICONS[index] ?? BadgeCheck;
            return (
              <li key={point} className="flex gap-3">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#2563EB] shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:text-blue-400 dark:ring-slate-700">
                  <Icon className="size-4" aria-hidden />
                </span>
                <span className="pt-1.5 text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
                  {point}
                </span>
              </li>
            );
          })}
        </ul>
      </article>
    </section>
  );
}

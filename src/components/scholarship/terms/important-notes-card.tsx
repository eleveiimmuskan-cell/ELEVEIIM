import { Info } from "lucide-react";
import { SCHOLARSHIP_IMPORTANT_NOTES } from "@/data/scholarship-terms";

export function ImportantNotesCard() {
  return (
    <section id="important-notes" className="scroll-mt-28">
      <article className="rounded-xl border border-[#BFDBFE] bg-gradient-to-br from-[#EFF6FF] to-white p-6 shadow-sm sm:p-8 dark:border-blue-900 dark:from-blue-950/50 dark:to-slate-900">
        <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-[#DBEAFE] text-[#2563EB] dark:bg-blue-950 dark:text-blue-400">
          <Info className="size-5" aria-hidden />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-[#0F172A] sm:text-2xl dark:text-white">
          Important Notes
        </h2>
        <ul className="mt-6 space-y-3">
          {SCHOLARSHIP_IMPORTANT_NOTES.map((note) => (
            <li key={note} className="flex items-start gap-3">
              <span
                className="mt-2 size-1.5 shrink-0 rounded-full bg-[#2563EB]"
                aria-hidden
              />
              <span className="text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
                {note}
              </span>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}

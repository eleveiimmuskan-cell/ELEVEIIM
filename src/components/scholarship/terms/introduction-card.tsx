import { FileText } from "lucide-react";

export function IntroductionCard() {
  return (
    <section id="introduction" className="scroll-mt-28">
      <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-[#DBEAFE] text-[#2563EB] dark:bg-blue-950 dark:text-blue-400">
          <FileText className="size-5" aria-hidden />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-[#0F172A] sm:text-2xl dark:text-white">
          Introduction
        </h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
          <p>
            ELEVEIIM believes quality education should be accessible to
            deserving learners. Our scholarship program is designed to reduce
            financial barriers for talented students who demonstrate academic
            excellence and commitment.
          </p>
          <p>
            Scholarships are awarded on merit, and where applicable, on a
            merit-cum-need basis. Awards are limited in number and subject to
            availability for each intake.
          </p>
          <p>
            The institute reserves the right to modify scholarship policy at any
            time. A scholarship applies only after formal approval by the
            scholarship committee and completion of required verification.
          </p>
        </div>
      </article>
    </section>
  );
}

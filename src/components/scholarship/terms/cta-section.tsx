import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SCHOLARSHIP_APPLY_SECTION_ID } from "@/data/scholarship";

export function CTASection() {
  return (
    <section className="scroll-mt-28" aria-labelledby="terms-cta-heading">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#2563EB] via-[#1D4ED8] to-[#0F172A] px-6 py-12 text-center shadow-lg shadow-blue-500/20 sm:px-10 sm:py-14">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-8 -top-8 size-40 rounded-full bg-white/10"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-10 -right-10 size-52 rounded-full bg-sky-400/15"
        />
        <div className="relative z-10 mx-auto max-w-2xl">
          <h2
            id="terms-cta-heading"
            className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            Ready to Apply for Scholarship?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-blue-100 sm:text-base">
            Review the terms above, then submit your application. Our team will
            guide you through verification and next steps.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Button
              asChild
              size="lg"
              className="w-full border border-white bg-white text-[#2563EB] hover:bg-slate-100 hover:text-[#1D4ED8] [a]:hover:bg-slate-100 [a]:hover:text-[#1D4ED8] sm:w-auto"
            >
              <Link href={`/scholarship#${SCHOLARSHIP_APPLY_SECTION_ID}`}>
                Apply Now
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full border-white/50 bg-transparent text-white hover:bg-white/15 hover:text-white [a]:hover:bg-white/15 [a]:hover:text-white sm:w-auto"
            >
              <Link href="/contact">
                <Download className="size-4" aria-hidden />
                Download Scholarship Brochure
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PAGE_HERO } from "@/data/industrial-training";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#0B63CE]/[0.04] to-white pt-28 pb-16 sm:pt-32 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#0B63CE]">
            Industrial Training
          </p>
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-[#1E293B] sm:text-4xl lg:text-5xl">
            {PAGE_HERO.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {PAGE_HERO.subtitle}
          </p>
          {/* <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-xl bg-[#0B63CE] hover:bg-[#0B63CE]/90">
              <Link href="/contact">
                Apply Now
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-xl border-[#0B63CE]/30 text-[#0B63CE]">
              <Link href="#brochure">
                <Download className="size-4" aria-hidden />
                Download Brochure
              </Link>
            </Button>
          </div> */}
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FINAL_CTA } from "@/data/industrial-training";

export function FinalCTA() {
  return (
    <section
      className="bg-gradient-to-br from-[#0B63CE] to-[#1E293B] py-16 text-white sm:py-20"
      aria-labelledby="final-cta-heading"
    >
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 id="final-cta-heading" className="text-2xl font-bold sm:text-3xl">
          {FINAL_CTA.title}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-white/85">
          {FINAL_CTA.description}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="rounded-xl bg-white text-[#0B63CE] hover:bg-white/90">
            <Link href="/contact">
              Apply Now
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-xl border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            <Link href="/contact">
              <MessageCircle className="size-4" aria-hidden />
              Talk To Counselor
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

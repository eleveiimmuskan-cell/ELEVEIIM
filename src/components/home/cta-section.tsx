"use client";

import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionReveal } from "@/components/common/motion-wrapper";
import { ScholarshipButton } from "@/components/common/scholarship-button";

export function CtaSection() {
  return (
    <SectionReveal id="contact" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-brand/80 px-8 py-16 text-center shadow-2xl shadow-brand/20 sm:px-16">
          <div className="absolute -left-10 -top-10 size-40 rounded-full bg-white/10" />
          <div className="absolute -bottom-10 -right-10 size-56 rounded-full bg-brand-accent/20" />

          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Elevate Your Career?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">
              Join thousands of successful graduates. Enroll today or apply for
              our scholarship program — your future starts here.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-brand hover:bg-white/90"
              >
                <Link href="#courses">
                  Browse Courses
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <ScholarshipButton />
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 bg-transparent text-white hover:bg-white/10"
              >
                <a href="tel:+919876543210">
                  <Phone className="size-4" />
                  Call Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}

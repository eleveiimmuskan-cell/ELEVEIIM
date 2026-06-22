"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PREMIUM_EASE, VIEWPORT_ONCE } from "@/components/common/motion-wrapper";

interface PageCtaProps {
  title?: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

export function PageCta({
  title = "Ready to Elevate Your Career?",
  description = "Join thousands of successful graduates. Enroll today or apply for our scholarship program.",
  primaryHref = "/courses",
  primaryLabel = "Browse Courses",
  secondaryHref = "/scholarship",
  secondaryLabel = "Apply for Scholarship",
}: PageCtaProps) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.7, ease: PREMIUM_EASE }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-brand/85 px-8 py-14 text-center shadow-2xl shadow-brand/15 sm:px-16"
        >
          <div className="absolute -left-10 -top-10 size-40 rounded-full bg-white/10" />
          <div className="absolute -bottom-10 -right-10 size-56 rounded-full bg-brand-accent/15" />
          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">
              {description}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-brand hover:bg-white/90"
              >
                <Link href={primaryHref}>
                  {primaryLabel}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 bg-transparent text-white hover:bg-white/10"
              >
                <Link href={secondaryHref}>{secondaryLabel}</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/shared/section-header";
import {
  FREE_AI_FOUNDATION_STEPS,
  FREE_AI_FOUNDATION_WHO,
  FREE_AI_FOUNDATION_WHO_DESCRIPTION,
} from "@/data/free-ai-foundation-course";
import {
  PREMIUM_EASE,
  VIEWPORT_ONCE,
  itemFadeUp,
} from "@/components/common/motion-wrapper";

export function FreeAiFoundationWhoSection() {
  return (
    <section className="bg-[#f6f8fb] py-16 sm:py-20" aria-labelledby="who-can-join-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Enrollment"
          title="Who this course is for"
          titleId="who-can-join-heading"
          description={FREE_AI_FOUNDATION_WHO_DESCRIPTION}
        />

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.65, ease: PREMIUM_EASE }}
          className="rounded-2xl border border-border bg-white p-6 shadow-soft sm:p-8"
        >
          <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Who can join
          </h3>
          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
            }}
            className="mt-6 space-y-4"
          >
            {FREE_AI_FOUNDATION_WHO.map((item) => (
              <motion.li key={item} variants={itemFadeUp} className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-500" aria-hidden />
                <span className="text-sm font-medium text-foreground sm:text-[15px]">
                  {item}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.65, ease: PREMIUM_EASE, delay: 0.08 }}
          className="rounded-2xl border border-border bg-white p-6 shadow-soft sm:p-8"
        >
          <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            How you join
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
            Pay once, then attend the live sessions and collect your certificate.
          </p>
          <ol className="mt-6 space-y-5">
            {FREE_AI_FOUNDATION_STEPS.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                  {index + 1}
                </span>
                <div>
                  <p className="text-sm font-bold text-foreground sm:text-[15px]">
                    {step.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </motion.article>
        </div>
      </div>
    </section>
  );
}

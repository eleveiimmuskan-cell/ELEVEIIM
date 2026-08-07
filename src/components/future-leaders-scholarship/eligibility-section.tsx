"use client";

import Image from "next/image";
import { CheckCircle2, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import {
  FUTURE_LEADERS_ELIGIBILITY_IMAGE,
  FUTURE_LEADERS_SELECTION_STEPS,
  FUTURE_LEADERS_WHO_CAN_APPLY,
  FUTURE_LEADERS_WHO_CAN_APPLY_DESCRIPTION,
} from "@/data/future-leaders-scholarship";
import {
  PREMIUM_EASE,
  VIEWPORT_ONCE,
  itemFadeUp,
} from "@/components/common/motion-wrapper";

export function FutureLeadersEligibilitySection() {
  return (
    <section
      className="bg-muted/60 py-16 sm:py-20"
      aria-labelledby="who-can-apply-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Who Can Apply */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.65, ease: PREMIUM_EASE }}
            className="relative overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-soft sm:p-8"
          >
            <h2
              id="who-can-apply-heading"
              className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl"
            >
              Who Can Apply?
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
              {FUTURE_LEADERS_WHO_CAN_APPLY_DESCRIPTION}
            </p>

            <div className="mt-6 grid items-end gap-6 md:grid-cols-[1fr_minmax(140px,180px)]">
              <div>
                <motion.ul
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT_ONCE}
                  variants={{
                    hidden: {},
                    visible: {
                      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
                    },
                  }}
                  className="space-y-4"
                >
                  {FUTURE_LEADERS_WHO_CAN_APPLY.map((item) => (
                    <motion.li
                      key={item}
                      variants={itemFadeUp}
                      className="flex items-start gap-2.5"
                    >
                      <CheckCircle2
                        className="mt-0.5 size-5 shrink-0 text-emerald-500"
                        aria-hidden
                      />
                      <span className="text-sm font-medium text-foreground sm:text-[15px]">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>

                <p className="mt-6 text-xs italic text-muted-foreground">
                  *Terms &amp; Conditions Apply.
                </p>
              </div>

              {/* <div className="relative mx-auto w-[140px] shrink-0 md:mx-0 md:w-full">
                <div
                  className="pointer-events-none absolute bottom-2 left-1/2 h-3 w-[70%] -translate-x-1/2 rounded-[100%] bg-slate-900/15 blur-lg"
                  aria-hidden
                />
                <Image
                  src={FUTURE_LEADERS_ELIGIBILITY_IMAGE}
                  alt="Student eligible for ELEVEIIM Future Leaders Scholarship"
                  width={360}
                  height={480}
                  sizes="(max-width: 768px) 140px, 180px"
                  className="relative h-auto w-full object-contain drop-shadow-[0_16px_32px_rgba(15,23,42,0.12)]"
                />
              </div> */}
            </div>
          </motion.article>

          {/* Selection Process */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.65, ease: PREMIUM_EASE, delay: 0.1 }}
            className="rounded-2xl border border-border bg-white p-6 shadow-soft sm:p-8"
            aria-labelledby="selection-process-heading"
          >
            <h2
              id="selection-process-heading"
              className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl"
            >
              Selection Process
            </h2>

            <ol className="relative mt-8">
              {FUTURE_LEADERS_SELECTION_STEPS.map((step, index) => {
                const isLast =
                  index === FUTURE_LEADERS_SELECTION_STEPS.length - 1;
                return (
                  <li key={step.title} className="relative flex gap-4">
                    <div className="relative flex w-9 shrink-0 flex-col items-center">
                      <span className="z-[1] flex size-9 items-center justify-center rounded-full bg-brand text-sm font-bold text-white shadow-md shadow-brand/25">
                        {index + 1}
                      </span>
                      {!isLast && (
                        <span
                          className="absolute top-9 bottom-0 w-px border-l-2 border-dashed border-brand/30"
                          aria-hidden
                        />
                      )}
                    </div>
                    <div className={isLast ? "pb-0" : "pb-7"}>
                      <h3 className="text-base font-bold text-foreground">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                      {!isLast && (
                        <ChevronDown
                          className="mt-3 size-4 text-brand"
                          aria-hidden
                        />
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </motion.article>
        </div>
      </div>
    </section>
  );
}

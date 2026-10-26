"use client";

import { motion } from "framer-motion";
import { FreeAiFoundationPayCard } from "@/components/free-ai-foundation-course/pay-card";
import { AiToolLogo } from "@/components/free-ai-foundation-course/tool-logo";
import {
  FREE_AI_FOUNDATION_CLASS_MODES,
  FREE_AI_FOUNDATION_DESCRIPTION,
  FREE_AI_FOUNDATION_SCHEDULE,
  FREE_AI_FOUNDATION_TOOLS,
} from "@/data/free-ai-foundation-course";
import { PREMIUM_EASE, VIEWPORT_ONCE } from "@/components/common/motion-wrapper";

export function FreeAiFoundationHero() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-[#0c4da8] via-brand to-[#1565d8] pt-24 pb-24 sm:pt-28 sm:pb-28"
      aria-labelledby="free-ai-foundation-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.16),transparent_46%)]" />
        <div className="absolute inset-0 opacity-[0.15] [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <div className="relative z-[2] mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,420px)] lg:gap-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.65, ease: PREMIUM_EASE }}
          className="min-w-0"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/75">
            ELEVEIIM · Mohali
          </p>

          <h1
            id="free-ai-foundation-heading"
            className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]"
          >
            Free AI Foundation Course for
            <span className="mt-1 block text-brand-accent">1 Lakh Students</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            {FREE_AI_FOUNDATION_DESCRIPTION}
          </p>

          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
              Class
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {FREE_AI_FOUNDATION_CLASS_MODES.map(({ label, icon: Icon }) => (
                <li key={label}>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white px-3.5 py-1.5 text-sm font-semibold text-slate-900">
                    <Icon className="size-4 text-brand" aria-hidden />
                    {label}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3">
              <span className="animate-blink text-sm font-semibold text-brand-accent">
                {FREE_AI_FOUNDATION_SCHEDULE.ends}
              </span>
            </p>
          </div>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
              Tools covered
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {FREE_AI_FOUNDATION_TOOLS.map((tool) => (
                <li key={tool.name}>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white py-1 pr-3 pl-1 text-sm font-semibold text-slate-900">
                    <AiToolLogo name={tool.name} src={tool.src} compact />
                    {tool.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.65, ease: PREMIUM_EASE, delay: 0.08 }}
          className="mx-auto w-full max-w-md lg:mx-0 lg:max-w-none"
        >
          <FreeAiFoundationPayCard />
        </motion.aside>
      </div>
    </section>
  );
}

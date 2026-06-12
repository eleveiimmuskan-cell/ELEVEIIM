import { ROADMAP } from "@/data/industrial-training";
import { SectionHeading } from "./section-heading";

export function RoadmapTimeline() {
  return (
    <section className="py-16 sm:py-20" aria-labelledby="roadmap-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="roadmap-heading"
          title="6 Month Roadmap"
          description="A structured progression from foundations to placement readiness."
        />

        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ROADMAP.map((step, index) => (
            <li
              key={step.month}
              className="relative rounded-2xl border border-[#0B63CE]/10 bg-white p-5 shadow-[0_4px_20px_rgba(11,99,206,0.06)]"
            >
              <span className="inline-flex size-8 items-center justify-center rounded-full bg-[#0B63CE] text-sm font-bold text-white">
                {index + 1}
              </span>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-[#0B63CE]">
                {step.month}
              </p>
              <h3 className="mt-1 text-base font-bold text-[#1E293B]">{step.title}</h3>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

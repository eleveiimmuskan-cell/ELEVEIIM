import { PLACEMENT_STEPS } from "@/data/industrial-training";
import { SectionHeading } from "./section-heading";

export function PlacementProcess() {
  return (
    <section className="bg-[#0B63CE]/[0.03] py-16 sm:py-20" aria-labelledby="placement-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="placement-heading"
          title="Placement Process"
          description="A clear path from training to employment."
        />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PLACEMENT_STEPS.map((step, index) => (
            <li
              key={step}
              className="rounded-2xl border border-[#0B63CE]/10 bg-white p-4 text-center shadow-sm"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-[#0B63CE]">
                Step {index + 1}
              </span>
              <h3 className="mt-2 text-sm font-bold text-[#1E293B]">{step}</h3>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

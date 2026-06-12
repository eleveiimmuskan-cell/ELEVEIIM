import { Check, X } from "lucide-react";
import { COMPARISON_ROWS } from "@/data/industrial-training";
import { SectionHeading } from "./section-heading";

export function ComparisonTable() {
  return (
    <section className="py-16 sm:py-20" aria-labelledby="comparison-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="comparison-heading"
          title="Traditional Courses vs ELEVEIIM Industrial Training"
          description="See how our industry-oriented approach compares to conventional classroom courses."
          align="center"
        />

        <div className="overflow-x-auto rounded-2xl border border-[#0B63CE]/10 bg-white shadow-[0_4px_24px_rgba(11,99,206,0.08)]">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#0B63CE]/10 bg-[#0B63CE]/5">
                <th scope="col" className="px-5 py-4 font-bold text-[#1E293B]">
                  Feature
                </th>
                <th scope="col" className="px-5 py-4 font-bold text-muted-foreground">
                  Traditional Courses
                </th>
                <th scope="col" className="px-5 py-4 font-bold text-[#0B63CE]">
                  ELEVEIIM Industrial Training
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.feature} className="border-b border-[#0B63CE]/5 last:border-0">
                  <th scope="row" className="px-5 py-4 font-semibold text-[#1E293B]">
                    {row.feature}
                  </th>
                  <td className="px-5 py-4">
                    {row.traditional ? (
                      <Check className="size-5 text-muted-foreground" aria-label="Included" />
                    ) : (
                      <X className="size-5 text-red-400" aria-label="Not included" />
                    )}
                  </td>
                  <td className="px-5 py-4">
                    {row.eleveiim ? (
                      <Check className="size-5 text-[#059669]" aria-label="Included" />
                    ) : (
                      <X className="size-5 text-red-400" aria-label="Not included" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

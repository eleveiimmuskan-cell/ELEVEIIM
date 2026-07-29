import {
  SCHOLARSHIP_AWARD_SECTIONS,
  type ScholarshipAwardRow,
  type ScholarshipAwardSection,
} from "@/data/scholarship-terms";
import { cn } from "@/lib/utils";

function amountPercent(amount: string): number {
  const match = amount.match(/(\d+(?:\.\d+)?)\s*%/);
  return match ? Number(match[1]) : 0;
}

/** Highest scholarship % first within each category. */
function sortRowsDescending(rows: ScholarshipAwardRow[]): ScholarshipAwardRow[] {
  return [...rows].sort(
    (a, b) => amountPercent(b.amount) - amountPercent(a.amount)
  );
}

function CategoryRows({
  section,
  sectionIndex,
}: {
  section: ScholarshipAwardSection;
  sectionIndex: number;
}) {
  const rows = sortRowsDescending(section.rows);
  const isEvenScheme = sectionIndex % 2 === 0;

  return (
    <>
      {sectionIndex > 0 ? (
        <tr aria-hidden className="pointer-events-none">
          <td
            colSpan={3}
            className="h-2.5 border-x border-gray-300 bg-gradient-to-r from-[#2563EB] via-[#93C5FD] to-[#2563EB] p-0 dark:border-slate-600 dark:from-blue-600 dark:via-blue-400 dark:to-blue-600"
          />
        </tr>
      ) : null}

      {rows.map((row, rowIndex) => {
        const isSectionStart = rowIndex === 0;

        return (
          <tr
            key={`${section.category}-${row.eligibility}-${row.amount}`}
            className={cn(
              "transition-colors hover:bg-blue-50 dark:hover:bg-slate-800/80",
              rowIndex % 2 === 1
                ? "bg-slate-50/80 dark:bg-slate-900/40"
                : "bg-white dark:bg-slate-950"
            )}
          >
            {isSectionStart ? (
              <th
                scope="rowgroup"
                rowSpan={rows.length}
                className={cn(
                  "w-[34%] border border-gray-300 px-4 py-3 text-left align-middle text-sm font-bold leading-snug text-[#0F172A] dark:border-slate-600 dark:text-blue-100",
                  "border-l-[4px] border-l-[#2563EB] dark:border-l-blue-400",
                  isEvenScheme
                    ? "bg-[#DBEAFE] dark:bg-blue-950"
                    : "bg-[#BFDBFE] dark:bg-blue-900"
                )}
              >
                <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#2563EB] dark:text-blue-300">
                  Scheme {sectionIndex + 1}
                </span>
                {section.category}
              </th>
            ) : null}
            <td
              className={cn(
                "border border-gray-300 px-4 py-3 text-sm text-slate-700 dark:border-slate-600 dark:text-slate-200",
                isSectionStart && sectionIndex > 0 && "border-t-2 border-t-slate-400 dark:border-t-slate-500"
              )}
            >
              {row.eligibility}
            </td>
            <td
              className={cn(
                "border border-gray-300 px-4 py-3 text-sm font-medium text-[#0F172A] dark:border-slate-600 dark:text-white",
                isSectionStart && sectionIndex > 0 && "border-t-2 border-t-slate-400 dark:border-t-slate-500"
              )}
            >
              {row.amount}
            </td>
          </tr>
        );
      })}
    </>
  );
}

export function ScholarshipTable() {
  return (
    <section id="award-structure" className="scroll-mt-28">
      <div className="overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="border-b border-gray-300 bg-gradient-to-r from-[#EFF6FF] to-white px-5 py-4 dark:border-slate-700 dark:from-slate-900 dark:to-slate-900">
          <h2 className="text-xl font-bold tracking-tight text-[#0F172A] sm:text-2xl dark:text-white">
            Scholarship Award Structure
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Merit and merit-cum-need award bands as published by the institute.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[640px] w-full border-collapse text-left">
            <caption className="sr-only">
              Scholarship award structure by category, eligibility, and amount,
              ordered by scholarship amount descending
            </caption>
            <thead>
              <tr>
                <th
                  scope="col"
                  className="border border-gray-300 bg-[#0F172A] px-4 py-3 text-sm font-semibold text-white dark:border-slate-600 dark:bg-slate-800"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="border border-gray-300 bg-[#0F172A] px-4 py-3 text-sm font-semibold text-white dark:border-slate-600 dark:bg-slate-800"
                >
                  Eligibility
                </th>
                <th
                  scope="col"
                  className="border border-gray-300 bg-[#0F172A] px-4 py-3 text-sm font-semibold text-white dark:border-slate-600 dark:bg-slate-800"
                >
                  Scholarship Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {SCHOLARSHIP_AWARD_SECTIONS.map((section, index) => (
                <CategoryRows
                  key={section.category}
                  section={section}
                  sectionIndex={index}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

import { SCHOLARSHIP_TERMS_NAV } from "@/data/scholarship-terms";

export function TermsStickyNav() {
  return (
    <nav
      aria-label="On this page"
      className="sticky top-16 z-30 hidden border-b border-slate-200/80 bg-white/90 backdrop-blur-md lg:block dark:border-slate-800 dark:bg-slate-950/90"
    >
      <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2.5 sm:px-6 lg:px-8">
        {SCHOLARSHIP_TERMS_NAV.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-[#EFF6FF] hover:text-[#2563EB] dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-400"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

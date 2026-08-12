import { Breadcrumb } from "@/components/common/page-header";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-br from-white via-[#EFF6FF] to-white dark:border-slate-800 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(37,99,235,0.12),_transparent_55%)]"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Scholarship", href: "/scholarship" },
            { label: "Terms & Conditions" },
          ]}
        />
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#2563EB] dark:text-blue-400">
            Policy
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl lg:text-5xl dark:text-white">
            Scholarship Terms &amp; Conditions
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
            Empowering talented students through merit-based and merit-cum-need
            scholarships.
          </p>
        </div>
      </div>
    </section>
  );
}

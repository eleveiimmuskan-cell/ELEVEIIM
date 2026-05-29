import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BreadcrumbItem } from "@/types";

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="size-3.5 shrink-0" />}
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-brand"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-foreground">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  light?: boolean;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  className,
  light = false,
}: PageHeaderProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-sm font-semibold uppercase tracking-widest",
            light ? "text-white/80" : "text-brand"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h1
        className={cn(
          "text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl",
          light ? "text-white" : "text-foreground"
        )}
      >
        {title}
      </h1>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            light ? "text-white/80" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-brand pt-24 pb-16 sm:pt-28 sm:pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          light
        />
      </div>
    </section>
  );
}

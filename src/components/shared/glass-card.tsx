import Link from "next/link";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.ComponentProps<"div"> {
  hover?: boolean;
}

export function GlassCard({
  className,
  hover = true,
  children,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/60 bg-white/70 p-6 shadow-[0_8px_32px_rgba(24,119,242,0.08)] backdrop-blur-xl",
        hover &&
          "transition-all duration-300 hover:-translate-y-1 hover:border-brand/20 hover:shadow-[0_16px_48px_rgba(24,119,242,0.14)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface GlassButtonProps extends React.ComponentProps<"button"> {
  variant?: "primary" | "accent" | "light";
  href?: string;
}

function glassButtonClassName(
  variant: GlassButtonProps["variant"],
  className?: string
) {
  return cn(
    "relative z-10 inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold backdrop-blur-md transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]",
    variant === "primary" &&
      "border-white/30 bg-brand/90 text-white shadow-lg shadow-brand/25 hover:bg-brand",
    variant === "accent" &&
      "border-white/30 bg-brand-accent/90 text-white shadow-lg shadow-brand-accent/25 hover:bg-brand-accent",
    variant === "light" &&
      "border-white/50 bg-white/25 text-white hover:bg-white/35",
    className
  );
}

export function GlassButton({
  className,
  variant = "light",
  children,
  href,
  ...props
}: GlassButtonProps) {
  if (href) {
    return (
      <Link href={href} className={glassButtonClassName(variant, className)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={glassButtonClassName(variant, className)} {...props}>
      {children}
    </button>
  );
}

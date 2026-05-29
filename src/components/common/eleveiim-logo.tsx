import Image from "next/image";
import Link from "next/link";
import { LOGO } from "@/lib/brand";
import { cn } from "@/lib/utils";

type LogoSize = "xs" | "sm" | "md" | "lg";
type LogoVariant = "full" | "icon";

const fullSizeClasses: Record<LogoSize, string> = {
  xs: "h-6 w-auto max-w-[120px]",
  sm: "h-7 w-auto max-w-[140px]",
  md: "h-8 w-auto max-w-[160px] sm:max-w-[180px]",
  lg: "h-10 w-auto max-w-[200px] sm:max-w-[240px]",
};

const iconSizeClasses: Record<LogoSize, string> = {
  xs: "size-7",
  sm: "size-8",
  md: "size-9",
  lg: "size-11",
};

interface EleveiimLogoProps {
  size?: LogoSize;
  variant?: LogoVariant;
  className?: string;
  priority?: boolean;
  href?: string;
  /** Minimal white badge — keeps logo readable on any surface */
  badge?: boolean;
}

export function EleveiimLogo({
  size = "md",
  variant = "full",
  className,
  priority = false,
  href,
  badge = true,
}: EleveiimLogoProps) {
  const isIcon = variant === "icon";
  const sizeClass = isIcon ? iconSizeClasses[size] : fullSizeClasses[size];

  const image = (
    <Image
      src={isIcon ? LOGO.icon : LOGO.src}
      alt={LOGO.alt}
      width={isIcon ? LOGO.iconSize : LOGO.width}
      height={isIcon ? LOGO.iconSize : LOGO.height}
      priority={priority}
      unoptimized
      className={cn("object-contain object-left", sizeClass)}
    />
  );

  const content = (
    <span
      className={cn(
        "inline-flex items-center leading-none",
        badge &&
          "rounded-md bg-white px-1.5 py-1 shadow-sm ring-1 ring-black/5 dark:bg-white dark:ring-black/10",
        className
      )}
    >
      {image}
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex items-center self-center leading-none"
        aria-label="Eleveiim home"
      >
        {content}
      </Link>
    );
  }

  return content;
}

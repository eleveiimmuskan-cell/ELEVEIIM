import Image from "next/image";
import Link from "next/link";
import { BRAND_IMAGE } from "@/lib/brand";
import { cn } from "@/lib/utils";

type BrandSize = "sm" | "md" | "lg";
type BrandVariant = "elevated" | "plain";

const imageHeights: Record<BrandSize, string> = {
  sm: "h-6 w-auto max-w-[120px] sm:max-w-[140px]",
  md: "h-7 w-auto max-w-[140px] sm:max-w-[165px]",
  lg: "h-8 w-auto max-w-[170px] sm:max-w-[200px]",
};

const containerStyles: Record<BrandVariant, string> = {
  elevated: "rounded-md bg-white px-1.5 py-1",
  plain: "rounded-md bg-white px-1.5 py-1",
};

interface BrandImageProps {
  size?: BrandSize;
  variant?: BrandVariant;
  className?: string;
  priority?: boolean;
  href?: string;
}

export function BrandImage({
  size = "md",
  variant = "plain",
  className,
  priority = false,
  href,
}: BrandImageProps) {
  const content = (
    <span
      className={cn(
        "inline-flex shrink-0 items-center overflow-hidden",
        containerStyles[variant],
        className
      )}
    >
      <Image
        src={BRAND_IMAGE.src}
        alt={BRAND_IMAGE.alt}
        width={BRAND_IMAGE.width}
        height={BRAND_IMAGE.height}
        priority={priority}
        className={cn("block object-contain object-left", imageHeights[size])}
      />
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex items-center self-center"
        aria-label="Eleveiim home"
      >
        {content}
      </Link>
    );
  }
  if("http" in BRAND_IMAGE) {
    return (
      <a
        href={BRAND_IMAGE.src}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center self-center"
        aria-label="Eleveiim home"
      >
        {content}
      </a>
    );
  } 

  return content;
}

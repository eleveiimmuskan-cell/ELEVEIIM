import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { BRAND_IMAGE, BRAND_IMAGE_WHITE } from "@/lib/brand";

type BrandSize = "sm" | "md" | "lg" | "form";
/** `onDark` = white logo only (for brand/blue banners). Default uses the color logo. */
type BrandVariant = "elevated" | "plain" | "onDark";

/**
 * Size by width + height:auto so the 1024×192 artwork (wordmark + tagline)
 * keeps its aspect ratio. Do not use overflow-hidden or a shorter fixed height —
 * that clips the mark and the “Educate to Elevate” line.
 */
const imageWidths: Record<BrandSize, string> = {
  sm: "h-auto w-[120px] max-w-full sm:w-[140px]",
  md: "h-auto w-[140px] max-w-full sm:w-[165px]",
  lg: "h-auto w-[170px] max-w-full sm:w-[200px]",
  form: "h-auto w-[220px] max-w-full sm:w-[248px] md:w-[280px]",
};

const imageSizes: Record<BrandSize, string> = {
  sm: "(min-width: 640px) 140px, 120px",
  md: "(min-width: 640px) 165px, 140px",
  lg: "(min-width: 640px) 200px, 170px",
  form: "(min-width: 768px) 280px, (min-width: 640px) 248px, 220px",
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
  const isOnDark = variant === "onDark";
  const brand = isOnDark ? BRAND_IMAGE_WHITE : BRAND_IMAGE;

  const content = (
    <span
      className={cn(
        "inline-flex max-w-full shrink-0 items-center overflow-visible",
        className
      )}
    >
      <Image
        src={brand.src}
        alt={brand.alt}
        width={brand.width}
        height={brand.height}
        priority={priority}
        sizes={imageSizes[size]}
        className={cn("block max-w-full object-contain object-center", imageWidths[size])}
      />
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex max-w-full items-center justify-center overflow-visible"
        aria-label="Eleveiim home"
      >
        {content}
      </Link>
    );
  }

  return content;
}

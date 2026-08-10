import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { BRAND_IMAGE, BRAND_IMAGE_WHITE } from "@/lib/brand";

type BrandSize = "sm" | "md" | "lg";
/** `onDark` = white logo only (for brand/blue banners). Default uses the color logo. */
type BrandVariant = "elevated" | "plain" | "onDark";

const imageHeights: Record<BrandSize, string> = {
  sm: "h-6 w-auto max-w-[120px] sm:max-w-[140px]",
  md: "h-7 w-auto max-w-[140px] sm:max-w-[165px]",
  lg: "h-8 w-auto max-w-[170px] sm:max-w-[200px]",
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
        "inline-flex shrink-0 items-center overflow-hidden",
        // Image only — no white container plate
        className
      )}
    >
      <Image
        src={brand.src}
        alt={brand.alt}
        width={brand.width}
        height={brand.height}
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

  return content;
}

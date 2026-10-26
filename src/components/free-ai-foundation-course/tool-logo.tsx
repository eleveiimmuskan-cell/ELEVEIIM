import Image from "next/image";
import { cn } from "@/lib/utils";

export function AiToolLogo({
  name,
  src,
  compact = false,
  className,
}: {
  name: string;
  src: string;
  compact?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden bg-white",
        compact
          ? "size-8 rounded-lg"
          : "size-12 rounded-xl shadow-sm ring-1 ring-black/5"
      )}
    >
      <Image
        src={src}
        alt=""
        width={48}
        height={48}
        className={cn(
          "object-contain",
          compact ? "size-6" : "size-8",
          name === "ChatGPT" && (compact ? "size-8" : "size-12"),
          name === "Lovable" && (compact ? "size-7" : "size-10"),
          className
        )}
      />
    </span>
  );
}

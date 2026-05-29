import { BrandImage } from "@/components/common/brand-image";

export default function Loading() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-white">
      <BrandImage size="lg" priority />
      <div className="h-1 w-24 overflow-hidden rounded-full bg-muted">
        <div className="h-full w-1/2 animate-pulse rounded-full bg-brand" />
      </div>
    </div>
  );
}

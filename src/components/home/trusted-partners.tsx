"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SectionReveal } from "@/components/common/motion-wrapper";
import { SectionHeader } from "@/components/common/section-header";
import { isRemoteMediaUrl, resolveMediaUrl } from "@/lib/media-url";
import type { IndustryPartner } from "@/types/industry-partner";

function partnerInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

function PartnerLogoBadge({ partner }: { partner: IndustryPartner }) {
  const [failed, setFailed] = useState(false);
  const resolved = resolveMediaUrl(partner.logoUrl);
  const showImage = Boolean(resolved) && !failed;

  return (
    <span className="relative flex size-full items-center justify-center overflow-hidden rounded-xl bg-white text-lg font-bold text-brand">
      {showImage ? (
        <Image
          src={resolved}
          alt={partner.name}
          width={160}
          height={80}
          className="size-full object-contain p-2"
          unoptimized={isRemoteMediaUrl(partner.logoUrl ?? "")}
          onError={() => setFailed(true)}
        />
      ) : (
        partnerInitials(partner.name)
      )}
    </span>
  );
}

/** Original CSS marquee used 10s to travel half the visible width. */
const ORIGINAL_LOOP_SECONDS = 10;

/** Right-to-left partner logo marquee — shared by homepage and placements. */
export function IndustryPartnersMarquee({
  partners,
}: {
  partners: IndustryPartner[];
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [durationSeconds, setDurationSeconds] = useState(ORIGINAL_LOOP_SECONDS);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track || partners.length === 0) return;

    const syncDuration = () => {
      const visibleWidth = viewport.clientWidth;
      const trackWidth = track.scrollWidth;
      if (visibleWidth <= 0 || trackWidth <= 0) return;

      // Keep the same px/sec as the original 10s / half-viewport animation.
      setDurationSeconds(
        Math.max(
          ORIGINAL_LOOP_SECONDS,
          (trackWidth / visibleWidth) * ORIGINAL_LOOP_SECONDS
        )
      );
    };

    syncDuration();

    const observer = new ResizeObserver(syncDuration);
    observer.observe(viewport);
    observer.observe(track);
    return () => observer.disconnect();
  }, [partners.length]);

  if (partners.length === 0) return null;

  const marqueeItems = [...partners, ...partners];

  return (
    <div ref={viewportRef} className="relative overflow-hidden">
      <div
        ref={trackRef}
        className="flex w-max animate-marquee gap-6 whitespace-nowrap sm:gap-8"
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        {marqueeItems.map((partner, i) => {
          const tileClassName =
            "flex h-24 w-40 shrink-0 items-center justify-center rounded-2xl border border-border bg-white px-3 py-3 transition-colors hover:border-brand/30 sm:h-28 sm:w-48 sm:px-4 sm:py-4";
          const logo = <PartnerLogoBadge partner={partner} />;
          const website = partner.website?.trim();

          if (website) {
            const href = /^https?:\/\//i.test(website)
              ? website
              : `https://${website}`;

            return (
              <a
                key={`${partner.id}-${i}`}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${tileClassName} cursor-pointer`}
                title={partner.name}
                aria-label={`Visit ${partner.name}`}
              >
                {logo}
              </a>
            );
          }

          return (
            <div
              key={`${partner.id}-${i}`}
              className={tileClassName}
              title={partner.name}
            >
              {logo}
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface TrustedPartnersSectionProps {
  partners: IndustryPartner[];
}

export function TrustedPartnersSection({ partners }: TrustedPartnersSectionProps) {
  if (partners.length === 0) return null;

  return (
    <SectionReveal className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Trusted By"
          title="Trusted by Industry Leaders"
          description="Collaborating with leading companies to deliver career-ready training and placement opportunities."
        />

        <IndustryPartnersMarquee partners={partners} />
      </div>
    </SectionReveal>
  );
}

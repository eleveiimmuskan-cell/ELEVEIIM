"use client";

import { useState } from "react";
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
    <span className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-brand/10 text-sm font-bold text-brand">
      {showImage ? (
        <Image
          src={resolved}
          alt=""
          width={48}
          height={48}
          className="size-full object-contain p-1.5"
          unoptimized={isRemoteMediaUrl(partner.logoUrl ?? "")}
          onError={() => setFailed(true)}
        />
      ) : (
        partnerInitials(partner.name)
      )}
    </span>
  );
}

interface TrustedPartnersSectionProps {
  partners: IndustryPartner[];
}

export function TrustedPartnersSection({ partners }: TrustedPartnersSectionProps) {
  if (partners.length === 0) return null;

  const marqueeItems = [...partners, ...partners];

  return (
    <SectionReveal className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Trusted By"
          title="Trusted by Industry Leaders"
          description="Collaborating with leading companies to deliver career-ready training and placement opportunities."
        />

        <div className="relative overflow-hidden">
          <div className="flex animate-marquee gap-8 whitespace-nowrap">
            {marqueeItems.map((partner, i) => (
              <div
                key={`${partner.id}-${i}`}
                className="flex w-36 shrink-0 flex-col items-center gap-3 rounded-2xl border border-border bg-muted/30 px-5 py-5 transition-colors hover:border-brand/30 hover:bg-brand/5 sm:w-40"
              >
                <PartnerLogoBadge partner={partner} />
                <span className="w-full truncate text-center text-sm font-semibold text-foreground">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}

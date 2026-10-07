"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar/navbar";
import { WhatsAppButton } from "@/components/common/whatsapp-button";
import { FloatingCallButton } from "@/components/common/floating-call-button";
import { ScholarshipModalHost } from "@/components/common/scholarship-modal-provider";

const BARE_PATHS = ["/admission-application", "/college-register"];

export function isBarePublicPath(pathname: string | null) {
  if (!pathname) return false;
  return BARE_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
}

export function SiteChrome({
  children,
  footer,
}: {
  children: ReactNode;
  footer: ReactNode;
}) {
  const pathname = usePathname();

  if (isBarePublicPath(pathname)) {
    return <main>{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      {footer}
      <FloatingCallButton />
      <WhatsAppButton />
      <ScholarshipModalHost />
    </>
  );
}

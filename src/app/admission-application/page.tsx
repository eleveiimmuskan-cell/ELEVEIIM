import { Suspense } from "react";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/data/page-seo";
import { AdmissionApplicationShell } from "@/components/admission-application/admission-application-shell";
import { AdmissionLeadLoading } from "@/components/admission-application/admission-lead-states";

export const metadata: Metadata = createPageMetadata({
  title: PAGE_SEO.admissionApplication.title,
  description: PAGE_SEO.admissionApplication.description,
  path: "/admission-application",
  keywords: [
    "admission application",
    "ELEVEIIM admission form",
    "apply ELEVEIIM Mohali",
  ],
  absoluteTitle: true,
});

export default function AdmissionApplicationPage() {
  return (
    <div className="min-h-screen bg-[#e8e4dc] px-3 py-4 sm:px-6 sm:py-8 lg:px-8">
      <Suspense fallback={<AdmissionLeadLoading />}>
        <AdmissionApplicationShell />
      </Suspense>
    </div>
  );
}

import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/data/page-seo";
import { AdmissionApplicationForm } from "@/components/admission-application/admission-application-form";

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
      <AdmissionApplicationForm />
    </div>
  );
}

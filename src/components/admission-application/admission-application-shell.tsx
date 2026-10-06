"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AdmissionApplicationForm } from "@/components/admission-application/admission-application-form";
import {
  AdmissionAlreadyCreated,
  AdmissionLeadLoading,
  AdmissionLeadNotFound,
} from "@/components/admission-application/admission-lead-states";
import type { PublicLeadPreview } from "@/lib/admission-lead";
import { fetchAdmissionLead } from "@/services/admission-apply.service";

export function AdmissionApplicationShell() {
  const searchParams = useSearchParams();
  const leadId = (searchParams.get("leadId") ?? "").trim();
  const [preview, setPreview] = useState<PublicLeadPreview | null>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!leadId) {
      setPreview(null);
      setLoadError(false);
      return;
    }
    let cancelled = false;
    setPreview(null);
    setLoadError(false);
    void fetchAdmissionLead(leadId)
      .then((next) => {
        if (!cancelled) setPreview(next);
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      });
    return () => {
      cancelled = true;
    };
  }, [leadId]);

  if (!leadId) return <AdmissionApplicationForm leadId={null} />;
  if (!preview && !loadError) return <AdmissionLeadLoading />;
  if (loadError || preview?.status === "not_found") return <AdmissionLeadNotFound />;
  if (preview?.status === "already_created") {
    return <AdmissionAlreadyCreated admission={preview.admission} />;
  }
  return (
    <AdmissionApplicationForm
      leadId={preview?.leadId || leadId}
      prefill={preview?.status === "ready" ? preview.prefill : undefined}
    />
  );
}

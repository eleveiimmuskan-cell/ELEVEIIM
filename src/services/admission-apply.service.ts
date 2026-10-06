import { ApiError } from "@/lib/api/client";
import { getConfiguredApiBase } from "@/lib/configured-api";
import type { AdmissionSaveInput } from "@/lib/admission-profile";

export const ADMISSION_APPLY_SUCCESS_MESSAGE =
  "Thank you! Your admission application was received. Our team will contact you shortly.";

export function admissionApplicationSubmitUrl() {
  return `${getConfiguredApiBase()}/admission-application/submit`;
}

export async function fetchAdmissionLead(leadId: string) {
  const res = await fetch(
    `/api/admissions/lead?leadId=${encodeURIComponent(leadId)}`,
    { cache: "no-store" }
  );
  const payload = (await res.json()) as import("@/lib/admission-lead").PublicLeadPreview & {
    message?: string;
  };
  if (!res.ok && payload?.status !== "not_found") {
    throw new ApiError(payload?.message || "Lead not found.", res.status);
  }
  return payload;
}

export async function submitAdmissionApplication(
  input: AdmissionSaveInput & { hp?: string; formLoadedAt: number }
) {
  const res = await fetch(admissionApplicationSubmitUrl(), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
    cache: "no-store",
  });

  let payload: {
    success?: boolean;
    message?: string | string[];
    data?: { message?: string };
  } | null = null;
  try {
    payload = (await res.json()) as {
      success?: boolean;
      message?: string | string[];
      data?: { message?: string };
    };
  } catch {
    // non-JSON
  }

  const envelopeMessage = Array.isArray(payload?.message)
    ? payload.message[0]
    : payload?.message;

  if (res.status === 409 && input.leadId) {
    const preview = await fetchAdmissionLead(String(input.leadId));
    if (preview.status === "already_created") {
      return { alreadyCreated: true as const, admission: preview.admission };
    }
  }

  if (!res.ok || payload?.success === false) {
    throw new ApiError(
      envelopeMessage || `API Error: ${res.status} ${res.statusText}`,
      res.status
    );
  }

  return {
    message:
      payload?.data?.message || envelopeMessage || ADMISSION_APPLY_SUCCESS_MESSAGE,
  };
}

export { ApiError };

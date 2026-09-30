import { ApiError } from "@/lib/api/client";
import type { AdmissionSaveInput } from "@/lib/admission-profile";

export const ADMISSION_APPLY_SUCCESS_MESSAGE =
  "Thank you! Your admission application was received. Our team will contact you shortly.";

export async function submitAdmissionApplication(
  input: AdmissionSaveInput & { hp?: string; formLoadedAt: number }
) {
  const res = await fetch("/api/admissions/apply", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
    cache: "no-store",
  });

  let payload: { message?: string } | null = null;
  try {
    payload = (await res.json()) as { message?: string };
  } catch {
    // non-JSON
  }

  if (!res.ok) {
    throw new ApiError(
      payload?.message || `API Error: ${res.status} ${res.statusText}`,
      res.status
    );
  }

  return { message: payload?.message || ADMISSION_APPLY_SUCCESS_MESSAGE };
}

export { ApiError };

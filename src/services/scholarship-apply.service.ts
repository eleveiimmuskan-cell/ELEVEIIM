import { ApiError } from "@/lib/api/client";

export interface ScholarshipApplyInput {
  name: string;
  email: string;
  phone: string;
  courseId: string;
  message: string;
  /** Honeypot — must stay empty. */
  hp?: string;
  /** Epoch ms when the form UI mounted (anti-bot timing). */
  formLoadedAt: number;
}

export interface ScholarshipApplyResult {
  message: string;
}

/**
 * Submits via same-origin `/api/scholarships/apply` so the browser never
 * hits the Nest API directly (avoids CORS on eleveiim.com → api.eleveiim.com).
 */
export async function submitScholarshipApplication(
  input: ScholarshipApplyInput
): Promise<ScholarshipApplyResult> {
  const res = await fetch("/api/scholarships/apply", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: input.name.trim(),
      email: input.email.trim(),
      phone: input.phone.trim(),
      courseId: input.courseId.trim(),
      message: input.message.trim(),
      hp: input.hp?.trim() || "",
      formLoadedAt: input.formLoadedAt,
    }),
    cache: "no-store",
  });

  let payload: { message?: string } | null = null;
  try {
    payload = (await res.json()) as { message?: string };
  } catch {
    // non-JSON error body
  }

  if (!res.ok) {
    throw new ApiError(
      payload?.message || `API Error: ${res.status} ${res.statusText}`,
      res.status
    );
  }

  return {
    message:
      payload?.message ||
      "Thank you! Your scholarship application was received. Our team will contact you within 48 hours",
  };
}

export { ApiError };

import { apiFetch, ApiError } from "@/lib/api/client";

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

export async function submitScholarshipApplication(
  input: ScholarshipApplyInput
): Promise<ScholarshipApplyResult> {
  const { data } = await apiFetch<ScholarshipApplyResult>("/scholarships/apply", {
    method: "POST",
    body: {
      name: input.name.trim(),
      email: input.email.trim(),
      phone: input.phone.trim(),
      courseId: input.courseId.trim(),
      message: input.message.trim(),
      hp: input.hp?.trim() || "",
      formLoadedAt: input.formLoadedAt,
    },
    cache: "no-store",
  });

  return {
    message:
      data?.message ||
      "Thank you! Your scholarship application was received. Our team will contact you within 5–7 business days.",
  };
}

export { ApiError };

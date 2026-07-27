import { apiFetch, ApiError } from "@/lib/api/client";

export interface ContactSubmitInput {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  /** Honeypot — must stay empty. */
  hp?: string;
  /** Epoch ms when the form UI mounted (anti-bot timing). */
  formLoadedAt: number;
}

export interface ContactSubmitResult {
  message: string;
}

export async function submitContactForm(
  input: ContactSubmitInput
): Promise<ContactSubmitResult> {
  const { data } = await apiFetch<ContactSubmitResult>("/contact", {
    method: "POST",
    body: {
      name: input.name.trim(),
      phone: input.phone.trim(),
      email: input.email.trim(),
      subject: input.subject.trim(),
      message: input.message.trim(),
      hp: input.hp?.trim() || "",
      formLoadedAt: input.formLoadedAt,
    },
    cache: "no-store",
  });

  return {
    message: data?.message || "Thank you! We will get back to you shortly.",
  };
}

export { ApiError };

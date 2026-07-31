import { ApiError } from "@/lib/api/client";

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

/**
 * Submits via same-origin `/api/contact` so the browser never hits the
 * Nest API directly (avoids CORS on eleveiim.com → api.eleveiim.com).
 */
export async function submitContactForm(
  input: ContactSubmitInput
): Promise<ContactSubmitResult> {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: input.name.trim(),
      phone: input.phone.trim(),
      email: input.email.trim(),
      subject: input.subject.trim(),
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
    message: payload?.message || "Thank you! We will get back to you shortly.",
  };
}

export { ApiError };

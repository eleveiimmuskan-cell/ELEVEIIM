"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ApiError,
  submitContactForm,
} from "@/services/contact.service";
import { cn } from "@/lib/utils";

interface ContactQueryFormProps {
  className?: string;
  /** Prefills the subject field (e.g. scholarship inquiry). */
  defaultSubject?: string;
  /** Compact layout for dialogs / tight spaces. */
  compact?: boolean;
  submitLabel?: string;
  honeypotId?: string;
}

export function ContactQueryForm({
  className,
  defaultSubject = "",
  compact = false,
  submitLabel = "Send Message",
  honeypotId = "contact_hp",
}: ContactQueryFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(defaultSubject);
  const [message, setMessage] = useState("");
  const [formLoadedAt] = useState(() => Date.now());
  const [hp, setHp] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setSubmitting(true);

    try {
      const result = await submitContactForm({
        name,
        phone,
        email,
        subject,
        message,
        hp,
        formLoadedAt,
      });
      setSuccess(result.message);
      setName("");
      setPhone("");
      setEmail("");
      setSubject(defaultSubject);
      setMessage("");
      setHp("");
    } catch (err) {
      const messageText =
        err instanceof ApiError
          ? err.message
          : "Something went wrong. Please try again.";
      setError(messageText);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      className={cn("relative space-y-4", className)}
      onSubmit={onSubmit}
      noValidate
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
      >
        <label htmlFor={honeypotId}>Company</label>
        <input
          id={honeypotId}
          type="text"
          name={honeypotId}
          value={hp}
          onChange={(e) => setHp(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          data-lpignore="true"
          data-1p-ignore="true"
          data-bwignore="true"
          data-form-type="other"
        />
      </div>

      <div className={cn("grid gap-4", compact ? "sm:grid-cols-2" : "sm:grid-cols-2")}>
        <Input
          name="name"
          placeholder="Your name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={submitting}
        />
        <Input
          name="phone"
          type="tel"
          placeholder="Phone number"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={submitting}
        />
        <Input
          name="email"
          type="email"
          placeholder="Email address"
          required
          className="sm:col-span-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={submitting}
        />
        <Input
          name="subject"
          placeholder="Subject"
          required
          className="sm:col-span-2"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          disabled={submitting}
        />
      </div>
      <Textarea
        name="message"
        placeholder="Your message..."
        rows={compact ? 3 : 5}
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={submitting}
      />

      {success && (
        <p
          className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800"
          role="status"
        >
          {success}
        </p>
      )}
      {error && (
        <p
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          role="alert"
        >
          {error}
        </p>
      )}

      <Button
        type="submit"
        className="w-full bg-brand hover:bg-brand/90"
        disabled={submitting}
      >
        {submitting ? "Sending…" : submitLabel}
      </Button>
    </form>
  );
}

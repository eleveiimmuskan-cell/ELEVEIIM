"use client";

import { useEffect, useState } from "react";
import { ApiError } from "@/lib/api/client";
import { BrandImage } from "@/components/common/brand-image";
import { cn } from "@/lib/utils";
import {
  fetchCollegeStudentForm,
  submitCollegeStudentForm,
  type CollegeStudentFormCollege,
} from "@/services/college-student-form.service";

function digitsPhone(value: string) {
  return value.replace(/\D/g, "").slice(0, 10);
}

function fieldClass(invalid?: boolean) {
  return cn(
    "box-border h-12 w-full min-w-0 rounded-xl border bg-white px-3.5 text-base text-slate-900 outline-none transition-colors sm:h-11 sm:text-sm",
    "placeholder:text-slate-400",
    "hover:border-slate-300",
    "focus:border-brand focus:ring-4 focus:ring-brand/15",
    "disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500",
    invalid
      ? "border-red-400 bg-red-50/60 hover:border-red-400 focus:border-red-500 focus:ring-red-500/15"
      : "border-slate-200"
  );
}

export function CollegeStudentForm({ collegeId }: { collegeId: string }) {
  const [college, setCollege] = useState<CollegeStudentFormCollege | null>(null);
  const [loadError, setLoadError] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [courseId, setCourseId] = useState("");
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchCollegeStudentForm(collegeId)
      .then((row) => {
        if (!cancelled) setCollege(row);
      })
      .catch((err) => {
        if (!cancelled) {
          setLoadError(err instanceof ApiError ? err.message : "College form not found.");
        }
      });
    return () => {
      cancelled = true;
    };
  }, [collegeId]);

  if (loadError) {
    return (
      <Shell>
        <div className="px-5 py-8 text-center sm:px-8">
          <p className="text-sm font-medium text-red-700">{loadError}</p>
        </div>
      </Shell>
    );
  }

  if (!college) {
    return (
      <Shell>
        <div className="space-y-4 px-5 py-8 sm:px-8">
          <div className="mx-auto h-10 w-52 animate-pulse rounded-lg bg-slate-100" />
          <div className="h-6 w-2/3 animate-pulse rounded bg-slate-100" />
          <div className="h-11 animate-pulse rounded-xl bg-slate-100" />
          <div className="h-11 animate-pulse rounded-xl bg-slate-100" />
          <p className="text-center text-sm text-slate-500">Loading student registration form…</p>
        </div>
      </Shell>
    );
  }

  if (done) {
    return (
      <Shell>
        <BrandHeader />
        <div className="px-5 py-8 text-center sm:px-10 sm:py-10">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
            <svg viewBox="0 0 24 24" className="size-6" fill="none" aria-hidden>
              <path
                d="M5 12.5 9.5 17 19 7.5"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="mt-4 text-xl font-semibold tracking-tight text-slate-900">
            Registration received
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600 sm:text-[15px]">
            {updated
              ? `Your details were updated for ${college.name}. Our counsellor will contact you.`
              : `Thank you. Your registration for ${college.name} was submitted. Our counsellor will contact you.`}
          </p>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <BrandHeader />
      <form
        className="px-5 pb-6 pt-1 sm:px-8 sm:pb-8"
        onSubmit={async (event) => {
          event.preventDefault();
          setError("");
          const nextName = name.trim();
          const nextPhone = digitsPhone(phone);
          const nextNameError = nextName ? "" : "Enter your name.";
          const nextPhoneError =
            nextPhone.length === 10 ? "" : "Enter a 10-digit phone number.";
          setNameError(nextNameError);
          setPhoneError(nextPhoneError);
          if (nextNameError || nextPhoneError) {
            setError("Enter your name and a 10-digit phone number.");
            return;
          }
          const course = college.courses.find((row) => row.id === courseId);
          setBusy(true);
          try {
            const result = await submitCollegeStudentForm(college.id, {
              name: nextName,
              phone: nextPhone,
              email: email.trim() || undefined,
              courseId: courseId || undefined,
              interestedCourse: course?.title,
              remarks: remarks.trim() || undefined,
            });
            setUpdated(result.created === false);
            setDone(true);
          } catch (err) {
            setError(err instanceof ApiError ? err.message : "Could not submit the form.");
          } finally {
            setBusy(false);
          }
        }}
      >
        <div className="border-t border-slate-100 pt-5 sm:pt-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
            Student Registration Form
          </p>
          <h1 className="mt-1.5 break-words text-2xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-[1.75rem]">
            {college.name}
          </h1>
          <p className="mt-1.5 break-words text-sm text-slate-500">
            {college.collegeCode}
            {college.city ? ` · ${college.city}` : ""}
          </p>
        </div>

        <fieldset className="mt-6 min-w-0 border-0 p-0">
          <legend className="mb-3 text-sm font-semibold text-slate-900">Your details</legend>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            <Field label="Student name" required error={nameError}>
              <input
                required
                autoComplete="name"
                value={name}
                aria-invalid={Boolean(nameError) || undefined}
                placeholder="Full name"
                onChange={(event) => {
                  setName(event.target.value);
                  if (nameError) setNameError("");
                }}
                className={fieldClass(Boolean(nameError))}
              />
            </Field>
            <Field label="Phone" required error={phoneError}>
              <input
                required
                inputMode="numeric"
                autoComplete="tel"
                value={phone}
                aria-invalid={Boolean(phoneError) || undefined}
                placeholder="10-digit mobile number"
                onChange={(event) => {
                  setPhone(digitsPhone(event.target.value));
                  if (phoneError) setPhoneError("");
                }}
                className={fieldClass(Boolean(phoneError))}
              />
            </Field>
            <Field label="Email">
              <input
                type="email"
                autoComplete="email"
                value={email}
                placeholder="name@example.com"
                onChange={(event) => setEmail(event.target.value)}
                className={fieldClass()}
              />
            </Field>
            <Field label="Course">
              <select
                value={courseId}
                onChange={(event) => setCourseId(event.target.value)}
                className={cn(fieldClass(), "appearance-none bg-[length:1rem] bg-[right_0.85rem_center] bg-no-repeat pr-10")}
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' viewBox='0 0 24 24'%3E%3Cpath stroke='%2364748b' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
                }}
              >
                <option value="">Select a course</option>
                {college.courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Remarks" className="sm:col-span-2">
              <textarea
                rows={3}
                value={remarks}
                placeholder="Anything we should know (optional)"
                onChange={(event) => setRemarks(event.target.value)}
                className={cn(
                  fieldClass(),
                  "h-auto min-h-[6.5rem] resize-y py-3"
                )}
              />
            </Field>
          </div>
        </fieldset>

        {error ? (
          <p
            role="alert"
            className="mt-5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700"
          >
            {error}
          </p>
        ) : null}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="order-2 text-xs text-slate-500 sm:order-1">
            Required fields are marked with *
          </p>
          <button
            type="submit"
            disabled={busy}
            className="order-1 h-12 w-full rounded-xl bg-brand px-6 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-[#1566d4] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/25 disabled:cursor-not-allowed disabled:opacity-60 sm:order-2 sm:h-11 sm:w-auto"
          >
            {busy ? "Submitting…" : "Submit registration"}
          </button>
        </div>
      </form>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-visible rounded-3xl border border-slate-200/80 bg-white shadow-soft-lg">
      <div className="h-1.5 rounded-t-3xl bg-gradient-to-r from-brand via-[#1566d4] to-brand-accent" />
      {children}
    </div>
  );
}

function BrandHeader() {
  return (
    <div className="pt-6 sm:pt-8">
      <div className="flex justify-center overflow-visible px-5 pb-4 sm:px-8">
        <BrandImage href="/" size="form" priority />
      </div>
      <div className="pb-1">
        <CollegeSplash />
      </div>
    </div>
  );
}

function CollegeSplash() {
  return (
    <div className="px-5 sm:px-8">
      <div
        className="relative isolate overflow-hidden rounded-lg border border-slate-200/80 bg-gradient-to-br from-slate-50 via-white to-sky-50 px-3 py-2 text-center sm:px-3.5 sm:py-2.5"
        role="presentation"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -left-8 -top-12 size-36 rounded-full bg-brand/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 top-0 size-32 rounded-full bg-brand-accent/25 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[-2rem] left-1/2 size-40 -translate-x-1/2 rounded-full bg-sky-200/40 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent"
        />

        <div className="relative flex flex-col items-center gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <p className="text-[11px] font-semibold uppercase leading-snug tracking-[0.16em] text-slate-600 sm:text-left sm:text-[12px]">
            Tricity&apos;s{" "}
            <span className="inline-block tracking-normal normal-case">
              1
              <sup className="relative -top-1 text-[7px] font-semibold leading-none sm:text-[8px]">
                st
              </sup>
            </span>
            <span className="mt-0.5 block bg-gradient-to-r from-brand to-[#1566d4] bg-clip-text tracking-[0.14em] text-transparent">
              AI-Driven Institute
            </span>
          </p>
          <p className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-accent min-[400px]:text-[11px] sm:text-right sm:text-[12px] sm:tracking-[0.14em]">
            AI. Coding. Digital Skills.
          </p>
        </div>
      </div>
      <div className="mt-2 flex justify-center">
        <p className="inline-flex justify-center rounded-full bg-gradient-to-r from-brand via-[#1566d4] to-brand-accent px-3.5 py-1.5 text-[13px] font-bold tracking-tight text-white shadow-soft sm:text-sm">
          6-Month Industry Courses
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  error,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("grid min-w-0 gap-1.5 text-sm", className)}>
      <span className={cn("font-medium", error ? "text-red-700" : "text-slate-700")}>
        {label}
        {required ? <span className="text-red-600"> *</span> : null}
      </span>
      {children}
      {error ? (
        <span role="alert" className="text-xs font-medium text-red-600">
          {error}
        </span>
      ) : null}
    </label>
  );
}

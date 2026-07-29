"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CONTACT_PHONE } from "@/data/site";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GlassCard } from "@/components/common/glass-card";
import { SCHOLARSHIP_APPLY_SECTION_ID } from "@/data/scholarship";
import { SCHOLARSHIP_TERMS_PATH } from "@/data/scholarship-terms";
import {
  useScholarshipApplicationsOpen,
  useScholarshipSettings,
} from "@/hooks/use-scholarship-deadline";
import { cn } from "@/lib/utils";
import type { ApiCourse } from "@/types/api-course";
import {
  ApiError,
  submitScholarshipApplication,
} from "@/services/scholarship-apply.service";

interface CourseOption {
  id: string;
  title: string;
}

const selectClassName = cn(
  "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none",
  "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50",
  "md:text-sm dark:bg-input/30"
);

export function ScholarshipApplicationForm() {
  const applicationsOpen = useScholarshipApplicationsOpen();
  const settings = useScholarshipSettings();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [courseId, setCourseId] = useState("");
  const [message, setMessage] = useState("");
  const [formLoadedAt] = useState(() => Date.now());
  const [hp, setHp] = useState("");
  const [courses, setCourses] = useState<CourseOption[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [coursesError, setCoursesError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (window.location.hash !== `#${SCHOLARSHIP_APPLY_SECTION_ID}`) return;

    const timer = window.setTimeout(() => {
      document
        .getElementById(SCHOLARSHIP_APPLY_SECTION_ID)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setCoursesLoading(true);
      setCoursesError(null);
      try {
        const res = await fetch("/api/courses", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = (await res.json()) as ApiCourse[];
        if (cancelled) return;

        const options = (Array.isArray(data) ? data : [])
          .filter((c) => c?.id && c?.title)
          .map((c) => ({ id: c.id, title: c.title }))
          .sort((a, b) => a.title.localeCompare(b.title));
        setCourses(options);
      } catch {
        if (!cancelled) {
          setCourses([]);
          setCoursesError("Could not load courses. Please refresh and try again.");
        }
      } finally {
        if (!cancelled) setCoursesLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!applicationsOpen) return;

    setError(null);
    setSuccess(null);
    setSubmitting(true);

    try {
      if (name.trim().length < 2) {
        throw new Error("Please enter your full name.");
      }
      if (phone.trim().length < 7) {
        throw new Error("Please enter a valid phone number.");
      }
      if (message.trim().length < 5) {
        throw new Error("Please tell us a bit more about why you need a scholarship.");
      }
      if (!courseId) {
        throw new Error("Please select a preferred course.");
      }

      const result = await submitScholarshipApplication({
        name,
        email,
        phone,
        courseId,
        message,
        hp,
        formLoadedAt,
      });
      setSuccess(result.message);
      setName("");
      setEmail("");
      setPhone("");
      setCourseId("");
      setMessage("");
      setHp("");
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : err instanceof Error
            ? err.message
            : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const formDisabled = !applicationsOpen || submitting;

  return (
    <GlassCard
      id={SCHOLARSHIP_APPLY_SECTION_ID}
      hover={false}
      className="scroll-mt-28 bg-white"
    >
      <h3 className="text-xl font-bold text-foreground">Apply for Scholarship</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        {applicationsOpen
          ? "Fill out the form below. Our team will contact you within 48 hours."
          : settings.closedMessage}
      </p>
      <form className="relative mt-6 space-y-4" onSubmit={onSubmit} noValidate>
        <div
          aria-hidden
          className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
        >
          <label htmlFor="scholarship_hp">Company</label>
          <input
            id="scholarship_hp"
            type="text"
            name="scholarship_hp"
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

        <fieldset disabled={formDisabled} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                Full Name
              </label>
              <Input
                id="name"
                name="name"
                placeholder="Your name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">
                Phone
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder={CONTACT_PHONE.display}
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="course"
                className="mb-1.5 block text-sm font-medium"
              >
                Preferred Course
              </label>
              <select
                id="course"
                name="courseId"
                required
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className={selectClassName}
                disabled={formDisabled || coursesLoading || courses.length === 0}
              >
                <option value="" disabled>
                  {coursesLoading
                    ? "Loading courses…"
                    : courses.length === 0
                      ? "No courses available"
                      : "Select a course"}
                </option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
              {coursesError && (
                <p className="mt-1.5 text-xs text-red-600">{coursesError}</p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
              Why do you need a scholarship?
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell us about your background and goals..."
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

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
            disabled={
              !applicationsOpen ||
              submitting ||
              coursesLoading ||
              courses.length === 0
            }
            className="w-full bg-brand-accent hover:bg-brand-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {!applicationsOpen
              ? "Applications Closed"
              : submitting
                ? "Submitting…"
                : "Submit Application"}
          </Button>
        </fieldset>
      </form>

      <p className="mt-5 text-center text-sm">
        <Link
          href={SCHOLARSHIP_TERMS_PATH}
          className="font-medium text-[#2563EB] underline-offset-4 transition-colors hover:underline dark:text-blue-400"
        >
          Scholarship Terms and Conditions
        </Link>
      </p>
    </GlassCard>
  );
}

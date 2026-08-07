"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT_PHONE } from "@/data/site";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GlassCard } from "@/components/common/glass-card";
import { ScholarshipDeadlineBanner } from "@/components/scholarship/deadline-banner";
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

/** ~45-day programs are stored as 6 weeks in the courses API. */
const SCHOLARSHIP_ELIGIBLE_DURATION_WEEKS = 6;

const NOT_APPLICABLE_MESSAGE =
  "This course is not applicable for the scholarship.";

interface CourseOption {
  id: string;
  title: string;
  /** True when duration is the scholarship-eligible ~45-day band. */
  eligible: boolean;
}

function isScholarshipEligibleDuration(
  durationWeeks: number | null | undefined
): boolean {
  return durationWeeks === SCHOLARSHIP_ELIGIBLE_DURATION_WEEKS;
}

export function ScholarshipApplicationForm({
  showDeadlineBanner = false,
}: {
  showDeadlineBanner?: boolean;
} = {}) {
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
  const [courseNotice, setCourseNotice] = useState<string | null>(null);
  const [courseMenuOpen, setCourseMenuOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const coursePickerRef = useRef<HTMLDivElement>(null);

  const eligibleCourses = useMemo(
    () => courses.filter((course) => course.eligible),
    [courses]
  );

  const selectedCourse = useMemo(
    () => courses.find((course) => course.id === courseId) ?? null,
    [courses, courseId]
  );

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
          .map((c) => ({
            id: c.id,
            title: c.title,
            eligible: isScholarshipEligibleDuration(c.durationWeeks),
          }))
          .sort((a, b) => {
            if (a.eligible !== b.eligible) return a.eligible ? -1 : 1;
            return a.title.localeCompare(b.title);
          });
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

  useEffect(() => {
    if (!courseMenuOpen) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!target || !coursePickerRef.current?.contains(target)) {
        setCourseMenuOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCourseMenuOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [courseMenuOpen]);

  const selectEligibleCourse = (course: CourseOption) => {
    setCourseId(course.id);
    setCourseNotice(null);
    setCourseMenuOpen(false);
  };

  const onIneligibleCourseClick = () => {
    setCourseNotice(NOT_APPLICABLE_MESSAGE);
    setCourseMenuOpen(false);
  };

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
        throw new Error(
          "Please tell us a bit more about why you need a scholarship."
        );
      }
      if (!courseId) {
        throw new Error("Please select a preferred course.");
      }

      const chosen = courses.find((course) => course.id === courseId);
      if (!chosen?.eligible) {
        setCourseNotice(NOT_APPLICABLE_MESSAGE);
        setCourseId("");
        throw new Error(NOT_APPLICABLE_MESSAGE);
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
      setCourseNotice(null);
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
  const coursePickerDisabled =
    formDisabled || coursesLoading || courses.length === 0;

  const coursePlaceholder = coursesLoading
    ? "Loading courses…"
    : courses.length === 0
      ? "No courses available"
      : eligibleCourses.length === 0
        ? "No 45-day courses available"
        : "Select a course";

  return (
    <GlassCard
      id={SCHOLARSHIP_APPLY_SECTION_ID}
      hover={false}
      className="scroll-mt-28 bg-white"
    >
      {showDeadlineBanner ? <ScholarshipDeadlineBanner /> : null}
      <h3 className="text-xl font-bold text-foreground">Apply for Scholarship</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        {applicationsOpen
          ? "Fill out the form below. Our team will contact you within 24 hours."
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
            <div ref={coursePickerRef} className="relative">
              <label
                htmlFor="course-trigger"
                className="mb-1.5 block text-sm font-medium"
              >
                Preferred Course
              </label>
              <input type="hidden" name="courseId" value={courseId} required/>
              <button
                id="course-trigger"
                type="button"
                aria-haspopup="listbox"
                aria-expanded={courseMenuOpen}
                aria-controls="course-listbox"
                disabled={coursePickerDisabled}
                onClick={() => setCourseMenuOpen((open) => !open)}
                className={cn(
                  "flex h-8 w-full min-w-0 items-center justify-between gap-2 rounded-lg border border-input bg-transparent px-2.5 py-1 text-left text-base outline-none transition-colors",
                  "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                  "disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50",
                  "md:text-sm dark:bg-input/30"
                )}
              >
                <span
                  className={cn(
                    "truncate",
                    selectedCourse
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {selectedCourse?.title ?? coursePlaceholder}
                </span>
                <ChevronDown
                  className={cn(
                    "size-4 shrink-0 text-muted-foreground transition-transform",
                    courseMenuOpen && "rotate-180"
                  )}
                  aria-hidden
                />
              </button>

              {courseMenuOpen && !coursePickerDisabled ? (
                <ul
                  id="course-listbox"
                  role="listbox"
                  aria-labelledby="course-trigger"
                  className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-border bg-white py-1 shadow-lg dark:bg-slate-950"
                >
                  {courses.map((course) => {
                    const isSelected = course.id === courseId;
                    if (course.eligible) {
                      return (
                        <li
                          key={course.id}
                          role="option"
                          aria-selected={isSelected}
                        >
                          <button
                            type="button"
                            className={cn(
                              "w-full px-2.5 py-2 text-left text-sm transition-colors hover:bg-brand/10 hover:text-brand",
                              isSelected && "bg-brand/5 font-medium text-brand"
                            )}
                            onClick={() => selectEligibleCourse(course)}
                          >
                            {course.title}
                          </button>
                        </li>
                      );
                    }

                    return (
                      <li
                        key={course.id}
                        role="option"
                        aria-selected={false}
                        aria-disabled
                      >
                        <button
                          type="button"
                          className="w-full cursor-not-allowed px-2.5 py-2 text-left text-sm text-muted-foreground opacity-50"
                          onClick={onIneligibleCourseClick}
                        >
                          {course.title}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : null}

              {courseNotice ? (
                <p className="mt-1.5 text-xs text-red-600" role="alert">
                  {courseNotice}
                </p>
              ) : !coursesError && courses.length > 0 ? (
                <p className="mt-1.5 text-xs text-muted-foreground">
                  Only 45-day courses can be selected for the scholarship.
                </p>
              ) : null}
              {coursesError && (
                <p className="mt-1.5 text-xs text-red-600">{coursesError}</p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
              Why are you applying for this scholarship?
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
              eligibleCourses.length === 0
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
{/* 
      <p className="mt-5 text-center text-sm">
        <Link
          href={SCHOLARSHIP_TERMS_PATH}
          className="font-medium text-[#2563EB] underline-offset-4 transition-colors hover:underline dark:text-blue-400"
        >
          T & C
        </Link>
      </p> */}
    </GlassCard>
  );
}

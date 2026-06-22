"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GlassCard } from "@/components/common/glass-card";
import { SCHOLARSHIP_APPLY_SECTION_ID } from "@/data/scholarship";
import { useScholarshipApplicationsOpen, useScholarshipSettings } from "@/hooks/use-scholarship-deadline";

export function ScholarshipApplicationForm() {
  const applicationsOpen = useScholarshipApplicationsOpen();
  const settings = useScholarshipSettings();

  useEffect(() => {
    if (window.location.hash !== `#${SCHOLARSHIP_APPLY_SECTION_ID}`) return;

    const timer = window.setTimeout(() => {
      document
        .getElementById(SCHOLARSHIP_APPLY_SECTION_ID)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <GlassCard
      id={SCHOLARSHIP_APPLY_SECTION_ID}
      hover={false}
      className="scroll-mt-28 bg-white"
    >
      <h3 className="text-xl font-bold text-foreground">Apply for Scholarship</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        {applicationsOpen
          ? "Fill out the form below. Our team will contact you within 5–7 business days."
          : settings.closedMessage}
      </p>
      <form
        className="mt-6 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <fieldset disabled={!applicationsOpen} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                Full Name
              </label>
              <Input id="name" placeholder="Your name" required />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                Email
              </label>
              <Input id="email" type="email" placeholder="you@email.com" required />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">
                Phone
              </label>
              <Input id="phone" type="tel" placeholder="+91 98765 43210" required />
            </div>
            <div>
              <label htmlFor="course" className="mb-1.5 block text-sm font-medium">
                Preferred Course
              </label>
              <Input id="course" placeholder="e.g. Full Stack Development" required />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
              Why do you need a scholarship?
            </label>
            <Textarea
              id="message"
              placeholder="Tell us about your background and goals..."
              rows={4}
              required
            />
          </div>
          <Button
            type="submit"
            disabled={!applicationsOpen}
            className="w-full bg-brand-accent hover:bg-brand-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {applicationsOpen ? "Submit Application" : "Applications Closed"}
          </Button>
        </fieldset>
      </form>
    </GlassCard>
  );
}

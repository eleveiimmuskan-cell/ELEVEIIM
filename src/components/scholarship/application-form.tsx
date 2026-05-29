"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GlassCard } from "@/components/common/glass-card";

export function ScholarshipApplicationForm() {
  return (
    <GlassCard hover={false} className="bg-white">
      <h3 className="text-xl font-bold text-foreground">Apply for Scholarship</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Fill out the form below. Our team will contact you within 5–7 business days.
      </p>
      <form
        className="mt-6 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
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
        <Button type="submit" className="w-full bg-brand-accent hover:bg-brand-accent/90">
          Submit Application
        </Button>
      </form>
    </GlassCard>
  );
}

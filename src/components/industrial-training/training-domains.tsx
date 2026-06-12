"use client";

import { TRAINING_DOMAINS } from "@/data/industrial-training";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { itSectionClass } from "./constants";
import { SectionHeading } from "./section-heading";

export function TrainingDomains() {
  return (
    <section className="bg-[#0B63CE]/[0.03] py-16 sm:py-20" aria-labelledby="domains-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="domains-heading"
          title="Training Domains"
          description="Choose your career track and explore skills, opportunities and salary outlook."
        />

        <Tabs defaultValue={TRAINING_DOMAINS[0].id} className="gap-6">
          <TabsList className="h-auto w-full flex-wrap justify-start gap-2 bg-white/80 p-2">
            {TRAINING_DOMAINS.map((domain) => (
              <TabsTrigger
                key={domain.id}
                value={domain.id}
                className="rounded-lg px-4 py-5 data-active:bg-[#0B63CE] data-active:text-white"
              >
                {domain.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {TRAINING_DOMAINS.map((domain) => (
            <TabsContent key={domain.id} value={domain.id} className={itSectionClass}>
              <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-6">
                  {domain.sections.map((section) => (
                    <div key={section.title}>
                      <h3 className="text-lg font-bold text-[#1E293B]">{section.title}</h3>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {section.items.map((item) => (
                          <li
                            key={item}
                            className="rounded-full border border-[#0B63CE]/15 bg-[#0B63CE]/5 px-3 py-1 text-xs font-medium text-[#1E293B]"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#1E293B]">Career Opportunities</h3>
                  <ul className="mt-3 space-y-2">
                    {domain.careers.map((career) => (
                      <li key={career} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="size-1.5 rounded-full bg-[#059669]" aria-hidden />
                        {career}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 rounded-xl border border-[#059669]/20 bg-[#059669]/5 p-4">
                    <p className="text-sm font-semibold text-[#1E293B]">Average Salary Range</p>
                    <p className="mt-1 text-sm text-muted-foreground">{domain.salaryRange}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

"use client";

import { INDUSTRIAL_FAQS } from "@/data/industrial-training";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "./section-heading";

export function FaqSection() {
  return (
    <section className="py-16 sm:py-20" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="faq-heading"
          title="Frequently Asked Questions"
          description="Answers to common questions about our 6 months industrial training program."
          align="center"
        />
        <Accordion type="single" collapsible className="w-full">
          {INDUSTRIAL_FAQS.map((faq, index) => (
            <AccordionItem key={faq.question} value={`faq-${index}`}>
              <AccordionTrigger className="text-left text-[#1E293B] hover:text-[#0B63CE]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

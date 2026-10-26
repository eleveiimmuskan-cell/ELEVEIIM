"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeader } from "@/components/shared/section-header";
import { FREE_AI_FOUNDATION_FAQS } from "@/data/free-ai-foundation-course";

export function FreeAiFoundationFaqSection() {
  return (
    <section className="bg-white py-16 sm:py-20" aria-labelledby="free-ai-faq-heading">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Questions"
          title="Before you register"
          titleId="free-ai-faq-heading"
          description="Straight answers about the ₹299 fee, the tools, classes, and the certificate."
        />
        <Accordion type="single" collapsible className="w-full">
          {FREE_AI_FOUNDATION_FAQS.map((faq, index) => (
            <AccordionItem key={faq.question} value={`free-ai-faq-${index}`}>
              <AccordionTrigger className="py-4 text-left text-base font-semibold text-foreground hover:text-brand hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

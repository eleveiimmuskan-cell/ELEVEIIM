"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SCHOLARSHIP_TERMS_FAQS } from "@/data/scholarship-terms";

export function FAQSection() {
  return (
    <section id="faq" className="scroll-mt-28" aria-labelledby="terms-faq-heading">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
        <h2
          id="terms-faq-heading"
          className="text-xl font-bold tracking-tight text-[#0F172A] sm:text-2xl dark:text-white"
        >
          Frequently Asked Questions
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Quick answers about applying, transferring, and retaining your
          scholarship.
        </p>
        <Accordion type="single" collapsible className="mt-6 w-full">
          {SCHOLARSHIP_TERMS_FAQS.map((faq, index) => (
            <AccordionItem key={faq.question} value={`terms-faq-${index}`}>
              <AccordionTrigger className="text-left text-[#0F172A] hover:text-[#2563EB] dark:text-white dark:hover:text-blue-400">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 dark:text-slate-300">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

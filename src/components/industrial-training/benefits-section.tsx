import { CheckCircle2 } from "lucide-react";
import { STUDENT_BENEFITS } from "@/data/industrial-training";
import { itCardClass } from "./constants";
import { SectionHeading } from "./section-heading";
import { SectionReveal, StaggerContainer, StaggerItem } from "@/components/common/motion-wrapper";

export function BenefitsSection() {
  return (
    <SectionReveal
      className="bg-gradient-to-b from-white to-[#0B63CE]/[0.04] py-16 sm:py-20"
      aria-labelledby="benefits-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="benefits-heading"
          title="What Students Will Get"
          description="Everything you need to learn, build, certify and get hired."
        />
        <StaggerContainer
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.06}
        >
          {STUDENT_BENEFITS.map((benefit) => (
            <StaggerItem key={benefit}>
              <li className={`${itCardClass} flex items-start gap-3 list-none`}>
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#059669]" aria-hidden />
                <span className="text-sm font-semibold text-[#1E293B]">{benefit}</span>
              </li>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </SectionReveal>
  );
}

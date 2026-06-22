import { WHY_CHOOSE } from "@/data/industrial-training";
import { itCardClass } from "./constants";
import { SectionHeading } from "./section-heading";
import { SectionReveal, StaggerContainer, StaggerItem } from "@/components/common/motion-wrapper";

export function WhyChooseSection() {
  return (
    <SectionReveal className="py-16 sm:py-20" aria-labelledby="why-choose-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="why-choose-heading"
          title="Why Choose ELEVEIIM"
          description="A trusted industrial training institute focused on practical skills, career outcomes and long-term growth."
        />
        <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE.map((item) => (
            <StaggerItem key={item.title}>
              <article className={itCardClass}>
                <h3 className="text-base font-bold text-[#1E293B]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </SectionReveal>
  );
}

import { PORTFOLIO_PROJECTS } from "@/data/industrial-training";
import { itCardClass } from "./constants";
import { SectionHeading } from "./section-heading";
import { SectionReveal, StaggerContainer, StaggerItem } from "@/components/common/motion-wrapper";

export function PortfolioProjects() {
  return (
    <SectionReveal className="py-16 sm:py-20" aria-labelledby="portfolio-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="portfolio-heading"
          title="Student Portfolio Projects"
          description="Real projects built during training to demonstrate job-ready skills."
        />
        <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PORTFOLIO_PROJECTS.map((project) => (
            <StaggerItem key={project.title}>
              <article className={itCardClass}>
                <h3 className="text-base font-bold text-[#1E293B]">{project.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </SectionReveal>
  );
}

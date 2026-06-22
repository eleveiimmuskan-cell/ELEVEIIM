import Image from "next/image";
import { Star } from "lucide-react";
import { SUCCESS_STORIES } from "@/data/industrial-training";
import { itCardClass } from "./constants";
import { SectionHeading } from "./section-heading";
import { SectionReveal, StaggerContainer, StaggerItem } from "@/components/common/motion-wrapper";

export function Testimonials() {
  return (
    <SectionReveal className="py-16 sm:py-20" aria-labelledby="stories-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="stories-heading"
          title="Student Success Stories"
          description="Real outcomes from learners who completed industrial training at ELEVEIIM."
        />
        <StaggerContainer className="grid gap-6 md:grid-cols-3">
          {SUCCESS_STORIES.map((story) => (
            <StaggerItem key={story.name}>
              <article className={itCardClass}>
                <div className="mb-4 flex items-center gap-3">
                  <Image
                    src={story.image}
                    alt={`${story.name} — ELEVEIIM industrial training graduate`}
                    width={56}
                    height={56}
                    loading="lazy"
                    className="size-14 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-[#1E293B]">{story.name}</h3>
                    <p className="text-xs text-muted-foreground">{story.course}</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-[#0B63CE]">
                  {story.company} · {story.package}
                </p>
                <div className="mt-2 flex gap-0.5" aria-label="5 star rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-[#0B63CE] text-[#0B63CE]" aria-hidden />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{story.review}&rdquo;
                </p>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </SectionReveal>
  );
}

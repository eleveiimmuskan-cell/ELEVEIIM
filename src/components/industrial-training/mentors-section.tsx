import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { MENTORS } from "@/data/industrial-training";
import { itCardClass } from "./constants";
import { SectionHeading } from "./section-heading";

export function MentorsSection() {
  return (
    <section className="bg-gradient-to-b from-[#0B63CE]/[0.03] to-white py-16 sm:py-20" aria-labelledby="mentors-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="mentors-heading"
          title="Learn From Industry Experts"
          description="Experienced mentors who guide you through practical skills and career preparation."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {MENTORS.map((mentor) => (
            <article key={mentor.name} className={`${itCardClass} text-center`}>
              <Image
                src={mentor.image}
                alt={`${mentor.name} — ELEVEIIM industrial training mentor`}
                width={96}
                height={96}
                loading="lazy"
                className="mx-auto size-24 rounded-full object-cover"
              />
              <h3 className="mt-4 text-base font-bold text-[#1E293B]">{mentor.name}</h3>
              <p className="mt-1 text-sm text-[#0B63CE]">{mentor.experience}</p>
              <p className="mt-2 text-sm text-muted-foreground">{mentor.specialization}</p>
              <div className="mt-4 flex justify-center gap-3">
                {mentor.linkedin && (
                  <Link
                    href={mentor.linkedin}
                    className="rounded-full border border-[#0B63CE]/20 p-2 text-[#0B63CE] transition-colors hover:bg-[#0B63CE]/5"
                    aria-label={`${mentor.name} on LinkedIn`}
                  >
                    <ExternalLink className="size-4" aria-hidden />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

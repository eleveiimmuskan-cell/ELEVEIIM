import Image from "next/image";
import { CERTIFICATES } from "@/data/industrial-training";
import { SectionHeading } from "./section-heading";

export function CertificatesSection() {
  return (
    <section id="brochure" className="py-16 sm:py-20" aria-labelledby="certificates-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="certificates-heading"
          title="Certificates You Will Earn"
          description="Recognized credentials that validate your skills and internship exposure."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CERTIFICATES.map((cert) => (
            <article
              key={cert.title}
              className="overflow-hidden rounded-2xl border border-[#0B63CE]/10 bg-white shadow-[0_4px_20px_rgba(11,99,206,0.08)]"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={cert.image}
                  alt={`${cert.title} — ELEVEIIM industrial training program`}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover"
                />
              </div>
              <h3 className="p-4 text-sm font-bold text-[#1E293B]">{cert.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

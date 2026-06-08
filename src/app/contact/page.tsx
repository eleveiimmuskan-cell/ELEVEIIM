import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { createPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/common/json-ld";
import { PageHero, Breadcrumb } from "@/components/common/page-header";
import { PageTransition } from "@/animations/page-transition";
import { siteContact } from "@/data/site";
import { GlassCard } from "@/components/common/glass-card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Us",
  description:
    "Get in touch with ELEVEIIM for course inquiries, scholarship applications, and placement support.",
  path: "/contact",
  keywords: ["contact", "inquiry", "ELEVEIIM", "support"],
});

export default function ContactPage() {
  return (
    <PageTransition>
      <JsonLd
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Contact" },
        ])}
      />

      <PageHero
        eyebrow="Get in Touch"
        title="Contact ELEVEIIM"
        description="Have questions about courses, scholarships, or placements? We're here to help."
      />
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <GlassCard hover={false}>
                <div className="flex gap-4">
                  <MapPin className="size-5 shrink-0 text-brand" />
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="mt-1 text-sm text-muted-foreground">{siteContact.address}</p>
                  </div>
                </div>
              </GlassCard>
              <GlassCard hover={false}>
                <div className="flex gap-4">
                  <Phone className="size-5 shrink-0 text-brand" />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <a
                      href={`tel:${siteContact.phone.replace(/\s/g, "")}`}
                      className="mt-1 block text-sm text-muted-foreground hover:text-brand"
                    >
                      {siteContact.phone}
                    </a>
                  </div>
                </div>
              </GlassCard>
              <GlassCard hover={false}>
                <div className="flex gap-4">
                  <Mail className="size-5 shrink-0 text-brand" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <a
                      href={`mailto:${siteContact.email}`}
                      className="mt-1 block text-sm text-muted-foreground hover:text-brand"
                    >
                      {siteContact.email}
                    </a>
                  </div>
                </div>
              </GlassCard>
            </div>

            <GlassCard hover={false} className="bg-white">
              <h2 className="text-xl font-bold">Send a Message</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Fill out the form and our team will respond within 24 hours.
              </p>
              <form className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input placeholder="Your name" required />
                  <Input type="phone" placeholder="Phone number" required />
                  <Input type="email" placeholder="Email address" required />
                     <Input placeholder="Subject" required />
                </div>
            
                <Textarea placeholder="Your message..." rows={5} required />
                <Button type="submit" className="w-full bg-brand hover:bg-brand/90">
                  Send Message
                </Button>
              </form>
            </GlassCard>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

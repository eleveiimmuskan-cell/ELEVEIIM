"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { Breadcrumb } from "@/components/common/page-header";
import { GlassCard } from "@/components/common/glass-card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  CONTACT_HERO_IMAGE,
  CONTACT_HERO_IMAGE_ALT,
  siteContact,
} from "@/data/site";
import {
  AnimatedHeading,
  PageContentSection,
  PREMIUM_EASE,
  StaggerContainer,
  StaggerItem,
  VIEWPORT_ONCE,
} from "@/components/common/motion-wrapper";

const contactItems = [
  {
    icon: MapPin,
    label: "Address",
    content: siteContact.address,
    href: siteContact.mapsUrl,
    external: true,
  },
  {
    icon: Phone,
    label: "Phone",
    content: siteContact.phone,
    href: `tel:${siteContact.phone.replace(/\s/g, "")}`,
    external: false,
  },
  {
    icon: Mail,
    label: "Email",
    content: siteContact.email,
    href: `mailto:${siteContact.email}`,
    external: false,
  },
];

function ContactIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: 0.7, ease: PREMIUM_EASE }}
      className="relative w-full bg-white"
    >
      <div
        className="pointer-events-none absolute bottom-[4%] left-1/2 h-6 w-[68%] -translate-x-1/2 rounded-[100%] bg-slate-900/10 blur-2xl"
        aria-hidden
      />
      <Image
        src={CONTACT_HERO_IMAGE}
        alt={CONTACT_HERO_IMAGE_ALT}
        width={1024}
        height={1536}
        priority
        sizes="(max-width: 1024px) 90vw, 50vw"
        className="relative h-auto w-full object-contain"
      />
    </motion.div>
  );
}

function ContactInfoRow() {
  return (
    <StaggerContainer className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4" stagger={0.08}>
      {contactItems.map((item) => {
        const Icon = item.icon;

        return (
          <StaggerItem key={item.label} className="h-full">
            <GlassCard
              hover={false}
              className="h-full border-brand/10 bg-white p-4 transition-shadow hover:shadow-[0_8px_32px_rgba(11,99,206,0.08)] sm:p-5"
            >
              <a
                href={item.href}
                {...(item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="flex h-full flex-col items-center gap-3 text-center sm:items-start sm:text-left"
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                  <Icon className="size-5" aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground">{item.label}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {item.content}
                  </p>
                </div>
              </a>
            </GlassCard>
          </StaggerItem>
        );
      })}
    </StaggerContainer>
  );
}

export function ContactPageContent() {
  return (
    <PageContentSection className="relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute -right-24 top-20 size-72 rounded-full bg-brand/8 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-32 size-64 rounded-full bg-brand-accent/8 blur-3xl"
        aria-hidden
      />

      <div className="relative">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

        <StaggerContainer
          className="mt-2 grid items-stretch gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-14"
          stagger={0.1}
        >
          <StaggerItem className="flex items-center justify-center bg-white lg:justify-start">
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-none">
              <ContactIllustration />
            </div>
          </StaggerItem>

          <StaggerItem className="flex w-full flex-col gap-5 sm:gap-6">
            <GlassCard
              hover={false}
              className="border-brand/10 bg-white shadow-[0_8px_40px_rgba(11,99,206,0.08)]"
            >
              <AnimatedHeading>
                <h2 className="text-xl font-bold sm:text-2xl">Send a Message</h2>
              </AnimatedHeading>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Tell us about your goals — courses, scholarships, or placements. Our counselors
                will get back to you shortly.
              </p>
              <form className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input placeholder="Your name" required />
                  <Input type="tel" placeholder="Phone number" required />
                  <Input
                    type="email"
                    placeholder="Email address"
                    required
                    className="sm:col-span-2"
                  />
                  <Input placeholder="Subject" required className="sm:col-span-2" />
                </div>
                <Textarea placeholder="Your message..." rows={5} required />
                <Button type="submit" className="w-full bg-brand hover:bg-brand/90">
                  Send Message
                </Button>
              </form>
            </GlassCard>

            <ContactInfoRow />
          </StaggerItem>
        </StaggerContainer>
      </div>
    </PageContentSection>
  );
}

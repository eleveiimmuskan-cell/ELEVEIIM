import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { SITE_NAME, SOCIAL_LINKS } from "@/lib/constants";
import { phoneTelHref, siteContact } from "@/data/site";
import { BrandImage } from "@/components/common/brand-image";
import type { ApiFooter } from "@/types/api-footer";
import type { Course } from "@/types";

const FALLBACK_DESCRIPTION =
  "Premium training institute empowering learners with industry-ready skills, expert mentorship, and guaranteed career support.";

const FALLBACK_QUICK_LINKS = [
  { id: "ql-about", label: "About Us", url: "/about" },
  { id: "ql-courses", label: "Courses", url: "/courses" },
  { id: "ql-placements", label: "Placements", url: "/placements" },
  { id: "ql-blogs", label: "Blogs", url: "/blogs" },
  { id: "ql-contact", label: "Contact", url: "/contact" },
  { id: "ql-scholarship", label: "Scholarship", url: "/scholarship" },
];

const FALLBACK_SOCIAL = [
  { id: "fb", platform: "Facebook", url: SOCIAL_LINKS.facebook },
  { id: "ig", platform: "Instagram", url: SOCIAL_LINKS.instagram },
  { id: "li", platform: "LinkedIn", url: SOCIAL_LINKS.linkedin },
  { id: "yt", platform: "YouTube", url: SOCIAL_LINKS.youtube },
  { id: "tw", platform: "Twitter", url: SOCIAL_LINKS.twitter },
];

const SOCIAL_ICONS: Record<string, string> = {
  facebook: "/images/socials/facebook.png",
  instagram: "/images/socials/instagram.png",
  linkedin: "/images/socials/linkedin.png",
  youtube: "/images/socials/youtube.png",
  twitter: "/images/socials/twitter.png",
  x: "/images/socials/twitter.png",
};

function socialIconPath(platform: string): string | null {
  const key = platform.trim().toLowerCase().replace(/\s+/g, "");
  return SOCIAL_ICONS[key] ?? null;
}

function phoneHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : phoneTelHref;
}

function mapsHref(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

/** Build Programs links from featured courses — always `/courses/[slug]`. */
function programsFromFeaturedCourses(courses: Course[]) {
  return courses
    .filter((course) => course.slug?.trim() && course.title?.trim())
    .slice(0, 5)
    .map((course) => ({
      id: course.id || course.slug,
      label: course.title.trim(),
      url: `/courses/${course.slug.trim()}`,
    }));
}

interface FooterProps {
  data?: ApiFooter | null;
  /** Top featured courses for the Programs column (preferred over CMS programs). */
  featuredCourses?: Course[];
}

export function Footer({ data = null, featuredCourses = [] }: FooterProps) {
  const description = data?.description?.trim() || FALLBACK_DESCRIPTION;
  const quickLinks =
    data?.quickLinks?.filter((l) => l.label.trim() && l.url.trim()) ??
    FALLBACK_QUICK_LINKS;
  const programs = programsFromFeaturedCourses(featuredCourses);
  const socialLinks =
    data?.socialLinks?.filter((s) => s.platform.trim() && s.url.trim()) ??
    FALLBACK_SOCIAL;
  const email = data?.email?.trim() || siteContact.email;
  const phone = data?.phone?.trim() || siteContact.phone;
  const address = data?.address?.trim() || siteContact.address;
  const copyrightText =
    data?.copyrightText?.trim() ||
    `© ${new Date().getFullYear()} ${SITE_NAME} Educations Private Limited. All rights reserved.`;
  const addressMapsUrl = data?.address?.trim()
    ? mapsHref(address)
    : siteContact.mapsUrl;

  return (
    <footer className="border-t border-border bg-white" aria-label="Site footer">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <BrandImage href="/" size="md" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ id, platform, url }) => {
                const icon = socialIconPath(platform);
                return (
                  <a
                    key={id}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={platform}
                    className="flex size-9 items-center justify-center rounded-lg border border-border text-xs font-bold uppercase text-muted-foreground transition-colors hover:border-brand hover:bg-brand/5 hover:text-brand"
                  >
                    {icon ? (
                      <Image
                        src={icon}
                        alt={platform}
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                    ) : (
                      platform.slice(0, 1)
                    )}
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.url}
                    className="text-sm text-muted-foreground transition-colors hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Programs
            </h3>
            <ul className="space-y-2">
              {programs.length > 0 ? (
                programs.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.url}
                      className="text-sm text-muted-foreground transition-colors hover:text-brand"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))
              ) : (
                <li>
                  <Link
                    href="/courses"
                    className="text-sm text-muted-foreground transition-colors hover:text-brand"
                  >
                    Browse all courses
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand" />
                <a
                  href={addressMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whitespace-pre-line transition-colors hover:text-brand hover:underline hover:underline-offset-2"
                  aria-label="Open ELEVEIIM location in Google Maps"
                >
                  {address}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-brand" />
                <a href={phoneHref(phone)} className="hover:text-brand">
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0 text-brand" />
                <a href={`mailto:${email}`} className="hover:text-brand">
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">{copyrightText}</p>
        </div>
      </div>
    </footer>
  );
}

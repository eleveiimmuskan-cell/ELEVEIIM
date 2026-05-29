import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { getAllCourses } from "@/services/courses.service";
import { NAV_LINKS, SITE_NAME, SOCIAL_LINKS } from "@/lib/constants";
import { siteContact } from "@/data/site";
import { BrandImage } from "@/components/common/brand-image";

const SOCIAL_ITEMS = [
  { label: "Facebook", href: SOCIAL_LINKS.facebook, abbr: "f" },
  { label: "Instagram", href: SOCIAL_LINKS.instagram, abbr: "in" },
  { label: "LinkedIn", href: SOCIAL_LINKS.linkedin, abbr: "li" },
  { label: "YouTube", href: SOCIAL_LINKS.youtube, abbr: "yt" },
] as const;

export function Footer() {
  const courses = getAllCourses().slice(0, 5);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-white" aria-label="Site footer">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <BrandImage href="/" size="md" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Premium training institute empowering learners with industry-ready
              skills, expert mentorship, and guaranteed career support.
            </p>
            <div className="flex gap-3">
              {SOCIAL_ITEMS.map(({ label, href, abbr }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-lg border border-border text-xs font-bold uppercase text-muted-foreground transition-colors hover:border-brand hover:bg-brand/5 hover:text-brand"
                >
                  {abbr}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/scholarship"
                  className="text-sm text-muted-foreground transition-colors hover:text-brand"
                >
                  Scholarship
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Programs
            </h3>
            <ul className="space-y-2">
              {courses.map((course) => (
                <li key={course.slug}>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-brand"
                  >
                    {course.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand" />
                <span>{siteContact.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-brand" />
                <a href={`tel:${siteContact.phone.replace(/\s/g, "")}`} className="hover:text-brand">
                  {siteContact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0 text-brand" />
                <a href={`mailto:${siteContact.email}`} className="hover:text-brand">
                  {siteContact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

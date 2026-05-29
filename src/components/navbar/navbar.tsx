"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";
import { BrandImage } from "@/components/common/brand-image";
import { ScholarshipButton } from "@/components/common/scholarship-button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = pathname === "/";
  const onBrand = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const linkClass = (href: string) => {
    const isActive =
      href === "/" ? pathname === "/" : pathname.startsWith(href);

    return cn(
      "rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 ease-out",
      onBrand
        ? isActive
          ? "bg-white/15 text-white"
          : "text-white/90 hover:bg-white/10 hover:text-white"
        : isActive
          ? "bg-brand/10 text-brand"
          : "text-foreground/80 hover:bg-brand/5 hover:text-brand"
    );
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || !isHome
          ? "border-b border-border/50 bg-white/90 shadow-sm backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <nav
        className="mx-auto grid h-14 max-w-7xl grid-cols-[1fr_auto] items-center gap-x-4 px-4 sm:h-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-self-start">
          <BrandImage href="/" size="sm" variant="elevated" priority className="sm:hidden" />
          <BrandImage href="/" size="md" variant="elevated" priority className="hidden sm:inline-flex" />
        </div>

        <ul className="hidden items-center justify-center gap-0.5 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={linkClass(link.href)}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-self-end gap-2 sm:gap-3">
          <div className="hidden lg:block">
            <ScholarshipButton size="sm" />
          </div>
          <button
            type="button"
            className={cn(
              "inline-flex size-9 items-center justify-center rounded-lg transition-colors duration-300 lg:hidden",
              onBrand ? "text-white hover:bg-white/10" : "text-foreground hover:bg-muted"
            )}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-border/50 bg-white/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex items-center border-b border-border/50 px-4 py-3">
              <BrandImage href="/" size="sm" variant="plain" />
            </div>
            <ul className="flex flex-col gap-0.5 px-4 py-3">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "block rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-300",
                        isActive
                          ? "bg-brand/10 text-brand"
                          : "text-foreground hover:bg-brand/5 hover:text-brand"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li className="pt-2">
                <ScholarshipButton className="w-full justify-center" />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

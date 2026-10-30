"use client";

/**
 * Flat paper bar. Services open as a type list; smaller screens use a
 * full-screen menu. No icon cards.
 */

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { HomeLink } from "@/components/marketing/home-link";
import { pauseLenis, resumeLenis } from "@/components/marketing/smooth-scroll";
import { services, serviceUrl } from "@/content/services";
import { primaryCta } from "@/content/site";
import { cn } from "@/lib/utils";

const companyLinks = [
  { title: "Case studies", href: "/case-studies" },
  { title: "Partners", href: "/partners" },
  { title: "About", href: "/about" },
] as const;

export function Navigation2() {
  const pathname = usePathname();
  const [servicesPath, setServicesPath] = useState<string | null>(null);
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const servicesOpen = servicesPath === pathname;
  const menuOpen = menuPath === pathname;

  useEffect(() => {
    if (!menuOpen) return;
    pauseLenis();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuPath(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      resumeLenis();
    };
  }, [menuOpen]);

  const textLink = (href: string) =>
    cn(
      "text-brand-slate hover:text-brand-ink text-sm tracking-wide",
      pathname === href && "text-brand-ink",
    );

  return (
    <>
    <header className="border-brand-mist bg-canvas fixed inset-x-0 top-0 z-50 border-b">
      <nav aria-label="Primary" className="mx-auto flex h-[var(--header-height)] w-full max-w-[90rem] items-center justify-between px-5 sm:px-8">
        <HomeLink aria-label="JAIA Health — home" className="flex items-center">
          <Image
            src="/brand/jaia-logo-horizontal.png"
            alt=""
            width={128}
            height={36}
            priority
            className="h-8 w-auto"
          />
        </HomeLink>

        <div className="hidden items-center gap-8 lg:flex">
          <div
            className="relative"
            onMouseLeave={() => setServicesPath(null)}
          >
            <button
              type="button"
              aria-expanded={servicesOpen}
              onFocus={() => setServicesPath(pathname)}
              onClick={() => setServicesPath((current) => (current === pathname ? null : pathname))}
              className="text-brand-slate hover:text-brand-ink text-sm tracking-wide"
            >
              Services
            </button>
            {servicesOpen ? (
              <div className="border-brand-mist bg-canvas absolute top-full left-0 z-50 mt-3 w-72 border p-2">
                <ul>
                  {services.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={serviceUrl(service.slug)}
                        className="text-brand-ink hover:text-brand-action-deep block px-3 py-2.5 text-sm"
                      >
                        {service.shortName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
          {companyLinks.map((link) => (
            <Link key={link.href} href={link.href} className={textLink(link.href)}>
              {link.title}
            </Link>
          ))}
          <Link
            href={primaryCta.href}
            className="bg-brand-ink hover:bg-brand-action-deep rounded-full px-5 py-2 text-sm font-medium text-white"
          >
            {primaryCta.label}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuPath(pathname)}
          className="border-brand-mist text-brand-ink hover:border-brand-ink rounded-full border px-4 py-1.5 text-sm lg:hidden"
          aria-expanded={menuOpen}
          aria-label="Open menu"
        >
          Menu
        </button>
      </nav>
    </header>

      {menuOpen ? (
        <div className="bg-canvas fixed inset-0 z-[60] flex flex-col overflow-y-auto px-5 py-5 sm:px-8" data-lenis-prevent>
          <div className="flex items-center justify-between">
            <HomeLink aria-label="JAIA Health — home" className="flex items-center" onClick={() => setMenuPath(null)}>
              <Image
                src="/brand/jaia-logo-horizontal.png"
                alt=""
                width={128}
                height={36}
                className="h-8 w-auto"
              />
            </HomeLink>
            <button
              type="button"
              onClick={() => setMenuPath(null)}
              className="border-brand-mist text-brand-ink rounded-full border px-4 py-1.5 text-sm"
            >
              Close
            </button>
          </div>
          <div className="mt-16 grid gap-12 sm:grid-cols-2">
            <div>
              <p className="eyebrow-label">Services</p>
              <ul className="mt-6 flex flex-col gap-4">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={serviceUrl(service.slug)}
                      className="font-display text-brand-ink text-3xl leading-tight"
                    >
                      {service.shortName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow-label">Practice</p>
              <ul className="mt-6 flex flex-col gap-4">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="font-display text-brand-ink text-3xl leading-tight">
                      {link.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/contact" className="font-display text-brand-ink text-3xl leading-tight">
                    Contact
                  </Link>
                </li>
              </ul>
              <Link
                href={primaryCta.href}
                className="bg-brand-ink mt-10 inline-flex rounded-full px-6 py-3 text-sm font-medium text-white"
              >
                {primaryCta.label}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Navigation2;

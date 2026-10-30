"use client";

import Image from "next/image";
import Link from "next/link";

import { HomeLink } from "@/components/marketing/home-link";
import { services, serviceUrl } from "@/content/services";
import { siteConfig } from "@/content/site";

const companyLinks = [
  { href: "/case-studies", label: "Case studies" },
  { href: "/partners", label: "Partners" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;

export function Footer2() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-brand-mist bg-canvas border-t">
      <div className="mx-auto grid w-full max-w-[90rem] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <HomeLink aria-label="JAIA Health — home" className="inline-flex">
            <Image
              src="/brand/jaia-logo-stacked.svg"
              alt="JAIA Health"
              width={288}
              height={432}
              unoptimized
              className="h-auto w-16"
            />
          </HomeLink>
          <p className="font-display text-brand-ink mt-6 max-w-sm text-2xl leading-snug">
            {siteConfig.positioning}
          </p>
        </div>

        <nav aria-label="Services">
          <p className="eyebrow-label">Services</p>
          <ul className="mt-5 flex flex-col gap-2.5">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={serviceUrl(service.slug)}
                  className="text-brand-ink hover:text-brand-action-deep text-sm"
                >
                  {service.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <p className="eyebrow-label">Practice</p>
          <ul className="mt-5 flex flex-col gap-2.5">
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-brand-ink hover:text-brand-action-deep text-sm">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-brand-mist mx-auto w-full max-w-[90rem] border-t px-5 py-6 sm:px-8">
        <p className="text-brand-slate text-sm">
          © {year} {siteConfig.name}. All rights reserved.
        </p>
        <p className="text-brand-slate mt-2 max-w-3xl text-sm leading-relaxed">
          Information on this site is for general business purposes and is not medical, legal or billing advice.
        </p>
      </div>
    </footer>
  );
}

export default Footer2;

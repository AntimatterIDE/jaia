"use client";

/**
 * React Bits Pro `Footer2`, restyled for JAIA.
 * The stock photograph, studio name, and invented credits are not used.
 */

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

import { HomeLink } from "@/components/marketing/home-link";
import { services, serviceUrl } from "@/content/services";
import { siteConfig } from "@/content/site";

const rise = {
  hidden: { opacity: 1, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <path d="M17.5 6.5h.01" />
    </svg>
  );
}

const icons = { linkedin: LinkedinIcon, instagram: InstagramIcon } as const;

const companyLinks = [
  { href: "/case-studies", label: "Case studies" },
  { href: "/partners", label: "Partners" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
] as const;

function Curve({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 614 153"
      aria-hidden="true"
      className={`relative top-px h-auto w-[180px] sm:w-[250px] ${flip ? "-scale-x-100" : ""}`}
    >
      <path
        d="M0 0H451.601C467.78 0 483.071 7.75893 491.954 21.2815C558.518 122.612 538.359 153.074 614 153H0V0Z"
        className="fill-canvas"
      />
    </svg>
  );
}

export function Footer2() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-40 sm:h-52" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--brand-sky)_0%,var(--brand-action)_58%,var(--brand-action-deep)_100%)]" />
        <motion.div
          className="absolute top-6 left-1/4 size-40 rounded-full bg-white/25 blur-2xl"
          animate={{ x: [0, 24, 0], y: [0, 10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative">
        <div className="h-28 sm:h-36" />
        <div className="bg-canvas relative">
          <div className="absolute top-0 left-0 z-10 -translate-y-full">
            <Curve />
          </div>
          <div className="absolute top-0 right-0 z-10 -translate-y-full">
            <Curve flip />
          </div>

          <div className="mx-auto w-full max-w-[1400px] px-5 py-12 sm:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
              className="flex flex-col items-center gap-8 text-center"
            >
              <motion.div variants={rise}>
                <HomeLink aria-label="JAIA Health — home" className="inline-flex">
                  <Image
                    src="/brand/jaia-logo-stacked.svg"
                    alt="JAIA Health"
                    width={288}
                    height={432}
                    unoptimized
                    className="h-auto w-24"
                  />
                </HomeLink>
                <p className="text-brand-slate mx-auto mt-4 max-w-md text-base leading-relaxed">
                  {siteConfig.positioning}
                </p>
              </motion.div>

              <motion.nav aria-label="Services" variants={rise} className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                {services.map((service, index) => (
                  <span key={service.slug} className="inline-flex items-center gap-4">
                    {index > 0 ? <span className="text-brand-mist" aria-hidden="true">—</span> : null}
                    <Link href={serviceUrl(service.slug)} className="text-brand-ink hover:text-brand-action text-sm font-semibold tracking-wide uppercase">
                      {service.shortName}
                    </Link>
                  </span>
                ))}
              </motion.nav>

              <motion.nav aria-label="Company" variants={rise} className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                {companyLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="text-brand-slate hover:text-brand-ink text-sm font-medium">
                    {link.label}
                  </Link>
                ))}
              </motion.nav>

              <motion.ul variants={rise} className="flex items-center gap-5">
                {siteConfig.socials.map((social) => {
                  const Icon = icons[social.network as keyof typeof icons];
                  if (!Icon) return null;
                  const glyph = <Icon />;
                  return (
                    <li key={social.network}>
                      {social.href ? (
                        <a href={social.href} aria-label={social.label} className="text-brand-ink hover:text-brand-action">
                          {glyph}
                        </a>
                      ) : (
                        <span className="text-brand-ink" aria-label={social.label}>
                          {glyph}
                        </span>
                      )}
                    </li>
                  );
                })}
              </motion.ul>

              <motion.div variants={rise} className="border-brand-mist w-full border-t pt-8">
                <p className="text-brand-slate text-sm">
                  © {year} {siteConfig.name}. All rights reserved.
                </p>
                <p className="text-brand-slate mx-auto mt-3 max-w-3xl text-sm leading-relaxed">
                  Information on this site is for general business purposes and is not medical, legal or billing advice.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer2;

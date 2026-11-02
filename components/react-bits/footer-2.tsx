"use client";

/**
 * React Bits Pro `Footer2`, restyled for JAIA.
 * The stock photograph, studio name, and invented credits are not used.
 *
 * Deep blue only — no sky crown or cutouts that compete with the light CTA above.
 */

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { HomeLink } from "@/components/marketing/home-link";
import { services, serviceUrl } from "@/content/services";
import { siteConfig } from "@/content/site";

const rise = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
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

export function Footer2() {
  const year = new Date().getFullYear();
  const reduce = useReducedMotion();

  return (
    <footer className="relative w-full overflow-hidden bg-[var(--brand-action-deep)] text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,rgba(135,205,236,0.28),transparent_42%),linear-gradient(180deg,#1f5f7c_0%,var(--brand-action-deep)_40%,#143848_100%)]" />
        <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(rgba(255,255,255,0.55)_1px,transparent_1px)] [background-size:22px_22px]" />
        <motion.div
          className="absolute -top-24 left-[8%] size-[22rem] rounded-full bg-[radial-gradient(circle,rgba(135,205,236,0.4)_0%,transparent_70%)] blur-2xl"
          animate={reduce ? undefined : { x: [0, 36, 0], y: [0, 20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[35%] right-[-2%] size-[18rem] rounded-full bg-[radial-gradient(circle,rgba(234,245,251,0.22)_0%,transparent_68%)] blur-3xl"
          animate={reduce ? undefined : { x: [0, -28, 0], y: [0, 32, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1400px] px-5 py-14 sm:px-8 sm:py-16">
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
                className="h-auto w-24 brightness-0 invert"
              />
            </HomeLink>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/80">
              {siteConfig.positioning}
            </p>
          </motion.div>

          <motion.nav
            variants={rise}
            aria-label="Services"
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
          >
            {services.map((service, index) => (
              <span key={service.slug} className="inline-flex items-center gap-4">
                {index > 0 ? (
                  <span className="text-white/35" aria-hidden="true">
                    —
                  </span>
                ) : null}
                <Link
                  href={serviceUrl(service.slug)}
                  className="text-sm font-semibold tracking-wide text-white uppercase transition-colors duration-200 hover:text-[var(--brand-sky)]"
                >
                  {service.shortName}
                </Link>
              </span>
            ))}
          </motion.nav>

          <motion.nav
            variants={rise}
            aria-label="Company"
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-white/70"
          >
            {companyLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-white"
              >
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
                    <a
                      href={social.href}
                      aria-label={social.label}
                      className="text-white/85 transition-colors duration-200 hover:text-[var(--brand-sky)]"
                    >
                      {glyph}
                    </a>
                  ) : (
                    <span className="text-white/85" aria-label={social.label}>
                      {glyph}
                    </span>
                  )}
                </li>
              );
            })}
          </motion.ul>

          <motion.div
            variants={rise}
            className="w-full max-w-2xl border-t border-white/15 pt-6 text-center"
          >
            <p className="text-sm text-white/65">
              © {year} {siteConfig.name}. All rights reserved.
            </p>
            <p className="mx-auto mt-2 max-w-xl text-[0.6875rem] leading-relaxed text-white/45">
              Information on this site is for general business purposes and is not medical, legal or
              billing advice.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer2;

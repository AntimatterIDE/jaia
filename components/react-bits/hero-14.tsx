"use client";

/**
 * React Bits Pro `Hero14`, restyled for JAIA.
 * The demo rating, email capture, and stock photo are not used.
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

import { capabilityPillars, hero } from "@/content/site";

const rise = {
  initial: { opacity: 1, y: 16 },
  animate: { opacity: 1, y: 0 },
} as const;

export function Hero14() {
  const [isLinkHovered, setIsLinkHovered] = useState(false);

  return (
    <section className="bg-canvas relative flex min-h-[100svh] w-full items-start overflow-hidden px-4 pt-[calc(var(--header-height)+2.75rem)] pb-16 sm:px-6 lg:items-center lg:px-8 lg:pb-20">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-[radial-gradient(ellipse_at_50%_100%,rgba(135,205,236,0.28),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[50%] bg-[radial-gradient(ellipse_at_30%_100%,rgba(39,111,145,0.08),transparent_60%)]" />

      <div className="relative z-10 mx-auto w-full max-w-[1400px]">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="flex flex-col">
            <motion.p
              {...rise}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="font-display text-brand-action text-[0.8125rem] font-semibold tracking-[0.14em] uppercase"
            >
              {hero.eyebrow}
            </motion.p>

            <motion.h1
              {...rise}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-brand-ink mt-4 text-4xl leading-[1.05] font-medium tracking-[-0.02em] text-balance sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem]"
            >
              {hero.heading}
            </motion.h1>

            <motion.p
              {...rise}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-brand-slate mt-5 max-w-[34rem] text-base leading-relaxed sm:mt-6 sm:text-[1.0625rem]"
            >
              {hero.body}
            </motion.p>

            <motion.div
              {...rise}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-9 sm:mt-10"
            >
              <Link
                href={hero.primaryCta.href}
                className="bg-brand-ink hover:bg-brand-action-deep inline-flex min-h-14 items-center justify-center rounded-2xl px-7 text-base font-semibold text-white transition-colors duration-200"
              >
                {hero.primaryCta.label}
              </Link>
            </motion.div>

            <motion.div
              {...rise}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-8 sm:mt-9"
            >
              <Link
                href={hero.secondaryCta.href}
                onMouseEnter={() => setIsLinkHovered(true)}
                onMouseLeave={() => setIsLinkHovered(false)}
                className="text-brand-ink inline-flex min-h-11 items-center gap-2 text-sm font-medium sm:text-base"
              >
                {hero.secondaryCta.label}
                <motion.span
                  animate={{ x: isLinkHovered ? 4 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="size-4" />
                </motion.span>
              </Link>
            </motion.div>

            <motion.ul
              {...rise}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex flex-wrap gap-x-6 gap-y-3"
            >
              {capabilityPillars.map((pillar) => (
                <li
                  key={pillar.label}
                  className="text-brand-ink font-display text-sm font-semibold tracking-[0.04em]"
                >
                  {pillar.label}
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative w-full"
          >
            <div className="border-brand-mist aspect-4/3 w-full overflow-hidden rounded-2xl border shadow-[0_24px_60px_-28px_rgba(50,47,47,0.45)]">
              <img
                src="/images/about-team-collaboration.jpg"
                alt="A physician, a practice administrator, and a clinical staff member reviewing performance charts together on a monitor"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero14;

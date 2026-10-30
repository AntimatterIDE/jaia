"use client";

/**
 * React Bits Pro `Hero14`, restyled for JAIA.
 * The demo rating, email capture, and stock photo are not used.
 */

import { motion } from "motion/react";

import { Bento1 } from "@/components/blocks/bento-1";
import { CtaButton, CtaLink } from "@/components/marketing/cta";
import { FloatPanel } from "@/components/marketing/float-panel";
import { getService } from "@/content/services";
import { capabilityPillars, hero, partnership, siteConfig } from "@/content/site";

const rise = {
  initial: { opacity: 1, y: 16 },
  animate: { opacity: 1, y: 0 },
} as const;

export function Hero14() {
  return (
    <section className="bg-canvas relative flex min-h-[100svh] w-full items-start overflow-hidden px-5 pt-[calc(var(--header-height)+2.75rem)] pb-16 sm:px-8 lg:items-center lg:pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-[radial-gradient(ellipse_at_50%_100%,rgba(135,205,236,0.28),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[50%] bg-[radial-gradient(ellipse_at_30%_100%,rgba(39,111,145,0.08),transparent_60%)]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[90rem]">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="flex flex-col">
            <motion.p
              {...rise}
              transition={{ duration: 0.5, delay: 0.02 }}
              className="font-display text-brand-ink text-sm font-semibold tracking-[0.04em]"
            >
              {siteConfig.name}
            </motion.p>

            <motion.p
              {...rise}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="font-display text-brand-action mt-3 text-[0.8125rem] font-semibold tracking-[0.14em] uppercase"
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
              className="mt-9 flex flex-col items-start gap-4 sm:mt-10 min-[26rem]:flex-row min-[26rem]:items-center"
            >
              <CtaButton href={hero.primaryCta.href}>
                {hero.primaryCta.label}
              </CtaButton>
              <CtaLink href={hero.secondaryCta.href}>
                {hero.secondaryCta.label}
              </CtaLink>
            </motion.div>

            <motion.ul
              {...rise}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="border-brand-mist mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t pt-8 sm:mt-12"
              aria-label="Capability areas"
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

          <FloatPanel className="relative w-full">
            <Bento1
              hub="JAIA"
              title="One partnership"
              body={partnership.statement}
              sources={capabilityPillars.map((pillar) => ({
                label: pillar.label,
                icon: pillar.icon,
                detail: pillar.slugs
                  .map((slug) => getService(slug)?.shortName)
                  .filter((name): name is string => Boolean(name))
                  .join(" · "),
              }))}
            />
          </FloatPanel>
        </div>
      </div>
    </section>
  );
}

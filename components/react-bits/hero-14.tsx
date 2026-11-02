"use client";

/**
 * React Bits Pro `Hero14`, restyled for JAIA.
 * Brand-led home hero with a real practice photograph — no diagram chrome.
 */

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { CtaButton, CtaLink } from "@/components/marketing/cta";
import { SkyAtmosphere } from "@/components/marketing/sky-atmosphere";
import { JaiaSymbol } from "@/components/jaia-symbol";
import { hero, siteConfig } from "@/content/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero14() {
  const reduce = useReducedMotion();

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay, ease },
        };

  return (
    <section className="section-flow-out bg-canvas relative flex min-h-[100svh] w-full items-start overflow-hidden px-5 pt-[calc(var(--header-height)+2.5rem)] pb-28 sm:px-8 sm:pt-[calc(var(--header-height)+3.25rem)] lg:items-center lg:pb-32">
      <SkyAtmosphere tone="hero" />
      <JaiaSymbol
        aria-hidden="true"
        className="text-brand-sky pointer-events-none absolute -top-8 -left-16 size-[28rem] opacity-[0.07] sm:size-[34rem] lg:-left-10 lg:opacity-[0.09]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[90rem]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14 xl:gap-16">
          <div className="flex flex-col">
            <motion.div {...rise(0.02)} className="flex items-center gap-3.5">
              <span className="bg-brand-action shadow-soft flex size-12 shrink-0 items-center justify-center rounded-2xl text-[var(--brand-sky)] sm:size-14">
                <JaiaSymbol className="size-7 sm:size-8" />
              </span>
              <p className="font-display text-brand-ink text-[1.5rem] font-semibold tracking-[0.02em] sm:text-[1.75rem]">
                {siteConfig.name}
              </p>
            </motion.div>

            <motion.p
              {...rise(0.08)}
              className="font-display text-brand-action mt-6 max-w-md text-[0.8125rem] font-semibold tracking-[0.16em] uppercase"
            >
              {hero.eyebrow}
            </motion.p>

            <motion.h1
              {...rise(0.14)}
              className="font-display text-brand-ink mt-4 text-[clamp(2.75rem,1.6rem+3.8vw,5.25rem)] leading-[1.02] font-semibold tracking-[-0.03em] text-balance"
            >
              {hero.heading}
            </motion.h1>

            <motion.p
              {...rise(0.18)}
              className="text-brand-slate mt-5 max-w-[34rem] text-base leading-relaxed sm:mt-6 sm:text-lg"
            >
              {hero.body}
            </motion.p>

            <motion.div
              {...rise(0.24)}
              className="mt-9 flex flex-col items-start gap-4 sm:mt-10 min-[26rem]:flex-row min-[26rem]:items-center"
            >
              <CtaButton href={hero.primaryCta.href}>{hero.primaryCta.label}</CtaButton>
              <CtaLink href={hero.secondaryCta.href}>{hero.secondaryCta.label}</CtaLink>
            </motion.div>
          </div>

          <motion.figure
            {...rise(0.18)}
            className="relative w-full"
          >
            <div className="photo-card-fade bg-brand-sky-soft relative aspect-[4/5] overflow-hidden rounded-[2rem] sm:aspect-[5/6] lg:aspect-[4/5] xl:min-h-[36rem]">
              <Image
                src="/images/hero-practice-clinician.jpg"
                alt="A clinician working with a patient inside an independent practice"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="img-tone object-cover object-[center_30%]"
              />
            </div>
            <figcaption className="text-brand-slate mt-4 max-w-md text-sm leading-relaxed">
              Built from inside independent practice.{" "}
              <Link
                href="/case-studies"
                className="text-brand-action font-semibold underline-offset-4 transition-colors hover:text-brand-action-deep hover:underline"
              >
                See how practices work with JAIA
              </Link>
              .
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}

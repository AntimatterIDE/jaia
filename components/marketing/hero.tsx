"use client";

import dynamic from "next/dynamic";
import { motion, type Variants } from "motion/react";

import StaggeredText from "@/components/react-bits/staggered-text";
import { CapabilityPillarsInline } from "@/components/marketing/capability-pillars";
import { CtaButton, CtaLink } from "@/components/marketing/cta";
import { hero } from "@/content/site";

/**
 * The animated backdrop is the only heavy part of the hero, so it is split out
 * of the initial bundle. It is absolutely positioned and decorative, so there
 * is nothing to reserve space for and no fallback to render.
 */
const HeroBackdrop = dynamic(
  () => import("@/components/marketing/hero-backdrop"),
  { ssr: false },
);

/**
 * Hero — a left-aligned reading stack that fills the first viewport
 * (`min-h-[100svh]`). The copy column is vertically centered in the
 * leftover space under the overlay header so it lands in the
 * middle-upper band; capability pillars pin to the fold. Padding-top
 * is `--header-height` plus editorial air (matching interior pages),
 * not a tight `pt-20` that still sits under the nav.
 */
export function Hero() {
  const container: Variants = {
    hidden: {},
    visible: {},
  };

  const item: Variants = {
    hidden: { opacity: 1, y: 0 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      <HeroBackdrop />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[90rem] flex-1 flex-col px-5 sm:px-8"
      >
        <div className="flex flex-1 flex-col justify-center pt-[calc(var(--header-height)+2.5rem)] pb-10 sm:pt-[calc(var(--header-height)+4rem)] sm:pb-14 lg:pt-[calc(var(--header-height)+5rem)]">
          <div className="flex flex-col items-start gap-6 sm:gap-8">
            <div className="flex flex-col gap-4 sm:gap-5">
              <motion.p
                variants={item}
                className="text-eyebrow font-display text-brand-action font-semibold tracking-[0.18em] uppercase"
              >
                {hero.eyebrow}
              </motion.p>

              <StaggeredText
                as="h1"
                id="hero-heading"
                text={hero.heading}
                className="font-display text-display-xl text-brand-ink max-w-[15ch] font-semibold tracking-[-0.02em]"
              />
            </div>

            <motion.p
              variants={item}
              className="measure text-lead text-brand-ink"
            >
              {hero.body}
            </motion.p>

            <motion.div
              variants={item}
              className="flex flex-col items-start gap-3 min-[26rem]:flex-row min-[26rem]:items-center min-[26rem]:gap-x-6"
            >
              <CtaButton href={hero.primaryCta.href}>
                {hero.primaryCta.label}
              </CtaButton>
              <CtaLink href={hero.secondaryCta.href}>
                {hero.secondaryCta.label}
              </CtaLink>
            </motion.div>
          </div>
        </div>

        <motion.div
          variants={item}
          className="relative mt-auto shrink-0 py-5 sm:py-6 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-canvas before:via-brand-mist before:to-canvas"
        >
          <CapabilityPillarsInline className="gap-x-6 sm:gap-x-10" />
        </motion.div>
      </motion.div>
    </section>
  );
}

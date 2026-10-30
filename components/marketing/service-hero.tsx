"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion, type Variants } from "motion/react";

import StaggeredText from "@/components/react-bits/staggered-text";
import { CtaButton, CtaLink } from "@/components/marketing/cta";
import { primaryCta } from "@/content/site";

/**
 * The animated backdrop is the only heavy part of the hero, so it is split out
 * of the initial bundle. Same treatment as the homepage: absolutely positioned
 * and decorative, so nothing to reserve space for and no fallback to render.
 */
const HeroBackdrop = dynamic(
  () => import("@/components/marketing/hero-backdrop"),
  { ssr: false },
);

const EASE = [0.16, 1, 0.3, 1] as const;

/** In-page jump to this service's "What it includes" section. */
const SECONDARY_CTA = {
  label: "See what's included",
  href: "#included",
} as const;

interface ServiceHeroProps {
  category: string;
  name: string;
  summary: string;
  /** Optional supporting line between the name and summary */
  tagline?: string;
  /** Optional primary CTA label; href remains the shared contact CTA */
  primaryCtaLabel?: string;
}

/**
 * Service hero — the homepage reading stack (viewport-height column, overlay
 * header inset, copy centered in the leftover band) without the homepage
 * capability pillars. Copy comes from the service record; the aurora mark is
 * the same quiet watermark as home.
 */
export function ServiceHero({
  category,
  name,
  summary,
  tagline,
  primaryCtaLabel,
}: ServiceHeroProps) {
  const prefersReducedMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.09,
        delayChildren: prefersReducedMotion ? 0 : 0.06,
      },
    },
  };

  const item: Variants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 14 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: EASE },
        },
      };

  return (
    <section
      aria-labelledby="service-heading"
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
                {category}
              </motion.p>

              <StaggeredText
                as="h1"
                id="service-heading"
                text={name}
                segmentBy="words"
                initialDelay={0.12}
                delay={70}
                duration={0.7}
                easing={[0.22, 1, 0.36, 1]}
                from={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                to={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                className="font-display text-display-xl text-brand-ink max-w-[22ch] font-semibold tracking-[-0.02em] text-balance"
              />
            </div>

            {tagline ? (
              <motion.p
                variants={item}
                className="measure text-lead text-brand-ink font-medium"
              >
                {tagline}
              </motion.p>
            ) : null}

            <motion.p
              variants={item}
              className="measure text-lead text-brand-slate"
            >
              {summary}
            </motion.p>

            <motion.div
              variants={item}
              className="flex flex-col items-start gap-3 min-[26rem]:flex-row min-[26rem]:items-center min-[26rem]:gap-x-6"
            >
              <CtaButton href={primaryCta.href}>
                {primaryCtaLabel ?? primaryCta.label}
              </CtaButton>
              <CtaLink href={SECONDARY_CTA.href}>{SECONDARY_CTA.label}</CtaLink>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { CtaButton } from "@/components/marketing/cta";
import StaggeredText from "@/components/react-bits/staggered-text";
import { capabilityPillars, primaryCta } from "@/content/site";
import { timelineChapters, timelineSection } from "@/content/timeline";

function pillarIcon(label: string) {
  return capabilityPillars.find((pillar) => pillar.label === label)?.icon;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * CompanyTimeline — adapted from React Bits `about-11` (Pro).
 *
 * Layout kept from the block: a sticky narrative column beside a drawn
 * timeline rail with staggered milestone chapters. Re-themed onto JAIA brand
 * tokens, content moved to `content/timeline.ts`, the placeholder imagery
 * removed, and the CTA replaced with the shared liquid-fill button.
 *
 * Motion: opacity + 12px rise, cubic ease-out, bounce 0. Reduced motion
 * skips translation. The axis is drawn per-entry (no trailing segment on
 * the last chapter) so it ends at the final node.
 */
export function CompanyTimeline() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0 : 0.08,
        delayChildren: reduce ? 0 : 0.04,
      },
    },
  };

  const timeline: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.12 } },
  };

  const item: Variants = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: EASE },
    },
  };

  const lastIndex = timelineChapters.length - 1;

  return (
    <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
      {/* Sticky narrative column */}
      <div className="lg:sticky lg:top-28">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p
            variants={item}
            className="text-eyebrow font-display text-brand-action font-semibold tracking-[0.18em] uppercase"
          >
            {timelineSection.eyebrow}
          </motion.p>
          <StaggeredText
            as="h2"
            id="timeline-heading"
            text={timelineSection.heading}
            segmentBy="words"
            delay={50}
            duration={0.6}
            easing={EASE}
            from={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            to={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            className="font-display text-h2 text-brand-ink mt-5 font-semibold text-balance"
          />
          <motion.p
            variants={item}
            className="measure text-brand-slate mt-6 text-[1.0625rem] leading-relaxed"
          >
            {timelineSection.body}
          </motion.p>
          <motion.div variants={item} className="mt-8">
            <CtaButton
              href={primaryCta.href}
              tone="outline"
              withArrow
              className="w-full justify-center min-[26rem]:w-auto"
            >
              {primaryCta.label}
            </CtaButton>
          </motion.div>
          <motion.dl
            variants={item}
            className="border-brand-mist mt-10 flex gap-10 border-t pt-6"
          >
            {timelineSection.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="sr-only">{fact.label}</dt>
                <dd className="font-display text-brand-ink text-2xl font-semibold tracking-tight sm:text-3xl">
                  {fact.value}
                </dd>
                <dd className="text-brand-slate mt-1 text-sm">{fact.label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>

      {/* Timeline rail — connectors live on each entry except the last so the
          axis stops at the TODAY node instead of filling a taller column. */}
      <motion.ol
        variants={timeline}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="list-none"
      >
        {timelineChapters.map((chapter, index) => {
          const isLast = index === lastIndex;
          return (
            <motion.li
              key={chapter.label}
              variants={item}
              className="flex gap-6 sm:gap-8"
            >
              <div
                className={
                  isLast
                    ? "flex w-[11px] shrink-0 flex-col items-center self-start"
                    : "flex w-[11px] shrink-0 flex-col items-center self-stretch"
                }
              >
                <span
                  aria-hidden="true"
                  className="bg-brand-action ring-canvas relative z-10 size-[11px] shrink-0 rounded-full ring-4"
                />
                {isLast ? null : (
                  <span
                    aria-hidden="true"
                    className="from-brand-action to-brand-sky mt-1 w-px min-h-4 flex-1 bg-gradient-to-b"
                  />
                )}
              </div>
              <div className={isLast ? undefined : "pb-14 sm:pb-16"}>
                <p className="text-eyebrow font-display text-brand-action font-semibold tracking-[0.18em] uppercase">
                  {chapter.label}
                </p>
                <h3 className="font-display text-brand-ink mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
                  {chapter.title}
                </h3>
                <p className="text-brand-slate mt-3 max-w-xl leading-relaxed text-pretty">
                  {chapter.detail}
                </p>
                {chapter.chips ? (
                  <ul className="mt-6 flex list-none flex-wrap gap-2">
                    {chapter.chips.map((chip) => {
                      const Icon = pillarIcon(chip);
                      return (
                        <li
                          key={chip}
                          className="bg-brand-sky-soft text-brand-action-deep inline-flex items-center gap-1.5 rounded-full py-1.5 pr-3.5 pl-3 text-[0.8125rem] font-semibold"
                        >
                          {Icon ? (
                            <Icon
                              aria-hidden="true"
                              className="size-3.5"
                              strokeWidth={2}
                            />
                          ) : null}
                          {chip}
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </div>
            </motion.li>
          );
        })}
      </motion.ol>
    </div>
  );
}

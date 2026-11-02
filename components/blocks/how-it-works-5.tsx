"use client";

/**
 * React Bits Pro `how-it-works-5`: numbered steps beside a short introduction.
 */

import { motion } from "motion/react";

import { CtaButton } from "@/components/marketing/cta";
import { approach, primaryCta } from "@/content/site";

export interface WorkStep {
  title: string;
  description: string;
}

interface HowItWorks5Props {
  id?: string;
  heading?: string;
  body?: string;
  cta?: { label: string; href: string };
  footnote?: string;
  steps?: readonly WorkStep[];
}

export function HowItWorks5({
  id = "approach-heading",
  heading = approach.heading,
  body = approach.eyebrow,
  cta = primaryCta,
  footnote = "Every engagement starts by understanding the practice you already run.",
  steps = approach.steps.map((step) => ({ title: step.title, description: step.body })),
}: HowItWorks5Props = {}) {
  return (
    <section aria-labelledby={id} className="section-flow relative overflow-hidden px-5 py-16 sm:px-8 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[12%_0] bg-[radial-gradient(ellipse_at_75%_45%,rgba(135,205,236,0.28),transparent_55%),radial-gradient(ellipse_at_20%_55%,rgba(234,245,251,0.78),transparent_50%),radial-gradient(ellipse_at_55%_50%,rgba(39,111,145,0.05),transparent_55%)]"
      />
      <div className="relative z-10 mx-auto grid w-full max-w-[90rem] items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 id={id} className="font-display text-brand-ink text-4xl font-semibold tracking-tight sm:text-6xl">
            {heading}
          </h2>
          <p className="text-brand-slate max-w-md text-lg leading-relaxed">{body}</p>
          <CtaButton href={cta.href}>{cta.label}</CtaButton>
          {footnote ? <p className="text-brand-slate text-sm">{footnote}</p> : null}
        </motion.div>
        <ol className="flex flex-col gap-10">
          {steps.map((step, index) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="flex items-start gap-5"
            >
              <span className="bg-brand-action relative inline-flex size-12 shrink-0 items-center justify-center rounded-full text-lg font-semibold leading-none text-white tabular-nums">
                {index + 1}
              </span>
              <div>
                <h3 className="font-display text-brand-ink text-xl font-semibold">{step.title}</h3>
                <p className="text-brand-slate mt-1 leading-relaxed">{step.description}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

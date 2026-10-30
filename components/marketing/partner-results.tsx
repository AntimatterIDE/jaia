"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { Sprout } from "lucide-react";

import AnimatedContent from "@/components/AnimatedContent";
import { JaiaSymbol } from "@/components/jaia-symbol";
import { CountUp } from "@/components/marketing/count-up";
import { ResultsDisclaimer } from "@/components/marketing/results-disclaimer";
import { SectionHeading } from "@/components/marketing/section-heading";
import {
  getPartnerSpotlight,
  type PartnerSpotlight,
} from "@/content/partner-spotlights";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Results bento: one ink feature card for the headline practice result, with
 * before/after bars that only restate its own sentence, beside the other
 * client-supplied figures. Every number counts up once on first view.
 */
export function PartnerResults({ slug }: { slug: string }) {
  const partner = getPartnerSpotlight(slug);
  if (!partner) return null;
  return <Results partner={partner} />;
}

function Results({ partner }: { partner: PartnerSpotlight }) {
  const { results } = partner;
  const { featured } = results;
  const reduceMotion = useReducedMotion();
  const headingId = `${partner.anchor}-results-heading`;

  const stack: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.1,
        delayChildren: reduceMotion ? 0 : 0.08,
      },
    },
  };

  const rise: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.65, ease: EASE },
        },
      };

  const bars: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.22,
        delayChildren: reduceMotion ? 0 : 0.35,
      },
    },
  };

  const grow: Variants = reduceMotion
    ? { hidden: { scaleX: 1 }, visible: { scaleX: 1 } }
    : {
        hidden: { scaleX: 0 },
        visible: {
          scaleX: 1,
          transition: { duration: 1.1, ease: EASE },
        },
      };

  return (
    <section aria-labelledby={headingId} className="bg-canvas">
      <div className="mx-auto w-full max-w-[90rem] px-5 py-20 sm:px-8 sm:py-28">
        <AnimatedContent>
          <SectionHeading
            id={headingId}
            eyebrow={results.eyebrow}
            title={results.heading}
          />
        </AnimatedContent>

        <motion.div
          variants={stack}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid gap-5 sm:mt-14 sm:gap-6 lg:grid-cols-12"
        >
          <motion.article
            variants={rise}
            aria-label={`${featured.eyebrow} result`}
            className="bg-brand-ink relative isolate overflow-hidden rounded-[2rem] p-7 text-white sm:p-10 lg:col-span-7 lg:p-12"
          >
            <JaiaSymbol className="symbol-watermark text-brand-sky absolute -right-24 -bottom-36 -z-10 size-[26rem] opacity-[0.08] sm:-right-16" />

            <p className="text-eyebrow font-display text-brand-sky font-semibold tracking-[0.18em] uppercase">
              {featured.eyebrow}
            </p>
            <p className="font-display mt-5 text-[clamp(4.5rem,3rem+6vw,8rem)] leading-[0.95] font-semibold tracking-[-0.035em]">
              <CountUp value={featured.value} suffix={featured.suffix} />
            </p>
            <p className="text-lead mt-4 max-w-md text-white/85">
              {featured.label}
            </p>

            <motion.div
              variants={bars}
              aria-hidden="true"
              className="mt-10 space-y-5 sm:mt-12"
            >
              <div>
                <p className="text-sm text-white/65">{featured.before}</p>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    variants={grow}
                    className="h-full w-1/2 origin-left rounded-full bg-white/35"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-baseline justify-between gap-4 text-sm">
                  <span className="text-white">{featured.after}</span>
                  <span className="font-display text-brand-sky font-semibold">
                    {featured.change}
                  </span>
                </div>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    variants={grow}
                    className="bg-brand-sky h-full w-full origin-left rounded-full"
                  />
                </div>
              </div>
            </motion.div>

            <p className="mt-8 max-w-xl text-sm leading-relaxed text-white/65">
              {featured.detail}
            </p>
          </motion.article>

          <dl className="grid gap-5 sm:grid-cols-3 sm:gap-6 lg:col-span-5 lg:grid-cols-1">
            {results.stats.map((stat) => (
              <motion.div
                key={`${stat.eyebrow}-${stat.value}`}
                variants={rise}
                className="lift border-brand-mist shadow-soft hover:border-brand-sky hover:shadow-lift flex flex-col gap-5 rounded-[1.5rem] border bg-white p-6 sm:p-7 lg:flex-row lg:items-center lg:gap-7"
              >
                <dt className="order-2">
                  <span className="text-eyebrow font-display text-brand-action block font-semibold tracking-[0.16em] uppercase">
                    {stat.eyebrow}
                  </span>
                  <span className="text-brand-slate mt-2 block text-[0.9375rem] leading-snug">
                    {stat.label}
                  </span>
                </dt>
                <dd className="font-display text-brand-ink order-1 shrink-0 text-[clamp(2.75rem,2.2rem+1.6vw,3.75rem)] leading-none font-semibold tracking-[-0.03em] lg:min-w-[7.25rem]">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>

        <ResultsDisclaimer className="mt-8" />

        <AnimatedContent delay={0.1}>
          <div className="border-brand-sky/50 mt-5 flex flex-col gap-4 rounded-[1.5rem] border border-dashed bg-brand-sky-soft/50 p-6 sm:mt-6 sm:flex-row sm:items-center sm:gap-5">
            <span
              aria-hidden="true"
              className="text-brand-action flex size-11 shrink-0 items-center justify-center rounded-xl bg-white"
            >
              <Sprout className="size-5" strokeWidth={1.75} />
            </span>
            <p className="text-brand-slate text-[0.9375rem] leading-relaxed">
              <span className="text-brand-ink font-semibold">
                {results.note.label}:{" "}
              </span>
              {results.note.body}
            </p>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}

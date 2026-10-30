"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

import AnimatedContent from "@/components/AnimatedContent";
import {
  getPartnerSpotlight,
  type PartnerSpotlight,
} from "@/content/partner-spotlights";
import { useMotionAllowed } from "@/lib/use-motion-allowed";

/**
 * The partnership answer as a pull quote that reads in as it scrolls: each
 * word brightens over its own slice of the scroll range. Opacity only — the
 * words never move, so line breaks stay put — and the full text is plain DOM
 * copy, so assistive technology reads it once, normally.
 */
export function PartnerStatement({ slug }: { slug: string }) {
  const partner = getPartnerSpotlight(slug);
  if (!partner) return null;
  return <Statement partner={partner} />;
}

function Word({
  word,
  progress,
  range,
  animate,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  animate: boolean;
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <>
      <motion.span style={animate ? { opacity } : undefined}>{word}</motion.span>{" "}
    </>
  );
}

function Statement({ partner }: { partner: PartnerSpotlight }) {
  const { partnership, respondent } = partner;
  const motionAllowed = useMotionAllowed();
  const quoteRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: quoteRef,
    offset: ["start 88%", "end 52%"],
  });

  const words = partnership.quote.split(" ");
  const headingId = `${partner.anchor}-partnership-heading`;

  return (
    <section aria-labelledby={headingId} className="bg-canvas">
      <div className="mx-auto w-full max-w-[90rem] px-5 py-20 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-5xl">
          <AnimatedContent>
            <p className="text-eyebrow font-display text-brand-action font-semibold tracking-[0.18em] uppercase">
              {partnership.eyebrow}
            </p>
            <h2
              id={headingId}
              className="font-display text-brand-slate mt-4 text-xl font-semibold sm:text-2xl"
            >
              {partnership.heading}
            </h2>
          </AnimatedContent>

          <figure className="mt-8 sm:mt-10">
            <span
              aria-hidden="true"
              className="text-brand-sky block h-12 font-serif text-[6rem] leading-none select-none sm:h-16 sm:text-[8rem]"
            >
              &ldquo;
            </span>
            <blockquote>
              <p
                ref={quoteRef}
                className="font-display text-brand-ink text-[clamp(1.75rem,1.15rem+2.4vw,3.25rem)] leading-[1.18] font-semibold tracking-[-0.02em] text-pretty"
              >
                {words.map((word, index) => (
                  <Word
                    key={`${word}-${index}`}
                    word={word}
                    progress={scrollYProgress}
                    range={[index / words.length, (index + 1) / words.length]}
                    animate={motionAllowed}
                  />
                ))}
              </p>
            </blockquote>
            <figcaption className="mt-8 flex flex-wrap items-center gap-4 sm:mt-10">
              <span className="border-brand-mist inline-flex h-12 items-center rounded-full border bg-white px-4 shadow-sm">
                <Image
                  src={partner.logo.src}
                  alt=""
                  width={partner.logo.width}
                  height={partner.logo.height}
                  className="h-6 w-auto"
                />
              </span>
              <span className="text-brand-slate text-[0.9375rem]">
                <span className="text-brand-ink font-semibold">
                  {respondent.name}
                </span>
                <span aria-hidden="true"> · </span>
                <span className="sr-only">, </span>
                {respondent.organization}
              </span>
            </figcaption>
          </figure>

          <div className="border-brand-mist mt-14 grid gap-8 border-t pt-10 sm:mt-16 sm:grid-cols-2 sm:gap-12">
            {partnership.columns.map((column, index) => (
              <AnimatedContent key={column.title} delay={index * 0.08}>
                <h3 className="font-display text-brand-ink text-lg font-semibold">
                  {column.title}
                </h3>
                <p className="measure text-brand-slate mt-3 text-[1.0625rem] leading-relaxed">
                  {column.body}
                </p>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

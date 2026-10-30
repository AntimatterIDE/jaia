"use client";

/**
 * React Bits Pro `hero-1`, restyled for JAIA interior pages and split sections.
 * The demo badge, stock photo, play button, and invented “50k+” stat are not used.
 */

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import Link from "next/link";

import { CtaButton, CtaLink } from "@/components/marketing/cta";

export interface Hero1Action {
  label: string;
  href: string;
}

interface Hero1Props {
  eyebrow?: string;
  heading: string;
  headingId?: string;
  body?: string;
  primary?: Hero1Action;
  secondary?: Hero1Action;
  image?: { src: string; alt: string };
  media?: ReactNode;
  aside?: ReactNode;
  /** `hero` clears the fixed header. `section` is an in-page split. */
  tone?: "hero" | "section";
}

const rise = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
} as const;

export function Hero1({
  eyebrow,
  heading,
  headingId = "page-heading",
  body,
  primary,
  secondary,
  image,
  media,
  aside,
  tone = "hero",
}: Hero1Props) {
  const Heading = tone === "hero" ? motion.h1 : motion.h2;
  const visual =
    media ??
    (image ? (
      <HeroVisual image={image} href={primary?.href} label={primary?.label} />
    ) : null);

  return (
    <section
      aria-labelledby={headingId}
      className={
        tone === "hero"
          ? "bg-canvas flex w-full items-center px-5 pt-[calc(var(--header-height)+2.5rem)] pb-16 sm:px-8 sm:pt-[calc(var(--header-height)+4rem)] sm:pb-20 lg:min-h-[100svh] lg:pt-[calc(var(--header-height)+5rem)]"
          : "bg-canvas w-full px-5 py-16 sm:px-8 sm:py-24"
      }
    >
      <div
        className={
          visual
            ? "mx-auto grid w-full max-w-[90rem] items-center gap-10 lg:grid-cols-2 lg:gap-16"
            : "mx-auto flex w-full max-w-3xl flex-col gap-10"
        }
      >
        <div className="flex flex-col gap-6">
          {eyebrow ? (
            <motion.p
              {...rise}
              transition={{ duration: 0.45 }}
              className="text-eyebrow font-display text-brand-action font-semibold tracking-[0.18em] uppercase"
            >
              {eyebrow}
            </motion.p>
          ) : null}
          <Heading
            {...rise}
            id={headingId}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="font-display text-brand-ink text-[clamp(2.25rem,1.4rem+2.2vw,3.75rem)] leading-[1.08] font-semibold tracking-[-0.02em] text-balance"
          >
            {heading}
          </Heading>
          {body ? (
            <motion.p
              {...rise}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="text-lead text-brand-slate max-w-lg"
            >
              {body}
            </motion.p>
          ) : null}
          {aside}
          {primary || secondary ? (
            <motion.div
              {...rise}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="flex flex-col items-start gap-3 min-[26rem]:flex-row min-[26rem]:items-center"
            >
              {primary ? (
                <CtaButton href={primary.href}>{primary.label}</CtaButton>
              ) : null}
              {secondary ? (
                <CtaLink href={secondary.href}>{secondary.label}</CtaLink>
              ) : null}
            </motion.div>
          ) : null}
        </div>
        {visual ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {visual}
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}

function HeroVisual({
  image,
  href,
  label,
}: {
  image: { src: string; alt: string };
  href?: string;
  label?: string;
}) {
  return (
    <div className="bg-brand-sky-soft photo-card-fade relative min-h-[280px] overflow-hidden rounded-[2rem] sm:min-h-[420px]">
      <img
        src={image.src}
        alt={image.alt}
        className="img-tone absolute inset-0 h-full w-full object-cover"
      />
      {href ? (
        <Link
          href={href}
          aria-label={label ?? "Continue"}
          className="bg-brand-ink hover:bg-brand-action-deep absolute right-4 bottom-4 flex size-14 items-center justify-center rounded-2xl text-white transition-colors duration-150 sm:size-16"
        >
          <ArrowRight className="size-6 -rotate-45" />
        </Link>
      ) : null}
    </div>
  );
}

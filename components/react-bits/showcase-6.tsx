"use client";

/**
 * React Bits `Showcase6`, restyled for JAIA case studies.
 *
 * Kept: overlapping tilted polaroid strip, hover that un-tilts and lifts
 * the card. Cards are name-only — no photos, locations, or coming-soon badges.
 */

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export interface Showcase6Card {
  href: string;
  caption: string;
  tilt: number;
  lift: string;
}

export interface Showcase6Props {
  id?: string;
  headingId?: string;
  items: readonly Showcase6Card[];
  className?: string;
}

const MotionLink = motion.create(Link);

function PolaroidFace({ item }: { item: Showcase6Card }) {
  return (
    <div className="border-brand-mist rounded-2xl border bg-white p-3 shadow-[0_18px_45px_-20px_rgba(50,47,47,0.28)] transition-shadow duration-300 group-hover:shadow-[0_30px_70px_-28px_rgba(50,47,47,0.4)] motion-reduce:transition-none sm:p-3.5">
      <div className="bg-brand-sky-soft relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-lg px-5">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.85),transparent_55%),radial-gradient(ellipse_at_70%_80%,rgba(135,205,236,0.45),transparent_50%)]"
        />
        <span className="border-brand-action/35 relative size-16 rounded-full border sm:size-20" aria-hidden="true" />
        <span className="bg-brand-action absolute size-2.5 rounded-full" aria-hidden="true" />
      </div>
      <div className="flex items-center justify-between gap-3 px-1 pt-4 pb-1.5">
        <span className="font-display text-brand-ink text-[0.8125rem] font-semibold tracking-[0.08em] uppercase">
          {item.caption}
        </span>
        <ArrowUpRight
          aria-hidden="true"
          className="text-brand-slate size-3.5 shrink-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:opacity-100"
        />
      </div>
    </div>
  );
}

export function Showcase6({
  id,
  headingId = "case-studies-heading",
  items,
  className,
}: Showcase6Props) {
  const prefersReducedMotion = useReducedMotion();

  const stripVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.09 },
    },
  };

  const cardVariants: Variants = prefersReducedMotion
    ? { hidden: { opacity: 1, rotate: 0 }, visible: { opacity: 1, rotate: 0 } }
    : {
        hidden: { opacity: 0, y: 32, rotate: 0 },
        visible: (tilt: number) => ({
          opacity: 1,
          y: 0,
          rotate: tilt,
          transition: { duration: 0.7, ease: EASE },
        }),
      };

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("section-flow relative overflow-hidden", className)}
    >
      <h2 id={headingId} className="sr-only">
        Case studies
      </h2>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(135,205,236,0.22),transparent_52%),radial-gradient(ellipse_at_15%_75%,rgba(234,245,251,0.8),transparent_48%)]"
      />
      <div className="relative z-10 mx-auto w-full max-w-[90rem] px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <motion.div
          variants={stripVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4"
        >
          {items.map((item) => (
            <MotionLink
              key={item.href}
              href={item.href}
              custom={item.tilt}
              variants={cardVariants}
              whileHover={
                prefersReducedMotion ? undefined : { rotate: 0, y: -6 }
              }
              transition={{ duration: 0.35, ease: EASE }}
              className="group focus-visible:outline-brand-action relative block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              <PolaroidFace item={item} />
            </MotionLink>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function Showcase6Grid({ items }: { items: readonly Showcase6Card[] }) {
  return (
    <ul className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
      {items.map((item, index) => (
        <motion.li
          key={item.href}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: (index % 3) * 0.08, ease: EASE }}
        >
          <Link
            href={item.href}
            className="group focus-visible:outline-brand-action relative block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <PolaroidFace item={item} />
          </Link>
        </motion.li>
      ))}
    </ul>
  );
}

export default Showcase6;

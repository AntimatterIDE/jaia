"use client";

/**
 * React Bits `Showcase6`, restyled for JAIA case studies.
 *
 * Kept: staggered header, overlapping tilted polaroid strip, hover that
 * un-tilts and lifts the card. Demo copy, dark-mode variants, invented
 * cities/dates, and `#` links are not used. Cards link to real routes.
 */

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import { CtaButton } from "@/components/marketing/cta";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export interface Showcase6Card {
  href: string;
  caption: string;
  meta: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
    objectPosition?: string;
  };
  tilt: number;
  lift: string;
  comingSoon?: boolean;
}

export interface Showcase6Props {
  id?: string;
  headingId: string;
  headingLead: string;
  headingAccent: string;
  body: string;
  cta: { label: string; href: string };
  notice?: string;
  items: readonly Showcase6Card[];
  className?: string;
}

const MotionLink = motion.create(Link);

function PolaroidFace({ item, sizes }: { item: Showcase6Card; sizes: string }) {
  return (
    <div className="border-brand-mist rounded-2xl border bg-white p-3 shadow-[0_18px_45px_-20px_rgba(50,47,47,0.28)] transition-shadow duration-300 group-hover:shadow-[0_30px_70px_-28px_rgba(50,47,47,0.4)] motion-reduce:transition-none sm:p-3.5">
      <div className="bg-brand-mist relative aspect-square overflow-hidden rounded-lg">
        {item.comingSoon ? (
          <span className="text-brand-ink shadow-soft absolute top-3 left-3 z-10 rounded-full bg-white/95 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-[0.14em] uppercase">
            Coming soon
          </span>
        ) : null}
        <Image
          src={item.image.src}
          alt={item.image.alt}
          width={item.image.width}
          height={item.image.height}
          sizes={sizes}
          className={cn(
            "absolute inset-0 size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100",
            item.image.objectPosition,
          )}
        />
      </div>
      <div className="flex items-baseline justify-between gap-3 px-1 pt-4 pb-1.5">
        <span className="text-brand-ink truncate font-mono text-[11px] tracking-[0.12em] uppercase">
          {item.caption}
        </span>
        <span className="text-brand-slate flex shrink-0 items-center gap-1 font-mono text-[11px] tracking-[0.12em]">
          {item.meta}
          {item.comingSoon ? null : (
            <ArrowUpRight
              aria-hidden="true"
              className="size-3.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:opacity-100"
            />
          )}
        </span>
      </div>
    </div>
  );
}

export function Showcase6({
  id,
  headingId,
  headingLead,
  headingAccent,
  body,
  cta,
  notice,
  items,
  className,
}: Showcase6Props) {
  const prefersReducedMotion = useReducedMotion();

  const headerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.1 },
    },
  };

  const fadeUp: Variants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: EASE },
        },
      };

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
      className={cn("bg-canvas overflow-hidden", className)}
    >
      <div className="mx-auto w-full max-w-[90rem] px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16"
        >
          <motion.div variants={fadeUp}>
            <h2
              id={headingId}
              className="font-display text-brand-ink text-[clamp(2rem,1.4rem+2.4vw,3.5rem)] leading-[1.05] font-semibold tracking-tight text-balance"
            >
              {headingLead}
              <span className="text-brand-slate">{headingAccent}</span>
            </h2>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="lg:max-w-sm lg:justify-self-end lg:pt-2"
          >
            <p className="text-brand-slate text-base leading-relaxed text-pretty sm:text-lg">
              {body}
            </p>
            {notice ? (
              <p className="border-brand-mist text-brand-slate mt-5 border-l-2 pl-4 text-sm italic">
                {notice}
              </p>
            ) : null}
            <div className="mt-6">
              <CtaButton href={cta.href} withArrow>
                {cta.label}
              </CtaButton>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={stripVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:mt-24 lg:flex lg:justify-center lg:gap-0"
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
              className={cn(
                "group focus-visible:outline-brand-action relative block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 lg:-ml-14 lg:w-[28%] lg:first:ml-0",
                item.lift,
              )}
              aria-label={
                item.comingSoon ? `${item.caption}, coming soon` : undefined
              }
            >
              <PolaroidFace
                item={item}
                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, calc(100vw - 2.5rem)"
              />
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
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="group focus-visible:outline-brand-action relative block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4"
            aria-label={
              item.comingSoon ? `${item.caption}, coming soon` : undefined
            }
          >
            <PolaroidFace
              item={item}
              sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, calc(100vw - 2.5rem)"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Showcase6;

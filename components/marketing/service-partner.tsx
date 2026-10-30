"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";

import { CtaButton } from "@/components/marketing/cta";
import { primaryCta } from "@/content/site";
import { servicePartners } from "@/content/partners";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Named technology partner on a service page. Looks up the record on the
 * client so Lucide icons are not serialized across the RSC boundary.
 */
export function ServicePartner({ slug }: { slug: string }) {
  const prefersReducedMotion = useReducedMotion();
  const partner = servicePartners[slug];

  if (!partner) return null;

  const header: Variants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: EASE },
        },
      };

  const stack: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.1, delayChildren: prefersReducedMotion ? 0 : 0.12 },
    },
  };

  const card: Variants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: EASE },
        },
      };

  return (
    <section
      aria-labelledby="partner-heading"
      className="section-wash section-wash-mist"
    >
      <div className="mx-auto w-full max-w-[90rem] px-5 py-16 sm:px-8 sm:py-24">
        <motion.div
          variants={header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16"
        >
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-4">
              <p className="eyebrow-label">
                {partner.eyebrow}
              </p>
              <span className="inline-flex items-center">
                <Image
                  src={partner.logo.src}
                  alt={partner.logo.alt}
                  width={partner.logo.width}
                  height={partner.logo.height}
                  className="h-8 w-auto"
                />
              </span>
            </div>
            <h2
              id="partner-heading"
              className="font-display text-h2 text-brand-ink mt-5 font-semibold text-balance"
            >
              {partner.heading}
            </h2>
            <p className="measure text-brand-slate mt-5 text-[1.0625rem] leading-relaxed">
              {partner.body}
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-4">
            <CtaButton href={primaryCta.href}>{primaryCta.label}</CtaButton>
            <a
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group/ext text-brand-action hover:text-brand-action-deep inline-flex min-h-11 items-center gap-2 rounded-sm text-base font-semibold"
            >
              {partner.ctaLabel}
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-200 group-hover/ext:translate-x-0.5 group-hover/ext:-translate-y-0.5 motion-reduce:transition-none"
              />
            </a>
          </div>
        </motion.div>

        <motion.ul
          variants={stack}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="border-brand-mist mt-12 border-t sm:mt-14"
        >
          {partner.points.map((point, index) => (
            <motion.li
              key={point.title}
              variants={card}
              className="border-brand-mist grid grid-cols-[3rem_1fr] gap-4 border-b py-7"
            >
              <span className="text-brand-slate font-label text-sm tracking-[0.16em]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>
                <h3 className="font-display text-brand-ink text-2xl">{point.title}</h3>
                <p className="text-brand-slate mt-2 leading-relaxed">{point.body}</p>
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

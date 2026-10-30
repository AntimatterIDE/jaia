"use client";

/**
 * React Bits Pro `features-11`: split headline and indexed cards.
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, type Variants } from "motion/react";
import type { LucideIcon } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export interface FeatureCard {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
}

interface Features11Props {
  id?: string;
  heading: string;
  body?: string;
  items: readonly FeatureCard[];
}

export function Features11({ id = "features-heading", heading, body, items }: Features11Props) {
  return (
    <section aria-labelledby={id} className="bg-canvas w-full px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto w-full max-w-[90rem]">
        <div className="grid items-end gap-6 lg:grid-cols-[1.4fr_0.6fr] lg:gap-16">
          <motion.h2
            id={id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-brand-ink max-w-2xl text-3xl leading-[1.1] font-semibold tracking-tight sm:text-5xl"
          >
            {heading}
          </motion.h2>
          {body ? (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="text-brand-slate max-w-sm text-lg leading-relaxed"
            >
              {body}
            </motion.p>
          ) : null}
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={card.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="lift border-brand-mist flex min-h-[280px] flex-col rounded-3xl border bg-white p-7 sm:p-8"
              >
                <div className="flex items-start justify-between">
                  <div className="bg-brand-sky-soft text-brand-action flex size-11 items-center justify-center rounded-xl">
                    <Icon className="size-5" />
                  </div>
                  <span className="text-brand-slate text-xs font-medium tracking-[0.15em]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-display text-brand-ink mt-8 text-2xl font-semibold">{card.title}</h3>
                <p className="text-brand-slate mt-3 flex-1 leading-relaxed">{card.description}</p>
                {card.href && card.linkLabel ? (
                  <Link
                    href={card.href}
                    className="text-brand-action mt-6 inline-flex items-center gap-2 text-sm font-medium"
                  >
                    {card.linkLabel}
                    <ArrowRight className="size-4" />
                  </Link>
                ) : null}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

/**
 * React Bits Pro `features-5`: a six-up icon grid. Demo compliance copy is not used.
 */

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";

import { CtaButton, CtaLink } from "@/components/marketing/cta";
import { hero, primaryCta, servicesIntro } from "@/content/site";
import { services, serviceUrl } from "@/content/services";

const ease = [0.22, 1, 0.36, 1] as const;
const MotionLink = motion.create(Link);

function cardMotion(index: number) {
  return {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.55, delay: (index % 3) * 0.08, ease },
  } as const;
}

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
  image?: { src: string; alt: string };
}

interface Features5Props {
  id?: string;
  heading?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  showCtas?: boolean;
  items?: readonly FeatureItem[];
}

const homeItems: FeatureItem[] = services.map((service) => ({
  icon: service.icon,
  title: service.shortName,
  description: service.summary,
  href: serviceUrl(service.slug),
}));

export function Features5({
  id = "capabilities-heading",
  heading = servicesIntro.heading,
  body = servicesIntro.body,
  primary = primaryCta,
  secondary = hero.secondaryCta,
  showCtas = true,
  items = homeItems,
}: Features5Props = {}) {
  return (
    <section aria-labelledby={id} className="section-flow relative overflow-hidden px-5 py-16 sm:px-8 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[12%_0] bg-[radial-gradient(ellipse_at_50%_45%,rgba(135,205,236,0.3),transparent_58%),radial-gradient(ellipse_at_85%_60%,rgba(234,245,251,0.85),transparent_52%),radial-gradient(ellipse_at_15%_55%,rgba(39,111,145,0.05),transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(39,111,145,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(39,111,145,0.05) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          maskImage: "radial-gradient(ellipse 70% 55% at 85% 40%, #000 10%, transparent 72%)",
        }}
      />
      <div className="relative z-10 mx-auto w-full max-w-[90rem]">
        <div className="mb-12 max-w-3xl">
          <motion.h2
            id={id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-brand-ink text-3xl font-semibold tracking-tight sm:text-5xl"
          >
            {heading}
          </motion.h2>
          {body ? (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08, ease }}
              className="text-brand-slate mt-5 text-lg"
            >
              {body}
            </motion.p>
          ) : null}
          {showCtas && (primary || secondary) ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.14, ease }}
              className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
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

        <div className="border-brand-mist grid grid-cols-1 overflow-hidden rounded-2xl border md:grid-cols-2 lg:grid-cols-3">
          {items.map((feature, index) => {
            const Icon = feature.icon;
            const card = (
              <>
                {feature.image ? (
                  <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-xl">
                    <Image
                      src={feature.image.src}
                      alt={feature.image.alt}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <span className="bg-brand-sky-soft text-brand-action mb-6 flex size-14 items-center justify-center rounded-2xl shadow-[inset_0_0_0_1px_rgb(135_205_236/0.55)] transition-transform duration-300 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                    <Icon className="size-7" strokeWidth={1.5} />
                  </span>
                )}
                <h3 className="font-display text-brand-ink text-xl font-semibold">{feature.title}</h3>
                <p className="text-brand-slate mt-3 text-base leading-relaxed">{feature.description}</p>
                {feature.href ? (
                  <>
                    <span className="text-brand-action absolute top-8 right-8 inline-flex opacity-35 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100 motion-reduce:transition-none sm:top-10 sm:right-10">
                      <ArrowRight className="size-4" />
                      <span className="sr-only">View {feature.title}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="bg-brand-action absolute inset-x-8 bottom-0 h-0.5 origin-left scale-x-0 rounded-full transition-transform duration-300 group-hover:scale-x-100 motion-reduce:transition-none sm:inset-x-10"
                    />
                  </>
                ) : null}
              </>
            );
            const className = `group bg-canvas relative block p-8 transition-colors duration-200 sm:p-10 ${
              index < items.length - 1 ? "border-brand-mist border-b" : ""
            } ${index % 2 === 0 ? "md:border-brand-mist md:border-r" : ""} ${
              (index + 1) % 3 !== 0 ? "lg:border-brand-mist lg:border-r" : "lg:border-r-0"
            } ${index < items.length - (items.length % 3 || 3) ? "lg:border-brand-mist lg:border-b" : "lg:border-b-0"}`;
            return feature.href ? (
              <MotionLink
                key={feature.title}
                href={feature.href}
                {...cardMotion(index)}
                className={`${className} hover:bg-[color-mix(in_srgb,var(--brand-sky-soft)_55%,white)]`}
              >
                {card}
              </MotionLink>
            ) : (
              <motion.div key={feature.title} {...cardMotion(index)} className={className}>
                {card}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

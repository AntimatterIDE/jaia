"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  type Variants,
} from "motion/react";

import AnimatedContent from "@/components/AnimatedContent";
import { CtaLink } from "@/components/marketing/cta";
import { ScrollRailSegment } from "@/components/marketing/scroll-rail";
import { SectionHeading } from "@/components/marketing/section-heading";
import {
  getPartnerSpotlight,
  type PartnerSpotlight,
} from "@/content/partner-spotlights";
import { getService, serviceUrl } from "@/content/services";
import { primaryCta } from "@/content/site";
import { useMotionAllowed } from "@/lib/use-motion-allowed";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Spotlight opener: a sticky partner fact card beside the partner's own
 * description and the three ways it supports billing. A rail fills as the
 * list scrolls past, lighting each step once it is reached. Looks the
 * record up on the client so Lucide icons stay out of RSC props.
 */
export function PartnerProfile({ slug }: { slug: string }) {
  const partner = getPartnerSpotlight(slug);
  if (!partner) return null;
  return <Profile partner={partner} />;
}

function Profile({ partner }: { partner: PartnerSpotlight }) {
  const { profile } = partner;
  const reduceMotion = useReducedMotion();
  const motionAllowed = useMotionAllowed();
  const listRef = useRef<HTMLOListElement>(null);
  const [reached, setReached] = useState(-1);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 78%", "end 58%"],
  });

  const lastIndex = profile.points.length - 1;

  // A step lights once the rail fill arrives at its marker
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const next =
      progress <= 0
        ? -1
        : Math.min(lastIndex, Math.floor(progress * lastIndex + 0.02));
    setReached((current) => (current === next ? current : next));
  });

  const services = profile.serviceSlugs
    .map((serviceSlug) => getService(serviceSlug))
    .filter((service) => service !== undefined);

  const card: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: EASE },
        },
      };

  const headingId = `${partner.anchor}-heading`;

  return (
    <section
      id={partner.anchor}
      aria-labelledby={headingId}
      className="section-wash section-wash-mist"
    >
      <div className="mx-auto grid w-full max-w-[90rem] gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-12 lg:gap-x-16">
        <motion.div
          variants={card}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start"
        >
          <div className="shadow-soft rounded-[1.75rem] border border-white bg-white/85 p-5 backdrop-blur-xs sm:p-7">
            <div className="border-brand-mist relative flex items-center justify-center overflow-hidden rounded-[1.25rem] border bg-gradient-to-b from-white to-brand-sky-soft px-6 py-10 sm:py-12">
              <div aria-hidden="true" className="dot-grid absolute inset-0" />
              <Image
                src={partner.logo.src}
                alt={partner.logo.alt}
                width={partner.logo.width}
                height={partner.logo.height}
                className="relative h-12 w-auto sm:h-14"
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2.5 px-1">
              <p className="font-display text-brand-ink text-xl font-semibold">
                {partner.name}
              </p>
              <span className="bg-brand-sky-soft text-brand-action-deep rounded-full px-2.5 py-1 text-xs font-semibold tracking-[0.06em]">
                {partner.shortName}
              </span>
            </div>

            <dl className="mt-5 divide-y divide-brand-mist border-brand-mist border-t px-1">
              <div className="py-4">
                <dt className="text-brand-slate text-xs font-semibold tracking-[0.14em] uppercase">
                  {profile.focusLabel}
                </dt>
                <dd className="text-brand-ink mt-1.5 text-[0.9375rem] font-medium">
                  {profile.focus}
                </dd>
              </div>
              <div className="py-4">
                <dt className="text-brand-slate text-xs font-semibold tracking-[0.14em] uppercase">
                  {profile.servicesLabel}
                </dt>
                <dd className="mt-2.5">
                  <ul className="flex flex-wrap gap-2">
                    {services.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={serviceUrl(service.slug)}
                          className="border-brand-mist text-brand-action hover:border-brand-sky hover:bg-brand-sky-soft active:bg-brand-sky-soft inline-flex min-h-10 items-center gap-2 rounded-full border bg-white px-3.5 text-[0.8125rem] font-semibold transition-colors duration-150"
                        >
                          <service.icon
                            aria-hidden="true"
                            className="size-3.5"
                            strokeWidth={1.75}
                          />
                          {service.shortName}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div className="py-4">
                <dt className="text-brand-slate text-xs font-semibold tracking-[0.14em] uppercase">
                  {profile.practicesLabel}
                </dt>
                <dd className="mt-2">
                  <ul className="text-brand-ink space-y-1.5 text-[0.9375rem] font-medium">
                    {profile.practices.map((practice) => (
                      <li key={practice} className="flex items-center gap-2.5">
                        <span
                          aria-hidden="true"
                          className="bg-brand-sky size-1.5 shrink-0 rounded-full"
                        />
                        {practice}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>

            <div className="border-brand-mist border-t px-1 pt-3">
              <CtaLink href={primaryCta.href}>{primaryCta.label}</CtaLink>
            </div>
          </div>
        </motion.div>

        <div className="lg:col-span-7 lg:pt-4">
          <AnimatedContent>
            <SectionHeading
              id={headingId}
              eyebrow={profile.eyebrow}
              title={profile.heading}
            />
            <p className="measure text-lead text-brand-ink mt-6 font-serif italic">
              {profile.body}
            </p>
          </AnimatedContent>

          <AnimatedContent delay={0.06}>
            <h3 className="font-display text-brand-ink mt-14 text-lg font-semibold sm:mt-16 sm:text-xl">
              {profile.pointsHeading}
            </h3>
          </AnimatedContent>

          <ol ref={listRef} className="mt-8">
            {profile.points.map((point, index) => {
              const lit = !motionAllowed || index <= reached;
              const isLast = index === lastIndex;
              return (
                <li
                  key={point.title}
                  className={cn(
                    "relative grid grid-cols-[3rem_minmax(0,1fr)] gap-5 sm:gap-6",
                    !isLast && "pb-10",
                  )}
                >
                  {isLast ? null : (
                    <ScrollRailSegment
                      progress={scrollYProgress}
                      range={[index / lastIndex, (index + 1) / lastIndex]}
                      animate={motionAllowed}
                      className="top-12 bottom-0 left-6 w-px"
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "relative z-10 flex size-12 items-center justify-center rounded-2xl border transition-[background-color,border-color,color,box-shadow] duration-300 ease-out motion-reduce:transition-none",
                      lit
                        ? "border-brand-action bg-brand-action shadow-lift text-white"
                        : "border-brand-mist text-brand-action bg-white",
                    )}
                  >
                    <point.icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <AnimatedContent delay={index * 0.06} className="pt-0.5">
                    <p className="font-display text-brand-slate text-xs font-semibold tracking-[0.16em]">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h4 className="font-display text-h3 text-brand-ink mt-1 font-semibold">
                      {point.title}
                    </h4>
                    <p className="measure-narrow text-brand-slate mt-2 text-[1.0625rem] leading-relaxed">
                      {point.body}
                    </p>
                  </AnimatedContent>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import { CtaButton, CtaLink } from "@/components/marketing/cta";
import { hero, primaryCta, servicesIntro } from "@/content/site";
import { services, serviceUrl } from "@/content/services";

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
  image?: { src: string; alt: string };
}

interface Features5Props {
  id?: string;
  eyebrow?: string;
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
  eyebrow = servicesIntro.eyebrow,
  heading = servicesIntro.heading,
  body = servicesIntro.body,
  primary = primaryCta,
  secondary = hero.secondaryCta,
  showCtas = true,
  items = homeItems,
}: Features5Props = {}) {
  return (
    <section aria-labelledby={id} className="bg-canvas w-full px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto w-full max-w-[90rem]">
        {eyebrow ? <p className="eyebrow-label">{eyebrow}</p> : null}
        <div className="mt-5 grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <h2
            id={id}
            className="font-display text-brand-ink max-w-3xl text-[clamp(2.25rem,1.4rem+2.4vw,3.75rem)] leading-[1.05] font-medium tracking-tight text-balance"
          >
            {heading}
          </h2>
          <div>
            {body ? <p className="text-brand-slate text-lg leading-relaxed">{body}</p> : null}
            {showCtas && (primary || secondary) ? (
              <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                {primary ? <CtaButton href={primary.href}>{primary.label}</CtaButton> : null}
                {secondary ? <CtaLink href={secondary.href}>{secondary.label}</CtaLink> : null}
              </div>
            ) : null}
          </div>
        </div>

        <ol className="border-brand-mist mt-16 border-t">
          {items.map((feature, index) => {
            const row = (
              <>
                <span className="text-brand-slate font-label text-sm tracking-[0.16em]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="font-display text-brand-ink block text-2xl leading-tight sm:text-3xl">
                    {feature.title}
                  </span>
                  <span className="text-brand-slate mt-2 block max-w-xl text-base leading-relaxed">
                    {feature.description}
                  </span>
                </span>
              </>
            );
            const className =
              "border-brand-mist grid grid-cols-[3rem_1fr] items-baseline gap-4 border-b py-8 sm:grid-cols-[4.5rem_1fr] sm:gap-8 sm:py-10";
            return feature.href ? (
              <li key={feature.title}>
                <Link href={feature.href} className={`${className} hover:text-brand-action-deep group`}>
                  {row}
                </Link>
              </li>
            ) : (
              <li key={feature.title} className={className}>
                {row}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export default Features5;

"use client";

import { CtaButton, CtaLink } from "@/components/marketing/cta";
import { capabilityPillars, hero } from "@/content/site";

export function Hero14() {
  return (
    <section className="bg-canvas flex min-h-[100svh] w-full items-end px-5 pt-[calc(var(--header-height)+3rem)] pb-16 sm:px-8 sm:pb-24">
      <div className="mx-auto w-full max-w-[90rem]">
        <p className="eyebrow-label">{hero.eyebrow}</p>
        <h1 className="font-display text-brand-ink mt-6 max-w-5xl text-[clamp(2.75rem,1.4rem+4.2vw,5.5rem)] leading-[1.02] font-medium tracking-[-0.03em] text-balance">
          {hero.heading}
        </h1>
        <p className="text-brand-slate mt-6 max-w-xl text-lg leading-relaxed">
          {hero.body}
        </p>
        <div className="mt-10 flex flex-col items-start gap-4 min-[26rem]:flex-row min-[26rem]:items-center">
          <CtaButton href={hero.primaryCta.href}>{hero.primaryCta.label}</CtaButton>
          <CtaLink href={hero.secondaryCta.href}>{hero.secondaryCta.label}</CtaLink>
        </div>
        <ul className="border-brand-mist mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t pt-6" aria-label="Capability areas">
          {capabilityPillars.map((pillar) => (
            <li key={pillar.label} className="text-brand-ink font-display text-lg">
              {pillar.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Hero14;

"use client";

import { CtaButton } from "@/components/marketing/cta";
import { finalCta } from "@/content/site";

interface Cta1Props {
  heading?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function Cta1({
  heading = finalCta.heading,
  body = finalCta.body,
  ctaLabel = finalCta.cta.label,
  ctaHref = finalCta.cta.href,
}: Cta1Props = {}) {
  return (
    <section className="bg-brand-ink text-canvas w-full px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto flex w-full max-w-[90rem] flex-col items-start gap-8">
        <h2 className="font-display max-w-4xl text-[clamp(2.5rem,1.4rem+3vw,4.5rem)] leading-[1.02] font-medium tracking-tight text-balance">
          {heading}
        </h2>
        {body ? <p className="max-w-xl text-lg leading-relaxed text-white/75">{body}</p> : null}
        <CtaButton href={ctaHref} tone="outline" className="border-white/30 text-white hover:border-white hover:bg-white hover:text-brand-ink">
          {ctaLabel}
        </CtaButton>
      </div>
    </section>
  );
}

export default Cta1;

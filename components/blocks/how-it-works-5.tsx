"use client";

import { CtaButton } from "@/components/marketing/cta";
import { approach, primaryCta } from "@/content/site";

export interface WorkStep {
  title: string;
  description: string;
}

interface HowItWorks5Props {
  id?: string;
  heading?: string;
  body?: string;
  cta?: { label: string; href: string };
  footnote?: string;
  steps?: readonly WorkStep[];
}

export function HowItWorks5({
  id = "approach-heading",
  heading = approach.heading,
  body = approach.eyebrow,
  cta = primaryCta,
  footnote = "Every engagement starts by understanding the practice you already run.",
  steps = approach.steps.map((step) => ({ title: step.title, description: step.body })),
}: HowItWorks5Props = {}) {
  return (
    <section aria-labelledby={id} className="bg-canvas w-full px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto grid w-full max-w-[90rem] items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="eyebrow-label">{body}</p>
          <h2
            id={id}
            className="font-display text-brand-ink mt-5 text-[clamp(2.25rem,1.4rem+2vw,3.5rem)] leading-[1.05] font-medium tracking-tight"
          >
            {heading}
          </h2>
          <div className="mt-8">
            <CtaButton href={cta.href}>{cta.label}</CtaButton>
          </div>
          {footnote ? <p className="text-brand-slate mt-6 max-w-sm text-sm leading-relaxed">{footnote}</p> : null}
        </div>
        <ol className="border-brand-mist border-t">
          {steps.map((step, index) => (
            <li key={step.title} className="border-brand-mist grid grid-cols-[3rem_1fr] gap-4 border-b py-7">
              <span className="text-brand-slate font-label text-sm tracking-[0.16em]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-brand-ink text-2xl">{step.title}</h3>
                <p className="text-brand-slate mt-2 leading-relaxed">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default HowItWorks5;

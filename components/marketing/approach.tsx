"use client";

import { HowItWorks5 } from "@/components/blocks/how-it-works-5";
import { CtaButton } from "@/components/marketing/cta";
import { approach, approachStepsWithBodies, primaryCta } from "@/content/site";
import { getService } from "@/content/services";

interface ApproachProps {
  id?: string;
  slug?: string;
}

export function Approach({ id = "approach-heading", slug }: ApproachProps = {}) {
  if (slug) {
    const service = getService(slug);
    if (!service) return null;
    const steps = approachStepsWithBodies(service.page.approachBodies);
    return (
      <HowItWorks5
        id={id}
        heading={service.page.approachHeading ?? `Bringing ${service.shortName} into the practice.`}
        body={service.page.approachEyebrow ?? approach.eyebrow}
        footnote={
          service.page.approachFootnote ??
          `Every ${service.shortName} engagement starts by understanding the practice you already run.`
        }
        cta={primaryCta}
        steps={steps.map((step) => ({ title: step.title, description: step.body }))}
      />
    );
  }

  return (
    <section aria-labelledby={id} className="bg-canvas w-full px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto w-full max-w-[90rem]">
        <p className="eyebrow-label">{approach.eyebrow}</p>
        <h2
          id={id}
          className="font-display text-brand-ink mt-5 max-w-3xl text-[clamp(2.25rem,1.4rem+2.4vw,3.75rem)] leading-[1.05] font-medium tracking-tight"
        >
          {approach.heading}
        </h2>
        <ol className="border-brand-mist mt-14 border-t">
          {approach.steps.map((step) => (
            <li
              key={step.step}
              className="border-brand-mist grid gap-3 border-b py-8 sm:grid-cols-[5rem_14rem_1fr] sm:items-baseline sm:gap-8"
            >
              <span className="text-brand-slate font-label text-sm tracking-[0.16em]">{step.step}</span>
              <h3 className="font-display text-brand-ink text-2xl">{step.title}</h3>
              <p className="text-brand-slate leading-relaxed">{step.body}</p>
            </li>
          ))}
        </ol>
        <p className="text-brand-slate mt-8 text-sm">
          Every engagement starts by understanding the practice you already run.
        </p>
        <div className="mt-6">
          <CtaButton href={primaryCta.href}>{primaryCta.label}</CtaButton>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";

import { Bento4 } from "@/components/blocks/bento-4";
import { HowItWorks5 } from "@/components/blocks/how-it-works-5";
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
    <section aria-labelledby={id} className="bg-canvas w-full px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto w-full max-w-[1400px]">
        <Bento4
          headingId={id}
          title={approach.heading}
          body={approach.eyebrow}
          steps={approach.steps.map((step) => ({ title: step.title, body: step.body }))}
        />
        <p className="text-brand-slate mt-6 text-sm">
          Every engagement starts by understanding the practice you already run.
        </p>
        <Link href={primaryCta.href} className="bg-brand-ink mt-6 inline-flex h-12 items-center rounded-full px-7 text-sm font-semibold text-white">
          {primaryCta.label}
        </Link>
      </div>
    </section>
  );
}

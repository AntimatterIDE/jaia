"use client";

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

  return <HowItWorks5 id={id} />;
}

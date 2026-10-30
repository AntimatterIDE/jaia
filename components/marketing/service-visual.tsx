"use client";

import { Bento1 } from "@/components/blocks/bento-1";
import { Bento4 } from "@/components/blocks/bento-4";
import { Bento7 } from "@/components/blocks/bento-7";
import { Bento16 } from "@/components/blocks/bento-16";
import { Bento23 } from "@/components/blocks/bento-23";
import { Bento24 } from "@/components/blocks/bento-24";
import { approachStepsWithBodies } from "@/content/site";
import { getService } from "@/content/services";

export function ServiceVisual({ slug }: { slug: string }) {
  const service = getService(slug);
  if (!service) return null;

  const details = service.page.detail.map((item) => ({
    title: item.label,
    label: item.label,
    detail: item.body,
    icon: item.icon,
  }));
  const steps = approachStepsWithBodies(service.page.approachBodies).map((step) => ({
    title: step.title,
    body: step.body,
  }));

  if (slug === "apcm-bhi") {
    return <Bento4 title={service.shortName} body={service.category} steps={steps} />;
  }
  if (slug === "hrv-assessment") {
    return <Bento24 title={service.shortName} body={service.summary} />;
  }
  if (slug === "iv-therapy") {
    return <Bento7 title={service.shortName} body={service.category} items={details} />;
  }
  if (slug === "billing-rcm") {
    return <Bento16 title={service.shortName} body={service.category} layers={details} />;
  }
  if (slug === "laboratory-coordination") {
    return (
      <Bento1
        hub="Labs"
        title={service.shortName}
        body={service.category}
        sources={details}
      />
    );
  }
  return <Bento23 title={service.shortName} body={service.category} items={details} />;
}

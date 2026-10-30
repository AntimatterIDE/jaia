"use client";

import { Features5 } from "@/components/blocks/features-5";
import { aboutPage, partnershipMap } from "@/content/site";

export function PartnershipFeatures() {
  return (
    <Features5
      id="model-heading"
      heading={aboutPage.modelHeading}
      body={`${aboutPage.modelBody} ${aboutPage.modelContinue}`}
      showCtas={false}
      items={partnershipMap.areas.map((area) => ({
        icon: area.icon,
        title: area.label,
        description: area.description,
      }))}
    />
  );
}

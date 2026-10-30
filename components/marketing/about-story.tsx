"use client";

import { Bento16 } from "@/components/blocks/bento-16";
import { Hero1 } from "@/components/blocks/hero-1";
import { aboutStory, partnershipMap } from "@/content/site";

export function AboutStory() {
  return (
    <Hero1
      tone="section"
      eyebrow={aboutStory.eyebrow}
      heading={aboutStory.heading}
      headingId="about-story-heading"
      body={aboutStory.body}
      primary={aboutStory.cta}
      media={
        <Bento16
          title={partnershipMap.title}
          body={partnershipMap.defaultBody}
          layers={partnershipMap.areas.map((area) => ({
            label: area.label,
            detail: area.description,
            icon: area.icon,
          }))}
        />
      }
    />
  );
}

"use client";

import { Hero1 } from "@/components/blocks/hero-1";
import { aboutStory } from "@/content/site";

export function AboutStory() {
  return (
    <Hero1
      tone="section"
      eyebrow={aboutStory.eyebrow}
      heading={aboutStory.heading}
      headingId="about-story-heading"
      body={aboutStory.body}
      primary={aboutStory.cta}
      image={{
        src: "/images/about-team-collaboration.jpg",
        alt: "A physician, a practice administrator, and a clinical staff member reviewing performance charts together on a monitor",
      }}
    />
  );
}

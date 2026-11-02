"use client";

import { Hero24 } from "@/components/react-bits/hero-24";
import { aboutPage, primaryCta } from "@/content/site";
import { timelineSection } from "@/content/timeline";

/**
 * About page first screen — Hero24 with React Bits NeuroNoise only.
 * No photography or video.
 */
export function AboutHero() {
  return (
    <Hero24
      eyebrow={aboutPage.eyebrow}
      heading={aboutPage.heading}
      headingId="about-heading"
      body={aboutPage.heroBody}
      primaryCta={primaryCta}
      secondaryCta={{
        label: timelineSection.eyebrow,
        href: "#timeline",
      }}
      facts={timelineSection.facts}
      parallax
    />
  );
}

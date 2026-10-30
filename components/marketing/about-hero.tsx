"use client";

import { Hero24 } from "@/components/react-bits/hero-24";
import { aboutPage, primaryCta } from "@/content/site";
import { timelineSection } from "@/content/timeline";

/** User-supplied corridor clip, copied into the public tree. */
const ABOUT_HERO_VIDEO = "/videos/hospital-corridor.mp4";

/**
 * About page first screen — Hero24 layout with JAIA copy and the
 * hospital-corridor video. The page stays a server component; this is
 * the client island.
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
      videoSrc={ABOUT_HERO_VIDEO}
    />
  );
}

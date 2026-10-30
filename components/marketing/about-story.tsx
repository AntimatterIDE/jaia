"use client";

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
        <ol className="border-brand-mist border-t">
          {partnershipMap.areas.map((area, index) => (
            <li key={area.id} className="border-brand-mist grid grid-cols-[3rem_1fr] gap-4 border-b py-6">
              <span className="text-brand-slate font-label text-sm tracking-[0.16em]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>
                <span className="font-display text-brand-ink block text-2xl">{area.label}</span>
                <span className="text-brand-slate mt-1 block leading-relaxed">{area.description}</span>
              </span>
            </li>
          ))}
        </ol>
      }
    />
  );
}

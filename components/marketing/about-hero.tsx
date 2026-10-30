"use client";

import { Hero1 } from "@/components/blocks/hero-1";
import { aboutPage, primaryCta } from "@/content/site";
import { timelineSection } from "@/content/timeline";

export function AboutHero() {
  return (
    <Hero1
      eyebrow={aboutPage.eyebrow}
      heading={aboutPage.heading}
      headingId="about-heading"
      body={aboutPage.heroBody}
      primary={primaryCta}
      secondary={{
        label: timelineSection.eyebrow,
        href: "#timeline",
      }}
      media={
        <dl className="border-brand-mist border-t">
          {timelineSection.facts.map((fact) => (
            <div key={fact.label} className="border-brand-mist border-b py-6">
              <dd className="font-display text-brand-ink text-5xl tracking-tight">{fact.value}</dd>
              <dt className="text-brand-slate mt-2 text-sm">{fact.label}</dt>
            </div>
          ))}
        </dl>
      }
    />
  );
}

import type { Metadata } from "next";

import { Showcase6Grid } from "@/components/react-bits/showcase-6";
import {
  caseStudies,
  caseStudiesPage,
  caseStudySection,
  caseStudyShowcaseItem,
} from "@/content/case-studies";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Case studies",
  description: caseStudiesPage.intro,
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: `Case studies | ${siteConfig.name}`,
    description: caseStudiesPage.intro,
  },
};

export default function CaseStudiesPage() {
  const items = caseStudies.map(caseStudyShowcaseItem);

  return (
    <section
      aria-labelledby="case-studies-index-heading"
      className="bg-canvas"
    >
      <div className="mx-auto w-full max-w-[90rem] px-5 pt-[calc(var(--header-height)+2.5rem)] pb-16 sm:px-8 sm:pt-[calc(var(--header-height)+4rem)] sm:pb-24 lg:pt-[calc(var(--header-height)+5rem)]">
        <p className="text-eyebrow font-display text-brand-action font-semibold tracking-[0.18em] uppercase">
          {caseStudySection.eyebrow}
        </p>
        <h1
          id="case-studies-index-heading"
          className="font-display text-h2 text-brand-ink mt-5 max-w-3xl font-semibold text-balance"
        >
          {caseStudySection.heading}
        </h1>
        <p className="measure text-lead text-brand-slate mt-5 max-w-2xl">
          {caseStudiesPage.intro}
        </p>

        <Showcase6Grid items={items} />
      </div>
    </section>
  );
}

import type { Metadata } from "next";

import { Hero1 } from "@/components/blocks/hero-1";
import { CaseStudyVisual } from "@/components/marketing/case-study-visual";
import { FloatPanel } from "@/components/marketing/float-panel";
import { FinalCta } from "@/components/marketing/final-cta";
import { Showcase6Grid } from "@/components/react-bits/showcase-6";
import {
  caseStudies,
  caseStudiesPage,
  caseStudySection,
  caseStudyShowcaseItem,
} from "@/content/case-studies";
import { primaryCta, siteConfig } from "@/content/site";

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
    <>
      <Hero1
        eyebrow={caseStudySection.eyebrow}
        heading={caseStudySection.heading}
        headingId="case-studies-index-heading"
        body={caseStudiesPage.intro}
        primary={primaryCta}
        media={
          <FloatPanel>
            <CaseStudyVisual />
          </FloatPanel>
        }
      />
      <div className="mx-auto w-full max-w-[90rem] px-5 pb-12 sm:px-8 sm:pb-16">
        <Showcase6Grid items={items} />
      </div>
      <FinalCta
        heading="Want a similar path for your practice?"
        body="Tell us where you want to grow. JAIA will help you map the right next conversation."
      />
    </>
  );
}

import type { Metadata } from "next";

import { Hero1 } from "@/components/blocks/hero-1";
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
    <>
      <Hero1
        eyebrow={caseStudySection.eyebrow}
        heading={caseStudySection.heading}
        headingId="case-studies-index-heading"
        body={caseStudiesPage.intro}
        image={{
          src: "/images/about-team-collaboration.jpg",
          alt: "A physician and practice team reviewing how a program is running",
        }}
      />
      <div className="mx-auto w-full max-w-[90rem] px-5 pb-20 sm:px-8">
        <Showcase6Grid items={items} />
      </div>
    </>
  );
}

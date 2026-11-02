import { Showcase6 } from "@/components/react-bits/showcase-6";
import {
  caseStudyShowcaseItem,
  featuredCaseStudies,
} from "@/content/case-studies";

export function CaseStudiesStrip() {
  const items = featuredCaseStudies().map(caseStudyShowcaseItem);

  return (
    <Showcase6
      id="case-studies"
      headingId="case-studies-heading"
      items={items}
    />
  );
}

import { Showcase6 } from "@/components/react-bits/showcase-6";
import {
  caseStudySection,
  caseStudyShowcaseItem,
  featuredCaseStudies,
} from "@/content/case-studies";

export function CaseStudiesStrip() {
  const items = featuredCaseStudies().map(caseStudyShowcaseItem);

  return (
    <Showcase6
      id="case-studies"
      headingId="case-studies-heading"
      headingLead={caseStudySection.headingLead}
      headingAccent={caseStudySection.headingAccent}
      body={caseStudySection.body}
      cta={caseStudySection.cta}
      items={items}
    />
  );
}

import { Hero } from "@/components/marketing/hero";
import { CaseStudiesStrip } from "@/components/marketing/case-studies-strip";
import { Features5 } from "@/components/blocks/features-5";
import { Outcomes } from "@/components/marketing/outcomes";
import { Approach } from "@/components/marketing/approach";
import { AboutStory } from "@/components/marketing/about-story";
import { SocialProof } from "@/components/marketing/social-proof";
import { Faq } from "@/components/marketing/faq";
import { FinalCta } from "@/components/marketing/final-cta";
import { caseStudySection } from "@/content/case-studies";
import { siteConfig } from "@/content/site";

/** Verified organization fields only — no invented address, phone, or socials */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/brand/jaia-logo-horizontal.png`,
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Hero />
      <CaseStudiesStrip />
      <div id="capabilities">
        <Features5 secondary={caseStudySection.cta} />
      </div>
      <Outcomes />
      <Approach />
      <AboutStory />
      <SocialProof />
      <Faq />
      <FinalCta />
    </>
  );
}

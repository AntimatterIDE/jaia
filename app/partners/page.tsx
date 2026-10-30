import { Fragment } from "react";
import type { Metadata } from "next";

import { FinalCta } from "@/components/marketing/final-cta";
import { PartnerClaimFlow } from "@/components/marketing/partner-claim-flow";
import { PartnerInterview } from "@/components/marketing/partner-interview";
import { PartnerProfile } from "@/components/marketing/partner-profile";
import { PartnerResults } from "@/components/marketing/partner-results";
import { PartnerStatement } from "@/components/marketing/partner-statement";
import { PartnerTechnology } from "@/components/marketing/partner-technology";
import { Hero24, type Hero24Logo } from "@/components/react-bits/hero-24";
import { partnerSpotlights, partnersPage } from "@/content/partner-spotlights";
import { servicePartners } from "@/content/partners";
import { primaryCta, siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Partners",
  description: partnersPage.intro,
  alternates: { canonical: "/partners" },
  openGraph: {
    title: `Partners | ${siteConfig.name}`,
    description: partnersPage.intro,
  },
};

const featuredLogos: Hero24Logo[] = [
  ...partnerSpotlights.map((partner) => ({
    ...partner.logo,
    href: `#${partner.anchor}`,
  })),
  ...Object.values(servicePartners).flatMap((partner) =>
    partner
      ? [{ ...partner.logo, href: `#${partnersPage.technology.anchor}` }]
      : [],
  ),
];

export default function PartnersPage() {
  const [lead] = partnerSpotlights;

  return (
    <>
      <Hero24
        eyebrow={partnersPage.eyebrow}
        heading={partnersPage.heading}
        headingId="partners-heading"
        body={partnersPage.intro}
        primaryCta={primaryCta}
        secondaryCta={{
          label: partnersPage.spotlightCtaLabel,
          href: lead ? `#${lead.anchor}` : `#${partnersPage.technology.anchor}`,
        }}
        logos={{ label: partnersPage.logosLabel, items: featuredLogos }}
        image={partnersPage.heroImage}
        parallax
      />

      {partnerSpotlights.map((partner) => (
        <Fragment key={partner.slug}>
          <PartnerProfile slug={partner.slug} />
          <PartnerResults slug={partner.slug} />
          <PartnerClaimFlow slug={partner.slug} />
          <PartnerStatement slug={partner.slug} />
          <PartnerInterview slug={partner.slug} />
        </Fragment>
      ))}

      <PartnerTechnology />

      <FinalCta
        heading={partnersPage.finalCta.heading}
        body={partnersPage.finalCta.body}
      />
    </>
  );
}

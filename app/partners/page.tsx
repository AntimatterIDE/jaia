import { Fragment } from "react";
import type { Metadata } from "next";
import Image from "next/image";

import { Hero1 } from "@/components/blocks/hero-1";
import { FinalCta } from "@/components/marketing/final-cta";
import { PartnerClaimFlow } from "@/components/marketing/partner-claim-flow";
import { PartnerInterview } from "@/components/marketing/partner-interview";
import { PartnerProfile } from "@/components/marketing/partner-profile";
import { PartnerResults } from "@/components/marketing/partner-results";
import { PartnerStatement } from "@/components/marketing/partner-statement";
import { PartnerTechnology } from "@/components/marketing/partner-technology";
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

const featuredLogos = [
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
      <Hero1
        eyebrow={partnersPage.eyebrow}
        heading={partnersPage.heading}
        headingId="partners-heading"
        body={partnersPage.intro}
        primary={primaryCta}
        secondary={{
          label: partnersPage.spotlightCtaLabel,
          href: lead ? `#${lead.anchor}` : `#${partnersPage.technology.anchor}`,
        }}
      />

      <section aria-label={partnersPage.logosLabel} className="bg-canvas px-5 pb-16 sm:px-8">
        <div className="border-brand-mist mx-auto flex w-full max-w-[90rem] flex-wrap items-center gap-10 border-t pt-10">
          <p className="eyebrow-label">{partnersPage.logosLabel}</p>
          {featuredLogos.map((logo) => (
            <Image
              key={logo.src}
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="h-10 w-auto"
            />
          ))}
        </div>
      </section>

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

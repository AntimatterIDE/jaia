import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceHero } from "@/components/marketing/service-hero";
import { ServiceCapabilities } from "@/components/marketing/service-capabilities";
import { Outcomes } from "@/components/marketing/outcomes";
import { Approach } from "@/components/marketing/approach";
import { SocialProof } from "@/components/marketing/social-proof";
import { Faq } from "@/components/marketing/faq";
import { RelatedServices } from "@/components/marketing/related-services";
import { ServicePartner } from "@/components/marketing/service-partner";
import { FinalCta } from "@/components/marketing/final-cta";
import { getService, services, serviceUrl } from "@/content/services";
import { approachStepsWithBodies, siteConfig } from "@/content/site";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.shortName} — ${service.category}`,
    description: service.metaDescription,
    alternates: { canonical: serviceUrl(service.slug) },
    openGraph: {
      title: `${service.name} | ${siteConfig.name}`,
      description: service.metaDescription,
    },
  };
}

/**
 * Service page — mirrors the homepage section rhythm so every capability gets
 * a full destination rather than a stub. Content comes entirely from the
 * `page` block on each record in content/services.ts.
 */
export default async function ServicePage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.summary,
    serviceType: service.category,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    // Only the approved capability labels, which are visible on the page
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.shortName} capabilities`,
      itemListElement: service.capabilityLabels.map((label) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: label },
      })),
    },
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.page.faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <ServiceHero
        category={service.category}
        name={service.name}
        summary={service.summary}
        tagline={service.page.heroTagline}
        primaryCtaLabel={service.page.heroCtaLabel}
      />

      <ServiceCapabilities service={service} />

      <ServicePartner slug={service.slug} />

      <Outcomes
        id="service-outcomes-heading"
        eyebrow={service.page.outcomesEyebrow ?? "What this makes possible"}
        heading={
          service.page.outcomesHeading ??
          `Why practices add ${service.shortName.replace(/ \+ /g, "\u00a0+\u00a0").replace(/ & /g, "\u00a0&\u00a0")} to how they operate.`
        }
        headingClassName="max-w-3xl"
        items={service.page.outcomes}
      />

      {service.page.secondaryOutcomes ? (
        <Outcomes
          id={service.page.secondaryOutcomes.id}
          eyebrow={service.page.secondaryOutcomes.eyebrow}
          heading={service.page.secondaryOutcomes.heading}
          headingClassName="max-w-3xl"
          items={service.page.secondaryOutcomes.items}
        />
      ) : null}

      <Approach
        id="service-approach-heading"
        eyebrow={service.page.approachEyebrow}
        heading={
          service.page.approachHeading ??
          `Bringing ${service.shortName} into the practice.`
        }
        steps={approachStepsWithBodies(service.page.approachBodies)}
        footnote={
          service.page.approachFootnote ??
          `Every ${service.shortName} engagement starts by understanding the practice you already run.`
        }
      />

      <SocialProof />

      <Faq
        id="service-faq-heading"
        heading={`Common questions about ${service.shortName}.`}
        items={service.page.faqs}
      />

      <RelatedServices
        slugs={service.page.relatedSlugs}
        from={service.shortName}
      />

      <FinalCta
        heading={service.page.finalCta?.heading}
        body={service.page.finalCta?.body}
        ctaLabel={service.page.finalCta?.ctaLabel}
      />
    </>
  );
}

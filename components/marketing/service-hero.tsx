"use client";

import { Hero1 } from "@/components/blocks/hero-1";
import { primaryCta } from "@/content/site";
import { getService } from "@/content/services";

interface ServiceHeroProps {
  slug: string;
}

export function ServiceHero({ slug }: ServiceHeroProps) {
  const service = getService(slug);
  if (!service) return null;

  return (
    <Hero1
      eyebrow={service.category}
      heading={service.name}
      headingId="service-heading"
      body={service.page.heroTagline ? `${service.page.heroTagline} ${service.summary}` : service.summary}
      primary={{ label: service.page.heroCtaLabel ?? primaryCta.label, href: primaryCta.href }}
      secondary={{ label: "See what's included", href: "#included" }}
      image={service.image ? { src: service.image.src, alt: service.image.alt } : undefined}
    />
  );
}

"use client";

import { Features11 } from "@/components/blocks/features-11";
import { getService, serviceUrl } from "@/content/services";

export function RelatedServices({ slugs, from }: { slugs: readonly string[]; from: string }) {
  const related = slugs.map((slug) => getService(slug)).filter((service) => service !== undefined);
  if (related.length === 0) return null;

  return (
    <Features11
      id="related-heading"
      heading={`What practices explore alongside ${from}.`}
      body="Often considered together"
      items={related.map((service) => ({
        icon: service.icon,
        title: service.shortName,
        description: service.summary,
        href: serviceUrl(service.slug),
        linkLabel: "Read the capability",
      }))}
    />
  );
}

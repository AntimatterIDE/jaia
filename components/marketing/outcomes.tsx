"use client";

import { Features11 } from "@/components/blocks/features-11";
import { outcomes } from "@/content/site";
import { getService, serviceUrl } from "@/content/services";

interface OutcomesProps {
  id?: string;
  /** When set, the section uses that service's published outcomes. */
  slug?: string;
  secondary?: boolean;
}

export function Outcomes({ id = "outcomes-heading", slug, secondary = false }: OutcomesProps = {}) {
  if (slug) {
    const service = getService(slug);
    if (!service) return null;
    const block = secondary ? service.page.secondaryOutcomes : undefined;
    if (secondary && !block) return null;
    const source = block?.items ?? service.page.outcomes;
    return (
      <Features11
        id={block?.id ?? id}
        heading={
          block?.heading ??
          service.page.outcomesHeading ??
          `Why practices add ${service.shortName} to how they operate.`
        }
        body={block?.eyebrow ?? service.page.outcomesEyebrow ?? "What this makes possible"}
        items={source.map((item) => ({
          icon: item.icon,
          title: item.title,
          description: item.body,
        }))}
      />
    );
  }

  return (
    <Features11
      id={id}
      heading={outcomes.heading}
      body={outcomes.eyebrow}
      items={outcomes.items.map((item) => {
        const first = item.slugs[0];
        return {
          icon: item.icon,
          title: item.title,
          description: item.body,
          href: first ? serviceUrl(first) : undefined,
          linkLabel: first ? "See the capability" : undefined,
        };
      })}
    />
  );
}

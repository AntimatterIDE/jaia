"use client";

import { Features5 } from "@/components/blocks/features-5";
import { getService } from "@/content/services";

export function ServiceCapabilities({ slug }: { slug: string }) {
  const service = getService(slug);
  if (!service) return null;

  return (
    <div id="included">
      <Features5
        id="included-heading"
        heading={service.page.includesHeading ?? `What ${service.shortName} includes`}
        body={service.page.includesEyebrow ?? service.page.intro}
        showCtas={false}
        items={service.page.detail.map((item) => ({
          icon: item.icon,
          title: item.label,
          description: item.body,
        }))}
      />
    </div>
  );
}

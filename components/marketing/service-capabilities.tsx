import { CapabilityScrollStack } from "@/components/marketing/capability-scroll-stack";
import type { ScrollStackItem } from "@/components/react-bits/scroll-stack";
import type { ServiceRecord } from "@/content/services";

const ACCENT = "#87cdec";

/**
 * Distinct full-bleed stills for each include card, in `page.detail` order.
 * Each service's homepage stack still fills the include it matches; the
 * remaining cards use dedicated include stills so a page never stacks
 * three copies of one image.
 */
const includeImages: Record<
  string,
  { src: string; imagePosition?: string }[]
> = {
  "apcm-bhi": [
    { src: "/images/include-program-infrastructure.jpg" },
    { src: "/images/care-management-coordinator.jpg" },
    { src: "/images/include-behavioral-health.jpg" },
  ],
  "hrv-assessment": [
    { src: "/images/hrv-assessment-clinic.jpg" },
    { src: "/images/include-care-plan-insights.jpg" },
    { src: "/images/include-longitudinal-tracking.jpg" },
  ],
  "iv-therapy": [
    { src: "/images/iv-therapy-suite.jpg" },
    { src: "/images/include-supply-chain.jpg" },
    { src: "/images/include-staff-training-iv.jpg" },
  ],
  "billing-rcm": [
    { src: "/images/billing-rcm-workspace.jpg" },
    { src: "/images/include-denial-management.jpg" },
    { src: "/images/include-ar-recovery.jpg" },
  ],
  "laboratory-coordination": [
    { src: "/images/lab-reference-coordination.jpg" },
    { src: "/images/include-partnership-coordination.jpg" },
    { src: "/images/include-test-routing.jpg" },
  ],
  "pol-establishment": [
    { src: "/images/include-clia-considerations.jpg" },
    { src: "/images/lab-office-bench.jpg" },
    { src: "/images/include-staff-training-pol.jpg" },
  ],
};

const NBSP = "\u00a0";

/**
 * Keep the service name from splitting across lines. StaggeredText segments
 * on regular spaces, so NBSP around `+` / `&` (and a short last token) makes
 * “APCM + BHI.” wrap as one unit instead of leaving “BHI.” alone.
 */
function includesHeadingTitle(shortName: string): string {
  const glued = shortName
    .replace(/ \+ /g, `${NBSP}+${NBSP}`)
    .replace(/ & /g, `${NBSP}&${NBSP}`)
    .replace(/ (\S{1,4})$/, `${NBSP}$1`);
  return `The work behind ${glued}.`;
}

function includeItems(service: ServiceRecord): ScrollStackItem[] {
  const photos = includeImages[service.slug] ?? [];
  return service.page.detail.map((detail, index) => {
    const photo = photos[index];
    return {
      eyebrow: `${String(index + 1).padStart(2, "0")}  ·  ${service.category}`,
      title: detail.label,
      body: detail.body,
      image: photo?.src,
      imagePosition: photo?.imagePosition,
      accent: ACCENT,
    };
  });
}

/**
 * What a service actually includes. Heading + intro stay on the page;
 * the three include items render as the shared ScrollStack (or a plain
 * list under prefers-reduced-motion). Copy is the approved `detail` rows.
 */
export function ServiceCapabilities({ service }: { service: ServiceRecord }) {
  return (
    <CapabilityScrollStack
      id="included"
      headingId="included-heading"
      heading={{
        eyebrow: service.page.includesEyebrow ?? "What it includes",
        title:
          service.page.includesHeading ??
          includesHeadingTitle(service.shortName),
        body: service.page.intro,
        className: "max-w-none",
      }}
      items={includeItems(service)}
    />
  );
}

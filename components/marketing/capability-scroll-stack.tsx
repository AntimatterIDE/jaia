"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";
import AnimatedContent from "@/components/AnimatedContent";
import { SectionHeading } from "@/components/marketing/section-heading";
import {
  Face,
  ScrollStack,
  type ScrollStackItem,
} from "@/components/react-bits/scroll-stack";
import { services, serviceUrl } from "@/content/services";
import { servicesIntro } from "@/content/site";

export const STACK_ACCENT = "#87cdec";
const CARD_RADIUS = 22;
const emptySubscribe = () => () => {};

/**
 * Full-bleed backgrounds for the homepage stack: client-supplied stills in a
 * more futuristic direction than the service-page photography, which keeps
 * its own images.
 */
const stackImages: Record<
  string,
  { src: string; imagePosition?: string }
> = {
  "apcm-bhi": { src: "/images/care-management-coordinator.jpg" },
  "hrv-assessment": { src: "/images/hrv-assessment-clinic.jpg" },
  "iv-therapy": { src: "/images/iv-therapy-suite.jpg" },
  "billing-rcm": { src: "/images/billing-rcm-workspace.jpg" },
  "laboratory-coordination": { src: "/images/lab-reference-coordination.jpg" },
  "pol-establishment": { src: "/images/lab-office-bench.jpg" },
};

const homepageItems: ScrollStackItem[] = services.map((service, index) => {
  const photo = stackImages[service.slug];
  return {
    eyebrow: `${String(index + 1).padStart(2, "0")}  ·  ${service.category}`,
    title: service.shortName,
    body: service.summary,
    image: photo?.src ?? service.image?.src,
    imagePosition: photo?.imagePosition,
    accent: STACK_ACCENT,
    href: serviceUrl(service.slug),
  };
});

function CapabilityCardList({ items }: { items: ScrollStackItem[] }) {
  return (
    <ol className="mx-auto mt-12 flex w-full max-w-[880px] flex-col gap-5 px-4 pb-20 sm:mt-14 sm:gap-6 sm:px-8">
      {items.map((item, index) => (
        <li key={item.href ?? `${item.title}-${index}`} className="h-[min(28rem,70vh)]">
          <Face
            item={item}
            index={index}
            total={items.length}
            radius={CARD_RADIUS}
          />
        </li>
      ))}
    </ol>
  );
}

export type CapabilityScrollStackHeading = {
  eyebrow: string;
  title: string;
  body?: string;
  className?: string;
};

/**
 * Shared photo stack: homepage passes nothing (six linked services);
 * service pages pass that service’s include items (title + body, no href).
 * Hash `#capabilities` stays on the homepage section.
 */
export function CapabilityScrollStack({
  items = homepageItems,
  id = "capabilities",
  headingId = "capabilities-heading",
  heading = {
    eyebrow: servicesIntro.eyebrow,
    title: servicesIntro.heading,
    body: servicesIntro.body,
  },
}: {
  items?: ScrollStackItem[];
  id?: string;
  headingId?: string;
  heading?: CapabilityScrollStackHeading;
} = {}) {
  const reduceMotion = useReducedMotion();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const reduce = mounted && (reduceMotion ?? false);

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      data-capabilities-mode={
        id === "capabilities" ? (reduce ? "list" : "stack") : undefined
      }
      className="relative z-0 bg-canvas"
    >
      <div className="mx-auto w-full max-w-[90rem] px-5 pt-20 sm:px-8 sm:pt-28">
        <AnimatedContent>
          <SectionHeading
            id={headingId}
            eyebrow={heading.eyebrow}
            title={heading.title}
            body={heading.body}
            className={heading.className}
          />
        </AnimatedContent>
      </div>

      {reduce ? (
        <CapabilityCardList items={items} />
      ) : (
        <ScrollStack
          items={items}
          variant="stack"
          scrollLength={0.85}
          peek={18}
          scaleStep={0.05}
          blur={0}
          dim={0.18}
          smooth={0.12}
          depth={3}
          cardWidth={880}
          cardHeight={0.66}
          borderRadius={CARD_RADIUS}
          showProgress={false}
          showCounter={false}
          className="text-brand-action mt-10 sm:mt-12"
        />
      )}
    </section>
  );
}

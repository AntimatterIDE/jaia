"use client";

import { Bento23 } from "@/components/blocks/bento-23";
import { aboutPage, partnershipMap } from "@/content/site";

export function PartnershipFeatures() {
  return (
    <section aria-labelledby="model-heading" className="bg-canvas-soft w-full px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-10 lg:grid-cols-2">
        <div>
          <h2 id="model-heading" className="font-display text-brand-ink text-4xl font-semibold tracking-tight sm:text-5xl">
            {aboutPage.modelHeading}
          </h2>
          <p className="text-brand-slate mt-5 max-w-xl text-lg leading-relaxed">
            {aboutPage.modelBody} {aboutPage.modelContinue}
          </p>
        </div>
        <Bento23
          title={partnershipMap.areasLabel}
          body={partnershipMap.badgeLabel}
          items={partnershipMap.areas.map((area) => ({
            title: area.label,
            detail: area.description,
            icon: area.icon,
          }))}
        />
      </div>
    </section>
  );
}

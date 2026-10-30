"use client";

import { aboutPage, partnershipMap } from "@/content/site";

export function PartnershipFeatures() {
  return (
    <section aria-labelledby="model-heading" className="bg-canvas w-full px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto grid w-full max-w-[90rem] items-start gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2
            id="model-heading"
            className="font-display text-brand-ink text-[clamp(2.25rem,1.4rem+2vw,3.5rem)] leading-[1.05] font-medium tracking-tight"
          >
            {aboutPage.modelHeading}
          </h2>
          <p className="text-brand-slate mt-6 max-w-xl text-lg leading-relaxed">
            {aboutPage.modelBody} {aboutPage.modelContinue}
          </p>
        </div>
        <div>
          <p className="eyebrow-label">{partnershipMap.areasLabel}</p>
          <ol className="border-brand-mist mt-5 border-t">
            {partnershipMap.areas.map((area, index) => (
              <li
                key={area.id}
                className="border-brand-mist grid grid-cols-[3rem_1fr] gap-4 border-b py-6"
              >
                <span className="text-brand-slate font-label text-sm tracking-[0.16em]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="font-display text-brand-ink block text-2xl">{area.label}</span>
                  <span className="text-brand-slate mt-1 block leading-relaxed">{area.description}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

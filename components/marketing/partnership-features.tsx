"use client";

import { motion } from "motion/react";

import { Bento23 } from "@/components/blocks/bento-23";
import { FloatPanel } from "@/components/marketing/float-panel";
import { aboutPage, partnershipMap } from "@/content/site";

export function PartnershipFeatures() {
  return (
    <section aria-labelledby="model-heading" className="bg-canvas-soft w-full px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 id="model-heading" className="font-display text-brand-ink text-4xl font-semibold tracking-tight sm:text-5xl">
            {aboutPage.modelHeading}
          </h2>
          <p className="text-brand-slate mt-5 max-w-xl text-lg leading-relaxed">
            {aboutPage.modelBody} {aboutPage.modelContinue}
          </p>
        </motion.div>
        <FloatPanel>
        <Bento23
          title={partnershipMap.areasLabel}
          body={partnershipMap.badgeLabel}
          items={partnershipMap.areas.map((area) => ({
            title: area.label,
            detail: area.description,
            icon: area.icon,
          }))}
        />
        </FloatPanel>
      </div>
    </section>
  );
}

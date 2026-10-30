"use client";

import { Building2, Droplets, FlaskConical, type LucideIcon } from "lucide-react";

import { Bento7 } from "@/components/blocks/bento-7";
import { caseStudies, caseStudySection } from "@/content/case-studies";

const marks: Record<string, LucideIcon> = {
  "novo-wellness": Building2,
  "mukesh-gandhi": Building2,
  "iv-therapy": Droplets,
  "laboratory-coordination": FlaskConical,
};

export function CaseStudyVisual() {
  return (
    <Bento7
      title={caseStudySection.heading}
      body={caseStudySection.body}
      items={caseStudies.slice(0, 3).map((study) => ({
        title: study.name,
        detail: study.location ?? "Coming soon",
        icon: marks[study.slug] ?? Building2,
      }))}
    />
  );
}

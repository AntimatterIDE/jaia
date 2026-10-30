/**
 * Case studies shown on the homepage strip and `/case-studies`.
 *
 * Published studies are NOVO Wellness Center and WeCare only. Do not invent
 * outcome statistics, quotes, locations, or physician names. Novo’s condensed
 * narrative comes from the client-supplied JAIA × Novo Wellness case study
 * (v2). WeCare’s result line is the client-approved sentence.
 */

import { getService, type ServiceRecord } from "@/content/services";

export interface CaseStudyQuote {
  text: string;
  attribution: string;
  role: string;
}

export interface CaseStudyStat {
  value: string;
  label: string;
}

/** Optional short story for a named engagement. Only add client-supplied facts. */
export interface CaseStudyNarrative {
  /** Legal / dba practice line under the title */
  practice?: string;
  engagement?: string;
  quote?: CaseStudyQuote;
  situationHeading?: string;
  situation?: string;
  workHeading?: string;
  work?: readonly string[];
  resultsHeading: string;
  results: readonly CaseStudyStat[];
  /** One-line note under the headline figures */
  resultsNote?: string;
  /** A single approved result sentence, used when there is no stat grid */
  resultStatement?: string;
}

export interface CaseStudyRecord {
  slug: string;
  /** Card caption and page title */
  name: string;
  /** City, state — shown as card meta when present */
  location?: string;
  /** Short lede. Used in metadata and the study-page hero. */
  intro: string;
  /** Services this engagement uses, in the order they should be listed */
  serviceSlugs: readonly string[];
  /** Condensed public story. Omit to keep the service-summary layout. */
  narrative?: CaseStudyNarrative;
  /** Clean icon instead of a practice photograph */
  icon: "wellness" | "care";
  /**
   * Polaroid tilt in degrees (Showcase6). Ignored under reduced motion.
   */
  tilt: number;
  /** Vertical offset on the overlapping desktop strip */
  lift: string;
  /** Show on the homepage strip */
  featured: boolean;
}

export const caseStudies: readonly CaseStudyRecord[] = [
  {
    slug: "novo-wellness",
    name: "NOVO Wellness Center",
    intro:
      "JAIA has partnered with NOVO Wellness Center since December 2024 to stabilize operations and add care-management, IV therapy, and HRV programs.",
    serviceSlugs: ["billing-rcm", "apcm-bhi", "iv-therapy", "hrv-assessment"],
    icon: "wellness",
    narrative: {
      practice: "Novo Wellness",
      engagement: "December 2024 – Present",
      quote: {
        text: "The JAIA team was instrumental in helping facilitate the implementation, institution, and success of the ancillary services, care management, IV Therapy, and practice workflow strategy.",
        attribution: "Ciera Newman",
        role: "Practice Administrator, Novo Wellness",
      },
      situationHeading: "The situation",
      situation:
        "When JAIA started, the practice was looking for a partner to strengthen collections and revenue cycle, organize financing, and add programs alongside its neurology and pain work.",
      workHeading: "What JAIA did",
      work: [
        "Audited the books and reset accounting so ownership had a complete financial picture.",
        "Addressed outstanding tax items and recovered $23,155 from an amended 2023 return.",
        "Restructured debt, including a 59% reduction on unused equipment financing.",
        "Deployed $135K of JAIA capital and secured $150K in capital to support operations.",
        "Rebuilt billing, then launched Advanced Primary Care Management (APCM) and Behavioral Health Integration (BHI), in-practice IV therapy, and HRV assessment.",
      ],
      resultsHeading: "In the engagement window",
      results: [
        { value: "$135K", label: "JAIA capital deployed" },
        { value: "$150K", label: "Capital secured" },
        { value: "$500K+", label: "CMS collections resolved" },
        { value: "59%", label: "Equipment debt reduction" },
      ],
      resultsNote:
        "APCM reached 250 patients across the first two invoices. IV therapy dispensed 122 bags in October 2025.",
    },
    tilt: -2,
    lift: "",
    featured: true,
  },
  {
    slug: "wecare",
    name: "WeCare",
    intro:
      "JAIA works with WeCare on billing and revenue cycle management, Advanced Primary Care Management, and physician office laboratory operations.",
    serviceSlugs: ["billing-rcm", "apcm-bhi", "pol-establishment"],
    icon: "care",
    narrative: {
      resultsHeading: "Result",
      results: [],
      resultStatement:
        "Increased monthly practice revenue by 30%, sustained month over month, through a strong RCM partner and ancillary services.",
    },
    tilt: 2,
    lift: "",
    featured: true,
  },
];

export const caseStudySection = {
  eyebrow: "Case studies",
  heading: "How practices put JAIA to work.",
  headingLead: "How practices put JAIA ",
  headingAccent: "to work.",
  body: "Two practices, and the programs and operations JAIA brought into how they already run.",
  cta: { label: "Browse case studies", href: "/case-studies" },
} as const;

export const caseStudiesPage = {
  title: "Case studies",
  intro:
    "How JAIA works with NOVO Wellness Center and WeCare.",
} as const;

export function caseStudyUrl(slug: string) {
  return `/case-studies/${slug}`;
}

export function getCaseStudy(slug: string): CaseStudyRecord | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export function featuredCaseStudies() {
  return caseStudies.filter((study) => study.featured);
}

export function caseStudyServices(study: CaseStudyRecord): ServiceRecord[] {
  return study.serviceSlugs.map((slug) => {
    const service = getService(slug);
    if (!service) {
      throw new Error(
        `Missing service "${slug}" for case study "${study.slug}"`,
      );
    }
    return service;
  });
}

export function caseStudyMeta(study: CaseStudyRecord): string {
  if (study.location) return study.location;
  const [primary] = caseStudyServices(study);
  return primary.shortName;
}

export function publishedCaseStudies() {
  return caseStudies;
}

export function caseStudyShowcaseItem(study: CaseStudyRecord) {
  return {
    href: caseStudyUrl(study.slug),
    caption: study.name,
    meta: caseStudyMeta(study),
    icon: study.icon,
    tilt: study.tilt,
    lift: study.lift,
  };
}

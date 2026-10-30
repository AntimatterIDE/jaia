/**
 * Case studies shown on the homepage strip and `/case-studies`.
 *
 * Named practices (NOVO Wellness Center, Dr. Mukesh Gandhi) were supplied by
 * the client. Do not invent outcome statistics, quotes, or extra services.
 * Novo’s condensed narrative comes from the client-supplied JAIA × Novo
 * Wellness case study (v2); headline capital and collections figures were
 * later updated by the client for the public site. IV Therapy and Laboratory
 * Coordination remain unnamed capability illustrations until a practice is
 * attached. See docs/content-status.md.
 */

import { getService, type ServiceRecord } from "@/content/services";

export const CASE_STUDIES_ARE_PLACEHOLDER = false;

export interface CaseStudyImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Tailwind object-position class for the square polaroid crop */
  objectPosition?: string;
}

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
  situationHeading: string;
  situation: string;
  workHeading: string;
  work: readonly string[];
  resultsHeading: string;
  results: readonly CaseStudyStat[];
  /** One-line note under the headline figures */
  resultsNote?: string;
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
  image: CaseStudyImage;
  /**
   * Polaroid tilt in degrees (Showcase6). Ignored under reduced motion.
   */
  tilt: number;
  /** Vertical offset on the overlapping desktop strip */
  lift: string;
  /** Show on the homepage strip (Showcase6 uses four cards) */
  featured: boolean;
  /** Teaser only — polaroids and the study page show Coming soon */
  comingSoon?: boolean;
}

export const caseStudies: readonly CaseStudyRecord[] = [
  {
    slug: "novo-wellness",
    name: "NOVO Wellness Center",
    location: "Aiken, SC",
    intro:
      "JAIA has partnered with NOVO Wellness Center in Aiken, South Carolina since December 2024 to stabilize operations and add care-management, IV therapy, and HRV programs.",
    serviceSlugs: ["billing-rcm", "apcm-bhi", "iv-therapy", "hrv-assessment"],
    narrative: {
      practice: "Aiken Neurosciences & Pain Management",
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
    image: {
      src: "/images/case-novo-wellness.jpg",
      alt: "The tan two-story exterior of NOVO Wellness Center in Aiken, South Carolina, with the practice sign on the lawn",
      width: 1024,
      height: 790,
      objectPosition: "object-[center_72%]",
    },
    tilt: -4,
    lift: "lg:mt-12",
    featured: true,
  },
  {
    slug: "mukesh-gandhi",
    name: "Dr. Mukesh Gandhi",
    location: "Woodruff, SC",
    intro:
      "JAIA works with Dr. Mukesh Gandhi in Woodruff, South Carolina on billing and revenue cycle management, Advanced Primary Care Management, and physician office laboratory operations.",
    serviceSlugs: ["billing-rcm", "apcm-bhi", "pol-establishment"],
    image: {
      src: "/images/case-mukesh-gandhi.jpg",
      alt: "The red-brick medical office of Dr. Mukesh Gandhi in Woodruff, South Carolina, with a columned entrance at 409",
      width: 1024,
      height: 727,
      objectPosition: "object-[center_42%]",
    },
    tilt: 2.5,
    lift: "lg:mt-2",
    featured: true,
    comingSoon: true,
  },
  {
    slug: "iv-therapy",
    name: "IV Therapy",
    intro:
      "Turnkey in-practice IV therapy programs: protocol design, supply chain, staff training, and regulatory considerations—so practices can offer the service confidently and sustainably.",
    serviceSlugs: ["iv-therapy"],
    image: {
      src: "/images/iv-therapy-suite.jpg",
      alt: "A calm in-practice infusion suite with a comfortable recliner beside an IV stand, lit by soft daylight",
      width: 1536,
      height: 1024,
    },
    tilt: -2,
    lift: "lg:mt-16",
    featured: true,
    comingSoon: true,
  },
  {
    slug: "laboratory-coordination",
    name: "Laboratory Coordination",
    intro:
      "Coordinated access to established third-party reference laboratories, giving practices broad diagnostic coverage at favorable economics. Testing is performed by accredited labs; JAIA handles the partnerships and routing.",
    serviceSlugs: ["laboratory-coordination"],
    image: {
      src: "/images/case-laboratory.jpg",
      alt: "A laboratory technician in blue gloves pipetting amber liquid into a test tube beside a rack of capped tubes",
      width: 1024,
      height: 682,
      objectPosition: "object-center",
    },
    tilt: 3.5,
    lift: "lg:mt-6",
    featured: true,
    comingSoon: true,
  },
];

export const caseStudySection = {
  eyebrow: "Case studies",
  heading: "How practices put JAIA to work.",
  headingLead: "How practices put JAIA ",
  headingAccent: "to work.",
  body: "Programs, diagnostics, therapies, and operations brought into how a practice already runs — without the team having to invent the operating model themselves.",
  cta: { label: "Browse case studies", href: "/case-studies" },
} as const;

export const caseStudiesPage = {
  title: "Case studies",
  intro:
    "The NOVO Wellness Center study is live. Additional studies are coming soon.",
} as const;

export const caseStudyComingSoon = {
  eyebrow: "Coming soon",
  body: "This case study is on the way. In the meantime, you can read the NOVO Wellness Center story or start a conversation.",
  cta: {
    label: "Read the NOVO study",
    href: "/case-studies/novo-wellness",
  },
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
  if (study.comingSoon) return "Coming soon";
  if (study.location) return study.location;
  const [primary] = caseStudyServices(study);
  return primary.category;
}

export function publishedCaseStudies() {
  return caseStudies.filter((study) => !study.comingSoon);
}

export function caseStudyShowcaseItem(study: CaseStudyRecord) {
  return {
    href: caseStudyUrl(study.slug),
    caption: study.name,
    meta: study.comingSoon
      ? (study.location ?? "Coming soon")
      : caseStudyMeta(study),
    image: study.image,
    tilt: study.tilt,
    lift: study.lift,
    comingSoon: Boolean(study.comingSoon),
    showPhoto: !(study.comingSoon && !study.location),
  };
}

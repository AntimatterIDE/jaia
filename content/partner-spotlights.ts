/**
 * Partner spotlights for `/partners`. Answers, practice names, and figures
 * come from the client-supplied questionnaires (JAIA Health Partner
 * Spotlight: Pareja Medical Consultants; Superior Billing Solutions / Nexum)
 * and are published as written, with only typo and punctuation fixes. Do not
 * add stats, URLs, or practice names beyond them. Eyebrows, headings, and
 * step titles are draft framing.
 */

import {
  BadgeCheck,
  ChartColumn,
  ClipboardCheck,
  FilePen,
  FileSearch,
  Landmark,
  ReceiptText,
  Scale,
  Send,
  type LucideIcon,
} from "lucide-react";

export interface PartnerPoint {
  title: string;
  body: string;
  icon: LucideIcon;
}

export interface PartnerResultStat {
  /** Count-up target; the figure renders as `${value}${suffix}` */
  value: number;
  suffix: string;
  eyebrow: string;
  label: string;
}

export interface PartnerFeaturedResult extends PartnerResultStat {
  detail: string;
  /** Labels for the before/after bars; the bars only restate `detail` */
  before: string;
  after: string;
  change: string;
}

export interface PartnerQaItem {
  id: string;
  question: string;
  answer?: string;
  /** Multi-part answers, e.g. Q4 a–d or Q5 per practice */
  parts?: readonly { label: string; answer: string }[];
}

export interface PartnerQaSection {
  title: string;
  items: readonly PartnerQaItem[];
}

export interface PartnerSpotlight {
  slug: string;
  /** In-page anchor for the spotlight's first section */
  anchor: string;
  name: string;
  shortName: string;
  /** External site — leave empty until the client supplies a verified URL. */
  href: string;
  /**
   * Client-supplied lockup. Omit until one arrives; the spotlight then shows
   * the short name as a text mark instead of an image.
   */
  logo?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  /** Questionnaire respondent, used for quote attribution */
  respondent: { name: string; organization: string };
  profile: {
    eyebrow: string;
    heading: string;
    body: string;
    focusLabel: string;
    focus: string;
    servicesLabel: string;
    /** Approved service slugs this partner delivers alongside JAIA */
    serviceSlugs: readonly string[];
    /** Optional chip labels keyed by service slug (overrides `shortName`) */
    serviceLabels?: Readonly<Partial<Record<string, string>>>;
    practicesLabel: string;
    /** Named practices from the questionnaire; empty until supplied */
    practices: readonly string[];
    pointsHeading: string;
    points: readonly PartnerPoint[];
  };
  results: {
    eyebrow: string;
    heading: string;
    featured: PartnerFeaturedResult;
    stats: readonly PartnerResultStat[];
    note?: { label: string; body: string };
  };
  claims: {
    eyebrow: string;
    heading: string;
    body: string;
    steps: readonly PartnerPoint[];
    receivables: { label: string; body: string };
  };
  partnership: {
    eyebrow: string;
    heading: string;
    /** Excerpt of the partnership answer; the full answer is in `qa` */
    quote: string;
    columns: readonly { title: string; body: string }[];
  };
  qa: {
    eyebrow: string;
    heading: string;
    body: string;
    sections: readonly PartnerQaSection[];
  };
}

export const partnersPage = {
  eyebrow: "Case studies & partners",
  heading: "How practices and partners work with JAIA.",
  intro:
    "Case studies from practices putting JAIA to work, plus billing, consulting, and care-management partners who help independent practices add and sustain ancillary services.",
  /** Former Billing & RCM still — see docs/image-credits.md */
  heroImage: {
    src: "/images/billing-rcm-workspace.jpg",
    position: "64% center",
  },
  spotlightCtaLabel: "Read the partner spotlights",
  logosLabel: "Featured partners",
  caseStudies: {
    anchor: "case-studies",
    eyebrow: "Case studies",
    heading: "How practices put JAIA to work.",
  },
  technology: {
    anchor: "care-management",
    eyebrow: "Program infrastructure",
    heading: "Insulated module behind population health management.",
  },
  finalCta: {
    heading: "Ready to grow with a partner, not another vendor?",
    body: "Tell us about your practice. JAIA and its partners will help you map ancillary services, billing, and the operating support to sustain them.",
  },
} as const;

export const partnerSpotlights: readonly PartnerSpotlight[] = [
  {
    slug: "pareja-medical-consultants",
    anchor: "pmc-spotlight",
    name: "Pareja Medical Consultants",
    shortName: "PMC",
    href: "",
    logo: {
      src: "/brand/pareja-medical-consultants.png",
      alt: "Pareja Medical Consultants",
      width: 556,
      height: 154,
    },
    respondent: { name: "David", organization: "Pareja Medical Consultants" },
    profile: {
      eyebrow: "Partner spotlight",
      heading: "Pareja Medical Consultants, for billing and revenue oversight.",
      body: "Pareja Medical Consultants is a medical billing, coding, and consulting agency laser-focused on helping physicians grow and scale their revenue and operation.",
      focusLabel: "Focus",
      focus: "Medical billing, coding, and consulting",
      servicesLabel: "Ancillary services with JAIA",
      serviceSlugs: ["hrv-assessment", "apcm-bhi"],
      serviceLabels: {
        "apcm-bhi": "APCM + BHI + PCM",
      },
      practicesLabel: "Practices in this spotlight",
      practices: [
        "Arimah Medical",
        "Burton Medical",
        "Pediatrics and Adult Medicine",
      ],
      pointsHeading:
        "How PMC supports billing, reimbursement, and financial oversight",
      points: [
        {
          title: "Charge entry and coding",
          body: "PMC manages all the charge entry & coding.",
          icon: ClipboardCheck,
        },
        {
          title: "Clean claims, paid the first time",
          body: "PMC ensures all claims are entered clean so they pay the first time.",
          icon: BadgeCheck,
        },
        {
          title: "Financial reporting",
          body: "PMC also provides financial reporting to give providers insight into their numbers.",
          icon: ChartColumn,
        },
      ],
    },
    results: {
      eyebrow: "Measurable results",
      heading: "What practices have seen with PMC and JAIA.",
      featured: {
        value: 100,
        suffix: "%",
        eyebrow: "Arimah Medical",
        label: "Increase in revenue from governmental payers",
        detail:
          "Specifically, there has been a 100% increase in revenue from average monthly revenue previous to the JAIA partnership.",
        before: "Average monthly revenue before the partnership",
        after: "With the JAIA partnership",
        change: "+100%",
      },
      stats: [
        {
          value: 50,
          suffix: "%+",
          eyebrow: "Gross monthly revenue",
          label: "In excess of 50%, depending on practice size",
        },
        {
          value: 25,
          suffix: "%+",
          eyebrow: "Burton Medical",
          label: "Revenue increase",
        },
        {
          value: 25,
          suffix: "%+",
          eyebrow: "Pediatrics and Adult Medicine",
          label: "Increase in revenue",
        },
      ],
    },
    claims: {
      eyebrow: "Reimbursement and clean claims",
      heading: "From initial billing to every reconciled payment.",
      body: "PMC’s focus is accurate charge entry and claim management from initial billing to collecting payments from Governmental and Commercial payers to posting those payments and reconciling all payments from all payers.",
      steps: [
        {
          title: "Accurate charge entry",
          body: "Charges and coding, entered clean.",
          icon: FilePen,
        },
        {
          title: "Claim management",
          body: "Managed from initial billing.",
          icon: Send,
        },
        {
          title: "Collecting payments",
          body: "From Governmental and Commercial payers.",
          icon: Landmark,
        },
        {
          title: "Posting payments",
          body: "Every payment collected, posted.",
          icon: ReceiptText,
        },
        {
          title: "Reconciliation",
          body: "All payments, from all payers.",
          icon: Scale,
        },
      ],
      receivables: {
        label: "Accounts receivable",
        body: "Significant reduction in open AR; PMC’s focus is working all unpaid claims.",
      },
    },
    partnership: {
      eyebrow: "The partnership",
      heading: "Not a typical billing relationship.",
      quote:
        "Strong collaboration between both entities to deliver strong ancillary service revenue that gives providers a strong financial foundation to grow and depend on.",
      columns: [
        {
          title: "Acting as partners",
          body: "Acting as partners with practices, we have a wealth of knowledge in practice management and increasing revenue through ancillary services and improving operations.",
        },
        {
          title: "Beyond revenue",
          body: "It starts by collecting more revenue for more services. In the process, many other areas of operational improvement have been implemented, mostly connected to helping practices optimize and maximize revenue collection.",
        },
      ],
    },
    qa: {
      eyebrow: "Partner spotlight Q&A",
      heading: "In PMC’s own words.",
      body: "Eight questions about working with JAIA Health, answered by David at Pareja Medical Consultants.",
      sections: [
        {
          title: "About Pareja Medical Consultants",
          items: [
            {
              id: "q1",
              question:
                "How would you describe Pareja Medical Consultants, your role, and the services you provide to medical practices?",
              answer:
                "Pareja Medical Consultants is a medical billing, coding, and consulting agency laser-focused on helping physicians grow and scale their revenue and operation.",
            },
          ],
        },
        {
          title: "Ancillary services and financial oversight",
          items: [
            {
              id: "q2",
              question:
                "Which ancillary services has JAIA introduced to your practices?",
              answer: "HRV and Care Management (APCM/BHI).",
            },
            {
              id: "q3",
              question:
                "How does Pareja support the billing, reimbursement, and financial oversight of those services?",
              answer:
                "PMC manages all the charge entry & coding, and ensures all claims are entered clean so they pay the first time. PMC also provides financial reporting to give providers insight into their numbers.",
            },
          ],
        },
        {
          title: "Measurable results",
          items: [
            {
              id: "q4",
              question:
                "What measurable improvements have you seen since the partnership began?",
              parts: [
                {
                  label: "Approximate increase in monthly revenue or collections",
                  answer:
                    "It depends on practice size, but in excess of 50% gross monthly revenue.",
                },
                {
                  label:
                    "Improvement in reimbursement or clean-claim performance",
                  answer:
                    "PMC’s focus is accurate charge entry and claim management from initial billing to collecting payments from Governmental and Commercial payers to posting those payments and reconciling all payments from all payers.",
                },
                {
                  label:
                    "Reduction in outstanding or aging accounts receivable",
                  answer:
                    "Significant reduction in open AR; PMC’s focus is working all unpaid claims.",
                },
                {
                  label:
                    "Number of additional patients or services being billed",
                  answer:
                    "This varies by practice, but successful programs can start smaller and grow.",
                },
              ],
            },
            {
              id: "q5",
              question:
                "For each practice, what has been the most meaningful result so far?",
              parts: [
                {
                  label: "Arimah Medical",
                  answer: "100% increase in revenue from governmental payers.",
                },
                {
                  label: "Burton Medical",
                  answer: "A revenue increase of 25%+.",
                },
                {
                  label: "Pediatrics and Adult Medicine",
                  answer: "An increase in revenue of 25%+.",
                },
              ],
            },
            {
              id: "q6",
              question:
                "At Arimah Medical specifically, how have the additional revenue and operational improvements affected Dr. Arimah and the long-term health of the practice?",
              answer:
                "Specifically, there has been a 100% increase in revenue from average monthly revenue previous to the JAIA partnership.",
            },
          ],
        },
        {
          title: "Operations and practice management",
          items: [
            {
              id: "q7",
              question:
                "Beyond revenue, how have Pareja and JAIA helped the practices become more organized or better managed?",
              answer:
                "It starts by collecting more revenue for more services. In the process, many other areas of operational improvement have been implemented, mostly connected to helping practices optimize and maximize revenue collection.",
            },
          ],
        },
        {
          title: "The partnership",
          items: [
            {
              id: "q8",
              question:
                "What makes the partnership between Pareja and JAIA different from a typical relationship between a billing company and an ancillary-services partner?",
              answer:
                "The difference between PMC & JAIA Health and a typical billing company / ancillary-services partner is the strong collaboration between both entities to deliver strong ancillary service revenue that gives providers a strong financial foundation to grow and depend on. Acting as partners with practices, we have a wealth of knowledge in practice management and increasing revenue through ancillary services and improving operations.",
            },
          ],
        },
      ],
    },
  },
  {
    slug: "superior-billing-solutions",
    anchor: "sbs-spotlight",
    name: "Superior Billing Solutions",
    shortName: "SBS",
    href: "",
    respondent: {
      name: "Dakota White",
      organization: "Superior Billing Solutions",
    },
    profile: {
      eyebrow: "Partner spotlight",
      heading: "Superior Billing Solutions and Nexum, for revenue cycle and platform.",
      body: "Superior Billing Solutions is a full-service revenue cycle management company. We handle coding, claims, denial management, and AR follow-up for medical practices and laboratories. SBS sits under The Curis Group; Nexum is the technology platform covering billing, reporting, an LIS for laboratories, and a growing EHR capability.",
      focusLabel: "Focus",
      focus: "Revenue cycle management, with Nexum for billing, reporting, LIS, and EHR",
      servicesLabel: "Ancillary services with JAIA",
      serviceSlugs: ["hrv-assessment", "apcm-bhi", "iv-therapy"],
      serviceLabels: {
        "apcm-bhi": "Care Management (APCM and BHI)",
        "hrv-assessment": "HRV testing",
      },
      practicesLabel: "Practices in this spotlight",
      practices: [],
      pointsHeading:
        "How SBS supports billing, reimbursement, and financial oversight",
      points: [
        {
          title: "Billing set up before the first claim",
          body: "Confirming the right CPT/HCPCS codes, documentation requirements, and payer coverage for each new service line.",
          icon: ClipboardCheck,
        },
        {
          title: "Submit, track, and work denials",
          body: "After setup we submit and track claims and work denials.",
          icon: Send,
        },
        {
          title: "Collections by service line",
          body: "We report on collections by service line, so the practice and JAIA can see whether each new service is paying and what it adds.",
          icon: ChartColumn,
        },
      ],
    },
    results: {
      eyebrow: "Measurable results",
      heading: "What practices have seen with SBS and JAIA.",
      featured: {
        value: 10,
        suffix: "%–20%",
        eyebrow: "Monthly revenue or collections",
        label: "Approximate increase since the partnership began",
        detail:
          "Approximate increase in monthly revenue or collections: 10%–20%.",
        before: "Before the partnership",
        after: "With the JAIA partnership",
        change: "+10–20%",
      },
      stats: [
        {
          value: 99,
          suffix: "%",
          eyebrow: "Clean claim rate",
          label: "Average clean claim rate",
        },
      ],
      note: {
        label: "Most meaningful result",
        body: "These services became predictable, collectible revenue instead of one more thing the practice had to figure out.",
      },
    },
    claims: {
      eyebrow: "Reimbursement and financial oversight",
      heading: "From coding and coverage to collections by service line.",
      body: "Each new service line has its own coding, documentation, and payer rules, so we set up billing before the first claim goes out. That means confirming the right CPT/HCPCS codes, documentation requirements, and payer coverage for HRV, APCM/BHI, and IV therapy. After that we submit and track claims and work denials.",
      steps: [
        {
          title: "Confirm codes and coverage",
          body: "CPT/HCPCS, documentation, and payer rules for each service.",
          icon: FileSearch,
        },
        {
          title: "Submit and track claims",
          body: "Claims go out only after billing is set up.",
          icon: Send,
        },
        {
          title: "Work denials",
          body: "Follow through when a claim does not pay cleanly.",
          icon: FilePen,
        },
        {
          title: "Report by service line",
          body: "Collections visibility for the practice and JAIA.",
          icon: ChartColumn,
        },
      ],
      receivables: {
        label: "Collections reporting",
        body: "We report on collections by service line, so the practice and JAIA can see whether each new service is paying and what it adds.",
      },
    },
    partnership: {
      eyebrow: "The partnership",
      heading: "Not a typical billing relationship.",
      quote:
        "We work together from the start. JAIA brings the clinical and growth side. We make sure each service is set up to be billed correctly, tracked, and reported on.",
      columns: [
        {
          title: "Beyond revenue",
          body: "Beyond revenue, working with JAIA and the SBS ecosystem gave the practices structure. We tightened internal workflows so new services are documented in a way that supports billing. Staff have clearer roles and a single point of contact for billing questions. We also step in to resolve operational problems as they come up, not only after claims are denied.",
        },
        {
          title: "Connected billing and technology",
          body: "Because SBS and Nexum are connected, the practice gets billing, technology, and strategy from a team that talks to each other. A practice can get clinical growth ideas, billing, and technology from one organization instead of three.",
        },
      ],
    },
    qa: {
      eyebrow: "Partner spotlight Q&A",
      heading: "In SBS’s own words.",
      body: "Questions about working with JAIA Health, answered by Dakota White at Superior Billing Solutions.",
      sections: [
        {
          title: "About Superior Billing Solutions and Nexum",
          items: [
            {
              id: "q1",
              question:
                "How would you describe your role, and the services you provide to medical practices?",
              answer:
                "I lead Superior Billing Solutions (SBS), a full-service revenue cycle management company. We handle coding, claims, denial management, and AR follow-up for medical practices and laboratories. Our team combines in-office billers, coders, and an offshore AR team. SBS sits under The Curis Group, a healthcare holding company I’m building to give practices more than a billing vendor. Nexum is our technology platform, covering billing, reporting, an LIS for laboratories, and a growing EHR capability. SBS runs the revenue cycle, Nexum is the platform, and Curis ties them together. A practice can get clinical growth ideas, billing, and technology from one organization instead of three.",
            },
          ],
        },
        {
          title: "Ancillary services and financial oversight",
          items: [
            {
              id: "q2",
              question:
                "Which ancillary services has JAIA introduced to your practices?",
              answer: "HRV testing, Care Management (APCM and BHI), and IV Therapy.",
            },
            {
              id: "q3",
              question:
                "How does SBS support the billing, reimbursement, and financial oversight of those services?",
              answer:
                "Each new service line has its own coding, documentation, and payer rules, so we set up billing before the first claim goes out. That means confirming the right CPT/HCPCS codes, documentation requirements, and payer coverage for HRV, APCM/BHI, and IV therapy. After that we submit and track claims and work denials. We report on collections by service line, so the practice and JAIA can see whether each new service is paying and what it adds.",
            },
          ],
        },
        {
          title: "Measurable results",
          items: [
            {
              id: "q4",
              question:
                "What measurable improvements have you seen since the partnership began?",
              parts: [
                {
                  label:
                    "Approximate increase in monthly revenue or collections",
                  answer: "10%–20%",
                },
                {
                  label:
                    "Improvement in reimbursement or clean-claim performance",
                  answer: "Average clean claim rate 99%",
                },
              ],
            },
            {
              id: "q5",
              question:
                "What has been the most meaningful result so far?",
              answer:
                "The most meaningful result is that these services became predictable, collectible revenue instead of one more thing the practice had to figure out.",
            },
          ],
        },
        {
          title: "Operations and practice management",
          items: [
            {
              id: "q7",
              question:
                "Beyond revenue, how has the SBS ecosystem and JAIA helped the practices become more organized or better managed?",
              answer:
                "Beyond revenue, working with JAIA and the SBS ecosystem gave the practices structure. We tightened internal workflows so new services are documented in a way that supports billing. Staff have clearer roles and a single point of contact for billing questions. We also step in to resolve operational problems as they come up, not only after claims are denied.",
            },
          ],
        },
        {
          title: "The partnership",
          items: [
            {
              id: "q8",
              question:
                "What makes the partnership between SBS/Nexum and JAIA different from a typical billing company and ancillary-services partner relationship?",
              answer:
                "A typical billing company only sees claims after the work is done, and an ancillary partner usually introduces a service and moves on. We work together from the start. JAIA brings the clinical and growth side. We make sure each service is set up to be billed correctly, tracked, and reported on. Because SBS and Nexum are connected, the practice gets billing, technology, and strategy from a team that talks to each other.",
            },
          ],
        },
      ],
    },
  },
];

export function getPartnerSpotlight(slug: string): PartnerSpotlight | undefined {
  return partnerSpotlights.find((partner) => partner.slug === slug);
}

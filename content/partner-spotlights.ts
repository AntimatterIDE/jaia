/**
 * Partner spotlights for `/partners`. Answers, practice names, and figures
 * come from the client-supplied questionnaire (JAIA Health Partner
 * Spotlight: Pareja Medical Consultants) and are published as written, with
 * only typo and punctuation fixes. Do not add stats, URLs, or practice names
 * beyond it. Eyebrows, headings, and step titles are draft framing.
 */

import {
  BadgeCheck,
  ChartColumn,
  ClipboardCheck,
  FilePen,
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
  logo: {
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
    practicesLabel: string;
    practices: readonly string[];
    pointsHeading: string;
    points: readonly PartnerPoint[];
  };
  results: {
    eyebrow: string;
    heading: string;
    featured: PartnerFeaturedResult;
    stats: readonly PartnerResultStat[];
    note: { label: string; body: string };
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
    /** Excerpt of the Q8 answer; the full answer is in `qa` */
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
  eyebrow: "Partner spotlight: Pareja Medical Consultants",
  heading: "Partners who help practices grow.",
  intro:
    "JAIA works alongside billing, consulting, and technology partners so independent practices can add ancillary services with the support to sustain them.",
  /** Former Billing & RCM still — see docs/image-credits.md */
  heroImage: {
    src: "/images/billing-rcm-workspace.jpg",
    position: "64% center",
  },
  spotlightCtaLabel: "Read the PMC spotlight",
  logosLabel: "Featured partners",
  technology: {
    anchor: "technology-partners",
    eyebrow: "Technology partner",
    heading: "Software behind the programs.",
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
          "Specifically, there has been a 100% increase in revenue from average monthly revenue previous to the APCM–PMC RCM partnership.",
        before: "Average monthly revenue before the partnership",
        after: "With the APCM–PMC RCM partnership",
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
      note: {
        label: "Additional patients and services",
        body: "This varies by practice, but successful programs can start smaller and grow.",
      },
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
        "Strong collaboration between both entities to deliver strong ancillary service revenue that gives primary care providers a strong financial foundation to grow and depend on.",
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
                "Specifically, there has been a 100% increase in revenue from average monthly revenue previous to the APCM–PMC RCM partnership.",
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
                "The difference between PMC & JAIA Health and a typical billing company / ancillary-services partner is the strong collaboration between both entities to deliver strong ancillary service revenue that gives primary care providers a strong financial foundation to grow and depend on. Acting as partners with practices, we have a wealth of knowledge in practice management and increasing revenue through ancillary services and improving operations.",
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

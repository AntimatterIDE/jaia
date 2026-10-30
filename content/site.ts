/**
 * Site-wide editable content. Draft marketing language is centralized here so
 * the client can revise copy without touching components.
 */

import {
  BriefcaseBusiness,
  ClipboardList,
  ClipboardPlus,
  DraftingCompass,
  Handshake,
  HeartHandshake,
  Layers3,
  Rocket,
  Search,
  ShieldCheck,
  Stethoscope,
  Syringe,
  TrendingUp,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export const siteConfig = {
  name: "JAIA Health",
  /**
   * Canonical origin for this Next.js app. jaiahealth.com currently still
   * serves a separate Netlify site, so Open Graph tags must not use it —
   * crawlers were fetching a 404 and keeping an old share preview.
   * Switch this to https://jaiahealth.com only after that domain points here.
   */
  url: "https://jaia-health.vercel.app",
  positioning: "A trusted partner for the modern private practice.",
  tagline:
    "Advancing HealthCare Together: Expertise from Our Clinics to Yours.",
  description:
    "JAIA Health brings the programs, diagnostics, therapies, and operational support independent practices need to grow revenue and elevate patient outcomes.",
  /**
   * Official social profiles. Leave `href` empty until the client supplies a
   * verified URL — the footer renders the icon but does not wrap it in a
   * link. Do not invent LinkedIn or Instagram URLs.
   */
  socials: [
    {
      network: "linkedin",
      label: "JAIA Health on LinkedIn",
      href: "",
    },
    {
      network: "instagram",
      label: "JAIA Health on Instagram",
      href: "",
    },
  ],
} as const;

export const primaryCta = {
  label: "Start a conversation",
  href: "/contact",
} as const;

export const hero = {
  eyebrow: "A trusted partner for the modern private practice",
  heading: "Expand what your practice can do.",
  body: "JAIA Health brings the programs, diagnostics, therapies, and operational support independent practices need to grow revenue and elevate patient outcomes.",
  primaryCta,
  secondaryCta: {
    label: "Explore our capabilities",
    href: "/#capabilities",
  },
} as const;

export interface CapabilityPillar {
  label: string;
  /** The approved service slugs this pillar covers */
  slugs: readonly string[];
  icon: LucideIcon;
}

/**
 * The four capability pillars. Each maps to real service records rather than
 * standing as a marketing claim of its own, so the grouping stays honest as
 * the service list changes.
 */
export const capabilityPillars = [
  { label: "Programs", slugs: ["apcm-bhi"], icon: ClipboardList },
  {
    label: "Diagnostics",
    slugs: ["hrv-assessment", "laboratory-coordination", "pol-establishment"],
    icon: Stethoscope,
  },
  { label: "Therapies", slugs: ["iv-therapy"], icon: Syringe },
  { label: "Operations", slugs: ["billing-rcm"], icon: Workflow },
] as const satisfies readonly CapabilityPillar[];

export const partnership = {
  statement:
    "From care management to laboratory operations, JAIA brings the infrastructure and expertise to turn new capabilities into sustainable services.",
};

export const servicesIntro = {
  eyebrow: "Six connected capabilities",
  heading: "One partner for the work behind practice growth.",
  body: "Explore the programs, diagnostics, therapies, and operational services JAIA can help your practice put into action.",
} as const;

export interface Outcome {
  value: string;
  title: string;
  body: string;
  icon: LucideIcon;
  /** Approved service slugs that support this outcome */
  slugs: readonly string[];
}

export const outcomes = {
  eyebrow: "Built around the realities of private practice",
  heading: "More capability. Less operational drag.",
  items: [
    {
      value: "grow",
      title: "Grow thoughtfully",
      body: "Add services and programs with a clearer operational path.",
      icon: TrendingUp,
      slugs: ["apcm-bhi", "iv-therapy"],
    },
    {
      value: "access",
      title: "Expand patient access",
      body: "Bring more care, diagnostics, and therapies into the practice journey.",
      icon: Users,
      slugs: ["hrv-assessment", "laboratory-coordination", "pol-establishment"],
    },
    {
      value: "strengthen",
      title: "Strengthen the operation",
      body: "Support the workflows, training, coordination, and revenue processes behind delivery.",
      icon: ShieldCheck,
      slugs: ["billing-rcm", "apcm-bhi"],
    },
  ] satisfies Outcome[],
} as const;

export interface ApproachStep {
  step: string;
  title: string;
  body: string;
  icon: LucideIcon;
}

/** Draft marketing language — pending client review */
export const approach = {
  eyebrow: "A practical operating partnership",
  heading: "From opportunity to operation.",
  steps: [
    {
      step: "01",
      title: "Understand",
      body: "Align on the practice, goals, existing workflows, and service opportunity.",
      icon: Search,
    },
    {
      step: "02",
      title: "Design",
      body: "Shape the program, partners, protocols, and operating model.",
      icon: DraftingCompass,
    },
    {
      step: "03",
      title: "Launch",
      body: "Coordinate implementation, training, and the transition into daily use.",
      icon: Rocket,
    },
    {
      step: "04",
      title: "Support",
      body: "Help the practice sustain and refine the operation over time.",
      icon: HeartHandshake,
    },
  ] satisfies ApproachStep[],
} as const;

/**
 * Rewrites the four approach steps with service-specific bodies while keeping
 * the shared titles, numbering, and icons — so the process reads identically
 * across the homepage and every service page.
 */
export function approachStepsWithBodies(
  bodies: readonly [string, string, string, string],
): ApproachStep[] {
  return approach.steps.map((step, index) => ({
    ...step,
    body: bodies[index],
  }));
}

export const aboutStory = {
  eyebrow: "The JAIA approach",
  heading: "Expertise from our clinics to yours.",
  body: "JAIA works alongside independent practices to bring specialized programs, diagnostic capabilities, therapies, and operating support into one coordinated partnership. The goal is practical progress: stronger capabilities, sustainable workflows, and a better experience for the practices and patients they serve.",
  cta: { label: "Meet JAIA", href: "/about" },
} as const;

export interface FaqItem {
  question: string;
  answer: string;
}

/** Draft FAQ — answers intentionally high-level, no guarantees */
export const faq = {
  eyebrow: "Questions",
  heading: "What practices usually ask.",
  items: [
    {
      question: "What types of practices does JAIA work with?",
      answer:
        "JAIA works with independent private practices, physician-led groups, and multi-location medical groups that want to add capability without taking on unnecessary operational burden. The common thread is a practice that values staying independent while growing thoughtfully.",
    },
    {
      question: "Can a practice begin with one service?",
      answer:
        "Yes. Many practices start with a single program—such as care management or revenue cycle support—and expand when the operation feels right. Each service is designed to stand on its own and to connect with the others when you are ready.",
    },
    {
      question: "What does the implementation process look like?",
      answer:
        "Every engagement follows the same practical sequence: understand the practice and its goals, design the program and operating model, launch with coordinated training, and support the team as the service becomes part of daily work. Timing depends on the service and the practice.",
    },
    {
      question:
        "How does JAIA work with a practice's existing team and systems?",
      answer:
        "JAIA builds around how your practice already operates. Programs are shaped to fit existing workflows, staffing, and systems wherever possible, with training and coordination support so your team is never carrying the transition alone.",
    },
    {
      question: "What information should we include when contacting JAIA?",
      answer:
        "A short note about your practice, your role, and what you are hoping to accomplish is enough to start. Please do not include patient names, medical records, or other protected health information in your message—the inquiry form is for business conversations only.",
    },
  ] satisfies FaqItem[],
} as const;

export const finalCta = {
  heading: "Ready to expand what your practice can do?",
  body: "Tell us where you want to grow. JAIA will help you map the right next conversation.",
  cta: primaryCta,
} as const;

export const aboutPage = {
  eyebrow: "About JAIA Health",
  heading: "Built from inside independent practice.",
  intro:
    "JAIA Health grew from years working alongside independent physician practices. We are a high-touch healthcare management partner—bringing programs, diagnostics, therapies, and operations into one relationship so practices can stay independent and grow.",
  /** Tight hero lead — origin and the partner lesson, short enough for the first screen. */
  heroBody:
    "JAIA grew from years inside independent practices, including running clinics. The lesson: physicians need a partner who understands how the pieces fit together—not another vendor.",
  modelHeading: "One coordinated partnership",
  modelBody:
    "Independent practices are asked to take on more vendors, programs, and operational complexity every year. JAIA's model is the opposite: one accountable partner that helps you choose, implement, and sustain what actually fits—so the team can stay with patients.",
  modelContinue:
    "JAIA is not built around a single service. The work is to strengthen operations, open the right new programs, and help independent practices thrive as the tools around them change.",
} as const;

export interface PartnershipArea {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

/**
 * About page partnership infographic. Draft marketing language — pending
 * client review. The four areas restate the partnership-model copy above;
 * do not add named partners, integrations, or outcome claims.
 */
export const partnershipMap = {
  title: "Your practice, connected",
  badgeLabel: "One accountable partner.",
  hubLabel: "Your practice.",
  hubBody: "Focused on patients.",
  defaultBody: "One partnership. Support built around your practice.",
  areasLabel: "How JAIA supports your practice",
  areas: [
    {
      id: "operations",
      label: "Operations",
      description: "Strengthen the day-to-day work of your practice.",
      icon: BriefcaseBusiness,
    },
    {
      id: "programs",
      label: "Programs",
      description: "Choose programs that fit your practice.",
      icon: ClipboardPlus,
    },
    {
      id: "technology",
      label: "Technology",
      description: "Bring the right tools into your existing workflow.",
      icon: Layers3,
    },
    {
      id: "support",
      label: "Ongoing support",
      description: "Help your team implement and sustain what works.",
      icon: Handshake,
    },
  ] satisfies PartnershipArea[],
} as const;

export const contactPage = {
  eyebrow: "Contact",
  heading: "Start a conversation.",
  intro:
    "Tell us about your practice and where you want to grow. This form is for business inquiries only—please do not include patient names, medical records, or other protected health information.",
  phiNotice:
    "Please do not include patient names, medical records, or other protected health information in this form.",
} as const;

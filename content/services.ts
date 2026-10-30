import {
  Activity,
  Beaker,
  Boxes,
  Brain,
  Building2,
  CalendarClock,
  ClipboardCheck,
  Droplets,
  FlaskConical,
  Gauge,
  GraduationCap,
  HandCoins,
  HeartHandshake,
  HeartPulse,
  LineChart,
  Microscope,
  Network,
  ReceiptText,
  Repeat,
  Route,
  ScrollText,
  ShieldCheck,
  Stethoscope,
  TrendingUp,
  Users,
  Wallet,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/**
 * Authoritative service records (see docs/JAIA_Health_NextJS_Homepage_Master_Prompt.md §7).
 * Consumed by navigation, footer, homepage CapabilityScrollStack, dynamic
 * routes, metadata, and structured data so every surface stays in sync.
 *
 * `summary` and `capabilityLabels` are approved copy — do not materially
 * expand them. Everything under `page` is draft language written to explain
 * and contextualize those summaries for the full service pages; it must not
 * introduce claims the summaries do not already make. See
 * docs/content-status.md.
 */

export interface ServiceDetail {
  label: string;
  body: string;
  icon: LucideIcon;
}

export interface ServiceOutcome {
  title: string;
  body: string;
  icon: LucideIcon;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServicePageContent {
  /**
   * Plain-language expansion of any acronym in the service name, shown before
   * first substantive use. Required for APCM, BHI, RCM, A/R, POL, and CLIA.
   */
  acronymNote?: string;
  /** Optional line between the service name and summary in the hero */
  heroTagline?: string;
  /** Optional primary CTA label for this service hero (href stays /contact) */
  heroCtaLabel?: string;
  /** Opening paragraph, derived from `summary` — no new claims */
  intro: string;
  /** Optional overrides for the “What it includes” section heading */
  includesEyebrow?: string;
  includesHeading?: string;
  /** One entry per `capabilityLabels` value, in the same order */
  detail: readonly ServiceDetail[];
  /** Optional overrides for the primary outcomes section */
  outcomesEyebrow?: string;
  outcomesHeading?: string;
  outcomes: readonly ServiceOutcome[];
  /** Optional second outcomes block (e.g. patient benefits) */
  secondaryOutcomes?: {
    id: string;
    eyebrow: string;
    heading: string;
    items: readonly ServiceOutcome[];
  };
  /**
   * Bodies for the four shared approach steps (Understand, Design, Launch,
   * Support), written for this service. Titles and icons come from
   * `content/site.ts` so the process reads identically across the site.
   */
  approachBodies: readonly [string, string, string, string];
  /** Optional approach section heading/footnote overrides */
  approachEyebrow?: string;
  approachHeading?: string;
  approachFootnote?: string;
  faqs: readonly ServiceFaq[];
  /** Optional final CTA band overrides for this service page */
  finalCta?: {
    heading: string;
    body: string;
    ctaLabel?: string;
  };
  /** Other services worth surfacing at the foot of this page */
  relatedSlugs: readonly string[];
}

export interface ServiceRecord {
  slug: string;
  /** Short public name, e.g. "APCM + BHI" */
  shortName: string;
  /** Full service name used on service pages and metadata */
  name: string;
  category: string;
  /** Approved summary — do not materially expand */
  summary: string;
  capabilityLabels: readonly string[];
  icon: LucideIcon;
  metaDescription: string;
  /** Editorial image for the service page */
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  page: ServicePageContent;
}

export const services: readonly ServiceRecord[] = [
  {
    slug: "apcm-bhi",
    shortName: "APCM + BHI",
    name: "Advanced Primary Care Management + Behavioral Health Integration",
    category: "Care management",
    summary:
      "Medicare-recognized programs designed to strengthen chronic care coordination, expand behavioral health access, and support better patient outcomes—while creating sustainable reimbursement opportunities for independent medical practices.",
    capabilityLabels: [
      "Program infrastructure",
      "Chronic care coordination",
      "Behavioral health access",
    ],
    icon: HeartPulse,
    metaDescription:
      "Medicare-recognized APCM and Behavioral Health Integration programs designed to generate recurring monthly revenue while strengthening chronic care coordination.",
    image: {
      src: "/images/stack-body-scan-interface.jpg",
      alt: "A clinician holding a stethoscope up to a glowing holographic display of a human body and health readings, beside a DNA strand",
      width: 1536,
      height: 1024,
    },
    page: {
      acronymNote:
        "APCM stands for Advanced Primary Care Management, and BHI stands for Behavioral Health Integration. Both are Medicare-recognized program structures for care delivered between office visits.",
      intro:
        "These programs give a practice a defined way to support patients between visits and to be recognized for that work. JAIA builds the underlying infrastructure so care coordination and behavioral health access become part of how the practice runs, rather than another initiative the team has to carry on top of everything else.",
      detail: [
        {
          label: "Program infrastructure",
          body: "The enrollment paths, documentation, and monthly workflow a recognized program depends on, set up to fit the practice's existing systems and staffing.",
          icon: ClipboardCheck,
        },
        {
          label: "Chronic care coordination",
          body: "A structure for the follow-up, outreach, and care-plan work that patients managing chronic conditions need between appointments.",
          icon: Repeat,
        },
        {
          label: "Behavioral health access",
          body: "A defined route to behavioral health support inside primary care, so patients can be helped within the relationship they already have.",
          icon: Brain,
        },
      ],
      outcomes: [
        {
          title: "Revenue that recurs monthly",
          body: "These programs are recognized on a monthly basis, so the revenue they generate is recurring rather than tied to individual visits.",
          icon: CalendarClock,
        },
        {
          title: "Care that continues between visits",
          body: "Coordination work that often happens informally becomes a defined, supported part of the practice's operation.",
          icon: HeartPulse,
        },
        {
          title: "Behavioral Health inside your practice",
          body: "Patients get a path to behavioral health support without being handed off outside the practice.",
          icon: Users,
        },
      ],
      approachBodies: [
        "We start with the patient panel, current chronic care workflows, staffing, and what the practice already does informally between visits.",
        "We shape the program around those realities: how patients are enrolled, how JAIA care coordinators handle the monthly work, and how it is documented.",
        "We assign and deploy JAIA-employed care coordinators to the practice so the program requires no staff from the practice, then work through the first enrollment cycles.",
        "We stay involved as the panel grows, helping the practice refine the workflow and keep the program running consistently.",
      ],
      faqs: [
        {
          question: "What are APCM and BHI?",
          answer:
            "Advanced Primary Care Management and Behavioral Health Integration are Medicare-recognized program structures for care that happens between office visits — coordination, follow-up, and behavioral health support. They give practices a defined way to deliver and document that work.",
        },
        {
          question: "Does the practice need to hire staff to run this?",
          answer:
            "That depends on the practice. Part of the design work is deciding which parts of the monthly workflow existing staff can absorb and which need additional support. JAIA helps map that out before anything launches, rather than assuming a staffing model up front.",
        },
        {
          question: "How does this fit with our EHR?",
          answer:
            "Programs are built around the systems the practice already uses wherever possible. For APCM and BHI, JAIA partners with Clinix AI so enrollment, consent, and care-plan work have a dedicated operating layer — with provider review and sign-off remaining with the practice.",
        },
        {
          question: "How do patients get enrolled?",
          answer:
            "Enrollment is part of the program infrastructure JAIA sets up — who introduces the program, when in the visit it happens, and how consent and documentation are captured. The goal is a repeatable step in normal practice flow rather than a separate campaign.",
        },
      ],
      relatedSlugs: ["billing-rcm", "hrv-assessment"],
    },
  },
  {
    slug: "hrv-assessment",
    shortName: "HRV Assessment",
    name: "Heart Rate Variability Assessment",
    category: "Diagnostics",
    summary:
      "Objective heart rate variability testing that quantifies autonomic nervous system function—informing personalized care plans and tracking patient response over time.",
    capabilityLabels: [
      "Objective assessment",
      "Care-plan insights",
      "Longitudinal tracking",
    ],
    icon: Activity,
    metaDescription:
      "Objective heart rate variability testing that quantifies autonomic nervous system function, informing personalized care plans and longitudinal tracking.",
    image: {
      src: "/images/stack-hrv-heartbeat-line.jpg",
      alt: "A single glowing heartbeat trace running across a deep blue background",
      width: 1536,
      height: 1024,
    },
    page: {
      acronymNote:
        "HRV stands for heart rate variability — the variation in time between consecutive heartbeats, which is used as a measure of autonomic nervous system function.",
      intro:
        "Heart rate variability testing produces an objective measurement where a practice might otherwise be working from subjective report alone. JAIA helps practices add the assessment as a repeatable in-visit step, so the result can inform a care plan and be compared against the same patient's earlier readings.",
      detail: [
        {
          label: "Objective assessment",
          body: "A standardized, repeatable measurement of autonomic nervous system function, captured during a normal appointment.",
          icon: Gauge,
        },
        {
          label: "Care-plan insights",
          body: "A quantified starting point that can inform how a care plan is shaped for an individual patient.",
          icon: ScrollText,
        },
        {
          label: "Longitudinal tracking",
          body: "Repeat assessments over time, so change can be observed against that patient's own baseline rather than a general reference.",
          icon: LineChart,
        },
      ],
      outcomes: [
        {
          title: "A measurement, not an impression",
          body: "Autonomic function is quantified, giving the clinician an objective data point to work from.",
          icon: Gauge,
        },
        {
          title: "Care plans with a starting point",
          body: "Assessment results inform how a plan is personalized for the patient in front of you.",
          icon: Stethoscope,
        },
        {
          title: "Change you can follow",
          body: "Repeat testing tracks how a patient responds over the course of their care.",
          icon: LineChart,
        },
      ],
      approachBodies: [
        "We look at where an objective autonomic measurement would actually change a conversation in your practice, and which patients it applies to.",
        "We design where the assessment sits in the visit, who performs it, and how results reach the care plan.",
        "We coordinate equipment, train the staff performing the assessment, and support the first rounds of testing.",
        "We stay available as the practice builds a history of repeat assessments and refines how results are used.",
      ],
      faqs: [
        {
          question: "What does heart rate variability actually measure?",
          answer:
            "It measures the variation in time between consecutive heartbeats, which is used as an indicator of autonomic nervous system function. It is an objective measurement rather than a diagnosis, and it is interpreted by the clinician in the context of the whole patient.",
        },
        {
          question: "How does the assessment fit into a normal appointment?",
          answer:
            "The assessment is designed as a defined step within an existing visit rather than a separate appointment type. Part of the design work is deciding exactly where in the visit it happens and who on the team performs it.",
        },
        {
          question: "What equipment does the practice need?",
          answer:
            "Equipment selection is part of the setup. JAIA helps the practice choose an option that fits the space, the volume of assessments expected, and the staff who will be operating it.",
        },
        {
          question: "Who interprets the results?",
          answer:
            "The clinician does. JAIA's role is to make sure the assessment is performed consistently and that results arrive somewhere useful in the care plan — not to interpret them or to define clinical decisions.",
        },
      ],
      relatedSlugs: ["apcm-bhi", "laboratory-coordination"],
    },
  },
  {
    slug: "iv-therapy",
    shortName: "IV Therapy",
    name: "IV Therapy",
    category: "In-practice therapy",
    summary:
      "Helping independent medical practices integrate medically necessary, insurance-reimbursable IV therapy into their existing clinical services.",
    capabilityLabels: [
      "Medically necessary access",
      "Insurance reimbursement",
      "Practice implementation",
    ],
    icon: Droplets,
    metaDescription:
      "Help independent practices integrate medically necessary, insurance-reimbursable IV therapy—expanding patient access, supporting proactive care, and creating sustainable ancillary revenue.",
    image: {
      src: "/images/stack-vessel-visualization.jpg",
      alt: "A clinician in a white coat reaching through glowing blue strands that resemble blood vessels",
      width: 1536,
      height: 1024,
    },
    page: {
      heroTagline:
        "Expanding Patient Access. Supporting Proactive Care. Creating New Revenue Opportunities.",
      heroCtaLabel: "Explore IV Therapy for Your Practice",
      includesEyebrow: "Accessible care",
      includesHeading: "Making Medically Necessary IV Therapy More Accessible",
      intro:
        "IV therapy shouldn’t be a luxury reserved for patients who can afford expensive cash-pay wellness clinics. At JAIA Health, we believe medically necessary treatment should be accessible through the healthcare system patients already rely on. Our IV Therapy Program helps independent medical practices establish clinically driven infusion services that may qualify for reimbursement through Medicare, Medicaid, and commercial insurance—bridging patient accessibility, clinical care, and sustainable ancillary revenue. Unlike traditional cash-pay IV wellness models, our approach prioritizes documented medical necessity, appropriate treatment, and compliant insurance reimbursement.",
      detail: [
        {
          label: "Medically necessary access",
          body: "Establish clinically driven infusion services inside the practice so eligible patients can receive appropriate IV therapy through the care setting they already trust—not only through cash-pay wellness clinics.",
          icon: HeartPulse,
        },
        {
          label: "Insurance reimbursement",
          body: "Structure the program around documented medical necessity and payer requirements so services may qualify for reimbursement through Medicare, Medicaid, and commercial insurance.",
          icon: ShieldCheck,
        },
        {
          label: "Practice implementation",
          body: "JAIA supports program development, clinical workflow coordination, supply sourcing, documentation processes, and revenue-cycle management so the service can launch and run sustainably.",
          icon: Workflow,
        },
      ],
      outcomesEyebrow: "Benefits for medical practices",
      outcomesHeading: "New capability that supports patients and the practice.",
      outcomes: [
        {
          title: "New revenue opportunities",
          body: "Introduce medically necessary IV services that may qualify for insurance reimbursement, creating additional ancillary revenue opportunities.",
          icon: HandCoins,
        },
        {
          title: "Expanded clinical capabilities",
          body: "Offer appropriate infusion treatments within your existing practice rather than referring every eligible patient to an outside facility.",
          icon: Building2,
        },
        {
          title: "Stronger patient relationships",
          body: "Keep more aspects of patient care within the practice, improving convenience and continuity.",
          icon: HeartHandshake,
        },
        {
          title: "Streamlined implementation",
          body: "JAIA supports program development, clinical workflow coordination, supply sourcing, documentation processes, and revenue-cycle management.",
          icon: Workflow,
        },
        {
          title: "Sustainable practice growth",
          body: "Diversify service offerings while preserving clinical independence and maintaining a patient-centered approach.",
          icon: TrendingUp,
        },
      ],
      secondaryOutcomes: {
        id: "patient-benefits-heading",
        eyebrow: "Benefits for patients",
        heading: "Care that is more accessible, earlier, and closer to home.",
        items: [
          {
            title: "Greater financial accessibility",
            body: "Eligible patients may receive covered IV treatments through Medicare, Medicaid, or commercial insurance rather than paying the full cost of a cash-pay wellness infusion.",
            icon: Wallet,
          },
          {
            title: "Earlier clinical intervention",
            body: "Address certain conditions before they progress into more serious complications.",
            icon: Stethoscope,
          },
          {
            title: "Convenient, familiar care",
            body: "Receive medically appropriate treatment within an established physician’s office.",
            icon: Building2,
          },
          {
            title: "Continuity of care",
            body: "Benefit from services coordinated with the patient’s existing medical team.",
            icon: Users,
          },
        ],
      },
      approachEyebrow: "Clinically driven",
      approachHeading:
        "Clinically Driven. Insurance Focused. Practice Centered.",
      approachFootnote:
        "Because better healthcare isn’t just about treating complications. It’s about recognizing and addressing patient needs before they become more serious. Dehydration, nutritional deficiencies, and other conditions can escalate when left untreated—in-office IV therapy supports earlier intervention in the most appropriate clinical setting.",
      approachBodies: [
        "We start with the practice’s patients, clinical setting, and goals for offering medically appropriate IV therapy in-office—including where earlier intervention could reduce avoidable escalations to higher levels of care.",
        "We shape a structured program around clinical appropriateness, medical necessity, compliant documentation, and payer-specific reimbursement requirements—not a cash-pay wellness add-on.",
        "We support program development, clinical workflow coordination, supply sourcing, documentation processes, and revenue-cycle management through launch.",
        "We stay involved so the practice can sustain the service, refine workflows, and keep delivering greater value to patients while creating sustainable opportunities for growth.",
      ],
      faqs: [
        {
          question: "How is this different from cash-pay IV wellness clinics?",
          answer:
            "JAIA’s approach prioritizes documented medical necessity, appropriate treatment, and compliant insurance reimbursement. The goal is to make medically necessary IV therapy accessible through the healthcare system patients already rely on—not only through cash-pay wellness models.",
        },
        {
          question: "Can IV therapy be reimbursed by insurance?",
          answer:
            "When services are clinically driven and medically necessary, they may qualify for reimbursement through Medicare, Medicaid, and commercial insurance. JAIA helps practices build documentation and revenue-cycle processes around payer-specific requirements. Coverage always depends on the patient, the indication, and the payer.",
        },
        {
          question: "What does JAIA handle during implementation?",
          answer:
            "JAIA supports program development, clinical workflow coordination, supply sourcing, documentation processes, and revenue-cycle management so practices can integrate the service into existing operations without building every piece alone.",
        },
        {
          question: "Will this keep care inside our practice?",
          answer:
            "Yes—that is a core aim. Offering appropriate infusion treatments in the physician’s office can reduce referrals to outside facilities, strengthen continuity with the existing medical team, and improve convenience for patients.",
        },
      ],
      finalCta: {
        heading: "Bring IV Therapy Into Your Practice",
        body: "Expand Your Services. Improve Patient Access. Unlock New Revenue Opportunities. Discover how JAIA Health can help your practice integrate a medically driven IV therapy program into your existing care model.",
        ctaLabel: "Explore IV Therapy for Your Practice",
      },
      relatedSlugs: ["apcm-bhi", "pol-establishment"],
    },
  },
  {
    slug: "billing-rcm",
    shortName: "Billing & RCM",
    name: "Billing & Revenue Cycle Management",
    category: "Revenue operations",
    summary:
      "End-to-end revenue cycle management—coding, claims, denials, and accounts-receivable recovery—built to integrate with how the practice already operates.",
    capabilityLabels: [
      "Coding and claims",
      "Denial management",
      "A/R recovery",
    ],
    icon: ReceiptText,
    metaDescription:
      "End-to-end revenue cycle management — coding, claims, denials, and A/R recovery — built to integrate with how your practice already operates.",
    image: {
      src: "/images/stack-heart-scan-dashboard.jpg",
      alt: "A holographic heart scan surrounded by glowing charts, waveforms, and data panels in a clinic waiting area",
      width: 1536,
      height: 1024,
    },
    page: {
      acronymNote:
        "RCM stands for revenue cycle management — the full path from coding a visit through to collecting payment. A/R stands for accounts receivable, meaning the payments a practice is owed but has not yet received.",
      intro:
        "Revenue cycle work spans coding, claim submission, the denials that come back, and the payments still outstanding. JAIA takes on that cycle end to end and builds around the systems and habits the practice already has, rather than requiring the practice to reorganize itself around a billing vendor.",
      detail: [
        {
          label: "Coding and claims",
          body: "Coding and claim submission handled as a continuous process, so claims go out consistently rather than in batches when someone has time.",
          icon: ReceiptText,
        },
        {
          label: "Denial management",
          body: "Denials worked through as they arrive, with attention to the patterns behind repeat denials rather than only the individual claim.",
          icon: ShieldCheck,
        },
        {
          label: "A/R recovery",
          body: "Sustained follow-up on outstanding accounts receivable, including balances that have been sitting long enough to be forgotten.",
          icon: Repeat,
        },
      ],
      outcomes: [
        {
          title: "Claims that go out consistently",
          body: "Submission runs as an ongoing process rather than depending on whoever has capacity that week.",
          icon: ReceiptText,
        },
        {
          title: "Denials that get worked",
          body: "Denials are followed up and the patterns behind them are surfaced, not just the individual claims.",
          icon: ShieldCheck,
        },
        {
          title: "Visibility into what is owed",
          body: "Outstanding accounts receivable become something the practice can see and act on.",
          icon: LineChart,
        },
      ],
      approachBodies: [
        "We review how billing runs today — the systems, the people, the payer mix, and where claims are currently getting stuck.",
        "We design the working model: what JAIA takes on, what stays in the practice, and how the two hand off to each other.",
        "We coordinate the transition, including the existing accounts receivable, so nothing is dropped while responsibility moves.",
        "We keep working the cycle and reporting back, adjusting as payer behavior and the practice change.",
      ],
      faqs: [
        {
          question: "Can this work alongside our existing billing staff?",
          answer:
            "Yes. Part of the design work is deciding what JAIA takes on and what stays with the practice. Some practices hand over the full cycle, others keep front-end work in house and bring JAIA in for denials and accounts receivable.",
        },
        {
          question: "What happens to our existing accounts receivable?",
          answer:
            "Outstanding balances are addressed as part of the transition rather than left behind. How far back to work and in what order is decided with the practice during the design step.",
        },
        {
          question: "Do we have to change our practice management system?",
          answer:
            "The service is built to integrate with how the practice already operates, which includes the systems in place. Any change would be a decision made with the practice, not a precondition of working together.",
        },
        {
          question: "What reporting does the practice get?",
          answer:
            "Reporting is part of the operating model agreed during design, so the practice can see claim status, denial patterns, and the state of accounts receivable on an ongoing basis rather than requesting it.",
        },
      ],
      relatedSlugs: ["apcm-bhi", "pol-establishment"],
    },
  },
  {
    slug: "laboratory-coordination",
    shortName: "Laboratory Coordination",
    name: "Laboratory Coordination",
    category: "Diagnostic access",
    summary:
      "Coordinated access to established third-party reference laboratories, giving practices broad diagnostic coverage at favorable economics. Testing is performed by accredited labs; JAIA handles the partnerships and routing.",
    capabilityLabels: [
      "Reference-lab access",
      "Partnership coordination",
      "Test routing",
    ],
    icon: FlaskConical,
    metaDescription:
      "Coordinated access to established third-party reference laboratories, giving practices broad diagnostic coverage at favorable economics.",
    image: {
      src: "/images/stack-high-tech-lab.jpg",
      alt: "Laboratory staff in protective suits and masks reviewing results at monitors in a high-tech lab",
      width: 1536,
      height: 1024,
    },
    page: {
      intro:
        "This service is about access rather than testing. Testing itself is performed by established, accredited third-party reference laboratories. JAIA holds and manages those partnerships and handles the routing, so a practice gets broad diagnostic coverage without negotiating and maintaining each relationship itself.",
      detail: [
        {
          label: "Reference-lab access",
          body: "Access to established third-party reference laboratories, so the practice's diagnostic coverage is not limited to a single relationship.",
          icon: Network,
        },
        {
          label: "Partnership coordination",
          body: "The lab relationships themselves — negotiated, maintained, and managed by JAIA rather than by the practice.",
          icon: Boxes,
        },
        {
          label: "Test routing",
          body: "Orders directed to the appropriate laboratory, so the routing decision is not something the practice has to make each time.",
          icon: Route,
        },
      ],
      outcomes: [
        {
          title: "Broader diagnostic coverage",
          body: "The practice can order across a wider range of testing than a single lab relationship typically supports.",
          icon: Network,
        },
        {
          title: "Favorable economics",
          body: "Coordinated partnerships give practices access on terms that would be harder to reach individually.",
          icon: LineChart,
        },
        {
          title: "Routing handled for you",
          body: "Which laboratory receives which order is managed by JAIA rather than decided at the practice each time.",
          icon: Route,
        },
      ],
      approachBodies: [
        "We look at what the practice orders today, which lab relationships already exist, and where coverage or economics fall short.",
        "We design the routing model and identify which reference laboratory partnerships fit the practice's ordering patterns.",
        "We coordinate the setup, train staff on ordering and routing, and support the first weeks of live orders.",
        "We manage the partnerships on an ongoing basis and adjust routing as the practice's ordering changes.",
      ],
      faqs: [
        {
          question: "Who actually performs the testing?",
          answer:
            "Testing is performed by established third-party reference laboratories, all of which are accredited. JAIA does not perform testing under this service — the role is holding and coordinating the laboratory partnerships and handling how orders are routed.",
        },
        {
          question: "Can we keep our existing lab relationships?",
          answer:
            "That is part of the design conversation. Some practices keep an existing relationship in place and use coordination to fill gaps in coverage, rather than replacing everything at once.",
        },
        {
          question: "How does ordering change for our staff?",
          answer:
            "The intent is that ordering stays close to how the practice already works. Routing is handled behind the ordering step, and staff are trained on whatever does change before it goes live.",
        },
        {
          question: "What about turnaround times?",
          answer:
            "Turnaround depends on the individual test and the laboratory performing it. Expected turnaround for the tests a practice orders most is something to work through during the design step rather than a single figure that applies across the board.",
        },
      ],
      relatedSlugs: ["pol-establishment", "hrv-assessment"],
    },
  },
  {
    slug: "pol-establishment",
    shortName: "POL Establishment",
    name: "Physician Office Laboratory Establishment",
    category: "Laboratory operations",
    summary:
      "Physician Office Laboratory setup and ongoing operations, including CLIA considerations, equipment selection, validation, and staff training from end to end.",
    capabilityLabels: [
      "CLIA considerations",
      "Equipment and validation",
      "Staff training",
    ],
    icon: Microscope,
    metaDescription:
      "Physician Office Laboratory setup and ongoing operations — CLIA considerations, equipment selection, validation, and staff training from end to end.",
    image: {
      src: "/images/stack-diagnostics-touchscreen.jpg",
      alt: "A clinician's finger touching a translucent diagnostics panel showing lungs, heart, and waveform readings beside a glowing DNA strand",
      width: 1536,
      height: 1024,
    },
    page: {
      acronymNote:
        "POL stands for Physician Office Laboratory — a laboratory operated inside the practice itself. CLIA refers to the Clinical Laboratory Improvement Amendments, the federal standards governing laboratory testing on human samples.",
      intro:
        "Bringing testing in house means standing up a laboratory and then running one. JAIA covers both ends: the CLIA considerations, equipment selection, and validation involved in establishing the lab, and the training and operational support that keep it running afterwards.",
      detail: [
        {
          label: "CLIA considerations",
          body: "The regulatory questions involved in operating a laboratory inside the practice, worked through as part of setup rather than discovered later.",
          icon: ShieldCheck,
        },
        {
          label: "Equipment and validation",
          body: "Selecting instruments that match the practice's intended test menu and volume, and validating them before live use.",
          icon: Wrench,
        },
        {
          label: "Staff training",
          body: "Training the staff who will operate the laboratory, on the specific instruments and procedures the practice is putting in place.",
          icon: GraduationCap,
        },
      ],
      outcomes: [
        {
          title: "Testing inside the practice",
          body: "A defined test menu can be run in house rather than sent out.",
          icon: Beaker,
        },
        {
          title: "Equipment that has been validated",
          body: "Instruments are selected for the intended menu and validated before the laboratory goes live.",
          icon: Wrench,
        },
        {
          title: "Staff trained on your setup",
          body: "The people operating the lab are trained on the specific instruments and procedures in place, not a generic curriculum.",
          icon: GraduationCap,
        },
      ],
      approachBodies: [
        "We look at the test menu the practice wants in house, the space available, and the CLIA considerations that will apply to that setup.",
        "We design the laboratory: instruments, procedures, staffing, and the validation work required before live testing.",
        "We coordinate installation and validation, train the operating staff, and support the transition to live testing.",
        "We stay involved with ongoing operations as the menu, volume, or staffing changes.",
      ],
      faqs: [
        {
          question: "What is a Physician Office Laboratory?",
          answer:
            "A laboratory operated inside the practice itself, running a defined menu of tests in house rather than sending every specimen to an outside reference laboratory.",
        },
        {
          question: "How does CLIA factor in?",
          answer:
            "CLIA — the Clinical Laboratory Improvement Amendments — sets the federal standards for laboratory testing on human samples, and the requirements depend on the complexity of the tests being run. JAIA helps the practice work through the considerations that apply to its intended menu. Responsibility for certification and compliance rests with the practice.",
        },
        {
          question: "How long does it take to establish?",
          answer:
            "Timing depends on the test menu, the equipment involved, and the validation required, so it is scoped during the understand and design steps rather than quoted up front.",
        },
        {
          question: "What happens after the laboratory is running?",
          answer:
            "Ongoing operations are part of the service. JAIA stays involved as the menu, volume, or staffing changes rather than handing over at go-live.",
        },
      ],
      relatedSlugs: ["laboratory-coordination", "billing-rcm"],
    },
  },
] as const;

export function getService(slug: string): ServiceRecord | undefined {
  return services.find((service) => service.slug === slug);
}

export function serviceUrl(slug: string): string {
  return `/services/${slug}`;
}

/**
 * Company timeline — DRAFT content, pending client review.
 *
 * Dates 2013, 2020, and 2021 come from the client’s About-page origin brief.
 * 2024 (care management services launch) was requested by JAIA (Garrett).
 * Do not add program counts, revenue, or client numbers. Status is tracked
 * in docs/content-status.md.
 */

export interface TimelineChapter {
  /** Rail label — a confirmed year or a phase name, never an invented date */
  label: string;
  title: string;
  detail: string;
  chips?: readonly string[];
}

export const timelineSection = {
  eyebrow: "Our journey",
  heading: "How JAIA took shape.",
  body: "The work started next to physicians, widened past a single service, and became one partnership for the way an independent practice actually runs.",
  /** 2013 is the start of work with practices; six services exist today */
  facts: [
    { value: "2013", label: "Working with practices" },
    { value: "6", label: "Connected services" },
  ],
} as const;

export const timelineChapters: readonly TimelineChapter[] = [
  {
    label: "2013",
    title: "Seeing healthcare from inside the practice",
    detail:
      "The work that became JAIA began alongside physicians on specialty diagnostics—including genomics and infectious disease. Close to the clinic, it was an early look at what independent practices need beyond the exam room.",
  },
  {
    label: "2020",
    title: "Beyond a single service",
    detail:
      "Years in those practices made a larger job visible: helping them succeed past any one offering. That opened a clearer view of how clinical care, operations, patient follow-through, and sustainable growth connect—and of the partner role practices still lacked.",
  },
  {
    label: "2021",
    title: "JAIA Health takes shape",
    detail:
      "JAIA Health formed around a simple idea: independent practices don't need more vendors. They need a partner who understands how the pieces fit together. Instead of one service line, JAIA started building a connected set of programs, partnerships, and operating support that could grow with the practice.",
  },
  {
    label: "2024",
    title: "Care management services launch",
    detail:
      "JAIA launched care management services—including Advanced Primary Care Management and Behavioral Health Integration—so practices could enroll, coordinate, and follow patients with the same partner already supporting operations and growth.",
    chips: ["APCM", "BHI", "Care coordination"],
  },
  {
    label: "Today",
    title: "Built to keep evolving",
    detail:
      "JAIA continues to add capability as independent medicine changes—technology, data, and partnerships included—without changing the job. Understand the practice. Identify the opportunity. Build the right solution. Help the practice thrive.",
    chips: ["Programs", "Diagnostics", "Therapies", "Operations"],
  },
];

/**
 * Care-management infrastructure shown on APCM + BHI and the partners page.
 * Do not invent third-party logos, URLs, or product claims.
 */

import { ClipboardCheck, FileStack, History, type LucideIcon } from "lucide-react";

export interface ServicePartnerPoint {
  title: string;
  body: string;
  icon: LucideIcon;
}

export interface ServicePartner {
  name: string;
  /** External product URL — omit when there is no public third-party site. */
  href?: string;
  logo?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  eyebrow: string;
  /**
   * Partners-page card badge. When set, replaces the default
   * `With {service.shortName}` line (e.g. "With APCM + BHI").
   */
  contextLabel?: string;
  heading: string;
  body: string;
  points: readonly ServicePartnerPoint[];
  /** Label for an external link — only used when `href` is set. */
  ctaLabel?: string;
}

/** Partners / modules to surface on a given service page (`slug` → record). */
export const servicePartners: Partial<Record<string, ServicePartner>> = {
  "apcm-bhi": {
    name: "Care management module",
    eyebrow: "Program infrastructure",
    contextLabel: "Population Health Management",
    heading: "An insulated module behind population health management.",
    body: "JAIA provides an insulated operating module for care management programs — Advanced Primary Care Management, Behavioral Health Integration, and Principal Care Management. Practices use it for enrollment, consent, care-plan work, and a record they can produce, while provider review and sign-off stay with the practice.",
    points: [
      {
        title: "Enrollment and consent",
        body: "Capture written or verbal APCM consent in the record and keep next actions visible for the care team.",
        icon: ClipboardCheck,
      },
      {
        title: "Care plans physicians can review",
        body: "Create and revise electronic care plans with version history. Provider review or sign-off stays with the practice.",
        icon: FileStack,
      },
      {
        title: "A record you can produce",
        body: "Keep a trail for consent, care-plan revisions, and coordination so the practice can share what happened this month.",
        icon: History,
      },
    ],
  },
};

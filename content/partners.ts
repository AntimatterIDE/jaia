/**
 * Named technology partners. Only add records the client has confirmed —
 * do not invent logos, URLs, or product claims. Copy below is drawn from
 * the partner’s public site plus the client’s description of the relationship.
 */

import { ClipboardCheck, FileStack, History, type LucideIcon } from "lucide-react";

export interface ServicePartnerPoint {
  title: string;
  body: string;
  icon: LucideIcon;
}

export interface ServicePartner {
  name: string;
  href: string;
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  eyebrow: string;
  heading: string;
  body: string;
  points: readonly ServicePartnerPoint[];
  ctaLabel: string;
}

/** Partners to surface on a given service page (`slug` → partner). */
export const servicePartners: Partial<Record<string, ServicePartner>> = {
  "apcm-bhi": {
    name: "Clinix AI",
    href: "https://www.tryclinixai.com/",
    logo: {
      src: "/brand/clinix-ai-logo.png",
      alt: "Clinix AI",
      width: 216,
      height: 79,
    },
    eyebrow: "Technology partner",
    heading: "Clinix AI, for the APCM operating layer.",
    body: "JAIA partners with Clinix AI — population health software built for Advanced Primary Care Management and Behavioral Health Integration. Practices use it to enroll patients, document consent, keep care plans current, and produce records they can share. Physicians can review and approve care plans instead of carrying the full operating workflow themselves.",
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
    ctaLabel: "Visit Clinix AI",
  },
};

/**
 * Client testimonials for the social proof section on the homepage and every
 * service page. Quotes and attribution were supplied by JAIA for the public
 * site. Publish the quotes verbatim; do not add ratings, review counts, or
 * outcome figures.
 *
 * Avatars are initials; the client does not want stock photos. Set
 * `avatarSrc` only to a consented photograph of the person named. See
 * `docs/content-status.md`.
 */

/**
 * While true, the section renders a visible "sample copy" notice. Set to false
 * only once every quote below has been replaced with an approved one.
 */
export const TESTIMONIALS_ARE_PLACEHOLDER = false;

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  organization: string;
  /** Shown in the avatar circle when there is no portrait */
  initials: string;
  /** A consented photograph of the person named, if one is ever supplied */
  avatarSrc?: string;
}

export const testimonials: readonly Testimonial[] = [
  {
    quote:
      "JAIA understands the connection between operations and revenue cycle. That alignment makes it easier for us to work together, solve issues quickly, and keep the practice moving forward.",
    name: "Dakota White",
    title: "Founder & CEO",
    organization: "Superior Billing Solutions",
    initials: "DW",
  },
  {
    quote:
      "JAIA has become an extension of our practice. They understand how we operate, where we’re trying to grow, and they’re there to help us turn new ideas into programs that actually work.",
    name: "Ciera Newman",
    title: "Practice Administrator",
    organization: "Novo Wellness",
    initials: "CN",
  },
  {
    quote:
      "What stood out to me was that JAIA didn’t come in with a one-size-fits-all approach. They took the time to understand my practice first and built around what made sense for us.",
    name: "Dr. Arimah",
    title: "Owner & Founder",
    organization: "Arimah Medical Inc.",
    initials: "AR",
  },
  {
    quote:
      "JAIA has allowed us to expand the services we offer without adding unnecessary complexity to the practice. Their team handles the details while keeping us involved in the decisions that matter.",
    name: "Dr. Burton",
    title: "Owner & Founder",
    organization: "Burton Medical Group",
    initials: "BU",
  },
  {
    quote:
      "JAIA brings the operational and clinical pieces together in a way that makes the revenue cycle work better. Their team understands what has to happen upstream to create cleaner, more consistent outcomes on the billing side.",
    name: "Josh Erickson",
    title: "Owner & Founder",
    organization: "Progressus Revenue",
    initials: "JE",
  },
  {
    quote:
      "JAIA gave us a practical way to bring new programs into the practice without disrupting how we already operate. Their team works alongside ours from implementation through day-to-day execution, which has made growth much easier to manage.",
    name: "Dr. Eric Cavaciuti",
    title: "Owner & Founder",
    organization: "Georgia Medical Treatment Center",
    initials: "EC",
  },
];

/** Section framing copy — draft, pending client review */
export const socialProof = {
  eyebrow: "In their words",
  heading: "What practices and partners say.",
  body: "The working relationship matters as much as the capability. Here is how the practices and billing partners JAIA works with describe it.",
  notice:
    "Sample copy for layout review. These are illustrative quotes, not client testimonials.",
  cta: { label: "Start a conversation", href: "/contact" },
} as const;

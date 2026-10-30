import type { Metadata } from "next";

import { Hero1 } from "@/components/blocks/hero-1";
import { CtaLink } from "@/components/marketing/cta";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "Terms for using the JAIA Health website. The site is for general business information.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: `Terms | ${siteConfig.name}`,
    description:
      "Terms for using the JAIA Health website. The site is for general business information.",
  },
};

export default function TermsPage() {
  return (
    <>
      <Hero1
        eyebrow="Legal"
        heading="Terms"
        headingId="terms-heading"
        body="Terms for using the JAIA Health website. The site is for general business information."
      />
      <article className="section-wash section-wash-mist">
        <div className="text-brand-slate measure mx-auto w-full max-w-3xl space-y-5 px-5 py-4 pb-16 text-[1.0625rem] leading-relaxed sm:px-8 sm:pb-24">
          <p>
            By using this website you agree to these terms. The site describes
            JAIA Health’s services for independent medical practices.
          </p>
          <p>
            Information on this site is for general business purposes and is
            not medical, legal, or billing advice. It does not create a client
            relationship. A working relationship starts only when JAIA and a
            practice agree to one.
          </p>
          <p>
            Figures and case studies describe individual practices. They are
            not a guarantee of future results. Outcomes vary.
          </p>
          <p>
            Do not submit patient names, medical records, or other protected
            health information through this site. The contact form is for
            business conversations only.
          </p>
          <p>
            You may not copy the site’s content for a competing service or
            misrepresent it as your own. JAIA may update these terms by
            posting a new version on this page.
          </p>
          <p className="pt-4">
            <CtaLink href="/contact">Contact JAIA</CtaLink>
          </p>
        </div>
      </article>
    </>
  );
}

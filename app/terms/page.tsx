import type { Metadata } from "next";

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
    <article className="bg-canvas">
      <div className="mx-auto w-full max-w-3xl px-5 pt-[calc(var(--header-height)+2.5rem)] pb-20 sm:px-8 sm:pt-[calc(var(--header-height)+4rem)] sm:pb-24">
        <p className="text-eyebrow font-display text-brand-action font-semibold tracking-[0.18em] uppercase">
          Legal
        </p>
        <h1 className="font-display text-h2 text-brand-ink mt-5 font-semibold text-balance">
          Terms
        </h1>
        <div className="text-brand-slate mt-8 space-y-5 text-[1.0625rem] leading-relaxed">
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
        </div>
      </div>
    </article>
  );
}

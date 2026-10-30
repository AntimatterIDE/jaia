import type { Metadata } from "next";

import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How JAIA Health handles business inquiries submitted through this website.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: `Privacy Policy | ${siteConfig.name}`,
    description:
      "How JAIA Health handles business inquiries submitted through this website.",
  },
};

export default function PrivacyPage() {
  return (
    <article className="bg-canvas">
      <div className="mx-auto w-full max-w-3xl px-5 pt-[calc(var(--header-height)+2.5rem)] pb-20 sm:px-8 sm:pt-[calc(var(--header-height)+4rem)] sm:pb-24">
        <p className="text-eyebrow font-display text-brand-action font-semibold tracking-[0.18em] uppercase">
          Legal
        </p>
        <h1 className="font-display text-h2 text-brand-ink mt-5 font-semibold text-balance">
          Privacy Policy
        </h1>
        <div className="text-brand-slate mt-8 space-y-5 text-[1.0625rem] leading-relaxed">
          <p>
            This website is operated by JAIA Health. It is a business site for
            independent practices. It is not a patient portal and it is not for
            medical records.
          </p>
          <p>
            If you use the contact form or the on-site inquiry form, JAIA
            receives the details you submit — typically your name, email,
            practice, role, the service you are asking about, and your message
            — so the team can reply. Do not include patient names, medical
            records, or other protected health information.
          </p>
          <p>
            JAIA uses that information to respond to the inquiry and to follow
            up about services. JAIA does not sell personal information
            collected through these forms.
          </p>
          <p>
            The site may use ordinary hosting and analytics logs, such as
            browser type and pages visited, to keep the site running. Those
            logs are not used to identify patients.
          </p>
          <p>
            Questions about this policy can be sent through the contact form.
          </p>
        </div>
      </div>
    </article>
  );
}

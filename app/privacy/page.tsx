import type { Metadata } from "next";

import { Hero1 } from "@/components/blocks/hero-1";
import { CtaLink } from "@/components/marketing/cta";
import { ProseReveal } from "@/components/marketing/prose-reveal";
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
    <>
      <Hero1
        eyebrow="Legal"
        heading="Privacy Policy"
        headingId="privacy-heading"
        body="How JAIA Health handles business inquiries submitted through this website."
      />
      <article className="section-wash section-wash-mist">
        <div className="text-brand-slate measure mx-auto w-full max-w-3xl space-y-5 px-5 py-4 pb-16 text-[1.0625rem] leading-relaxed sm:px-8 sm:pb-24">
          <ProseReveal>
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
          <p className="pt-4">
            <CtaLink href="/contact">Contact JAIA</CtaLink>
          </p>
          </ProseReveal>
        </div>
      </article>
    </>
  );
}

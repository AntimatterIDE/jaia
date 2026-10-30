import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";

import { Hero1 } from "@/components/blocks/hero-1";
import { ContactForm } from "@/components/marketing/contact-form";
import { services } from "@/content/services";
import { contactPage } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation with JAIA Health about programs, diagnostics, therapies, and operational support for your independent practice.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({
  searchParams,
}: PageProps<"/contact">) {
  const { service } = await searchParams;
  const requested = typeof service === "string" ? service : undefined;
  const initialService = services.some((item) => item.slug === requested)
    ? requested
    : undefined;

  return (
    <Hero1
      eyebrow={contactPage.eyebrow}
      heading={contactPage.heading}
      headingId="contact-heading"
      body={contactPage.intro}
      aside={
        <>
          <div className="border-brand-mist bg-brand-sky-soft/60 flex items-start gap-3 rounded-2xl border p-5">
            <ShieldCheck aria-hidden="true" className="text-brand-action mt-0.5 size-5 shrink-0" />
            <p className="text-brand-ink text-sm leading-relaxed">
              This form is for business inquiries only. {contactPage.phiNotice}
            </p>
          </div>
          <div className="text-brand-slate flex flex-col gap-2 text-sm leading-relaxed">
            <p className="text-brand-ink font-semibold">Helpful to include in your message:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Your practice type and approximate size</li>
              <li>The services or capabilities you are exploring</li>
              <li>Where you are in the decision process</li>
            </ul>
          </div>
        </>
      }
      media={
        <div className="border-brand-mist rounded-[1.75rem] border bg-white p-6 sm:p-9">
          <ContactForm initialService={initialService} />
        </div>
      }
    />
  );
}

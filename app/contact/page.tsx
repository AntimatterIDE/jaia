import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";

import { Hero1 } from "@/components/blocks/hero-1";
import AnimatedContent from "@/components/AnimatedContent";
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
    <>
      <Hero1
        eyebrow={contactPage.eyebrow}
        heading={contactPage.heading}
        headingId="contact-heading"
        body={contactPage.intro}
        aside={
          <div className="border-brand-mist bg-brand-sky-soft/60 flex items-start gap-3 rounded-2xl border p-4 sm:p-5">
            <ShieldCheck
              aria-hidden="true"
              className="text-brand-action mt-0.5 size-5 shrink-0"
            />
            <p className="text-brand-ink text-sm leading-relaxed">
              This form is for business inquiries only. {contactPage.phiNotice}
            </p>
          </div>
        }
        media={
          <div className="border-brand-mist rounded-[1.75rem] border bg-white p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:p-9">
            <ContactForm initialService={initialService} />
          </div>
        }
      />

      <section
        aria-labelledby="contact-tips-heading"
        className="bg-canvas-soft border-brand-mist border-t"
      >
        <AnimatedContent className="mx-auto flex w-full max-w-[90rem] flex-col gap-3 px-5 py-10 sm:px-8 sm:py-12">
          <h2
            id="contact-tips-heading"
            className="text-brand-ink text-sm font-semibold"
          >
            Helpful to include in your message
          </h2>
          <ul className="text-brand-slate list-disc space-y-1.5 pl-5 text-sm leading-relaxed sm:columns-2 sm:gap-10">
            <li>Your practice type and approximate size</li>
            <li>The services or capabilities you are exploring</li>
            <li>Where you are in the decision process</li>
          </ul>
        </AnimatedContent>
      </section>
    </>
  );
}

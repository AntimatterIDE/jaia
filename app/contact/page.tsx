import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import AnimatedContent from "@/components/AnimatedContent";
import StaggeredText from "@/components/react-bits/staggered-text";
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
  const initialService = services.some((s) => s.slug === requested)
    ? requested
    : undefined;

  return (
    <section aria-labelledby="contact-heading" className="bg-canvas">
      <div className="mx-auto grid w-full max-w-[90rem] gap-14 px-5 pt-[calc(var(--header-height)+4rem)] pb-16 sm:px-8 sm:pt-[calc(var(--header-height)+6rem)] sm:pb-24 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:pt-[calc(var(--header-height)+7rem)] lg:pb-28">
        <AnimatedContent startOn="load" duration={0.55} distance={10}>
          <div className="flex max-w-lg flex-col items-start gap-6">
            <p className="text-eyebrow font-display text-brand-action font-semibold tracking-[0.18em] uppercase">
              {contactPage.eyebrow}
            </p>
            <StaggeredText
              as="h1"
              id="contact-heading"
              text={contactPage.heading}
              segmentBy="words"
              initialDelay={0.1}
              delay={55}
              duration={0.65}
              easing={[0.22, 1, 0.36, 1]}
              from={{ opacity: 0, y: 14, filter: "blur(6px)" }}
              to={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              className="font-display text-display text-brand-ink font-semibold text-balance"
            />
            <p className="measure text-lead text-brand-slate">
              {contactPage.intro}
            </p>

            <div className="border-brand-mist bg-brand-sky-soft/60 mt-2 flex items-start gap-3 rounded-2xl border p-5">
              <ShieldCheck
                aria-hidden="true"
                className="text-brand-action mt-0.5 size-5 shrink-0"
                strokeWidth={1.75}
              />
              <p className="text-brand-ink text-sm leading-relaxed">
                This form is for business inquiries only.{" "}
                {contactPage.phiNotice}
              </p>
            </div>

            <div className="text-brand-slate flex flex-col gap-3 text-sm leading-relaxed">
              <p className="text-brand-ink font-semibold">
                Helpful to include in your message:
              </p>
              <ul className="list-disc space-y-1.5 pl-5">
                <li>Your practice type and approximate size</li>
                <li>The services or capabilities you are exploring</li>
                <li>Where you are in the decision process</li>
              </ul>
            </div>
          </div>
        </AnimatedContent>

        <AnimatedContent
          delay={0.12}
          startOn="load"
          duration={0.55}
          distance={12}
        >
          <div className="border-brand-mist shadow-soft rounded-[1.75rem] border bg-white p-6 sm:p-9">
            <ContactForm initialService={initialService} />
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}

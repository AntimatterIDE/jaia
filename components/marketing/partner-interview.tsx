import Image from "next/image";

import AnimatedContent from "@/components/AnimatedContent";
import { ResultsDisclaimer } from "@/components/marketing/results-disclaimer";
import { SectionHeading } from "@/components/marketing/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getPartnerSpotlight } from "@/content/partner-spotlights";

/**
 * The full questionnaire, grouped by its original sections. A sticky intro
 * names who answered; questions sit in separate cards (unlike the hairline
 * FAQ lists elsewhere) so a long, multi-part answer reads as one unit.
 */
export function PartnerInterview({ slug }: { slug: string }) {
  const partner = getPartnerSpotlight(slug);
  if (!partner) return null;

  const { qa, respondent } = partner;
  const headingId = `${partner.anchor}-qa-heading`;
  const firstId = qa.sections[0]?.items[0]?.id;

  return (
    <section
      aria-labelledby={headingId}
      className="section-wash section-wash-mist"
    >
      <div className="mx-auto grid w-full max-w-[90rem] gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-12 lg:gap-x-16">
        <AnimatedContent className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <SectionHeading
            id={headingId}
            eyebrow={qa.eyebrow}
            title={qa.heading}
            body={qa.body}
          />
          <div className="shadow-soft mt-8 flex items-center gap-4 rounded-2xl border border-white bg-white/85 p-4 pr-6">
            <span className="border-brand-mist flex h-14 shrink-0 items-center rounded-xl border bg-white px-3">
              <Image
                src={partner.logo.src}
                alt=""
                width={partner.logo.width}
                height={partner.logo.height}
                className="h-7 w-auto"
              />
            </span>
            <p className="text-brand-slate text-sm leading-snug">
              Answered by
              <span className="text-brand-ink mt-0.5 block text-[0.9375rem] font-semibold">
                {respondent.name}, {respondent.organization}
              </span>
            </p>
          </div>
        </AnimatedContent>

        <AnimatedContent delay={0.08} className="lg:col-span-8">
          <Accordion
            type="multiple"
            defaultValue={firstId ? [firstId] : []}
            className="gap-10"
          >
            {qa.sections.map((section, sectionIndex) => (
              <div key={section.title}>
                <p className="text-brand-slate text-xs font-semibold tracking-[0.14em] uppercase">
                  <span className="text-brand-action">
                    {String(sectionIndex + 1).padStart(2, "0")}
                  </span>
                  <span aria-hidden="true"> · </span>
                  <span className="sr-only">: </span>
                  {section.title}
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  {section.items.map((item) => (
                    <AccordionItem
                      key={item.id}
                      value={item.id}
                      className="border-brand-mist hover:border-brand-sky/70 data-open:border-brand-sky data-open:shadow-soft rounded-2xl border bg-white px-5 transition-[border-color,box-shadow] duration-200 not-last:border-b sm:px-7"
                    >
                      <AccordionTrigger className="font-display text-brand-ink hover:text-brand-action min-h-16 gap-4 py-5 text-left text-base leading-snug font-semibold transition-colors duration-150 hover:no-underline sm:text-lg **:data-[slot=accordion-trigger-icon]:mt-1">
                        <span className="flex gap-4">
                          <span className="text-brand-action w-7 shrink-0 pt-0.5 text-sm tracking-[0.08em] sm:pt-1">
                            {item.id.toUpperCase()}
                          </span>
                          <span>{item.question}</span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-6 pl-11">
                        {item.answer ? (
                          <p className="measure text-brand-slate text-[1.0625rem] leading-relaxed">
                            {item.answer}
                          </p>
                        ) : null}
                        {item.parts ? (
                          <dl className="space-y-4">
                            {item.parts.map((part) => (
                              <div
                                key={part.label}
                                className="border-brand-sky/60 border-l-2 pl-4"
                              >
                                <dt className="text-brand-ink text-[0.9375rem] font-semibold">
                                  {part.label}
                                </dt>
                                <dd className="measure text-brand-slate mt-1 text-[1rem] leading-relaxed">
                                  {part.answer}
                                </dd>
                              </div>
                            ))}
                          </dl>
                        ) : null}
                        {item.id === "q4" ||
                        item.id === "q5" ||
                        item.id === "q6" ? (
                          <ResultsDisclaimer className="mt-5" />
                        ) : null}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </div>
              </div>
            ))}
          </Accordion>
        </AnimatedContent>
      </div>
    </section>
  );
}

import AnimatedContent from "@/components/AnimatedContent";
import { SectionHeading } from "@/components/marketing/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faq, type FaqItem } from "@/content/site";

interface FaqProps {
  id?: string;
  eyebrow?: string;
  heading?: string;
  items?: readonly FaqItem[];
}

/** Shared FAQ section. Service pages pass their own questions. */
export function Faq({
  id = "faq-heading",
  eyebrow = faq.eyebrow,
  heading = faq.heading,
  items = faq.items,
}: FaqProps = {}) {
  return (
    <section aria-labelledby={id} className="section-wash section-wash-mist">
      <div className="mx-auto w-full max-w-[90rem] px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-3xl">
          <AnimatedContent>
            <SectionHeading
              id={id}
              eyebrow={eyebrow}
              title={heading}
              align="center"
              className="max-w-3xl"
            />
          </AnimatedContent>

          <AnimatedContent delay={0.08}>
            <Accordion type="single" collapsible className="mt-12">
              {items.map((item, index) => (
                <AccordionItem
                  key={item.question}
                  value={`item-${index}`}
                  className="border-brand-mist not-last:border-b"
                >
                  <AccordionTrigger className="font-display text-brand-ink hover:text-brand-action min-h-14 gap-4 py-5 text-left text-base font-semibold transition-colors duration-150 hover:no-underline sm:text-lg">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <p className="measure text-brand-slate text-[1rem] leading-relaxed">
                      {item.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
}

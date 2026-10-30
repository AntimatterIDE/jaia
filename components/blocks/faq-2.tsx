"use client";

import { useState } from "react";

import { CtaButton, CtaLink } from "@/components/marketing/cta";
import { faq, primaryCta } from "@/content/site";

interface Faq2Props {
  id?: string;
  heading?: string;
  items?: readonly { question: string; answer: string }[];
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}

export function Faq2({
  id = "faq-heading",
  heading = faq.heading,
  items = faq.items,
  primary = primaryCta,
  secondary = { label: "Explore our capabilities", href: "/#capabilities" },
}: Faq2Props = {}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section aria-labelledby={id} className="bg-canvas w-full px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto grid w-full max-w-[90rem] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow-label">{faq.eyebrow}</p>
          <h2
            id={id}
            className="font-display text-brand-ink mt-5 text-[clamp(2.25rem,1.4rem+2vw,3.5rem)] leading-[1.05] font-medium tracking-tight text-balance"
          >
            {heading}
          </h2>
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <CtaButton href={primary.href}>{primary.label}</CtaButton>
            <CtaLink href={secondary.href}>{secondary.label}</CtaLink>
          </div>
        </div>
        <div className="border-brand-mist border-t">
          {items.map((item, index) => {
            const open = openIndex === index;
            const panelId = `${id}-panel-${index}`;
            return (
              <div key={item.question} className="border-brand-mist border-b">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="flex w-full items-baseline justify-between gap-6 py-5 text-left"
                >
                  <span className="font-display text-brand-ink text-xl leading-snug sm:text-2xl">
                    {item.question}
                  </span>
                  <span className="text-brand-slate font-label shrink-0 text-sm tracking-[0.16em]" aria-hidden="true">
                    {open ? "Close" : "Open"}
                  </span>
                </button>
                {open ? (
                  <p id={panelId} className="text-brand-slate max-w-2xl pb-6 leading-relaxed">
                    {item.answer}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Faq2;

"use client";

/**
 * React Bits Pro `faq-2`: a sticky prompt beside pill questions.
 * Answers use JAIA’s published FAQ copy.
 */

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

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
    <section aria-labelledby={id} className="bg-canvas w-full px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto grid w-full max-w-[1400px] gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
          <h2 id={id} className="font-display text-brand-ink text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
            {heading}
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={primary.href}
              className="bg-brand-ink inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-medium text-white"
            >
              {primary.label}
            </Link>
            <Link
              href={secondary.href}
              className="border-brand-mist text-brand-ink inline-flex h-12 items-center justify-center gap-2 rounded-full border px-6 text-sm font-medium"
            >
              {secondary.label}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          {items.map((item, index) => {
            const open = openIndex === index;
            return (
              <div key={item.question}>
                <div className="flex items-start gap-3">
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenIndex(open ? null : index)}
                    className={`flex-1 rounded-full border px-5 py-3.5 text-left text-base transition-colors ${
                      open
                        ? "border-brand-action/40 bg-brand-sky-soft text-brand-action"
                        : "border-transparent bg-brand-mist/70 text-brand-ink"
                    }`}
                  >
                    {item.question}
                  </button>
                  <button
                    type="button"
                    aria-label={open ? "Collapse answer" : "Expand answer"}
                    onClick={() => setOpenIndex(open ? null : index)}
                    className="border-brand-mist mt-3 flex size-7 items-center justify-center rounded-full border"
                  >
                    {open ? <Minus className="size-3.5" /> : <Plus className="size-3.5" />}
                  </button>
                </div>
                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="bg-brand-action mt-4 ml-auto max-w-[85%] rounded-[1.25rem] px-5 py-4 text-sm leading-relaxed text-white sm:text-base">
                        {item.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

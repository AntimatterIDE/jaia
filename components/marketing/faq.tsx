"use client";

import { Faq2 } from "@/components/blocks/faq-2";
import { faq, primaryCta, type FaqItem } from "@/content/site";

interface FaqProps {
  id?: string;
  heading?: string;
  items?: readonly FaqItem[];
}

export function Faq({ id = "faq-heading", heading = faq.heading, items = faq.items }: FaqProps = {}) {
  return (
    <Faq2
      id={id}
      heading={heading}
      items={items}
      primary={primaryCta}
      secondary={{ label: "Explore our capabilities", href: "/#capabilities" }}
    />
  );
}

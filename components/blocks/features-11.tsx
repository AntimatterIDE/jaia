"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface FeatureCard {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
}

interface Features11Props {
  id?: string;
  heading: string;
  body?: string;
  items: readonly FeatureCard[];
}

export function Features11({ id = "features-heading", heading, body, items }: Features11Props) {
  return (
    <section aria-labelledby={id} className="bg-canvas w-full px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto w-full max-w-[90rem]">
        {body ? <p className="eyebrow-label">{body}</p> : null}
        <h2
          id={id}
          className="font-display text-brand-ink mt-5 max-w-3xl text-[clamp(2.25rem,1.4rem+2.4vw,3.75rem)] leading-[1.05] font-medium tracking-tight text-balance"
        >
          {heading}
        </h2>
        <ol className="border-brand-mist mt-14 grid border-t md:grid-cols-3">
          {items.map((card, index) => (
            <li key={card.title} className="border-brand-mist border-b px-0 py-8 md:border-b-0 md:px-8 md:py-2 md:first:pl-0 md:last:pr-0 md:[&:not(:last-child)]:border-r">
              <p className="text-brand-slate font-label text-sm tracking-[0.16em]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="font-display text-brand-ink mt-4 text-3xl leading-tight">{card.title}</h3>
              <p className="text-brand-slate mt-3 leading-relaxed">{card.description}</p>
              {card.href && card.linkLabel ? (
                <Link
                  href={card.href}
                  className="text-brand-action-deep mt-5 inline-flex items-center gap-2 text-sm"
                >
                  {card.linkLabel}
                  <ArrowRight className="size-4" />
                </Link>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default Features11;

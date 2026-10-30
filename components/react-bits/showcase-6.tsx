"use client";

import Image from "next/image";
import Link from "next/link";

import { CtaLink } from "@/components/marketing/cta";
import { cn } from "@/lib/utils";

export interface Showcase6Card {
  href: string;
  caption: string;
  meta: string;
  image: {
    src: string;
    alt: string;
    objectPosition?: string;
  };
  tilt: number;
  lift: string;
  comingSoon?: boolean;
  showPhoto?: boolean;
}

export interface Showcase6Props {
  id?: string;
  headingId: string;
  headingLead: string;
  headingAccent: string;
  body: string;
  cta: { label: string; href: string };
  notice?: string;
  items: readonly Showcase6Card[];
  className?: string;
}

function StudyRow({ item }: { item: Showcase6Card }) {
  return (
    <Link
      href={item.href}
      className="border-brand-mist group grid grid-cols-1 items-center gap-6 border-b py-8 sm:grid-cols-[7.5rem_1fr_auto] sm:gap-10"
    >
      <div className="bg-canvas-soft relative aspect-[4/3] overflow-hidden sm:aspect-square">
        {item.showPhoto === false ? (
          <div className="text-brand-slate absolute inset-0 flex items-center justify-center font-display text-2xl">
            —
          </div>
        ) : (
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes="(min-width: 640px) 120px, 40vw"
            className={cn("object-cover", item.image.objectPosition)}
          />
        )}
      </div>
      <span className="min-w-0">
        <span className="font-display text-brand-ink block text-2xl leading-tight sm:text-3xl">
          {item.caption}
        </span>
        {item.comingSoon ? (
          <span className="eyebrow-label mt-2 block">Coming soon</span>
        ) : null}
      </span>
      {item.meta && !(item.comingSoon && item.meta === "Coming soon") ? (
        <span className="text-brand-slate text-sm tracking-wide">{item.meta}</span>
      ) : (
        <span />
      )}
    </Link>
  );
}

export function Showcase6({
  id,
  headingId,
  headingLead,
  headingAccent,
  body,
  cta,
  notice,
  items,
  className,
}: Showcase6Props) {
  return (
    <section id={id} aria-labelledby={headingId} className={cn("bg-canvas", className)}>
      <div className="mx-auto w-full max-w-[90rem] px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <h2
            id={headingId}
            className="font-display text-brand-ink text-[clamp(2.25rem,1.4rem+2.4vw,3.75rem)] leading-[1.05] font-medium tracking-tight text-balance"
          >
            {headingLead}
            <span className="text-brand-slate">{headingAccent}</span>
          </h2>
          <div>
            <p className="text-brand-slate text-lg leading-relaxed">{body}</p>
            {notice ? (
              <p className="border-brand-mist text-brand-slate mt-5 border-l pl-4 text-sm italic">{notice}</p>
            ) : null}
            <div className="mt-6">
              <CtaLink href={cta.href}>{cta.label}</CtaLink>
            </div>
          </div>
        </div>
        <ul className="border-brand-mist mt-16 border-t">
          {items.map((item) => (
            <li key={item.href}>
              <StudyRow item={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Showcase6Grid({ items }: { items: readonly Showcase6Card[] }) {
  return (
    <ul className="border-brand-mist border-t">
      {items.map((item) => (
        <li key={item.href}>
          <StudyRow item={item} />
        </li>
      ))}
    </ul>
  );
}

export default Showcase6;

import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import AnimatedContent from "@/components/AnimatedContent";
import SpotlightCard from "@/components/SpotlightCard";
import { SectionHeading } from "@/components/marketing/section-heading";
import { JaiaSymbol } from "@/components/jaia-symbol";
import { outcomes } from "@/content/site";
import { getService, serviceUrl } from "@/content/services";

export interface OutcomeItem {
  title: string;
  body: string;
  icon: LucideIcon;
  /** Approved service slugs that support this outcome, if any */
  slugs?: readonly string[];
}

interface OutcomesProps {
  id?: string;
  eyebrow?: string;
  heading?: string;
  headingClassName?: string;
  items?: readonly OutcomeItem[];
}

/**
 * Outcomes — the directions a practice can move with JAIA.
 *
 * Previously a tab set beside a decorative diagram, which hid two thirds of
 * an already short section behind an interaction and left the layout sparse.
 * All three are now visible at once and, on the homepage, each names the
 * approved services behind it, so the section answers "how" rather than only
 * asserting "what". Service pages reuse the same component with their own
 * items and no service links, since the page is already about one service.
 */
export function Outcomes({
  id = "outcomes-heading",
  eyebrow = outcomes.eyebrow,
  heading = outcomes.heading,
  headingClassName,
  items = outcomes.items,
}: OutcomesProps = {}) {
  return (
    <section
      aria-labelledby={id}
      className="section-wash section-wash-sky relative z-[1] overflow-x-clip"
    >
      {/* Clip the bleed so the watermark cannot widen the layout viewport —
          that pushed the mobile burger off-screen (Garrett). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      >
        <JaiaSymbol className="symbol-watermark text-brand-sky absolute -top-24 -right-24 size-[22rem] opacity-[0.08] sm:-right-20" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[90rem] px-5 pb-16 sm:px-8 sm:pb-20">
        <AnimatedContent>
          <SectionHeading
            id={id}
            eyebrow={eyebrow}
            title={heading}
            className={headingClassName}
          />
        </AnimatedContent>

        <ul className="mt-12 grid gap-5 sm:mt-14 sm:gap-6 lg:grid-cols-3">
          {items.map((item, index) => {
            const services = (item.slugs ?? [])
              .map((slug) => getService(slug))
              .filter((service) => service !== undefined);

            return (
              <li key={item.title}>
                <AnimatedContent delay={index * 0.09} className="h-full">
                  <SpotlightCard className="lift shadow-soft hover:border-brand-sky hover:shadow-lift flex h-full flex-col rounded-[1.5rem] border border-white bg-white/80 p-7 backdrop-blur-xs sm:p-8">
                    <span
                      aria-hidden="true"
                      className="bg-brand-sky-soft text-brand-action flex size-14 items-center justify-center rounded-2xl"
                    >
                      <item.icon className="size-6" strokeWidth={1.75} />
                    </span>

                    <h3 className="font-display text-h3 text-brand-ink mt-6 font-semibold">
                      {item.title}
                    </h3>
                    <p className="text-brand-slate mt-3 text-[1.0625rem] leading-relaxed">
                      {item.body}
                    </p>

                    {services.length > 0 ? (
                      /* Push the service links to a common baseline across cards */
                      <div className="mt-auto pt-7">
                        <p className="text-brand-slate text-xs font-semibold tracking-[0.14em] uppercase">
                          Capabilities that support this
                        </p>
                        <ul className="mt-3 flex flex-wrap gap-2">
                          {services.map((service) => (
                            <li key={service.slug}>
                              <Link
                                href={serviceUrl(service.slug)}
                                className="border-brand-mist text-brand-action hover:border-brand-sky hover:bg-brand-sky-soft active:bg-brand-sky-soft inline-flex min-h-10 items-center gap-2 rounded-full border bg-white px-3.5 text-[0.8125rem] font-semibold transition-colors duration-150"
                              >
                                <service.icon
                                  aria-hidden="true"
                                  className="size-3.5"
                                  strokeWidth={1.75}
                                />
                                {service.shortName}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </SpotlightCard>
                </AnimatedContent>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

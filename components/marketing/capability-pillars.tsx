import Link from "next/link";
import { capabilityPillars } from "@/content/site";
import { getService, serviceUrl } from "@/content/services";
import { cn } from "@/lib/utils";

/**
 * The four capability pillars — Programs, Diagnostics, Therapies, Operations.
 *
 * These appeared twice as an undifferentiated string of words. Each pillar
 * maps to real service records, so the band variant exposes that mapping as
 * navigation instead of decoration.
 */

/** Compact row used under the hero copy. */
export function CapabilityPillarsInline({ className }: { className?: string }) {
  return (
    <ul
      className={cn("flex flex-wrap items-center gap-x-5 gap-y-2", className)}
    >
      {capabilityPillars.map((pillar) => (
        <li
          key={pillar.label}
          className="text-brand-slate flex items-center gap-2 text-sm font-semibold tracking-[0.02em]"
        >
          <pillar.icon
            aria-hidden="true"
            className="text-brand-sky size-4"
            strokeWidth={2}
          />
          {pillar.label}
        </li>
      ))}
    </ul>
  );
}

/**
 * Full band used in the partnership strip.
 *
 * auto-rows-fr matters here: grid rows are sized independently, so without it
 * the two-column layout would give each row its own height.
 */
export function CapabilityPillarsBand() {
  return (
    <ul className="grid auto-rows-fr grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {capabilityPillars.map((pillar) => {
        const services = pillar.slugs
          .map((slug) => getService(slug))
          .filter((service) => service !== undefined);

        return (
          <li key={pillar.label}>
            {/* Fixed three-row track: icon, label, then the service list.
                Pillars hold different numbers of services, so without this the
                rows drift apart from card to card. */}
            <div className="border-brand-mist grid h-full grid-rows-[auto_auto_1fr] justify-items-center gap-3 rounded-2xl border bg-white px-4 py-6 text-center sm:gap-4 sm:px-5">
              <span
                aria-hidden="true"
                className="bg-brand-sky-soft text-brand-action flex size-12 items-center justify-center rounded-2xl"
              >
                <pillar.icon className="size-5.5" strokeWidth={1.75} />
              </span>

              <p className="font-display text-brand-ink text-[0.9375rem] font-semibold tracking-[0.1em] uppercase">
                {pillar.label}
              </p>

              <ul className="flex flex-col items-center gap-1">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={serviceUrl(service.slug)}
                      className="group/pillar text-brand-slate hover:text-brand-action inline-flex text-[0.8125rem] leading-snug font-medium transition-colors duration-150"
                    >
                      <span className="relative">
                        {service.shortName}
                        <span
                          aria-hidden="true"
                          className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-200 ease-out group-hover/pillar:scale-x-100 group-focus-visible/pillar:scale-x-100 motion-reduce:transition-none"
                        />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

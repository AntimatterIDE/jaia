import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { MouseEventHandler } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Tone = "ink" | "sky" | "outline";
type Size = "default" | "compact";

const toneStyles: Record<Tone, string> = {
  ink: "border-transparent bg-brand-ink text-white hover:bg-brand-action-deep",
  sky: "border-brand-mist bg-transparent text-brand-ink hover:border-brand-ink",
  outline: "border-brand-mist bg-transparent text-brand-ink hover:border-brand-ink",
};

const sizeStyles: Record<Size, string> = {
  default: "h-12 px-6 text-base",
  compact: "h-11 px-5 text-[0.9375rem]",
};

interface CtaButtonProps {
  href: string;
  children: React.ReactNode;
  tone?: Tone;
  size?: Size;
  className?: string;
  withArrow?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

/**
 * The one saturated control on the site: an ink pill. Outline is a hairline.
 */
export function CtaButton({
  href,
  children,
  tone = "ink",
  size = "default",
  className,
  withArrow = false,
  onClick,
}: CtaButtonProps) {
  return (
    <Button
      asChild
      className={cn(
        "group/cta rounded-full border font-semibold shadow-none",
        "transition-colors duration-150",
        sizeStyles[size],
        toneStyles[tone],
        className,
      )}
    >
      <Link href={href} onClick={onClick}>
        <span className="inline-flex items-center gap-1">
          {children}
          {withArrow ? (
            <ArrowRight
              aria-hidden="true"
              className="ml-1 size-4 transition-transform duration-200 group-hover/cta:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover/cta:translate-x-0"
            />
          ) : null}
        </span>
      </Link>
    </Button>
  );
}

export function CtaLink({
  href,
  children,
  className,
  tone = "action",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  tone?: "action" | "onDark";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group/link inline-flex min-h-11 items-center gap-2 text-base transition-colors duration-150",
        tone === "action"
          ? "text-brand-action-deep hover:text-brand-ink"
          : "text-canvas hover:text-white",
        className,
      )}
    >
      <span className="relative">
        {children}
        <span
          aria-hidden="true"
          className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-200 ease-out group-hover/link:scale-x-100 group-focus-visible/link:scale-x-100 motion-reduce:transition-none"
        />
      </span>
      <ArrowRight
        aria-hidden="true"
        className="size-4 transition-transform duration-200 group-hover/link:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover/link:translate-x-0"
      />
    </Link>
  );
}

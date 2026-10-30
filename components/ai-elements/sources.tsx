"use client";

import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { BookIcon, ChevronDownIcon } from "lucide-react";
import type { ComponentProps } from "react";

export type SourcesProps = ComponentProps<"div">;

export const Sources = ({ className, ...props }: SourcesProps) => (
  <Collapsible
    className={cn("not-prose text-brand-action text-xs", className)}
    {...props}
  />
);

export type SourcesTriggerProps = ComponentProps<typeof CollapsibleTrigger> & {
  count: number;
};

export const SourcesTrigger = ({
  className,
  count,
  children,
  ...props
}: SourcesTriggerProps) => (
  <CollapsibleTrigger
    className={cn(
      "text-brand-slate hover:text-brand-ink flex items-center gap-2",
      className,
    )}
    {...props}
  >
    {children ?? (
      <>
        <span className="font-medium">
          Used {count} {count === 1 ? "source" : "sources"}
        </span>
        <ChevronDownIcon className="size-3.5" />
      </>
    )}
  </CollapsibleTrigger>
);

export type SourcesContentProps = ComponentProps<typeof CollapsibleContent>;

export const SourcesContent = ({
  className,
  ...props
}: SourcesContentProps) => (
  <CollapsibleContent
    className={cn(
      "mt-2 flex w-full flex-col gap-1.5",
      "data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2 data-[state=closed]:animate-out data-[state=open]:animate-in outline-none",
      className,
    )}
    {...props}
  />
);

export type SourceProps = ComponentProps<"a">;

export function Source({
  href,
  title,
  children,
  className,
  ...props
}: SourceProps) {
  const classNames = cn(
    "text-brand-action flex items-center gap-2 font-medium",
    className,
  );
  const inner = children ?? (
    <>
      <BookIcon className="size-3.5" />
      <span>{title}</span>
    </>
  );

  if (href?.startsWith("/")) {
    return (
      <Link href={href} className={classNames}>
        {inner}
      </Link>
    );
  }

  return (
    <a
      className={classNames}
      href={href}
      rel="noreferrer"
      target={href?.startsWith("http") ? "_blank" : undefined}
      {...props}
    >
      {inner}
    </a>
  );
}

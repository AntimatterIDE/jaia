"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, SearchIcon } from "lucide-react";
import type { KnowledgePassage } from "@/lib/agents/sales-search";

export function KnowledgeSearch({
  query,
  passages,
  state,
}: {
  query?: string;
  passages: KnowledgePassage[];
  state:
    "input-streaming" | "input-available" | "output-available" | "output-error";
}) {
  const running = state === "input-streaming" || state === "input-available";
  const count = passages.length;

  return (
    <Collapsible defaultOpen={running} className="not-prose mb-2">
      <CollapsibleTrigger className="text-brand-slate hover:text-brand-ink flex w-full items-center gap-2 text-xs">
        <SearchIcon className="size-3.5" />
        {running ? (
          <Shimmer as="span" className="text-xs" duration={1.2}>
            Searching JAIA pages…
          </Shimmer>
        ) : (
          <span>
            {count > 0
              ? `Reviewed ${count} ${count === 1 ? "page" : "pages"}`
              : "Searched JAIA pages"}
          </span>
        )}
        <ChevronDownIcon className="ml-auto size-3.5" />
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 space-y-1.5 text-xs">
        {query ? <p className="text-brand-slate">Looking up: {query}</p> : null}
        {passages.map((passage) => (
          <p
            key={passage.href}
            className={cn("text-brand-ink truncate font-medium")}
          >
            {passage.title}
          </p>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

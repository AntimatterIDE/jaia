"use client";

import type {
  InquiryFormOutput,
  SalesAgentUIMessage,
} from "@/lib/agents/sales-tools";
import type { KnowledgePassage } from "@/lib/agents/sales-search";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@/components/ai-elements/reasoning";
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from "@/components/ai-elements/sources";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { KnowledgeSearch } from "@/components/marketing/knowledge-search";
import { SalesInquiryForm } from "@/components/marketing/sales-inquiry-form";
import { useReducedMotion } from "motion/react";

function sourcesFromMessage(message: SalesAgentUIMessage): KnowledgePassage[] {
  const seen = new Set<string>();
  const sources: KnowledgePassage[] = [];

  for (const part of message.parts) {
    if (
      part.type === "tool-searchKnowledge" &&
      part.state === "output-available"
    ) {
      for (const passage of part.output.passages) {
        if (seen.has(passage.href)) continue;
        seen.add(passage.href);
        sources.push(passage);
      }
    }

    if (part.type === "source-url") {
      if (seen.has(part.url)) continue;
      seen.add(part.url);
      sources.push({
        title: part.title || part.url,
        href: part.url,
        body: "",
      });
    }
  }

  return sources;
}

export function SalesAgentMessage({
  message,
  isLast,
  streaming,
  onInquiryComplete,
}: {
  message: SalesAgentUIMessage;
  isLast: boolean;
  streaming: boolean;
  onInquiryComplete: (callId: string, output: InquiryFormOutput) => void;
}) {
  const reduceMotion = useReducedMotion();

  if (message.role === "user") {
    const text = message.parts
      .filter((part) => part.type === "text")
      .map((part) => part.text)
      .join("\n");

    return (
      <Message from="user" className="max-w-[85%]">
        <MessageContent>
          <p className="whitespace-pre-wrap">{text}</p>
        </MessageContent>
      </Message>
    );
  }

  const reasoningText = message.parts
    .filter((part) => part.type === "reasoning")
    .map((part) => part.text)
    .join("\n\n");
  const lastPart = message.parts.at(-1);
  const reasoningStreaming =
    isLast && streaming && lastPart?.type === "reasoning";
  const textStreaming =
    isLast && streaming && lastPart?.type === "text" && !reduceMotion;
  const sources = sourcesFromMessage(message);
  const hasText = message.parts.some(
    (part) => part.type === "text" && part.text.trim(),
  );
  const hasSearch = message.parts.some(
    (part) => part.type === "tool-searchKnowledge",
  );
  const showThinking =
    isLast && streaming && !reasoningText && !hasSearch && !hasText;

  return (
    <Message from="assistant" className="w-full max-w-full">
      <MessageContent>
        {showThinking ? (
          <Shimmer as="p" className="text-xs" duration={1.2}>
            Thinking…
          </Shimmer>
        ) : null}

        {reasoningText ? (
          <Reasoning className="mb-2" isStreaming={reasoningStreaming}>
            <ReasoningTrigger className="text-brand-slate hover:text-brand-ink text-xs" />
            <ReasoningContent>{reasoningText}</ReasoningContent>
          </Reasoning>
        ) : null}

        {message.parts.map((part, index) => {
          if (part.type === "tool-searchKnowledge") {
            const passages =
              part.state === "output-available" ? part.output.passages : [];
            const query =
              "input" in part &&
              part.input &&
              typeof part.input.query === "string"
                ? part.input.query
                : undefined;

            if (
              part.state === "input-streaming" ||
              part.state === "input-available" ||
              part.state === "output-available" ||
              part.state === "output-error"
            ) {
              return (
                <KnowledgeSearch
                  key={part.toolCallId}
                  query={query}
                  passages={passages}
                  state={part.state}
                />
              );
            }
            return null;
          }

          if (part.type === "text" && part.text.trim()) {
            return (
              <MessageResponse
                key={`${message.id}-text-${index}`}
                isAnimating={textStreaming}
                mode={textStreaming ? "streaming" : "static"}
              >
                {part.text}
              </MessageResponse>
            );
          }

          if (part.type === "tool-offerInquiryForm") {
            const callId = part.toolCallId;
            switch (part.state) {
              case "input-streaming":
                return (
                  <Shimmer
                    key={callId}
                    as="p"
                    className="text-xs"
                    duration={1.2}
                  >
                    Preparing a form…
                  </Shimmer>
                );
              case "input-available":
                return (
                  <SalesInquiryForm
                    key={callId}
                    formId={callId}
                    serviceSlug={part.input.serviceSlug}
                    suggestedMessage={part.input.suggestedMessage}
                    onComplete={(output) => onInquiryComplete(callId, output)}
                  />
                );
              case "output-available":
                return (
                  <p key={callId} className="text-brand-slate mt-1 text-xs">
                    {part.output.submitted
                      ? part.output.delivery === "not_configured"
                        ? "This form is not connected yet, so nothing was sent."
                        : "Inquiry submitted."
                      : "Form closed."}
                  </p>
                );
              case "output-error":
                return (
                  <p key={callId} className="text-destructive text-xs">
                    {part.errorText}
                  </p>
                );
              case "output-denied":
                return (
                  <p key={callId} className="text-brand-slate text-xs">
                    Form closed.
                  </p>
                );
              default:
                return null;
            }
          }

          return null;
        })}

        {sources.length > 0 && !streaming ? (
          <Sources className="mt-3">
            <SourcesTrigger count={sources.length} />
            <SourcesContent>
              {sources.map((source) => (
                <Source
                  key={source.href}
                  href={source.href}
                  title={source.title}
                />
              ))}
            </SourcesContent>
          </Sources>
        ) : null}
      </MessageContent>
    </Message>
  );
}

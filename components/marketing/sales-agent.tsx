"use client";

import { useChat } from "@ai-sdk/react";
import {
  DefaultChatTransport,
  lastAssistantMessageIsCompleteWithToolCalls,
} from "ai";
import { ArrowUp, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { SalesAgentMessage } from "@/components/marketing/sales-agent-message";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Button } from "@/components/ui/button";
import {
  salesAgentCopy,
  salesConversationStarters,
} from "@/content/sales-agent";
import type { SalesAgentUIMessage } from "@/lib/agents/sales-tools";

const EASE = [0.22, 1, 0.36, 1] as const;

export function SalesAgent() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [configured, setConfigured] = useState<boolean | null>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);
  const alignedFormId = useRef<string | null>(null);

  const { messages, sendMessage, addToolOutput, status, error, clearError } =
    useChat<SalesAgentUIMessage>({
      transport: new DefaultChatTransport({ api: "/api/chat" }),
      sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
    });

  const busy = status === "submitted" || status === "streaming";
  const chatReady = configured === true && !error;

  useEffect(() => {
    let cancelled = false;
    fetch("/api/chat")
      .then((response) => response.json())
      .then((data: { configured?: boolean }) => {
        if (!cancelled) setConfigured(data.configured === true);
      })
      .catch(() => {
        if (!cancelled) setConfigured(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open && !wasOpen.current) {
      panelRef.current?.focus();
    } else if (!open && wasOpen.current) {
      launcherRef.current?.focus();
    }
    wasOpen.current = open;
  }, [open]);

  useEffect(() => {
    const log = logRef.current;
    if (!log || !open) return;
    const active = document.activeElement;
    if (
      active instanceof HTMLElement &&
      log.contains(active) &&
      (active.tagName === "INPUT" ||
        active.tagName === "TEXTAREA" ||
        active.tagName === "SELECT" ||
        active.getAttribute("role") === "combobox")
    ) {
      return;
    }

    const form = log.querySelector("[data-inquiry-form]");
    if (form instanceof HTMLElement) {
      const id = form.getAttribute("data-inquiry-form") ?? "form";
      if (alignedFormId.current === id) return;
      alignedFormId.current = id;
      const top =
        form.getBoundingClientRect().top -
        log.getBoundingClientRect().top +
        log.scrollTop;
      log.scrollTop = Math.max(0, top - 8);
      return;
    }

    alignedFormId.current = null;
    log.scrollTop = log.scrollHeight;
  }, [messages, status, open]);

  function submitText(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy || !chatReady) return;
    sendMessage({ text: trimmed });
    setInput("");
  }

  function onComposerSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitText(input);
  }

  function onComposerKeyDown(event: ReactKeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submitText(input);
    }
  }

  return (
    <div className="pointer-events-none fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open ? (
          <motion.div
            key="sales-agent-panel"
            ref={panelRef}
            id="sales-agent-panel"
            role="dialog"
            aria-modal="false"
            aria-labelledby="sales-agent-title"
            tabIndex={-1}
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.22, ease: EASE }}
            data-lenis-prevent
            data-lenis-prevent-wheel
            data-lenis-prevent-touch
            className="border-brand-mist bg-canvas pointer-events-auto grid h-[min(36rem,calc(100dvh-7.5rem))] w-[min(24rem,calc(100vw-2rem))] grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden border outline-none"
          >
            <header className="border-brand-mist flex shrink-0 items-start gap-3 border-b px-4 py-3">
              <div className="min-w-0 flex-1">
                <p
                  id="sales-agent-title"
                  className="font-display text-brand-ink text-sm font-semibold"
                >
                  {salesAgentCopy.title}
                </p>
                <p className="text-brand-slate text-xs leading-relaxed">
                  {salesAgentCopy.subtitle}
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={salesAgentCopy.launcherClose}
                onClick={() => setOpen(false)}
                className="text-brand-ink size-8 shrink-0 rounded-full"
              >
                <X className="size-4" />
              </Button>
            </header>

            <div
              ref={logRef}
              data-lenis-prevent
              data-lenis-prevent-wheel
              data-lenis-prevent-touch
              onWheel={(event) => event.stopPropagation()}
              className="min-h-0 touch-pan-y overflow-y-auto overscroll-contain px-4 py-3 text-sm leading-relaxed [overflow-anchor:none]"
            >
              <div className="flex flex-col gap-3">
                {configured === false ? (
                  <div className="border-brand-mist text-brand-ink border p-3 text-sm leading-relaxed">
                    <p>{salesAgentCopy.unavailable}</p>
                    <Link
                      href="/contact"
                      className="text-brand-action mt-2 inline-flex font-semibold underline underline-offset-2"
                    >
                      {salesAgentCopy.contactCta}
                    </Link>
                  </div>
                ) : null}

                {configured !== false && messages.length === 0 ? (
                  <div className="flex flex-col gap-3">
                    <p className="text-brand-slate text-sm leading-relaxed">
                      {salesAgentCopy.emptyHint}
                    </p>
                    <ul className="flex flex-col gap-2">
                      {salesConversationStarters.map((starter) => (
                        <li key={starter.prompt}>
                          <button
                            type="button"
                            disabled={busy || configured !== true}
                            onClick={() => submitText(starter.prompt)}
                            className="border-brand-mist text-brand-ink hover:border-brand-ink w-full border bg-transparent px-3 py-2.5 text-left text-sm transition-colors duration-150 disabled:opacity-60 motion-reduce:transition-none"
                          >
                            {starter.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {messages.map((message, index) => (
                  <SalesAgentMessage
                    key={message.id}
                    message={message}
                    isLast={index === messages.length - 1}
                    streaming={busy && index === messages.length - 1}
                    onInquiryComplete={(callId, output) =>
                      addToolOutput({
                        tool: "offerInquiryForm",
                        toolCallId: callId,
                        output,
                      })
                    }
                  />
                ))}

                {status === "submitted" &&
                messages.at(-1)?.role !== "assistant" ? (
                  <Shimmer as="p" className="text-xs" duration={1.2}>
                    {salesAgentCopy.thinking}
                  </Shimmer>
                ) : null}

                {error ? (
                  <div className="border-destructive/30 bg-destructive/5 text-brand-ink rounded-xl border p-3 text-sm leading-relaxed">
                    <p>{salesAgentCopy.error}</p>
                    <div className="mt-2 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => clearError()}
                        className="text-brand-action font-semibold underline underline-offset-2"
                      >
                        Dismiss
                      </button>
                      <Link
                        href="/contact"
                        className="text-brand-action font-semibold underline underline-offset-2"
                      >
                        {salesAgentCopy.contactCta}
                      </Link>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <form
              onSubmit={onComposerSubmit}
              className="border-brand-mist shrink-0 border-t p-3"
            >
              <label htmlFor="sales-agent-input" className="sr-only">
                {salesAgentCopy.placeholder}
              </label>
              <div className="flex items-end gap-2">
                <textarea
                  id="sales-agent-input"
                  rows={1}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={onComposerKeyDown}
                  disabled={!chatReady || busy}
                  placeholder={salesAgentCopy.placeholder}
                  className="border-input text-brand-ink placeholder:text-brand-slate focus-visible:border-ring focus-visible:ring-ring/50 bg-canvas max-h-24 min-h-10 flex-1 resize-none border px-3 py-2 text-sm outline-none focus-visible:ring-3 disabled:opacity-60"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!chatReady || busy || !input.trim()}
                  aria-label={salesAgentCopy.send}
                  className="bg-brand-ink hover:bg-brand-action-deep size-10 rounded-full text-white"
                >
                  <ArrowUp className="size-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <Button
        ref={launcherRef}
        type="button"
        size="lg"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="sales-agent-panel"
        aria-label={
          open ? salesAgentCopy.launcherClose : salesAgentCopy.launcherOpen
        }
        onClick={() => setOpen((current) => !current)}
        className="bg-brand-ink hover:bg-brand-action-deep pointer-events-auto h-11 w-auto rounded-full px-5 text-sm font-medium text-white"
      >
        {open ? "Close" : "Inquire"}
      </Button>
    </div>
  );
}

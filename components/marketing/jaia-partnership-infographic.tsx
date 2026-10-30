"use client";

import Image from "next/image";
import { Hospital } from "lucide-react";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";

import { partnershipMap } from "@/content/site";
import { cn } from "@/lib/utils";

interface Point {
  x: number;
  y: number;
}

interface Connector {
  id: string;
  d: string;
  length: number;
  /** Where the line crosses onto the coordination ring */
  node: Point;
}

/**
 * How far each connector runs under its card and under the hub. Both sit
 * above the SVG, so the line always appears to meet their edges exactly,
 * including while the active card is lifted 2px.
 */
const TUCK = 4;

/** Corner for each card in the wide layout, in data order. */
const CORNERS = [
  "@min-[27rem]:top-0 @min-[27rem]:left-0",
  "@min-[27rem]:top-0 @min-[27rem]:right-0",
  "@min-[27rem]:bottom-0 @min-[27rem]:left-0",
  "@min-[27rem]:bottom-0 @min-[27rem]:right-0",
] as const;

function bezier(p0: Point, p1: Point, p2: Point, p3: Point, t: number) {
  const u = 1 - t;
  const a = u * u * u;
  const b = 3 * u * u * t;
  const c = 3 * u * t * t;
  const d = t * t * t;
  return {
    x: a * p0.x + b * p1.x + c * p2.x + d * p3.x,
    y: a * p0.y + b * p1.y + c * p2.y + d * p3.y,
  };
}

/**
 * Curve from a card's hub-facing edge to the hub. It leaves square to the
 * card edge and lands radially on the hub, so it never crosses card or hub
 * text. Coordinates are relative to the stage.
 */
function connect(
  card: DOMRect,
  stage: DOMRect,
  center: Point,
  hubRadius: number,
  ringRadius: number,
) {
  const left = card.left - stage.left;
  const top = card.top - stage.top;
  const onLeft = left + card.width / 2 < center.x;
  const above = top + card.height / 2 < center.y;
  const toward = above ? 1 : -1;
  const inset = Math.min(48, card.width * 0.3);
  const anchor = {
    x: onLeft ? left + card.width - inset : left + inset,
    y: above ? top + card.height : top,
  };

  const reach = Math.hypot(anchor.x - center.x, anchor.y - center.y);
  const ux = (anchor.x - center.x) / reach;
  const uy = (anchor.y - center.y) / reach;

  const p0 = { x: anchor.x, y: anchor.y - toward * TUCK };
  const p3 = {
    x: center.x + ux * (hubRadius - TUCK),
    y: center.y + uy * (hubRadius - TUCK),
  };
  const span = Math.hypot(p3.x - p0.x, p3.y - p0.y);
  const p1 = { x: p0.x, y: p0.y + toward * span * 0.42 };
  const p2 = { x: p3.x + ux * span * 0.38, y: p3.y + uy * span * 0.38 };

  let length = 0;
  let previous = p0;
  for (let step = 1; step <= 32; step += 1) {
    const point = bezier(p0, p1, p2, p3, step / 32);
    length += Math.hypot(point.x - previous.x, point.y - previous.y);
    previous = point;
  }

  let low = 0;
  let high = 1;
  for (let step = 0; step < 20; step += 1) {
    const mid = (low + high) / 2;
    const point = bezier(p0, p1, p2, p3, mid);
    if (Math.hypot(point.x - center.x, point.y - center.y) > ringRadius) {
      low = mid;
    } else {
      high = mid;
    }
  }

  const xy = (p: Point) => `${p.x.toFixed(2)} ${p.y.toFixed(2)}`;
  return {
    d: `M ${xy(p0)} C ${xy(p1)} ${xy(p2)} ${xy(p3)}`,
    length,
    node: bezier(p0, p1, p2, p3, high),
  };
}

/**
 * "Your practice, connected" — the practice at the center, JAIA as the
 * coordination ring around it, and four support areas that can be previewed
 * on hover or keyboard focus and selected with a click or tap.
 *
 * Layout follows the component's own width (container queries), not the
 * viewport: the About grid gives it a narrower column at 1024px than the
 * single-column layout does at 768px.
 */
export function JaiaPartnershipInfographic() {
  const uid = useId();
  const stageRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [connectors, setConnectors] = useState<Connector[] | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [focusId, setFocusId] = useState<string | null>(null);
  const [pulse, setPulse] = useState<{ id: string; key: number } | null>(null);

  const activeId = hoverId ?? focusId ?? selectedId;

  useEffect(() => {
    const stage = stageRef.current;
    const ring = ringRef.current;
    const hub = hubRef.current;
    if (!stage || !ring || !hub) return;

    const measure = () => {
      const stageBox = stage.getBoundingClientRect();
      const hubBox = hub.getBoundingClientRect();
      const center = {
        x: hubBox.left - stageBox.left + hubBox.width / 2,
        y: hubBox.top - stageBox.top + hubBox.height / 2,
      };
      const ringRadius = ring.getBoundingClientRect().width / 2;
      const next: Connector[] = [];
      partnershipMap.areas.forEach((area, index) => {
        const card = cardRefs.current[index];
        if (!card) return;
        next.push({
          id: area.id,
          ...connect(
            card.getBoundingClientRect(),
            stageBox,
            center,
            hubBox.width / 2,
            ringRadius,
          ),
        });
      });
      setConnectors(next);
    };

    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    observer.observe(hub);
    for (const card of cardRefs.current) {
      if (card) observer.observe(card);
    }
    return () => observer.disconnect();
  }, []);

  const pulseAlong = (id: string) =>
    setPulse((previous) => ({ id, key: (previous?.key ?? 0) + 1 }));

  const layers = [
    {
      id: "default",
      label: partnershipMap.title,
      description: partnershipMap.defaultBody,
    },
    ...partnershipMap.areas,
  ];
  const shownLayer = activeId ?? "default";

  return (
    <figure
      aria-label={partnershipMap.title}
      className="border-brand-sky/30 shadow-soft to-brand-sky-soft @container rounded-[1.75rem] border bg-gradient-to-b from-white"
    >
      <div className="p-5 @min-[32rem]:p-7">
        <div className="mx-auto flex w-full max-w-[40rem] flex-col items-center">
          <div className="border-brand-sky/60 shadow-soft inline-flex min-h-11 max-w-full items-center gap-3 rounded-full border bg-white py-1.5 pr-4 pl-3.5">
            <Image
              src="/brand/jaia-logo-horizontal.png"
              alt="JAIA Health"
              width={491}
              height={209}
              className="h-7 w-auto shrink-0"
            />
            <span
              aria-hidden="true"
              className="bg-brand-mist h-5 w-px shrink-0"
            />
            <span className="text-brand-ink text-[0.8125rem] leading-snug font-semibold text-pretty">
              {partnershipMap.badgeLabel}
            </span>
          </div>

          <div
            ref={stageRef}
            className="relative isolate flex w-full flex-col items-center @min-[27rem]:mt-4 @min-[27rem]:block @min-[27rem]:h-80"
          >
            <span
              aria-hidden="true"
              className="bg-brand-sky/60 block h-5 w-px @min-[27rem]:absolute @min-[27rem]:-top-4 @min-[27rem]:left-[calc(50%-0.5px)] @min-[27rem]:h-20"
            />

            <div
              ref={ringRef}
              className="relative size-48 shrink-0 @min-[27rem]:absolute @min-[27rem]:inset-x-0 @min-[27rem]:top-16 @min-[27rem]:mx-auto"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 192 192"
                className="absolute inset-0 z-0 size-full overflow-visible"
              >
                <circle
                  cx="96"
                  cy="96"
                  r="86"
                  fill="none"
                  strokeWidth="20"
                  className="stroke-brand-sky/15"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="95.5"
                  fill="none"
                  strokeWidth="1"
                  className="stroke-brand-sky/60"
                />
                <circle
                  cx="96"
                  cy="0.5"
                  r="3"
                  strokeWidth="1.5"
                  className="stroke-brand-sky fill-white"
                />
              </svg>

              <div
                ref={hubRef}
                className="border-brand-sky shadow-soft absolute inset-5 z-[2] flex flex-col items-center justify-center rounded-full border bg-white px-3 text-center"
              >
                <Hospital
                  aria-hidden="true"
                  className="text-brand-action size-7"
                  strokeWidth={1.75}
                />
                <p className="font-display text-brand-ink mt-2 text-[0.9375rem] leading-tight font-semibold">
                  {partnershipMap.hubLabel}
                </p>
                <p className="text-brand-slate mt-1 text-xs leading-snug">
                  {partnershipMap.hubBody}
                </p>
              </div>
            </div>

            <svg
              aria-hidden="true"
              focusable="false"
              className={cn(
                "pointer-events-none absolute inset-0 z-[1] hidden size-full overflow-visible transition-opacity duration-300 @min-[27rem]:block",
                connectors ? "opacity-100" : "opacity-0",
              )}
            >
              {connectors?.map((connector) => {
                const isActive = connector.id === activeId;
                return (
                  <g key={connector.id}>
                    <path
                      d={connector.d}
                      fill="none"
                      strokeLinecap="round"
                      className={cn(
                        "transition-[stroke,stroke-width] duration-200 ease-out",
                        isActive
                          ? "stroke-brand-action stroke-[1.75]"
                          : activeId
                            ? "stroke-brand-sky/50 stroke-[1.5]"
                            : "stroke-brand-sky stroke-[1.5]",
                      )}
                    />
                    <circle
                      cx={connector.node.x}
                      cy={connector.node.y}
                      r="3"
                      strokeWidth="1.5"
                      className={cn(
                        "transition-[fill,stroke] duration-200 ease-out",
                        isActive
                          ? "fill-brand-action stroke-brand-action"
                          : "stroke-brand-sky fill-white",
                      )}
                    />
                    {isActive && pulse?.id === connector.id ? (
                      <path
                        key={pulse.key}
                        d={connector.d}
                        fill="none"
                        strokeLinecap="round"
                        strokeWidth="6"
                        strokeDasharray={`0 ${connector.length + 16}`}
                        className="partnership-dot stroke-brand-action"
                        style={
                          {
                            "--dot-travel": `${-connector.length}px`,
                          } as CSSProperties
                        }
                      />
                    ) : null}
                  </g>
                );
              })}
            </svg>

            <ul
              aria-label={partnershipMap.areasLabel}
              className="mt-6 grid w-full grid-cols-1 gap-3 @min-[19.5rem]:grid-cols-2 @min-[27rem]:mt-0 @min-[27rem]:block"
            >
              {partnershipMap.areas.map((area, index) => {
                const isActive = area.id === activeId;
                const isSelected = area.id === selectedId;
                return (
                  <li
                    key={area.id}
                    className={cn(
                      "@min-[27rem]:absolute @min-[27rem]:z-[2] @min-[27rem]:w-40 @min-[32rem]:w-46",
                      CORNERS[index],
                    )}
                  >
                    <button
                      ref={(element) => {
                        cardRefs.current[index] = element;
                      }}
                      type="button"
                      aria-pressed={isSelected}
                      aria-describedby={`${uid}-${area.id}`}
                      onPointerEnter={(event) => {
                        if (event.pointerType === "touch") return;
                        if (area.id !== activeId) pulseAlong(area.id);
                        setHoverId(area.id);
                      }}
                      onPointerLeave={(event) => {
                        if (event.pointerType === "touch") return;
                        setHoverId((current) =>
                          current === area.id ? null : current,
                        );
                      }}
                      onFocus={(event) => {
                        // Mouse and touch focus would otherwise pin a preview
                        // that outlives a deselecting click.
                        if (!event.currentTarget.matches(":focus-visible")) {
                          return;
                        }
                        if (area.id !== activeId) pulseAlong(area.id);
                        setFocusId(area.id);
                      }}
                      onBlur={() =>
                        setFocusId((current) =>
                          current === area.id ? null : current,
                        )
                      }
                      onClick={() => {
                        const next = selectedId === area.id ? null : area.id;
                        if (next && next !== activeId) pulseAlong(next);
                        setSelectedId(next);
                      }}
                      className={cn(
                        "flex min-h-14 w-full items-center gap-2.5 rounded-2xl border px-3 py-2 text-left transition-[translate,background-color,border-color,box-shadow] duration-200 ease-out motion-reduce:translate-y-0",
                        isActive
                          ? "border-brand-sky bg-brand-sky-soft shadow-lift -translate-y-0.5"
                          : "border-brand-sky/35 shadow-soft bg-white",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "flex size-8 shrink-0 items-center justify-center rounded-xl transition-colors duration-200 ease-out",
                          isSelected
                            ? "bg-brand-action text-white"
                            : isActive
                              ? "text-brand-action bg-white"
                              : "bg-brand-sky-soft text-brand-action",
                        )}
                      >
                        <area.icon className="size-4.5" strokeWidth={1.75} />
                      </span>
                      <span className="text-brand-ink text-sm leading-tight font-semibold @min-[27rem]:text-[0.9375rem]">
                        {area.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Every explanation shares one grid cell, so the panel is always
              as tall as the longest one and never resizes on change. */}
          <div className="border-brand-sky/35 mt-5 grid w-full rounded-2xl border bg-white/85 px-5 py-4 @min-[27rem]:mt-6">
            {layers.map((layer) => {
              const shown = layer.id === shownLayer;
              return (
                <div
                  key={layer.id}
                  className={cn(
                    "col-start-1 row-start-1 transition-[opacity,visibility] ease-out motion-reduce:transition-none",
                    shown
                      ? "visible opacity-100 delay-60 duration-220"
                      : "invisible opacity-0 duration-120",
                  )}
                >
                  <p className="text-eyebrow font-display text-brand-action font-semibold tracking-[0.18em] uppercase">
                    {layer.label}
                  </p>
                  <p
                    id={`${uid}-${layer.id}`}
                    className="text-brand-ink mt-1.5 text-[0.9375rem] leading-relaxed"
                  >
                    {layer.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </figure>
  );
}
